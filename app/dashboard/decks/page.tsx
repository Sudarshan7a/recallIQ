"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Edit3,
  Layers,
  Loader2,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

type Deck = {
  id: number;
  title: string;
  cards: number;
  due: number;
  mastery: number;
  color: "primary" | "warning" | "success";
};

const initialDecks: Deck[] = [
  { id: 1, title: "SSL Fundamentals", cards: 18, due: 6, mastery: 64, color: "primary" },
  { id: 2, title: "Spanish Travel Phrases", cards: 42, due: 12, mastery: 38, color: "warning" },
  { id: 3, title: "Anatomy Basics", cards: 30, due: 0, mastery: 86, color: "success" },
];

function mockLoadDecks() {
  return new Promise<Deck[]>((resolve) => {
    setTimeout(() => resolve(initialDecks), 450);
  });
}

function mockPersistDeck() {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, 500);
  });
}

const accent: Record<Deck["color"], string> = {
  primary: "border-l-primary bg-primary-light text-primary",
  warning: "border-l-warning bg-warning-light text-warning",
  success: "border-l-success bg-success-light text-success",
};

export default function DecksPage() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [editingDeck, setEditingDeck] = useState<Deck | null>(null);
  const [deletingDeck, setDeletingDeck] = useState<Deck | null>(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    mockLoadDecks()
      .then(setDecks)
      .catch(() => setError("Decks could not be loaded."))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredDecks = useMemo(
    () =>
      decks.filter((deck) =>
        deck.title.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [decks, query],
  );

  const openCreate = () => {
    setEditingDeck({ id: 0, title: "", cards: 0, due: 0, mastery: 0, color: "primary" });
    setTitle("");
    setError("");
  };

  const openEdit = (deck: Deck) => {
    setEditingDeck(deck);
    setTitle(deck.title);
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
    await mockPersistDeck();

    if (editingDeck.id === 0) {
      setDecks((current) => [
        {
          id: Date.now(),
          title: title.trim(),
          cards: 0,
          due: 0,
          mastery: 0,
          color: "primary",
        },
        ...current,
      ]);
    } else {
      setDecks((current) =>
        current.map((deck) =>
          deck.id === editingDeck.id ? { ...deck, title: title.trim() } : deck,
        ),
      );
    }

    setIsSaving(false);
    setEditingDeck(null);
  };

  const handleDelete = async () => {
    if (!deletingDeck) return;
    setIsSaving(true);
    await mockPersistDeck();
    setDecks((current) => current.filter((deck) => deck.id !== deletingDeck.id));
    setIsSaving(false);
    setDeletingDeck(null);
  };

  const totalCards = decks.reduce((sum, deck) => sum + deck.cards, 0);
  const avgMastery = decks.length
    ? Math.round(decks.reduce((sum, deck) => sum + deck.mastery, 0) / decks.length)
    : 0;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8 animate-page-in">
      <div className="flex flex-col gap-6 border-b border-border pb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-heading font-bold text-3xl md:text-4xl tracking-tight">
              Your decks
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Create, rename, and retire mock decks before API wiring begins.
            </p>
          </div>
          <button
            onClick={openCreate}
            className="inline-flex items-center justify-center gap-2 rounded-card bg-primary px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-primary-dark active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            New deck
          </button>
        </div>

        <div className="grid grid-cols-3 overflow-hidden rounded-large-card border border-border bg-card shadow-sm">
          {[
            ["Total cards", totalCards],
            ["Decks", decks.length],
            ["Avg mastery", `${avgMastery}%`],
          ].map(([label, value]) => (
            <div key={label} className="border-r border-border p-5 text-center last:border-r-0">
              <span className="font-label text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {label}
              </span>
              <div className="mt-1 font-heading text-3xl font-bold">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-card border border-error/20 bg-error-light p-3 text-sm text-error-dark">
          <AlertTriangle className="h-4 w-4 text-error" />
          {error}
        </div>
      )}

      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-input border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
          placeholder="Search decks..."
        />
      </div>

      {isLoading ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-large-card border border-border bg-card shadow-sm">
          <Loader2 className="mb-4 h-9 w-9 animate-spin text-primary" />
          <p className="font-heading text-xl font-bold">Loading decks</p>
          <p className="mt-1 text-sm text-text-secondary">Reading mock deck data.</p>
        </div>
      ) : filteredDecks.length === 0 ? (
        <section className="flex flex-col items-center justify-center rounded-large-card border border-dashed border-border bg-card/70 px-4 py-14 text-center shadow-sm">
          <Layers className="mb-4 h-12 w-12 text-primary" />
          <h3 className="font-heading text-2xl font-bold">No decks found</h3>
          <p className="mt-2 max-w-sm text-sm text-text-secondary">
            Create a new deck or clear your search to return to the mock library.
          </p>
          <button
            onClick={openCreate}
            className="mt-6 inline-flex items-center gap-2 rounded-card bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary-dark"
          >
            <Plus className="h-4 w-4" />
            Create deck
          </button>
        </section>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredDecks.map((deck) => (
            <article
              key={deck.id}
              className={`rounded-large-card border border-l-4 border-border ${accent[deck.color]} bg-card p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md`}
            >
              <div className="mb-5 flex items-start justify-between gap-3">
                <div className="rounded-input bg-current/10 p-2">
                  <Layers className="h-5 w-5" />
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEdit(deck)}
                    className="rounded-full p-2 text-text-secondary hover:bg-background hover:text-primary"
                    aria-label={`Edit ${deck.title}`}
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeletingDeck(deck)}
                    className="rounded-full p-2 text-text-secondary hover:bg-error-light hover:text-error"
                    aria-label={`Delete ${deck.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <h3 className="font-heading text-lg font-bold text-text-primary">{deck.title}</h3>
              <p className="mt-1 text-sm text-text-secondary">
                {deck.cards} cards / {deck.due} due
              </p>
              <div className="mt-5">
                <div className="mb-1 flex justify-between text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-text-secondary">Mastery</span>
                  <span className="text-text-primary">{deck.mastery}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-pill bg-background">
                  <div className="h-full rounded-pill bg-current" style={{ width: `${deck.mastery}%` }} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {editingDeck && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-text-primary/40 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleSave}
            className="w-full max-w-md rounded-large-card border border-border bg-card p-6 shadow-lg animate-float-up"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold">
                {editingDeck.id === 0 ? "Create deck" : "Edit deck"}
              </h2>
              <button
                type="button"
                onClick={() => setEditingDeck(null)}
                className="rounded-full p-2 text-text-secondary hover:bg-background hover:text-text-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <label className="text-xs font-bold uppercase tracking-wider text-text-secondary">
              Deck title
            </label>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 w-full rounded-input border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              placeholder="e.g. Organic Chemistry"
              autoFocus
            />
            <button
              type="submit"
              disabled={isSaving}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-card bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary-dark disabled:opacity-70"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
              {isSaving ? "Saving..." : "Save deck"}
            </button>
          </form>
        </div>
      )}

      {deletingDeck && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-text-primary/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-large-card border border-border bg-card p-6 text-center shadow-lg animate-float-up">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-error-light text-error">
              <Trash2 className="h-5 w-5" />
            </div>
            <h2 className="font-heading text-xl font-bold">Delete deck?</h2>
            <p className="mt-2 text-sm text-text-secondary">
              This removes "{deletingDeck.title}" from the mock list.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => setDeletingDeck(null)}
                className="rounded-card border border-border bg-card px-4 py-3 text-sm font-bold hover:bg-background"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isSaving}
                className="inline-flex items-center justify-center gap-2 rounded-card bg-error px-4 py-3 text-sm font-bold text-white hover:bg-error-dark disabled:opacity-70"
              >
                {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
