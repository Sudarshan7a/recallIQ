import type { InferInsertModel } from "drizzle-orm";

import { cards, decks, importanceEnum, users } from "@/db/schema";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

type RegisterInput = Pick<
  InferInsertModel<typeof users>,
  "name" | "email" | "password"
>;
type LoginInput = Pick<InferInsertModel<typeof users>, "email" | "password">;
type DeckInput = Pick<
  InferInsertModel<typeof decks>,
  "name" | "description" | "domain"
>;
type DeckUpdateInput = Partial<DeckInput>;
type CardUpdateInput = Partial<
  Pick<
    InferInsertModel<typeof cards>,
    "front" | "back" | "importance" | "tags" | "sourceText"
  >
>;
type CardImportance = (typeof importanceEnum.enumValues)[number];
type GenerateInput = {
  text: string;
  deck_id: string;
  domain?: string | null;
};
type SaveCardsInput = {
  cards: Array<
    Pick<
      InferInsertModel<typeof cards>,
      "front" | "back" | "importance" | "tags" | "sourceText"
    >
  >;
  deck_id: string;
};
type ReviewInput = {
  card_id: string;
  rating: number;
};
type QueryParams = Record<string, string>;

async function request(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("recalliq_token");
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (res.status === 401) {
    localStorage.removeItem("recalliq_token");
    window.location.href = "/login";
  }
  return res.json();
}

export const api = {
  // Auth
  register: (data: RegisterInput) =>
    request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  login: (data: LoginInput) =>
    request("/api/auth/login", { method: "POST", body: JSON.stringify(data) }),
  logout: () => request("/api/auth/logout", { method: "POST" }),
  me: () => request("/api/auth/me"),

  // Decks
  getDecks: () => request("/api/decks"),
  createDeck: (data: DeckInput) =>
    request("/api/decks", { method: "POST", body: JSON.stringify(data) }),
  getDeck: (id: string) => request(`/api/decks/${id}`),
  updateDeck: (id: string, data: DeckUpdateInput) =>
    request(`/api/decks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteDeck: (id: string) => request(`/api/decks/${id}`, { method: "DELETE" }),

  // Cards
  getCards: (params: QueryParams) =>
    request(`/api/cards?${new URLSearchParams(params)}`),
  updateCard: (id: string, data: CardUpdateInput) =>
    request(`/api/cards/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteCard: (id: string) => request(`/api/cards/${id}`, { method: "DELETE" }),
  updateImportance: (id: string, importance: CardImportance) =>
    request(`/api/cards/${id}/importance`, {
      method: "PATCH",
      body: JSON.stringify({ importance }),
    }),

  // Generate
  generateCards: (data: GenerateInput) =>
    request("/api/generate", { method: "POST", body: JSON.stringify(data) }),
  saveCards: (data: SaveCardsInput) =>
    request("/api/generate/save", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Review
  submitReview: (data: ReviewInput) =>
    request("/api/review", { method: "POST", body: JSON.stringify(data) }),
  getSession: (params: QueryParams) =>
    request(`/api/review/session?${new URLSearchParams(params)}`),
  getDueCards: () => request("/api/review/session"),
  reviewCard: (cardId: string, rating: number) =>
    request("/api/review", {
      method: "POST",
      body: JSON.stringify({ cardId, rating }),
    }),

  // Cards by deck
  getDeckCards: (deckId: string) => request(`/api/cards?deckId=${deckId}`),

  // Stats
  getStats: () => request("/api/stats"),

  // Profile
  getProfile: () => request("/api/auth/me"),
};
