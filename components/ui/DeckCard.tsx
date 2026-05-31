"use client";

import { MoreVertical, Layers, Edit3, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface DeckCardProps {
  deck: {
    id?: string;
    title: string;
    total: number;
    due?: number;
    mastery: number;
    color: "primary" | "warning" | "success" | string;
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

export function DeckCard({ deck, onEdit, onDelete }: DeckCardProps) {
  const router = useRouter();
  const isError = deck.color === "warning" || deck.mastery < 35;
  const isSecondary = deck.color === "success" || deck.mastery > 80;

  // Brand palette accents
  const accentHex = isError ? "#E24B4A" : isSecondary ? "#1D9E75" : "#5C51E8";
  const accentBg = isError
    ? "bg-[#E24B4A]"
    : isSecondary
    ? "bg-[#1D9E75]"
    : "bg-[#5C51E8]";
  const iconBg = isError
    ? "bg-[#E24B4A]/10 text-[#E24B4A]"
    : isSecondary
    ? "bg-[#1D9E75]/10 text-[#1D9E75]"
    : "bg-[#5C51E8]/10 text-[#5C51E8]";
  const masteryText = isError
    ? "text-[#E24B4A]"
    : isSecondary
    ? "text-[#1D9E75]"
    : "text-[#5C51E8]";

  const handleCardClick = () => {
    if (deck.id) {
      router.push(`/dashboard/decks/${deck.id}`);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.008 }}
      whileTap={{ scale: 0.995 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative flex flex-col h-[210px] w-full select-none cursor-pointer group pt-4"
      onClick={handleCardClick}
    >
      {/* Notebook Folder Tab */}
      <div
        className="absolute top-0.5 left-5 h-4 w-28 bg-card border-t border-x border-border rounded-t-md flex items-center justify-between px-3 transition-colors duration-200 group-hover:border-text-secondary/30 z-0"
      >
        <span className="font-label text-[8px] font-bold tracking-wider text-text-secondary uppercase truncate max-w-16">
          {deck.title.split(" ")[0]}
        </span>
        <div className={`h-1.5 w-1.5 rounded-full ${accentBg}`} />
      </div>

      {/* Card Body */}
      <div
        className="flex-1 bg-card border border-border rounded-large-card shadow-sm group-hover:shadow-md group-hover:border-text-secondary/20 transition-all duration-200 overflow-hidden flex flex-col p-5 relative z-10"
      >
        <div className="flex justify-between items-start mb-3">
          <div className={`w-9 h-9 rounded-[8px] flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${iconBg}`}>
            <Layers className="w-4 h-4" />
          </div>

          {(onEdit || onDelete) ? (
            <div className="flex gap-0.5">
              {onEdit && (
                <button
                  onClick={(e) => { e.stopPropagation(); onEdit(); }}
                  className="rounded-full p-1.5 text-text-secondary hover:bg-background hover:text-primary transition-colors cursor-pointer"
                  aria-label={`Edit ${deck.title}`}
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(); }}
                  className="rounded-full p-1.5 text-text-secondary hover:bg-error-light hover:text-error transition-colors cursor-pointer"
                  aria-label={`Delete ${deck.title}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={(e) => e.stopPropagation()}
              className="text-text-secondary hover:text-text-primary p-1 rounded hover:bg-background transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          )}
        </div>

        <h3 className="font-heading font-semibold text-base text-text-primary mb-0.5 truncate">
          {deck.title}
        </h3>
        <p className="font-body text-xs text-text-secondary mb-auto">
          {deck.total} cards {deck.due !== undefined && `/ ${deck.due} due`}
        </p>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="font-label font-semibold text-[9px] text-text-secondary uppercase tracking-widest">
              Mastery
            </span>
            <span className={`font-label font-bold text-xs ${masteryText}`}>
              {deck.mastery}%
            </span>
          </div>
          <div className="w-full h-[3px] bg-border rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${deck.mastery}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
              className={`h-full rounded-full ${accentBg}`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
