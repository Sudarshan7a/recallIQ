import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/middleware";
import { generateCards } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const userId = getUserFromRequest(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { text, deck_id, domain } = await req.json();

    if (!text || !deck_id) {
      return NextResponse.json(
        { error: "Text and deck_id are required" },
        { status: 400 }
      );
    }

    const generated = await generateCards(text, domain);

    if (generated.length === 0) {
      return NextResponse.json(
        { error: "Could not generate cards from this text" },
        { status: 422 }
      );
    }

    return NextResponse.json({
      cards: generated,
      count: generated.length,
    });
  } catch (error: any) {
    console.error("Generate error:", error);

    if (error?.status === 503 || error?.message?.includes("503")) {
      return NextResponse.json(
        {
          error:
            "Free tier limit reached. Please wait a moment and try clicking generate again.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
