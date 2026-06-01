import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";

const geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
const groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export type AIProvider = "gemini" | "groq";

interface GenerateOptions {
  prompt: string;
  provider?: AIProvider;
}

export async function generateContentInterceptor({
  prompt,
  provider,
}: GenerateOptions): Promise<string> {
  if (provider === "groq") {
    return callGroq(prompt);
  }

  try {
    return await callGemini(prompt);
  } catch (error: unknown) {
    const err = error as { status?: number; message?: string };
    const is503 = err?.status === 503 || err?.message?.includes("503");

    if (is503) {
      console.warn(
        "Gemini hit 503 overload. Routing traffic to Groq as a fallback.",
      );
      return callGroq(prompt);
    }

    throw error;
  }
}

async function callGemini(prompt: string): Promise<string> {
  const response = await geminiClient.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text ?? "";
}

async function callGroq(prompt: string): Promise<string> {
  const response = await groqClient.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "You are an expert educator. Return raw JSON only. No markdown fences.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.2,
  });

  return response.choices[0]?.message?.content ?? "";
}
