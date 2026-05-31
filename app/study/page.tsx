"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  History,
  Loader2,
  Save,
  Sparkles,
  Wand2,
} from "lucide-react";

type FlowState = "idle" | "generating" | "preview" | "saving" | "saved" | "error";
type Importance = "core" | "good_to_know" | "optional";

const mockCards: Array<{
  question: string;
  answer: string;
  importance: Importance;
}> = [
  {
    question: "What does SSL protect during a web request?",
    answer: "It encrypts data moving between the browser and server.",
    importance: "core",
  },
  {
    question: "Why do certificates matter in HTTPS?",
    answer: "They prove the server identity and help prevent impersonation.",
    importance: "good_to_know",
  },
  {
    question: "What is TLS in relation to SSL?",
    answer: "TLS is the modern successor to SSL and is what HTTPS uses today.",
    importance: "optional",
  },
];

const importanceStyles: Record<Importance, string> = {
  core: "bg-primary-light text-primary border-primary/20",
  good_to_know: "bg-warning-light text-warning border-warning/25",
  optional: "bg-background text-text-secondary border-border",
};

function mockGenerateCards() {
  return new Promise<typeof mockCards>((resolve) => {
    setTimeout(() => resolve(mockCards), 850);
  });
}

function mockSaveCards() {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, 700);
  });
}

