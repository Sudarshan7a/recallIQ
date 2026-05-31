interface XPBarProps {
  currentXP: number;
  targetXP: number;
  size?: "thin" | "standard";
  state?: "normal" | "completed" | "overflow" | "bonus";
  showLabels?: boolean;
}

export function XPBar({
  currentXP,
  targetXP,
  size = "standard",
  state = "normal",
  showLabels = true,
}: XPBarProps) {
  // Calculate percentage (cap at 100 unless overflow is explicitly handled visually)
  const percentage = Math.min(Math.round((currentXP / targetXP) * 100), 100);

  // Determine sizing
  const heightClass = size === "thin" ? "h-[4px]" : "h-[6px]";

  // Determine fill colors based on state
  let fillClass = "bg-primary";
  if (state === "completed" || percentage >= 100) {
    fillClass = "bg-secondary"; // Success Teal
  } else if (state === "overflow") {
    fillClass = "bg-secondary-light border-r-2 border-secondary";
  } else if (state === "bonus") {
    fillClass =
      "bg-gradient-to-r from-primary via-tertiary to-primary animate-pulse"; // Amber shimmer
  }

  return (
    <div className="w-full flex flex-col gap-1.5">
      {/* Optional Top Labels */}
      {showLabels && (
        <div className="flex justify-between items-end">
          <span className="font-label font-semibold text-[10px] text-text-secondary uppercase tracking-wider">
            XP Progress
          </span>
          <span className="font-heading font-bold text-xs text-text-primary">
            {currentXP}{" "}
            <span className="text-text-secondary font-medium font-body">
              / {targetXP}
            </span>
          </span>
        </div>
      )}

      {/* Progress Track (Accessible) */}
      <div
        className={`w-full bg-primary-light dark:bg-[#2C2C2A] rounded-pill overflow-hidden ${heightClass}`}
        role="progressbar"
        aria-valuenow={currentXP}
        aria-valuemin={0}
        aria-valuemax={targetXP}
      >
        {/* Spring-loaded fill extension */}
        <div
          className={`h-full rounded-pill transition-all duration-700 ease-out ${fillClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Goal Hit Celebration Text */}
      {(state === "completed" || percentage >= 100) && showLabels && (
        <p className="font-label font-semibold text-[10px] text-secondary text-right mt-0.5">
          Weekly goal reached! 🎉
        </p>
      )}
    </div>
  );
}
