"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, Folder, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface SearchDeck {
  id: string;
  name: string;
  description: string | null;
  domain: string | null;
}

interface SearchCard {
  id: string;
  front: string;
  back: string;
  importance: string;
  deck_id: string;
  deckName: string;
}

interface SearchResults {
  decks: SearchDeck[];
  cards: SearchCard[];
}

export function GlobalSearch() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>({ decks: [], cards: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openSearch = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const closeSearch = () => {
    setIsOpen(false);
    setQuery("");
    setResults({ decks: [], cards: [] });
    setIsLoading(false);
    setError("");
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    if (val.trim().length >= 2) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setResults({ decks: [], cards: [] });
    }
  };

  // Debounced search logic
  useEffect(() => {
    if (query.trim().length < 2) {
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setError("");
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to fetch results");
        setResults(data);
      } catch (err) {
        console.error(err);
        setError("Error fetching search results");
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Click outside listener to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        closeSearch();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Escape key to close
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeSearch();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleResultClick = (url: string) => {
    closeSearch();
    router.push(url);
  };

  const showDropdown = isOpen && (query.trim().length > 0 || results.decks.length > 0 || results.cards.length > 0);

  return (
    <div ref={searchRef} className="relative z-50 flex items-center">
      {/* Desktop Toggle / Inline input container */}
      <div className="hidden md:flex items-center">
        <AnimatePresence initial={false}>
          {isOpen ? (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 260, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              className="relative flex items-center"
            >
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Search decks and cards..."
                className="w-full bg-background border border-border rounded-full py-1.5 pl-9 pr-8 text-xs text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/25 placeholder:text-text-secondary/60"
              />
              <Search className="absolute left-3 w-3.5 h-3.5 text-text-secondary/60" />
              {query && (
                <button
                  onClick={() => handleQueryChange("")}
                  className="absolute right-8 p-0.5 rounded-full hover:bg-border text-text-secondary/60 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={closeSearch}
                className="absolute right-3 p-0.5 rounded-full hover:bg-border text-text-secondary cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ) : (
            <button
              onClick={openSearch}
              className="p-2 rounded-full border border-border bg-card text-text-secondary hover:text-primary hover:border-primary/40 transition-all cursor-pointer flex items-center justify-center"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Toggle Button */}
      <div className="md:hidden flex">
        <button
          onClick={openSearch}
          className="p-2 rounded-full border border-border bg-card text-text-secondary hover:text-primary hover:border-primary/40 transition-all cursor-pointer flex items-center justify-center"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Mobile Fullscreen Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed inset-x-0 top-0 bg-card border-b border-border shadow-lg p-4 z-50 flex flex-col gap-3"
            >
              <div className="flex items-center gap-2">
                <div className="relative flex-1 flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => handleQueryChange(e.target.value)}
                    placeholder="Search decks and cards..."
                    className="w-full bg-background border border-border rounded-full py-2 pl-10 pr-8 text-sm text-text-primary focus:outline-none focus:border-primary"
                  />
                  <Search className="absolute left-3.5 w-4 h-4 text-text-secondary/60" />
                  {query && (
                    <button
                      onClick={() => handleQueryChange("")}
                      className="absolute right-3 p-0.5 rounded-full hover:bg-border text-text-secondary/60 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <button
                  onClick={closeSearch}
                  className="p-2 rounded-full hover:bg-background text-text-secondary cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SEARCH RESULTS DROPDOWN */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute top-full right-0 mt-2 w-72 md:w-96 bg-card border border-border rounded-large-card shadow-lg overflow-hidden max-h-[400px] overflow-y-auto scrollbar-thin z-50"
          >
            {isLoading ? (
              <div className="p-8 flex flex-col items-center justify-center gap-2 text-text-secondary">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <span className="text-xs">Searching...</span>
              </div>
            ) : error ? (
              <div className="p-6 text-center text-xs text-error font-sans">{error}</div>
            ) : query.trim().length < 2 ? (
              <div className="p-6 text-center text-xs text-text-secondary italic">
                Type at least 2 characters to search...
              </div>
            ) : results.decks.length === 0 && results.cards.length === 0 ? (
              <div className="p-6 text-center text-xs text-text-secondary">
                No results for &ldquo;{query}&rdquo;
              </div>
            ) : (
              <div className="py-2 divide-y divide-border">
                {/* Decks Section */}
                {results.decks.length > 0 && (
                  <div className="py-2 px-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary px-2 block mb-1">
                      Decks
                    </span>
                    <div className="space-y-0.5">
                      {results.decks.map((deck) => (
                        <button
                          key={deck.id}
                          onClick={() => handleResultClick(`/dashboard/decks/${deck.id}`)}
                          className="w-full text-left p-2 hover:bg-background rounded-lg flex items-start gap-2.5 transition-colors cursor-pointer group"
                        >
                          <Folder className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors truncate">
                              {deck.name}
                            </div>
                            {deck.description && (
                              <div className="text-[10px] text-text-secondary truncate">
                                {deck.description}
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cards Section */}
                {results.cards.length > 0 && (
                  <div className="py-2 px-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary px-2 block mb-1">
                      Cards
                    </span>
                    <div className="space-y-0.5">
                      {results.cards.map((card) => (
                        <button
                          key={card.id}
                          onClick={() =>
                            handleResultClick(`/dashboard/decks/${card.deck_id}?cardId=${card.id}`)
                          }
                          className="w-full text-left p-2 hover:bg-background rounded-lg flex items-start gap-2.5 transition-colors cursor-pointer group"
                        >
                          <FileText className="w-4 h-4 text-success shrink-0 mt-0.5" />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-text-primary group-hover:text-primary transition-colors truncate">
                              {card.front}
                            </div>
                            <div className="text-[10px] text-text-secondary truncate mt-0.5">
                              {card.back}
                            </div>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-[8px] font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.2 rounded">
                                {card.deckName}
                              </span>
                              <span className="text-[8px] font-semibold text-text-secondary">
                                {card.importance}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
