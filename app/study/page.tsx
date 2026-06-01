"use client";

import Link from "next/link";
import { useMemo, useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Edit3,
  History,
  Loader2,
  Save,
  Sparkles,
  Trash2,
  Wand2,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

type FlowState =
  | "idle"
  | "generating"
  | "preview"
  | "saving"
  | "saved"
  | "error";
type Importance = "core" | "good_to_know" | "optional";

type Card = {
  front: string;
  back: string;
  importance: Importance;
  tags?: string[];
};

type Deck = {
  id: string;
  name: string;
  cardCount?: number;
};

const importanceStyles: Record<Importance, { badge: string; label: string }> = {
  core: {
    badge: "bg-[#5C51E8]/10 text-[#5C51E8] border-[#5C51E8]/20",
    label: "Core",
  },
  good_to_know: {
    badge: "bg-[#BA7517]/10 text-[#BA7517] border-[#BA7517]/20",
    label: "Good to know",
  },
  optional: {
    badge: "bg-border text-text-secondary border-border",
    label: "Optional",
  },
};

// ─── Editable Preview Card ─────────────────────────────────────────────────────

function EditablePreviewCard({
  card,
  index,
  onUpdate,
  onDelete,
}: {
  card: Card;
  index: number;
  onUpdate: (index: number, updated: Card) => void;
  onDelete: (index: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({
    front: card.front,
    back: card.back,
    importance: card.importance,
  });
  const [flipped, setFlipped] = useState(false);

  const { badge, label } = importanceStyles[card.importance];

  const handleSave = () => {
    if (!draft.front.trim() || !draft.back.trim()) return;
    onUpdate(index, {
      ...card,
      front: draft.front.trim(),
      back: draft.back.trim(),
      importance: draft.importance,
    });
    setIsEditing(false);
    setFlipped(false);
  };

  if (isEditing) {
    return (
      <div className="rounded-[12px] border border-primary/40 bg-card p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between mb-1">
          <span className="font-label font-bold text-[10px] text-text-secondary uppercase tracking-widest">
            Card {index + 1}
          </span>
          <button
            onClick={() => setIsEditing(false)}
            className="text-text-secondary hover:text-text-primary p-1 rounded-full hover:bg-background transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary block mb-1">
            Front
          </label>
          <textarea
            value={draft.front}
            onChange={(e) => setDraft((d) => ({ ...d, front: e.target.value }))}
            className="w-full rounded-[8px] border border-border bg-background p-2.5 text-sm text-text-primary outline-none focus:border-primary resize-none min-h-16"
            rows={2}
          />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary block mb-1">
            Back
          </label>
          <textarea
            value={draft.back}
            onChange={(e) => setDraft((d) => ({ ...d, back: e.target.value }))}
            className="w-full rounded-[8px] border border-border bg-background p-2.5 text-sm text-text-primary outline-none focus:border-primary resize-none min-h-16"
            rows={2}
          />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-text-secondary block mb-1">
            Importance
          </label>
          <select
            value={draft.importance}
            onChange={(e) =>
              setDraft((d) => ({
                ...d,
                importance: e.target.value as Importance,
              }))
            }
            className="w-full rounded-[8px] border border-border bg-background px-2.5 py-2 text-xs text-text-primary outline-none focus:border-primary cursor-pointer"
          >
            <option value="core">Core</option>
            <option value="good_to_know">Good to know</option>
            <option value="optional">Optional</option>
          </select>
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-primary text-white rounded-[8px] py-2 text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all cursor-pointer"
        >
          <CheckCircle2 className="w-3.5 h-3.5" /> Save edits
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className="cursor-pointer select-none group relative h-[130px] w-full rounded-[10px] border border-border bg-background shadow-sm hover:border-primary/40 transition-all"
        onClick={() => setFlipped((f) => !f)}
      >
        {/* FRONT */}
        <div
          className={`absolute inset-0 rounded-[10px] p-4 flex flex-col justify-between transition-opacity duration-300 ${
            flipped ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest">
              Card {index + 1} · Front
            </span>
            <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 rounded-full text-text-secondary hover:text-primary hover:bg-card transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete(index)}
                className="p-1 rounded-full text-text-secondary hover:text-error hover:bg-error-light transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <span
                className={`rounded-full border px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider ${badge}`}
              >
                {label}
              </span>
            </div>
          </div>
          <h3 className="font-body text-sm font-semibold text-text-primary line-clamp-2 my-auto">
            {card.front}
          </h3>
          <span className="text-[8px] font-bold text-primary opacity-0 group-hover:opacity-60 transition-opacity uppercase tracking-widest text-center">
            Click to reveal answer
          </span>
        </div>

        {/* BACK */}
        <div
          className={`absolute inset-0 rounded-[10px] p-4 flex flex-col justify-between transition-opacity duration-300 ${
            flipped ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-primary uppercase tracking-widest">
              Card {index + 1} · Back
            </span>
            <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 rounded-full text-text-secondary hover:text-primary hover:bg-card transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete(index)}
                className="p-1 rounded-full text-text-secondary hover:text-error hover:bg-error-light transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p className="font-body text-xs text-text-secondary leading-relaxed line-clamp-3 my-auto">
            {card.back}
          </p>
          <span className="text-[8px] font-bold text-text-secondary opacity-60 uppercase tracking-widest text-center">
            Click to view question
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Inner page (uses useSearchParams) ────────────────────────────────────────

function StudyPageInner() {
  const searchParams = useSearchParams();
  const preselectedDeckId = searchParams.get("deckId") ?? "";

  const [status, setStatus] = useState<FlowState>("idle");
  const [content, setContent] = useState("");
  const [cards, setCards] = useState<Card[]>([]);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [selectedDeckId, setSelectedDeckId] = useState(preselectedDeckId);
  const [error, setError] = useState("");

  const canGenerate = content.trim().length > 24;
  const wordCount = useMemo(
    () => content.trim().split(/\s+/).filter(Boolean).length,
    [content],
  );

  useEffect(() => {
    fetch("/api/decks")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to load decks");
        setDecks(data.decks || []);
        // If preselected from query, use it; otherwise fall back to first
        if (!preselectedDeckId && data.decks?.length > 0) {
          setSelectedDeckId(data.decks[0].id);
        }
      })
      .catch(() => {
        setError("Could not load your decks. Please create a deck first.");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handlers
  const handleGenerate = async () => {
    if (!canGenerate) {
      setError("Paste at least a few sentences.");
      setStatus("error");
      return;
    }
    if (!selectedDeckId) {
      setError("Please select a target deck first.");
      setStatus("error");
      return;
    }
    setError("");
    setStatus("generating");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: content,
          deck_id: selectedDeckId,
          domain: "general",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to generate cards");
      setCards(data.cards || []);
      setStatus("preview");
    } catch (err) {
      setError(err instanceof Error ? err.message : "The AI generator failed.");
      setStatus("error");
    }
  };

  const handleSave = async () => {
    if (cards.length === 0 || !selectedDeckId) return;
    setError("");
    setStatus("saving");
    try {
      const res = await fetch("/api/generate/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deck_id: selectedDeckId, cards }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save cards");
      setStatus("saved");
      setDecks((current) =>
        current.map((d) =>
          d.id === selectedDeckId
            ? { ...d, cardCount: (d.cardCount || 0) + data.saved_count }
            : d,
        ),
      );
      setTimeout(() => {
        setContent("");
        setCards([]);
        setStatus("idle");
      }, 1800);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not save. Try again.",
      );
      setStatus("error");
    }
  };

  const updateCard = useCallback((index: number, updated: Card) => {
    setCards((prev) => prev.map((c, i) => (i === index ? updated : c)));
  }, []);

  const deleteCard = useCallback((index: number) => {
    setCards((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const selectedDeck = decks.find((d) => d.id === selectedDeckId);

  return (
    <div className="min-h-screen bg-background text-text-primary font-body">
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <Link
              href={
                selectedDeck
                  ? `/dashboard/decks/${selectedDeck.id}`
                  : "/dashboard"
              }
              className="rounded-full p-2 text-text-secondary hover:bg-card hover:text-primary transition-all active:scale-95"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="font-heading text-xl font-bold tracking-tight">
                Add content
              </h1>
              {selectedDeck && (
                <p className="text-xs text-text-secondary">
                  →{" "}
                  <span className="text-primary font-semibold">
                    {selectedDeck.name}
                  </span>
                </p>
              )}
            </div>
          </div>
          <button className="rounded-full p-2 text-text-secondary hover:bg-card hover:text-primary transition-all active:scale-95">
            <History className="h-5 w-5" />
          </button>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-6 md:grid-cols-[minmax(0,1fr)_280px] md:px-6 md:py-10 animate-page-in">
        {/* LEFT: Source + Preview */}
        <section className="space-y-5">
          {/* Source note editor */}
          <div className="rounded-[14px] border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-heading font-semibold text-base text-text-primary">
                  Study source
                </h2>
                <p className="text-xs text-text-secondary">
                  {wordCount} words ({content.length}/2000 characters) queued
                  for generation.
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary shadow-sm">
                <Wand2 className="h-3.5 w-3.5" /> AI draft
              </span>
            </div>

            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              disabled={status === "generating" || status === "saving"}
              maxLength={2000}
              placeholder="Paste notes, transcript snippets, or textbook summaries (maximum 2000 characters)..."
              className="min-h-56 w-full resize-y rounded-[10px] border border-border bg-background p-4 text-sm leading-6 text-text-primary outline-none placeholder:text-text-secondary/50 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all disabled:opacity-70"
            />

            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-[10px] border border-error/20 bg-error-light p-3 text-xs text-error-dark">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-error" />
                <span>{error}</span>
              </div>
            )}

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleGenerate}
                disabled={
                  !canGenerate ||
                  status === "generating" ||
                  status === "saving" ||
                  decks.length === 0
                }
                className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-primary text-white hover:bg-primary-dark px-5 py-2.5 text-xs font-semibold shadow-sm disabled:pointer-events-none disabled:opacity-40 transition-all cursor-pointer"
              >
                {status === "generating" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                {status === "generating"
                  ? "Generating cards..."
                  : "Generate cards"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  setContent("");
                  setCards([]);
                  setStatus("idle");
                  setError("");
                }}
                disabled={status === "generating" || status === "saving"}
                className="rounded-[10px] border border-border bg-card px-5 py-2.5 text-xs font-semibold text-text-primary hover:bg-background disabled:opacity-60 transition-all cursor-pointer"
              >
                Clear
              </motion.button>
            </div>
          </div>

          {/* Preview panel */}
          <div className="rounded-[14px] border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-heading font-semibold text-base text-text-primary">
                  Preview cards
                </h2>
                <p className="text-xs text-text-secondary">
                  {cards.length > 0
                    ? "Click a card to flip · Edit or delete before saving."
                    : "Review cards before saving."}
                </p>
              </div>
              <span className="rounded-full bg-background px-3 py-1 text-[10px] font-semibold text-text-secondary border border-border">
                {cards.length} cards
              </span>
            </div>

            {status === "generating" && (
              <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-[10px] border border-dashed border-border bg-background/60 text-center p-6">
                <Loader2 className="h-7 w-7 animate-spin text-primary" />
                <p className="font-heading font-semibold text-base text-text-primary">
                  Analyzing your notes...
                </p>
                <p className="max-w-xs text-xs text-text-secondary leading-relaxed">
                  AI is identifying key concepts, questions, and answers.
                </p>
              </div>
            )}

            {(status === "idle" || status === "error") && (
              <div className="flex min-h-48 flex-col items-center justify-center rounded-[10px] border border-dashed border-border bg-background/60 px-6 text-center">
                <Sparkles className="mb-3 h-7 w-7 text-primary/60" />
                <p className="font-heading font-semibold text-base text-text-primary">
                  No generated cards yet
                </p>
                <p className="mt-1 max-w-sm text-xs text-text-secondary leading-relaxed">
                  Paste your notes and click Generate cards.
                </p>
              </div>
            )}

            {(status === "preview" ||
              status === "saving" ||
              status === "saved") && (
              <div className="space-y-3">
                {cards.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <Trash2 className="w-8 h-8 text-text-secondary mb-2" />
                    <p className="text-sm text-text-secondary">
                      All cards deleted. Generate again or go back.
                    </p>
                  </div>
                ) : (
                  cards.map((card, index) => (
                    <EditablePreviewCard
                      key={`${card.front}-${index}`}
                      card={card}
                      index={index}
                      onUpdate={updateCard}
                      onDelete={deleteCard}
                    />
                  ))
                )}

                {cards.length > 0 && (
                  <button
                    onClick={handleSave}
                    disabled={status === "saving" || status === "saved"}
                    style={{
                      backgroundColor:
                        status === "saved"
                          ? "#1D9E75"
                          : status === "saving"
                            ? "#085041"
                            : "#5C51E8",
                    }}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-sm font-semibold text-white disabled:pointer-events-none disabled:opacity-90 transition-colors cursor-pointer shadow-sm"
                  >
                    {status === "saving" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : status === "saved" ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    <span>
                      {status === "saving"
                        ? "Saving cards..."
                        : status === "saved"
                          ? `Saved ${cards.length} cards to ${selectedDeck?.name ?? "deck"}`
                          : `Save ${cards.length} card${cards.length !== 1 ? "s" : ""} to deck`}
                    </span>
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* RIGHT sidebar */}
        <aside className="space-y-4">
          {/* Deck target */}
          <div className="rounded-[14px] border border-border bg-card p-5 shadow-sm">
            <h2 className="font-heading font-semibold text-base text-text-primary mb-1">
              Deck target
            </h2>
            {selectedDeck && (
              <p className="text-xs text-text-secondary mb-3">
                Cards will be saved to{" "}
                <span className="text-primary font-semibold">
                  {selectedDeck.name}
                </span>
                .
              </p>
            )}
            {decks.length === 0 ? (
              <p className="text-xs text-text-secondary leading-relaxed">
                No decks found. Please{" "}
                <Link
                  href="/dashboard/decks"
                  className="text-primary font-semibold hover:underline"
                >
                  create a deck
                </Link>{" "}
                first.
              </p>
            ) : (
              <select
                value={selectedDeckId}
                onChange={(e) => setSelectedDeckId(e.target.value)}
                className="w-full rounded-[10px] border border-border bg-background px-3 py-2.5 text-xs outline-none focus:border-primary text-text-primary cursor-pointer font-body"
              >
                {decks.map((deck) => (
                  <option key={deck.id} value={deck.id}>
                    {deck.name} ({deck.cardCount || 0} cards)
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Generation status */}
          <div className="rounded-[14px] border border-border bg-card p-5 shadow-sm">
            <h2 className="font-heading font-semibold text-base text-text-primary">
              Status
            </h2>
            <ol className="mt-4 space-y-3 text-sm">
              {[
                "Paste source",
                "Generate preview",
                "Review & edit",
                "Save cards",
              ].map((item, index) => {
                const done =
                  index === 0 ||
                  (index === 1 &&
                    ["preview", "saving", "saved"].includes(status)) ||
                  (index === 2 && ["saving", "saved"].includes(status)) ||
                  (index === 3 && status === "saved");
                const active =
                  (index === 0 && status === "idle") ||
                  (index === 1 && status === "generating") ||
                  (index === 2 && status === "preview") ||
                  (index === 3 && status === "saving");
                return (
                  <li key={item} className="flex items-center gap-3">
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold transition-all ${
                        done
                          ? "border-secondary bg-secondary text-white shadow-sm"
                          : active
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background text-text-secondary"
                      }`}
                    >
                      {done ? <CheckCircle2 className="h-3 w-3" /> : index + 1}
                    </span>
                    <span
                      className={
                        done
                          ? "font-semibold text-text-primary"
                          : active
                            ? "font-semibold text-primary"
                            : "text-text-secondary"
                      }
                    >
                      {item}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Tips */}
          {status === "preview" && cards.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[14px] border border-primary/20 bg-primary/5 p-4 text-xs text-text-secondary space-y-1.5"
            >
              <p className="font-bold text-primary text-[10px] uppercase tracking-widest">
                Tips
              </p>
              <p>
                •{" "}
                <span className="text-text-primary font-semibold">
                  Tap a card
                </span>{" "}
                to flip it
              </p>
              <p>
                • Click <Edit3 className="inline w-3 h-3 mx-0.5" /> to edit any
                card
              </p>
              <p>
                • Click <Trash2 className="inline w-3 h-3 mx-0.5 text-error" />{" "}
                to remove unwanted cards
              </p>
            </motion.div>
          )}
        </aside>
      </main>
    </div>
  );
}

// ─── Export wrapped in Suspense (required for useSearchParams) ─────────────────

export default function StudyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <StudyPageInner />
    </Suspense>
  );
}
