/* eslint-disable @typescript-eslint/no-unused-vars */
﻿import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  real,
  integer,
  pgEnum,
  jsonb,
} from "drizzle-orm/pg-core";

export const importanceEnum = pgEnum("importance", [
  "core",
  "good_to_know",
  "optional",
]);

export const stateEnum = pgEnum("card_state", [
  "new",
  "learning",
  "review",
  "suspended",
]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  desiredRetention: real("desired_retention").default(0.9),
  xp: integer("xp").default(0),
  streak: integer("streak").default(0),
  lastStudiedAt: timestamp("last_studied_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const decks = pgTable("decks", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  domain: varchar("domain", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const cards = pgTable("cards", {
  id: uuid("id").defaultRandom().primaryKey(),
  deckId: uuid("deck_id")
    .notNull()
    .references(() => decks.id, { onDelete: "cascade" }),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  front: text("front").notNull(),
  back: text("back").notNull(),
  importance: importanceEnum("importance").default("good_to_know"),
  tags: text("tags").array().default([]),
  sourceText: text("source_text"),
  state: stateEnum("state").default("new"),
  dueDate: timestamp("due_date").defaultNow(),
  stability: real("stability").default(0),
  difficulty: real("difficulty").default(0),
  retrievability: real("retrievability").default(0),
  reps: integer("reps").default(0),
  lapses: integer("lapses").default(0),
  lastReviewedAt: timestamp("last_reviewed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const revlog = pgTable("revlog", {
  id: uuid("id").defaultRandom().primaryKey(),
  cardId: uuid("card_id")
    .notNull()
    .references(() => cards.id, { onDelete: "cascade" }),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  elapsedDays: real("elapsed_days").default(0),
  scheduledDays: real("scheduled_days").default(0),
  reviewTime: timestamp("review_time").defaultNow(),
});
