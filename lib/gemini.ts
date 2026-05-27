import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function generateCards(
  text: string,
  domain: string = "general",
): Promise<
  Array<{
    front: string;
    back: string;
    importance: "core" | "good_to_know" | "optional";
    tags: string[];
  }>
> {
  const prompt = `You are an expert at creating high quality spaced repetition flashcards for students.

A student just learned the following:
"${text}"

Domain: ${domain}

Your job is to create flashcards from this. Follow these rules strictly:
1. Each card tests ONE specific concept only
2. Questions must be interview/exam style - never ask plain definitions
3. Ask WHY, HOW, WHAT HAPPENS IF, COMPARE, EXPLAIN TO A 5 YEAR OLD
4. Assign importance:
   - core: fundamental concept, will definitely appear in exams/interviews
   - good_to_know: useful but not critical
   - optional: advanced or niche detail
5. Assign 1-3 short tags (e.g. ["ssl-tls", "security"])
6. Generate between 2 to 4 cards depending on how much content there is

Return ONLY a valid JSON array. No explanation, no markdown, no backticks. Example format:
[
  {
    "front": "Why can't two parties communicate securely without SSL/TLS?",
    "back": "Without encryption, data travels as plain text. Anyone intercepting the traffic can read passwords, credit card numbers, and private messages.",
    "importance": "core",
    "tags": ["ssl-tls", "security"]
  }
]`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
  });

  const raw = response.text ?? "";
  const clean = raw.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(clean);
  } catch {
    console.error("Failed to parse Gemini response:", raw);
    return [];
  }
}
