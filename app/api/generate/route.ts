import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/middleware";
import { generateCards, generateCardsFromPrompt } from "@/lib/gemini";
import { z } from "zod";

const generateSchema = z.object({
  text: z.string().min(10).max(5000),
  deck_id: z.string().uuid(),
  domain: z.string().optional(),
  prompt: z.string().optional(),
  provider: z.enum(["gemini", "groq"]).optional(),
  useGroq: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const userId = getUserFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const result = generateSchema.safeParse(body);
    if (!result.success) {
      const errorMsg = result.error.issues
        .map((issue: z.ZodIssue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { text, deck_id, domain, prompt, provider, useGroq } = result.data;

    const selectedProvider = provider ?? (useGroq ? "groq" : undefined);

    if (!prompt && (!text || !deck_id)) {
      return NextResponse.json(
        { error: "Text and deck_id are required" },
        { status: 400 },
      );
    }

    const generated = prompt
      ? await generateCardsFromPrompt(prompt, {
          provider: selectedProvider,
        })
      : await generateCards(text, domain, {
          provider: selectedProvider,
        });

    if (generated.length === 0) {
      return NextResponse.json(
        { error: "Could not generate cards from this text" },
        { status: 422 },
      );
    }

    return NextResponse.json({
      data: generated,
      cards: generated,
      count: generated.length,
    });
  } catch (error: unknown) {
    console.error("Generate error:", error);

    const err = error as { status?: number; message?: string };
    if (err?.status === 503 || err?.message?.includes("503")) {
      return NextResponse.json(
        {
          error:
            "Free tier limit reached. Please wait a moment and try clicking generate again.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
