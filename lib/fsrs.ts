import {
  createEmptyCard,
  fsrs,
  generatorParameters,
  Rating,
  State,
} from "ts-fsrs";
import type { Grade } from "ts-fsrs";

const params = generatorParameters({ enable_fuzz: true });
const f = fsrs(params);

export { Rating, State };

export function getEmptyCardState() {
  return createEmptyCard();
}

export function scheduleReview(
  card: {
    due: Date;
    stability: number;
    difficulty: number;
    elapsed_days: number;
    scheduled_days: number;
    learning_steps?: number;
    reps: number;
    lapses: number;
    state: State;
    last_review?: Date;
  },
  rating: Rating,
) {
  // Ensure the input always matches ts-fsrs Card requirements.
  const normalizedCard = {
    ...createEmptyCard(card.due),
    ...card,
    learning_steps: card.learning_steps ?? 0,
  };

  const isGrade =
    rating === Rating.Again ||
    rating === Rating.Hard ||
    rating === Rating.Good ||
    rating === Rating.Easy;

  const grade: Grade = isGrade ? rating : Rating.Good;
  const { card: scheduled, log: reviewLog } = f.next(
    normalizedCard,
    new Date(),
    grade,
  );

  return {
    due: scheduled.due,
    stability: scheduled.stability,
    difficulty: scheduled.difficulty,
    elapsed_days: scheduled.elapsed_days,
    scheduled_days: scheduled.scheduled_days,
    reps: scheduled.reps,
    lapses: scheduled.lapses,
    state: scheduled.state,
    reviewLog,
  };
}
