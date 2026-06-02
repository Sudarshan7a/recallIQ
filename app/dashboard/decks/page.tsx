"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Layers,
  Loader2,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DeckCard } from "@/components/ui/DeckCard";

type Deck = {
  id: string;
  name: string;
  description?: string | null;
  domain?: string | null;
  cardCount: number;
  dueCount: number;
};

// Custom CountUp hook with ease-out quad animation starting from current value
function useCountUp(target: number, duration: number = 850) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const start = value;
    const end = target;
    if (start === end) return;

    const totalMilliseconds = duration;
    const startTime = performance.now();

    function update(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / totalMilliseconds, 1);
      const easeProgress = progress * (2 - progress);
      const current = Math.floor(easeProgress * (end - start) + start);
      
      setValue(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return value;
}

export default function DecksPage() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [editingDeck, setEditingDeck] = useState<Deck | null>(null);
  const [deletingDeck, setDeletingDeck] = useState<Deck | null>(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const calculateMastery = (cardCount: number, dueCount: number) => {
    if (!cardCount) return 0;
    return Math.round(((cardCount - dueCount) / cardCount) * 100);
  };

  useEffect(() => {
    fetch("/api/decks")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to load decks");
        setDecks(data.decks || []);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Decks could not be loaded.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredDecks = useMemo(
    () =>
      decks.filter((deck) =>
        deck.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [decks, query],
  );

  const openCreate = () => {
    setEditingDeck({ id: "", name: "", cardCount: 0, dueCount: 0 });
    setTitle("");
    setError("");
  };

  const openEdit = (deck: Deck) => {
    setEditingDeck(deck);
    setTitle(deck.name);
    setError("");
  };

  const handleSave = async (event: FormEvent) => {
    event.preventDefault();
    if (!editingDeck) return;
    if (!title.trim()) {
      setError("Deck title is required.");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      if (editingDeck.id === "") {
        // Create
        const res = await fetch("/api/decks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: title.trim(), description: "", domain: "general" }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to create deck");
        
        const newDeck: Deck = {
          ...data.deck,
          cardCount: 0,
          dueCount: 0,
        };
        setDecks((current) => [newDeck, ...current]);
      } else {
        // Update
        const res = await fetch(`/api/decks/${editingDeck.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: title.trim() }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to update deck");

        setDecks((current) =>
          current.map((deck) =>
            deck.id === editingDeck.id ? { ...deck, name: data.deck.name } : deck,
          ),
        );
      }
      setEditingDeck(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The deck could not be saved. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingDeck) return;
    setIsSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/decks/${deletingDeck.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to delete deck");

      setDecks((current) => current.filter((deck) => deck.id !== deletingDeck.id));
      setDeletingDeck(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The deck could not be deleted. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const totalCards = decks.reduce((sum, deck) => sum + (deck.cardCount || 0), 0);
  const avgMastery = decks.length
    ? Math.round(
        decks.reduce((sum, deck) => sum + calculateMastery(deck.cardCount || 0, deck.dueCount || 0), 0) /
          decks.length
      )
    : 0;

  // Running count ups for dashboard stats
  const animatedTotalCards = useCountUp(totalCards);
  const animatedDecksCount = useCountUp(decks.length);
  const animatedAvgMastery = useCountUp(avgMastery);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8 animate-page-in">
      <div className="flex flex-col gap-6 border-b border-border pb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-heading font-bold text-3xl md:text-4xl tracking-tight">
              Your decks
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Create, rename, and manage your spaced repetition study decks.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={openCreate}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white hover:bg-primary-dark px-4 py-2.5 text-xs font-semibold shadow-sm cursor-pointer transition-all"
          >
            <Plus className="h-4 w-4" />
            New deck
          </motion.button>
        </div>

        <div className="grid grid-cols-3 overflow-hidden rounded-large-card border border-border bg-card shadow-sm">
          <div className="border-r border-border p-5 text-center">
            <span className="font-label text-[9px] font-semibold uppercase tracking-widest text-text-secondary">
              Total cards
            </span>
            <div className="mt-1 font-heading text-2xl font-bold tracking-tight text-text-primary tabular-nums">{animatedTotalCards}</div>
          </div>
          <div className="border-r border-border p-5 text-center">
            <span className="font-label text-[9px] font-semibold uppercase tracking-widest text-text-secondary">
              Decks
            </span>
            <div className="mt-1 font-heading text-2xl font-bold tracking-tight text-text-primary tabular-nums">{animatedDecksCount}</div>
          </div>
          <div className="p-5 text-center">
            <span className="font-label text-[9px] font-semibold uppercase tracking-widest text-text-secondary">
              Avg mastery
            </span>
            <div className="mt-1 font-heading text-2xl font-bold tracking-tight text-primary tabular-nums">{animatedAvgMastery}%</div>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-error/20 bg-error-light p-3 text-xs text-error-dark animate-float-up animate-in">
          <AlertTriangle className="h-4 w-4 text-error shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-lg border border-zinc-200/60 dark:border-zinc-800/60 bg-card py-2 pl-9 pr-4 text-xs outline-none focus:border-zinc-350 dark:focus:border-zinc-700 focus:ring-1 focus:ring-zinc-250/20 dark:focus:ring-zinc-750/20 transition-all text-text-primary placeholder:text-text-secondary/50"
          placeholder="Search decks..."
        />
      </div>

      {isLoading ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-large-card border border-zinc-200/60 dark:border-zinc-800/60 bg-card shadow-sm">
          <Loader2 className="mb-3 h-8 w-8 animate-spin text-primary" />
          <p className="font-sans font-semibold text-lg text-text-primary">Loading decks</p>
          <p className="mt-1 text-xs text-text-secondary">Reading your library data.</p>
        </div>
      ) : filteredDecks.length === 0 ? (
        <section className="flex flex-col items-center justify-center rounded-large-card border border-dashed border-zinc-250 dark:border-zinc-800 bg-card/60 px-4 py-12 text-center shadow-sm">
          <Layers className="mb-4 h-10 w-10 text-zinc-400" />
          <h3 className="font-sans font-semibold text-xl text-text-primary">No decks found</h3>
          <p className="mt-1.5 max-w-sm text-xs text-text-secondary">
            Create a new deck or clear your search to return to your library.
          </p>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={openCreate}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary text-white hover:bg-primary-dark px-5 py-2.5 text-xs font-semibold cursor-pointer shadow-sm transition-all"
          >
            <Plus className="h-4 w-4" />
            Create deck
          </motion.button>
        </section>
      ) : (
        <motion.div
          layout
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.05 } }
          }}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredDecks.map((deck) => {
            const mastery = calculateMastery(deck.cardCount || 0, deck.dueCount || 0);
            return (
              <motion.div
                layout
                key={deck.id}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                }}
              >
                <DeckCard
                  deck={{
                    id: deck.id,
                    title: deck.name,
                    total: deck.cardCount || 0,
                    due: deck.dueCount || 0,
                    mastery,
                    color: mastery < 35 ? "warning" : mastery > 80 ? "success" : "primary",
                  }}
                  onEdit={() => openEdit(deck)}
                  onDelete={() => setDeletingDeck(deck)}
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* CREATE / EDIT MODAL */}
      <AnimatePresence>
        {editingDeck && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-sm"
          >
            <motion.form
              initial={{ scale: 0.96, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              onSubmit={handleSave}
              className="w-full max-w-md rounded-large-card border border-zinc-200/60 dark:border-zinc-800/60 bg-card p-6 shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-sans font-semibold text-base text-text-primary">
                  {editingDeck.id === "" ? "Create deck" : "Edit deck"}
                </h2>
                <button
                  type="button"
                  onClick={() => setEditingDeck(null)}
                  className="rounded-md p-1 text-text-secondary hover:bg-neutral-100 dark:hover:bg-neutral-805 hover:text-text-primary transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <label className="text-[9px] font-bold uppercase tracking-widest text-text-secondary">
                Deck title
              </label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="mt-2 w-full rounded-lg border border-zinc-250/60 dark:border-zinc-800/60 bg-background px-3 py-2.5 text-xs outline-none focus:border-zinc-350 dark:focus:border-zinc-700 focus:ring-1 focus:ring-zinc-250/20 dark:focus:ring-zinc-750/20 transition-all text-text-primary"
                placeholder="e.g. Organic Chemistry"
                autoFocus
              />
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isSaving}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary text-white hover:bg-primary-dark px-5 py-2.5 text-xs font-semibold shadow-sm disabled:opacity-70 cursor-pointer transition-all"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                {isSaving ? "Saving..." : "Save deck"}
              </motion.button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE MODAL */}
      <AnimatePresence>
        {deletingDeck && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.96, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="w-full max-w-sm rounded-large-card border border-zinc-200/60 dark:border-zinc-800/60 bg-card p-6 text-center shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
            >
              <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/20 text-red-500">
                <Trash2 className="h-4.5 w-4.5" />
              </div>
              <h2 className="font-sans font-semibold text-base text-text-primary">Delete deck?</h2>
              <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">
                This permanently deletes &quot;{deletingDeck.name}&quot; and all of its cards from the database.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setDeletingDeck(null)}
                  className="rounded-lg border border-zinc-200/60 dark:border-zinc-800/60 bg-card px-4 py-2 text-xs font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-900 cursor-pointer"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleDelete}
                  disabled={isSaving}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:bg-zinc-400 px-4 py-2 text-xs font-semibold cursor-pointer shadow-sm"
                >
                  {isSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
