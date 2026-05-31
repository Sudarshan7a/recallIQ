"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Edit3,
  Flag,
  Loader2,
  Plus,
  Shield,
  Trash2,
  X,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Importance = "core" | "good_to_know" | "optional";
type Deck = { id: string; name: string; description: string | null; domain: string | null };
type Card = {
  id: string;
  front: string;
  back: string;
  importance: Importance;
  tags: string[] | null;
  dueDate: string | null;
  reps: number | null;
  lapses: number | null;
};

const importancePill: Record<Importance, string> = {
  core: "bg-primary/10 text-primary border-primary/20",
  good_to_know: "bg-tertiary/10 text-tertiary border-tertiary/20",
  optional: "bg-border text-text-secondary border-border",
};

export default function DeckDetailPage() {
  const router = useRouter();
  const params = useParams<{ deckId: string }>();
  const deckId = params.deckId;

  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [activeImportance, setActiveImportance] = useState<Importance | "all">("all");
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [draft, setDraft] = useState({ front: "", back: "", importance: "good_to_know" as Importance, tags: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const loadDeck = useCallback(async () => {
    setError("");
    try {
      const response = await fetch(`/api/decks/${deckId}`, { credentials: "include" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Deck could not be loaded.");
      setDeck(payload.deck);
      setCards(payload.cards ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Deck could not be loaded.");
    } finally {
      setIsLoading(false);
    }
  }, [deckId]);

  useEffect(() => { void Promise.resolve().then(loadDeck); }, [loadDeck]);

  const filteredCards = useMemo(
    () => cards.filter((c) => activeImportance === "all" || c.importance === activeImportance),
    [cards, activeImportance],
  );

  const dueCount = cards.filter((c) => c.dueDate && new Date(c.dueDate) <= new Date()).length;
  const masteredCount = cards.filter((c) => Number(c.reps ?? 0) >= 3 && Number(c.lapses ?? 0) === 0).length;

  const openEdit = (card: Card) => {
    setEditingCard(card);
    setDraft({ front: card.front, back: card.back, importance: card.importance, tags: card.tags?.join(", ") ?? "" });
  };

  const saveCard = async (event: FormEvent) => {
    event.preventDefault();
    if (!editingCard) return;
    setIsSaving(true);
    setError("");
    try {
      const response = await fetch(`/api/cards/${editingCard.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          front: draft.front,
          back: draft.back,
          importance: draft.importance,
          tags: draft.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Card could not be saved.");
      setEditingCard(null);
      await loadDeck();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Card could not be saved.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteCard = async (card: Card) => {
    setIsSaving(true);
    setError("");
    try {
      const response = await fetch(`/api/cards/${card.id}`, { method: "DELETE", credentials: "include" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Card could not be deleted.");
      await loadDeck();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Card could not be deleted.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* ─── SLIM HEADER: back + title + stats strip ─── */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3 px-4 h-14">
          <button
            onClick={() => router.push("/dashboard/decks")}
            className="rounded-full p-2 text-text-secondary hover:bg-card hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-heading font-bold text-base text-text-primary truncate">{deck?.name ?? "Deck"}</h1>
            <p className="text-[10px] font-label text-text-secondary tracking-wide uppercase">{deck?.domain ?? "General"}</p>
          </div>
          {/* Inline stats */}
          <div className="flex items-center gap-3 mr-2">
            <div className="text-center">
              <div className="font-heading font-bold text-base text-primary">{dueCount}</div>
              <div className="font-label text-[9px] text-text-secondary uppercase tracking-wider">Due</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="font-heading font-bold text-base text-secondary">{masteredCount}</div>
              <div className="font-label text-[9px] text-text-secondary uppercase tracking-wider">Mastered</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="font-heading font-bold text-base text-text-primary">{cards.length}</div>
              <div className="font-label text-[9px] text-text-secondary uppercase tracking-wider">Total</div>
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 px-4 pb-2 overflow-x-auto">
          {[["all", "All"], ["core", "Core"], ["good_to_know", "Good to know"], ["optional", "Optional"]].map(([value, label]) => (
            <button
              key={value}
              onClick={() => setActiveImportance(value as Importance | "all")}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-label font-semibold transition-all cursor-pointer ${
                activeImportance === value
                  ? "bg-primary text-white shadow-sm"
                  : "bg-card border border-border text-text-secondary hover:text-text-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── ERROR BANNER ─── */}
      {error && (
        <div className="mx-4 mt-4 rounded-[10px] border border-error/20 bg-error-light p-3 text-sm text-error-dark flex items-center gap-2">
          <AlertTriangle className="mr-1 inline h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* ─── CARD LIST ─── */}
      <main className="mx-auto w-full max-w-3xl space-y-3 px-4 pt-5">
        {filteredCards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="relative mb-6 flex h-[120px] w-[180px] items-center justify-center rounded-[16px] border-2 border-dashed border-border bg-card">
              <Sparkles className="h-8 w-8 text-primary/40" />
            </div>
            <h3 className="font-heading text-lg font-bold text-text-primary">No cards here yet</h3>
            <p className="mt-1 max-w-[260px] text-sm text-text-secondary">
              Generate cards from your notes to fill this deck.
            </p>
            <Link
              href={`/study?deckId=${deckId}`}
              className="mt-5 inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-[10px] font-label font-semibold text-sm hover:bg-primary-dark transition-all shadow-sm shadow-primary/20"
            >
              <Sparkles className="h-4 w-4" /> Generate cards
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } }}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {filteredCards.map((card) => (
              <motion.article
                key={card.id}
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 320, damping: 26 } } }}
                className="rounded-[12px] border border-border bg-card p-4 shadow-sm hover:shadow-md hover:border-text-secondary/20 transition-all"
              >
                <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[9px] font-label font-bold uppercase tracking-wider ${importancePill[card.importance]}`}>
                    {card.importance.replaceAll("_", " ")}
                  </span>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(card)} className="rounded-full p-1.5 text-text-secondary hover:bg-background hover:text-primary transition-colors cursor-pointer">
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => deleteCard(card)} disabled={isSaving} className="rounded-full p-1.5 text-text-secondary hover:bg-error-light hover:text-error transition-colors cursor-pointer disabled:opacity-50">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <h3 className="font-heading text-sm font-bold text-text-primary">{card.front}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{card.back}</p>
                {!!card.tags?.length && (
                  <p className="mt-2 text-[10px] font-label font-semibold text-primary">#{card.tags.join(" #")}</p>
                )}
              </motion.article>
            ))}
          </motion.div>
        )}
      </main>

      {/* ─── FIXED BOTTOM BAR — accounts for sidebar on desktop ─── */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 z-30 border-t border-border bg-card/95 backdrop-blur-md shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          {/* Exam */}
          <Link
            href={`/review/${deckId}?mode=exam`}
            className="flex min-w-[60px] flex-col items-center justify-center gap-0.5 text-text-secondary hover:text-primary transition-colors py-1"
          >
            <Shield className="h-5 w-5" />
            <span className="text-[10px] font-label font-semibold">Exam</span>
          </Link>

          {/* Study Deck — primary CTA */}
          <Link
            href={`/review/${deckId}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-[10px] bg-primary px-6 py-3 font-label font-bold text-white text-sm shadow-sm shadow-primary/20 hover:bg-primary-dark transition-all"
          >
            <BookOpen className="h-4 w-4" />
            Study deck
          </Link>

          {/* Add cards */}
          <Link
            href={`/study?deckId=${deckId}`}
            className="flex min-w-[60px] flex-col items-center justify-center gap-0.5 rounded-[10px] bg-primary/10 p-2 text-primary hover:bg-primary/20 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span className="text-[10px] font-label font-bold">Add</span>
          </Link>
        </div>
      </div>

      {/* ─── EDIT MODAL ─── */}
      <AnimatePresence>
        {editingCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-text-primary/40 p-4 backdrop-blur-sm"
          >
            <motion.form
              initial={{ scale: 0.96, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              onSubmit={saveCard}
              className="w-full max-w-xl rounded-[16px] border border-border bg-card p-6 shadow-xl"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold">Edit card</h2>
                <button type="button" onClick={() => setEditingCard(null)} className="rounded-full p-2 text-text-secondary hover:bg-background cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <label className="mb-4 block text-xs font-label font-bold uppercase tracking-wider text-text-secondary">
                Front
                <textarea
                  value={draft.front}
                  onChange={(e) => setDraft((d) => ({ ...d, front: e.target.value }))}
                  className="mt-2 min-h-24 w-full rounded-[10px] border border-border bg-background p-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-primary"
                />
              </label>
              <label className="mb-4 block text-xs font-label font-bold uppercase tracking-wider text-text-secondary">
                Back
                <textarea
                  value={draft.back}
                  onChange={(e) => setDraft((d) => ({ ...d, back: e.target.value }))}
                  className="mt-2 min-h-24 w-full rounded-[10px] border border-border bg-background p-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-primary"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-label font-bold uppercase tracking-wider text-text-secondary">
                  Importance
                  <select
                    value={draft.importance}
                    onChange={(e) => setDraft((d) => ({ ...d, importance: e.target.value as Importance }))}
                    className="mt-2 w-full rounded-[10px] border border-border bg-background px-3 py-2.5 text-sm font-normal normal-case tracking-normal outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="core">Core</option>
                    <option value="good_to_know">Good to know</option>
                    <option value="optional">Optional</option>
                  </select>
                </label>
                <label className="block text-xs font-label font-bold uppercase tracking-wider text-text-secondary">
                  Tags
                  <input
                    value={draft.tags}
                    onChange={(e) => setDraft((d) => ({ ...d, tags: e.target.value }))}
                    className="mt-2 w-full rounded-[10px] border border-border bg-background px-3 py-2.5 text-sm font-normal normal-case tracking-normal outline-none focus:border-primary"
                    placeholder="ssl-tls, routing"
                  />
                </label>
              </div>
              <button
                type="submit"
                disabled={isSaving}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-primary px-5 py-3 text-sm font-label font-bold text-white hover:bg-primary-dark transition-all disabled:opacity-70 cursor-pointer"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Flag className="h-4 w-4" />}
                Save card
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