export default function StudyPage() {
  const [status, setStatus] = useState<FlowState>("idle");
  const [content, setContent] = useState(
    "SSL stands for Secure Sockets Layer. It encrypts the connection between a browser and a server so private data stays protected in transit.",
  );
  const [cards, setCards] = useState<typeof mockCards>([]);
  const [error, setError] = useState("");

  const canGenerate = content.trim().length > 24;
  const wordCount = useMemo(
    () => content.trim().split(/\s+/).filter(Boolean).length,
    [content],
  );

  const handleGenerate = async () => {
    if (!canGenerate) {
      setError("Paste at least a few sentences so RecallIQ has enough context.");
      setStatus("error");
      return;
    }

    setError("");
    setStatus("generating");

    try {
      const generated = await mockGenerateCards();
      setCards(generated);
      setStatus("preview");
    } catch {
      setError("The mock AI generator failed. Your note is still safe.");
      setStatus("error");
    }
  };

  const handleSave = async () => {
    setError("");
    setStatus("saving");

    try {
      await mockSaveCards();
      setStatus("saved");
    } catch {
      setError("The deck could not be saved. Try again in a moment.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary font-body">
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-full p-2 text-text-secondary hover:bg-card hover:text-primary"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="font-heading text-xl font-bold tracking-tight">
                Add content
              </h1>
              <p className="hidden text-xs text-text-secondary sm:block">
                Paste notes, generate cards, preview, then save.
              </p>
            </div>
          </div>
          <button className="rounded-full p-2 text-text-secondary hover:bg-card hover:text-primary">
            <History className="h-5 w-5" />
          </button>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-6 md:grid-cols-[minmax(0,1fr)_280px] md:px-6 md:py-10 animate-page-in">
        <section className="space-y-4">
          <div className="rounded-large-card border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-heading text-lg font-bold">Study source</h2>
                <p className="text-sm text-text-secondary">
                  {wordCount} words queued for mock generation.
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-pill border border-primary/20 bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
                <Wand2 className="h-3.5 w-3.5" />
                AI draft
              </span>
            </div>

            <textarea
              value={content}
              onChange={(event) => {
                setContent(event.target.value);
                if (status === "error") setStatus("idle");
              }}
              disabled={status === "generating" || status === "saving"}
              placeholder="Paste notes, transcript snippets, or textbook summaries..."
              className="min-h-56 w-full resize-y rounded-card border border-border bg-background p-4 text-sm leading-6 text-text-primary outline-none placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:opacity-70"
            />

            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-card border border-error/20 bg-error-light p-3 text-sm text-error-dark">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-error" />
                <span>{error}</span>
              </div>
            )}

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={!canGenerate || status === "generating" || status === "saving"}
                className="inline-flex items-center justify-center gap-2 rounded-card bg-primary px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-primary-dark active:scale-[0.98] disabled:pointer-events-none disabled:bg-text-secondary/25 disabled:text-text-secondary"
              >
                {status === "generating" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                {status === "generating" ? "Generating cards..." : "Generate cards"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setContent("");
                  setCards([]);
                  setStatus("idle");
                  setError("");
                }}
                disabled={status === "generating" || status === "saving"}
                className="rounded-card border border-border bg-card px-5 py-3 text-sm font-bold text-text-primary hover:bg-background active:scale-[0.98] disabled:opacity-60"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="rounded-large-card border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-heading text-lg font-bold">Preview cards</h2>
                <p className="text-sm text-text-secondary">
                  Review the mock output before saving to a deck.
                </p>
              </div>
              <span className="rounded-pill bg-background px-3 py-1 text-xs font-semibold text-text-secondary">
                {cards.length} cards
              </span>
            </div>

            {status === "generating" && (
              <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-card border border-dashed border-border bg-background/60 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="font-heading text-lg font-bold">Analyzing your notes...</p>
                <p className="max-w-xs text-sm text-text-secondary">
                  The placeholder generator is identifying questions, answers, and importance.
                </p>
              </div>
            )}

            {(status === "idle" || status === "error") && (
              <div className="flex min-h-48 flex-col items-center justify-center rounded-card border border-dashed border-border bg-background/60 px-6 text-center">
                <Sparkles className="mb-3 h-8 w-8 text-primary" />
                <p className="font-heading text-lg font-bold">No generated cards yet</p>
                <p className="mt-1 max-w-sm text-sm text-text-secondary">
                  Generate a preview when your source note is ready.
                </p>
              </div>
            )}

            {(status === "preview" || status === "saving" || status === "saved") && (
              <div className="space-y-3">
                {cards.map((card, index) => (
                  <article
                    key={card.question}
                    className="rounded-card border border-border bg-background p-4 hover:border-primary/40 hover:bg-primary-light/20"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold text-text-secondary">
                        Card {index + 1}
                      </span>
                      <span
                        className={`rounded-pill border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${importanceStyles[card.importance]}`}
                      >
                        {card.importance.replaceAll("_", " ")}
                      </span>
                    </div>
                    <h3 className="font-heading text-base font-bold">{card.question}</h3>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">{card.answer}</p>
                  </article>
                ))}

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={status === "saving" || status === "saved"}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-card bg-secondary px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-secondary-dark active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
                >
                  {status === "saving" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : status === "saved" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {status === "saving"
                    ? "Saving cards..."
                    : status === "saved"
                      ? "Saved to SSL Fundamentals"
                      : "Save preview"}
                </button>
              </div>
            )}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-large-card border border-border bg-card p-5 shadow-sm">
            <h2 className="font-heading text-base font-bold">Deck target</h2>
            <div className="mt-4 rounded-card border border-primary/20 bg-primary-light p-4">
              <p className="text-sm font-bold text-primary">SSL Fundamentals</p>
              <p className="mt-1 text-xs text-text-secondary">Mock deck / 18 cards</p>
            </div>
          </div>

          <div className="rounded-large-card border border-border bg-card p-5 shadow-sm">
            <h2 className="font-heading text-base font-bold">Generation status</h2>
            <ol className="mt-4 space-y-3 text-sm">
              {["Paste source", "Generate preview", "Save cards"].map((item, index) => {
                const done =
                  index === 0 ||
                  (index === 1 && ["preview", "saving", "saved"].includes(status)) ||
                  (index === 2 && status === "saved");
                return (
                  <li key={item} className="flex items-center gap-3">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold ${
                        done
                          ? "border-secondary bg-secondary text-white"
                          : "border-border bg-background text-text-secondary"
                      }`}
                    >
                      {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : index + 1}
                    </span>
                    <span className={done ? "font-semibold text-text-primary" : "text-text-secondary"}>
                      {item}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </aside>
      </main>
    </div>
  );
}
