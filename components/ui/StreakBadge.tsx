import { Flame, Trophy, Snowflake } from "lucide-react";

type StreakState = "active" | "broken" | "at-risk" | "freeze";
type StreakSize = "sm" | "md" | "lg";

interface StreakBadgeProps {
  days: number;
  state?: StreakState;
  size?: StreakSize;
}

export function StreakBadge({
  days,
  state = "active",
  size = "md",
}: StreakBadgeProps) {
  // Determine sizing classes
  const sizeClasses = {
    sm: "h-[28px] px-2.5 text-xs",
    md: "h-[36px] px-4 text-sm",
    lg: "h-[44px] px-5 text-base",
  }[size];

  const iconSize =
    size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4";

  // Determine Milestone overrides
  let isMilestone = false;
  let milestoneClass = "";
  let Icon = Flame;

  if (state === "active") {
    if (days >= 100) {
      isMilestone = true;
      Icon = Trophy;
      milestoneClass =
        "bg-gradient-to-r from-primary-dark to-primary text-white shadow-[0_0_12px_rgba(92,81,232,0.6)] border-none";
    } else if (days >= 30) {
      isMilestone = true;
      milestoneClass =
        "bg-gradient-to-r from-tertiary to-error text-white shadow-sm border-none";
    } else if (days >= 7) {
      isMilestone = true;
      milestoneClass = "bg-secondary text-white shadow-sm border-none";
    }
  }

  // Determine standard state classes
  const stateClasses = {
    active:
      "bg-primary text-white shadow-[0_4px_8px_rgba(92,81,232,0.2)] border border-primary/10", // Soft indigo glow
    broken:
      "bg-surface-variant text-text-secondary border border-border grayscale",
    "at-risk": "bg-tertiary-light text-tertiary border border-tertiary/30",
    freeze: "bg-primary-light text-primary border border-primary/20",
  }[state];

  // Apply Freeze icon override
  if (state === "freeze") Icon = Snowflake;

  const appliedClasses = isMilestone ? milestoneClass : stateClasses;

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-pill font-label font-semibold transition-all duration-300 ${sizeClasses} ${appliedClasses}`}
    >
      <Icon
        className={`${iconSize} ${state === "broken" ? "opacity-50" : "fill-current"}`}
      />

      <span className="font-heading font-bold flex items-center gap-1">
        <span className={state === "broken" ? "line-through opacity-70" : ""}>
          {days}
          {size !== "sm" && " days"}
        </span>
        {size === "sm" && "d"}
      </span>

      {state === "freeze" && size !== "sm" && (
        <span className="ml-1 font-body font-normal text-[10px] uppercase tracking-wider opacity-80">
          Freeze
        </span>
      )}
    </div>
  );
}
