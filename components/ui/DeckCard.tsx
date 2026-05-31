import { MoreVertical, Layers } from "lucide-react";

interface DeckCardProps {
  deck: {
    title: string;
    total: number;
    due: number;
    mastery: number;
    color: string;
    needsAttention?: boolean;
    mastered?: boolean;
  };
}

export function DeckCard({ deck }: DeckCardProps) {
  // Determine state styling based on mastery and needsAttention
  const isError = deck.needsAttention || deck.mastery < 35;
  const isSecondary = deck.mastered || deck.mastery > 80;

  return (
    <div className="bg-card border border-border rounded-large-card shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col h-[220px] relative overflow-hidden group">
      {/* Dynamic border accent */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${isError ? "bg-error" : isSecondary ? "bg-secondary" : "bg-primary"}`}
      />

      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div
            className={`w-10 h-10 rounded-input flex items-center justify-center ${isError ? "bg-error-light text-error" : "bg-primary-light text-primary"}`}
          >
            <Layers className="w-5 h-5" />
          </div>
          <button className="text-text-secondary hover:text-text-primary">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <h3 className="font-heading font-bold text-lg text-text-primary mb-1 truncate">
          {deck.title}
        </h3>
        <p className="font-body text-xs text-text-secondary mb-auto">
          {deck.total} cards
        </p>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="font-label text-[10px] text-text-secondary uppercase">
              Mastery
            </span>
            <span
              className={`font-label font-bold text-[10px] ${isError ? "text-error" : "text-secondary"}`}
            >
              {deck.mastery}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-background rounded-pill overflow-hidden">
            <div
              className={`h-full rounded-pill ${isError ? "bg-error" : "bg-secondary"}`}
              style={{ width: `${deck.mastery}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
