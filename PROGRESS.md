# RecallIQ — Project Progress

## Project Overview
RecallIQ is an AI-powered spaced-repetition study app built with Next.js and PostgreSQL. It converts pasted notes into flashcards via AI, stores decks and cards in Postgres (Drizzle ORM), schedules reviews with an FSRS implementation, and tracks XP and streaks for users.

## Tech Stack
- Next.js: 16.2.6 — app framework and frontend SSR/SSG.
- React: 19.2.4 — UI library.
- TypeScript: ^5 — static typing.
- Tailwind CSS: ^4 (via `@tailwindcss/postcss`) — styling.
- Framer Motion: 12.40.0 — animations and micro-interactions.
- Drizzle ORM: drizzle-orm ^0.45.2, drizzle-kit ^0.31.10 — DB schema and migrations.
- PostgreSQL (`pg` ^8.21.0) — primary database.
- ts-fsrs: ^5.4.1 — FSRS scheduling algorithm wrapper.
- @google/genai ^2.6.0 and groq-sdk ^1.2.1 — AI providers (Gemini primary, Groq fallback).
- bcryptjs ^3.0.3 — password hashing.
- jsonwebtoken ^9.0.3 — JWT handling.
- canvas-confetti ^1.9.4 — confetti UX on session completion.
- dev tooling: pnpm, eslint, tailwind/postcss.

All versions are taken directly from `package.json`.

## Database
Four main tables defined in `db/schema/index.ts` (Drizzle schema). The schema matches the SQL migration `db/migrations/0000_friendly_nightmare.sql` and metadata in `db/migrations/meta/0000_snapshot.json`.

- `users`
  - id: uuid (PK)
  - name: varchar(100)
  - email: varchar(255) UNIQUE
  - password: text (bcrypt hash)
  - desired_retention: real DEFAULT 0.9
  - xp: integer DEFAULT 0
  - streak: integer DEFAULT 0
  - last_studied_at: timestamp
  - created_at: timestamp DEFAULT now()

- `decks`
  - id: uuid (PK)
  - user_id: uuid (FK -> users.id)
  - name: varchar(100)
  - description: text
  - domain: varchar(50)
  - created_at: timestamp DEFAULT now()

- `cards`
  - id: uuid (PK)
  - deck_id: uuid (FK -> decks.id)
  - user_id: uuid (FK -> users.id)
  - front: text
  - back: text
  - importance: enum('core','good_to_know','optional') DEFAULT 'good_to_know'
  - tags: text[] DEFAULT []
  - source_text: text
  - state: enum('new','learning','review','suspended') DEFAULT 'new'
  - due_date: timestamp DEFAULT now()
  - stability: real DEFAULT 0
  - difficulty: real DEFAULT 0
  - retrievability: real DEFAULT 0
  - reps: integer DEFAULT 0
  - lapses: integer DEFAULT 0
  - last_reviewed_at: timestamp
  - created_at: timestamp DEFAULT now()

- `revlog`
  - id: uuid (PK)
  - card_id: uuid (FK -> cards.id)
  - user_id: uuid (FK -> users.id)
  - rating: integer (1-4)
  - elapsed_days: real DEFAULT 0
  - scheduled_days: real DEFAULT 0
  - review_time: timestamp DEFAULT now()

Migrations: there is a generated migration file and a migration journal entry at `db/migrations/meta/_journal.json`. The repository contains migration files, but whether they have been applied to a running database cannot be determined from the code alone.

## Backend — API Routes
All API routes live under `app/api`. Authentication is cookie/JWT-based (see `lib/auth.ts`) and server helpers read the token from the `Authorization` header or `token` cookie (`lib/middleware.ts`). Status denotes presence and apparent completeness of implementation in the repo.

- `POST /api/auth/register` — registers a user, hashes password, returns user + JWT token and sets `token` cookie. Status: ✅ Complete. Notes: sets httpOnly cookie, uses `JWT_SECRET` env.
- `POST /api/auth/login` — verifies credentials, returns user + token, sets cookie. Status: ✅ Complete.
- `POST /api/auth/logout` — clears cookie and returns success. Status: ✅ Complete.
- `GET /api/auth/me` — returns current user profile (id, name, email, xp, streak, desiredRetention). Status: ✅ Complete.

- `GET /api/decks` — list decks for current user (includes counts). Status: ✅ Complete.
- `POST /api/decks` — create deck. Status: ✅ Complete.
- `GET /api/decks/:id` — get deck and its cards. Status: ✅ Complete.
- `PATCH /api/decks/:id` — update deck (name/description/domain). Status: ✅ Complete.
- `DELETE /api/decks/:id` — delete deck (cascades to cards). Status: ✅ Complete.

- `GET /api/cards` — list cards with filters (deck_id, importance, tag, due_today). Status: ✅ Complete.
- `GET /api/cards/:id` — get single card. Status: ✅ Complete.
- `PATCH /api/cards/:id` — update card fields (front/back/importance/state/tags). Status: ✅ Complete.
- `DELETE /api/cards/:id` — delete card. Status: ✅ Complete.
- `PATCH /api/cards/:id/importance` — quick importance update used in review. Status: ✅ Complete.

- `POST /api/generate` — generates flashcards from text or prompt using Gemini primary and Groq fallback. Returns preview (cards). Status: ✅ Complete. Notes: catches 503 and routes to Groq.
- `POST /api/generate/save` — saves generated cards to DB for a deck. Status: ✅ Complete.

- `POST /api/review` — accepts a rating for a card, runs FSRS scheduling (`lib/fsrs.ts`), updates card, inserts a `revlog` entry, updates user XP and streak. Status: ✅ Complete.
- `GET /api/review/session` — returns due cards for the user (supports deck filter, mode=exam for core cards, limit). Status: ✅ Complete.

- `GET /api/stats` — aggregates dashboard stats (streak, xp, cards reviewed today, counts, heatmap, weak spots). Status: ✅ Complete.

Known issues / caveats:
- All endpoints rely on `DATABASE_URL` and `JWT_SECRET` environment variables; missing envs will break server startup/runtime.
- No explicit rate limiting for AI `/api/generate` is present in code — a 503 fallback to Groq is implemented, but throttling/rate limiting is not.

## Frontend — Screens
All UI is in the `app/` directory (Next.js App Router). Below are the screens present and their status.

- `/` — [app/page.tsx]: Landing page. Shows marketing copy and static preview. Status: ✅ Complete.
- `/login` — [app/login/page.tsx]: Login form; posts to `/api/auth/login`. Status: ✅ Complete.
- `/register` — [app/register/page.tsx]: Registration form; posts to `/api/auth/register`. Status: ✅ Complete.
- `/onboarding` — [app/onboarding/*]: Welcome flow with `/onboarding`, `/onboarding/domain`, `/onboarding/goal`. Status: ✅ Complete (client-only flows, navigational).
- `/dashboard` — [app/dashboard/page.tsx] (wrapped by [app/dashboard/layout.tsx]): Dashboard with stats and action CTAs. Status: ✅ Complete. Connects to `/api/stats` and `/api/decks`.
- `/dashboard/decks` — [app/dashboard/decks/page.tsx]: Decks list, create/edit/delete wired to `/api/decks`. Status: ✅ Complete.
- `/dashboard/decks/[deckId]` — [app/dashboard/decks/[deckId]/page.tsx]: Deck detail page showing cards, allows editing cards (PATCH `/api/cards/:id`) and delete (DELETE `/api/cards/:id`). Status: ✅ Complete.
- `/dashboard/stats` — [app/dashboard/stats/page.tsx]: Visual stats and charts (mocked-ish UI reading from client state; expects `/api/stats` upstream where required). Status: ✅ Complete (UI implemented).
- `/study` (Add content) — [app/study/page.tsx] (also re-exported by `/add-content`): paste text → POST `/api/generate` → preview → POST `/api/generate/save`. Status: ✅ Complete and wired.
- `/review` — [app/review/[[...deckId]]/page.tsx]: Review session UI; loads `/api/review/session` and POSTs ratings to `/api/review`. Implements interactions, keyboard shortcuts, animations, XP popups, and confetti. Status: ✅ Complete and wired.
- `/dashboard/settings` — [app/dashboard/settings/*]: Settings UI is implemented; client component (`settings-client.tsx`) currently reads a `mockUser` instead of calling `/api/auth/me`. Status: ⚠️ Partial (UI done, server wiring mocked).

Notes:
- There are two files `app/auth/login.tsx` and `app/auth/register.tsx` that exist but are empty; they are not used by routes (the app uses `app/login/page.tsx` and `app/register/page.tsx`). Those files appear to be unused placeholders. 
- The UI consistently uses `fetch(..., { credentials: "include" })` for protected requests, aligning with cookie-based auth.

## Components
All components are under `components/ui`.

- `DashboardHeader.tsx` — renders top header (XP, streak, avatar). Used in `app/dashboard/layout.tsx`. Status: ✅ Done.
- `DashboardSidebar.tsx` — left navigation and review CTA. Used in layout. Status: ✅ Done.
- `SidebarNav.tsx` — navigation list used by `DashboardSidebar`. Status: ✅ Done.
- `MobileNav.tsx` — bottom mobile nav. Used in layout. Status: ✅ Done.
- `DeckCard.tsx` — deck card UI used in decks list. Status: ✅ Done.
- `StreakBadge.tsx` — small streak component used in header. Status: ✅ Done.
- `XPBar.tsx` — progress bar used in header and stats. Status: ✅ Done.

All components are actively used by pages and include framer-motion animations. I found no dead imports in the `components/ui` directory.

## API Wiring — Frontend to Backend
- Action: "User clicks Generate" — frontend: `app/study/page.tsx` (`StudyPageInner.handleGenerate`) → calls `POST /api/generate` → response used to populate preview. Status: ✅ Wired.
- Action: "User clicks Save generated cards" — frontend: `app/study/page.tsx` (`StudyPageInner.handleSave`) → calls `POST /api/generate/save` → updates deck count in UI. Status: ✅ Wired.
- Action: "User starts review" — frontend: `app/review/[[...deckId]]/page.tsx` (initial load) → calls `GET /api/review/session` → session loaded. Status: ✅ Wired.
- Action: "User rates card in review" — frontend: `app/review/...` (handleRating) → calls `POST /api/review` with `{ card_id, rating }` → server updates card, revlog, user XP/streak. Status: ✅ Wired.
- Action: "Create deck" — frontend: `app/dashboard/decks/page.tsx` → `POST /api/decks`. Status: ✅ Wired.
- Action: "Edit/Delete deck" — frontend: same file → `PATCH`/`DELETE` `/api/decks/:id`. Status: ✅ Wired.
- Many other flows (cards list, edit card, delete card, stats) are wired to their respective API endpoints. Status: ✅ Wired unless noted otherwise.

## Auth Flow
- On register/login the server returns a JWT and sets an httpOnly cookie named `token` (`app/api/auth/*/route.ts`).
- Server-side verification: `lib/auth.ts` verifies JWT using `JWT_SECRET`.
- Server-side route protection example: `app/dashboard/layout.tsx` reads `cookies()` and calls `verifyToken` — redirects to `/login` if invalid.
- `lib/middleware.getUserFromRequest` reads `Authorization: Bearer ...` header or `token` cookie to return the `userId` for API handlers.

Gaps / Issues:
- `settings-client.tsx` uses a local `mockUser` for the settings UI and also deletes `localStorage` keys on logout. The app relies on httpOnly cookies for auth; removing localStorage is not sufficient to log out the server session. There is a server `/api/auth/logout` route that clears the cookie, but `settings-client.tsx` does not call it. Status: ⚠️ Partial — fix required to call real endpoints.

## Animations & UX
- `framer-motion` is used widely for micro-interactions and transitions:
  - `components/ui/*` (DashboardHeader, DeckCard, MobileNav, SidebarNav, StreakBadge, XPBar) — motion wrappers and animated progress bars.
  - `app/review/[[...deckId]]/page.tsx` — card flip animations, popups, celebration transitions.
  - `app/dashboard/*`, `app/dashboard/decks/*`, `app/study/page.tsx` — entrance and hover animations.
- CSS animations are defined in `app/globals.css` (page-in, float-up, confetti overlay, xp shimmer). Status: ✅ Implemented across the UI.

## What Is Working End to End
- Register → user created in DB (via Drizzle) + token cookie set. (Register UI → `/api/auth/register`).
- Login → authentication and cookie set (Login UI → `/api/auth/login`).
- Add content flow: paste notes → `POST /api/generate` (AI) → preview → `POST /api/generate/save` → cards inserted into DB. (UI `app/study/page.tsx` → API). End-to-end present.
- Deck CRUD: create, update, delete decks with DB persistence (`/api/decks`).
- Review flow: load session (`GET /api/review/session`), rate card (`POST /api/review`) → FSRS scheduling (`ts-fsrs`), card updates, `revlog` entry inserted, user XP and streak updated. End-to-end present.
- Stats: `/api/stats` aggregates DB data and is used by Dashboard. End-to-end present assuming DB has data.
- **Card editing during review session**: Tap edit icon on card back to edit inline, call `PATCH /api/cards/:id`, and save changes without losing review place.
- **Onboarding experience**: 3-step setup flow for new users (Step 1: create deck, Step 2: add content, Step 3: start review) and Trophy empty state for caught-up users.
- **Global search**: Live debounced search across decks and cards, including highlighting and auto-scrolling to the selected card.

## What Is Incomplete or Broken
- `app/dashboard/settings/settings-client.tsx` uses mocked user data and does not call `/api/auth/me` or `/api/auth/logout` (client-side logout clears localStorage only). Status: ⚠️ Partial — fix required to call real endpoints.
- `app/auth/login.tsx` and `app/auth/register.tsx` files exist but are empty (unused placeholders). Could be confusing. Status: ⚠️ Partial.
- No tests in the repo; no CI configuration observed.
- No server-side validation for some user inputs beyond basic checks (most endpoints trust request body shapes). Consider stricter validation.
- No obvious mechanism in code to verify that migrations were applied to a running DB — migrations exist, but application of them is environment-specific.

## What Has Not Been Started
Per V1 scope items, everything core is present in the codebase, but the following are missing or not implemented in repo:
- Automated tests and CI — not started.

## Decisions Made
- Use of Drizzle ORM + Postgres: chosen for type-safe SQL and migrations.
- Cookie-based JWT auth (httpOnly `token` cookie): chosen to simplify secure storage of tokens and server-side SSR access.
- AI provider abstraction: `lib/ai.ts` implements `generateContentInterceptor` with Gemini primary and Groq fallback when Gemini returns 503.
- FSRS library (`ts-fsrs`): used to compute card scheduling and to persist FSRS-derived fields on `cards`.
- XP & streak on review: server awards XP based on rating and computes streak as described in `app/api/review/route.ts`.

## Next Steps — Recommended (priority order with file pointers)
1. Fix settings server wiring: update `app/dashboard/settings/settings-client.tsx` to call `GET /api/auth/me` for user data and call `POST /api/auth/logout` to log out server-side. Files: [app/dashboard/settings/settings-client.tsx](app/dashboard/settings/settings-client.tsx). Status: actionable fix.
2. Remove or implement placeholder files: either implement or delete `app/auth/login.tsx` and `app/auth/register.tsx` to avoid confusion. Files: [app/auth/login.tsx](app/auth/login.tsx), [app/auth/register.tsx](app/auth/register.tsx).
3. Add rate limiting and retry/backoff on `/api/generate` to avoid hitting Gemini/Groq limits. Files: `app/api/generate/route.ts` and `lib/ai.ts`.
4. Add server-side input validation (e.g., Zod) for API bodies (register, login, generate, save, review) to harden endpoints. Files: `app/api/*/route.ts`.
5. Implement forgot-password flow (UI + API) or remove links that reference it. Add route `app/forgot-password/page.tsx` and `app/api/auth/forgot` endpoints.
6. Add integration tests for the primary flows: auth, generate/save, review session. Add basic CI to run lint/tests.
7. Document environment and deployment checklist in `README.md` (DB seeds, applying drizzle migrations, environment variables). `README.md` is helpful but could include a short troubleshooting section.

---
This audit is based strictly on the repository files present in the workspace. I did not run the app or connect to any external services, so runtime issues that depend on environment (missing env vars, database state, external API keys) are not verified here.
# RecallIQ — Project Progress

## Project Overview
RecallIQ is an AI-powered spaced-repetition study app built with Next.js and PostgreSQL. It converts pasted notes into flashcards via AI, stores decks and cards in Postgres (Drizzle ORM), schedules reviews with an FSRS implementation, and tracks XP and streaks for users.

## Tech Stack
- Next.js: 16.2.6 — app framework and frontend SSR/SSG.
- React: 19.2.4 — UI library.
- TypeScript: ^5 — static typing.
- Tailwind CSS: ^4 (via `@tailwindcss/postcss`) — styling.
- Framer Motion: 12.40.0 — animations and micro-interactions.
- Drizzle ORM: drizzle-orm ^0.45.2, drizzle-kit ^0.31.10 — DB schema and migrations.
- PostgreSQL (`pg` ^8.21.0) — primary database.
- ts-fsrs: ^5.4.1 — FSRS scheduling algorithm wrapper.
- @google/genai ^2.6.0 and groq-sdk ^1.2.1 — AI providers (Gemini primary, Groq fallback).
- bcryptjs ^3.0.3 — password hashing.
- jsonwebtoken ^9.0.3 — JWT handling.
- canvas-confetti ^1.9.4 — confetti UX on session completion.
- dev tooling: pnpm, eslint, tailwind/postcss.

All versions are taken directly from `package.json`.

## Database
Four main tables defined in `db/schema/index.ts` (Drizzle schema). The schema matches the SQL migration `db/migrations/0000_friendly_nightmare.sql` and metadata in `db/migrations/meta/0000_snapshot.json`.

- `users`
  - id: uuid (PK)
  - name: varchar(100)
  - email: varchar(255) UNIQUE
  - password: text (bcrypt hash)
  - desired_retention: real DEFAULT 0.9
  - xp: integer DEFAULT 0
  - streak: integer DEFAULT 0
  - last_studied_at: timestamp
  - created_at: timestamp DEFAULT now()

- `decks`
  - id: uuid (PK)
  - user_id: uuid (FK -> users.id)
  - name: varchar(100)
  - description: text
  - domain: varchar(50)
  - created_at: timestamp DEFAULT now()

- `cards`
  - id: uuid (PK)
  - deck_id: uuid (FK -> decks.id)
  - user_id: uuid (FK -> users.id)
  - front: text
  - back: text
  - importance: enum('core','good_to_know','optional') DEFAULT 'good_to_know'
  - tags: text[] DEFAULT []
  - source_text: text
  - state: enum('new','learning','review','suspended') DEFAULT 'new'
  - due_date: timestamp DEFAULT now()
  - stability: real DEFAULT 0
  - difficulty: real DEFAULT 0
  - retrievability: real DEFAULT 0
  - reps: integer DEFAULT 0
  - lapses: integer DEFAULT 0
  - last_reviewed_at: timestamp
  - created_at: timestamp DEFAULT now()

- `revlog`
  - id: uuid (PK)
  - card_id: uuid (FK -> cards.id)
  - user_id: uuid (FK -> users.id)
  - rating: integer (1-4)
  - elapsed_days: real DEFAULT 0
  - scheduled_days: real DEFAULT 0
  - review_time: timestamp DEFAULT now()

Migrations: there is a generated migration file and a migration journal entry at `db/migrations/meta/_journal.json`. The repository contains migration files, but whether they have been applied to a running database cannot be determined from the code alone.

## Backend — API Routes
All API routes live under `app/api`. Authentication is cookie/JWT-based (see `lib/auth.ts`) and server helpers read the token from the `Authorization` header or `token` cookie (`lib/middleware.ts`). Status denotes presence and apparent completeness of implementation in the repo.

- `POST /api/auth/register` — registers a user, hashes password, returns user + JWT token and sets `token` cookie. Status: ✅ Complete. Notes: sets httpOnly cookie, uses `JWT_SECRET` env.
- `POST /api/auth/login` — verifies credentials, returns user + token, sets cookie. Status: ✅ Complete.
- `POST /api/auth/logout` — clears cookie and returns success. Status: ✅ Complete.
- `GET /api/auth/me` — returns current user profile (id, name, email, xp, streak, desiredRetention). Status: ✅ Complete.

- `GET /api/decks` — list decks for current user (includes counts). Status: ✅ Complete.
- `POST /api/decks` — create deck. Status: ✅ Complete.
- `GET /api/decks/:id` — get deck and its cards. Status: ✅ Complete.
- `PATCH /api/decks/:id` — update deck (name/description/domain). Status: ✅ Complete.
- `DELETE /api/decks/:id` — delete deck (cascades to cards). Status: ✅ Complete.

- `GET /api/cards` — list cards with filters (deck_id, importance, tag, due_today). Status: ✅ Complete.
- `GET /api/cards/:id` — get single card. Status: ✅ Complete.
- `PATCH /api/cards/:id` — update card fields (front/back/importance/state/tags). Status: ✅ Complete.
- `DELETE /api/cards/:id` — delete card. Status: ✅ Complete.
- `PATCH /api/cards/:id/importance` — quick importance update used in review. Status: ✅ Complete.

- `POST /api/generate` — generates flashcards from text or prompt using Gemini primary and Groq fallback. Returns preview (cards). Status: ✅ Complete. Notes: catches 503 and routes to Groq.
- `POST /api/generate/save` — saves generated cards to DB for a deck. Status: ✅ Complete.

- `POST /api/review` — accepts a rating for a card, runs FSRS scheduling (`lib/fsrs.ts`), updates card, inserts a `revlog` entry, updates user XP and streak. Status: ✅ Complete.
- `GET /api/review/session` — returns due cards for the user (supports deck filter, mode=exam for core cards, limit). Status: ✅ Complete.

- `GET /api/stats` — aggregates dashboard stats (streak, xp, cards reviewed today, counts, heatmap, weak spots). Status: ✅ Complete.

Known issues / caveats:
- All endpoints rely on `DATABASE_URL` and `JWT_SECRET` environment variables; missing envs will break server startup/runtime.
- No explicit rate limiting for AI `/api/generate` is present in code — a 503 fallback to Groq is implemented, but throttling/rate limiting is not.

## Frontend — Screens
All UI is in the `app/` directory (Next.js App Router). Below are the screens present and their status.

- `/` — [app/page.tsx]: Landing page. Shows marketing copy and static preview. Status: ✅ Complete.
- `/login` — [app/login/page.tsx]: Login form; posts to `/api/auth/login`. Status: ✅ Complete.
- `/register` — [app/register/page.tsx]: Registration form; posts to `/api/auth/register`. Status: ✅ Complete.
- `/onboarding` — [app/onboarding/*]: Welcome flow with `/onboarding`, `/onboarding/domain`, `/onboarding/goal`. Status: ✅ Complete (client-only flows, navigational).
- `/dashboard` — [app/dashboard/page.tsx] (wrapped by [app/dashboard/layout.tsx]): Dashboard with stats and action CTAs. Status: ✅ Complete. Connects to `/api/stats` and `/api/decks`.
- `/dashboard/decks` — [app/dashboard/decks/page.tsx]: Decks list, create/edit/delete wired to `/api/decks`. Status: ✅ Complete.
- `/dashboard/decks/[deckId]` — [app/dashboard/decks/[deckId]/page.tsx]: Deck detail page showing cards, allows editing cards (PATCH `/api/cards/:id`) and delete (DELETE `/api/cards/:id`). Status: ✅ Complete.
- `/dashboard/stats` — [app/dashboard/stats/page.tsx]: Visual stats and charts (mocked-ish UI reading from client state; expects `/api/stats` upstream where required). Status: ✅ Complete (UI implemented).
- `/study` (Add content) — [app/study/page.tsx] (also re-exported by `/add-content`): paste text → POST `/api/generate` → preview → POST `/api/generate/save`. Status: ✅ Complete and wired.
- `/review` — [app/review/[[...deckId]]/page.tsx]: Review session UI; loads `/api/review/session` and POSTs ratings to `/api/review`. Implements interactions, keyboard shortcuts, animations, XP popups, and confetti. Status: ✅ Complete and wired.
- `/dashboard/settings` — [app/dashboard/settings/*]: Settings UI is implemented; client component (`settings-client.tsx`) currently reads a `mockUser` instead of calling `/api/auth/me`. Status: ⚠️ Partial (UI done, server wiring mocked).

Notes:
- There are two files `app/auth/login.tsx` and `app/auth/register.tsx` that exist but are empty; they are not used by routes (the app uses `app/login/page.tsx` and `app/register/page.tsx`). Those files appear to be unused placeholders. 
- The UI consistently uses `fetch(..., { credentials: "include" })` for protected requests, aligning with cookie-based auth.

## Components
All components are under `components/ui`.

- `DashboardHeader.tsx` — renders top header (XP, streak, avatar). Used in `app/dashboard/layout.tsx`. Status: ✅ Done.
- `DashboardSidebar.tsx` — left navigation and review CTA. Used in layout. Status: ✅ Done.
- `SidebarNav.tsx` — navigation list used by `DashboardSidebar`. Status: ✅ Done.
- `MobileNav.tsx` — bottom mobile nav. Used in layout. Status: ✅ Done.
- `DeckCard.tsx` — deck card UI used in decks list. Status: ✅ Done.
- `StreakBadge.tsx` — small streak component used in header. Status: ✅ Done.
- `XPBar.tsx` — progress bar used in header and stats. Status: ✅ Done.

All components are actively used by pages and include framer-motion animations. I found no dead imports in the `components/ui` directory.

## API Wiring — Frontend to Backend
- Action: "User clicks Generate" — frontend: `app/study/page.tsx` (`StudyPageInner.handleGenerate`) → calls `POST /api/generate` → response used to populate preview. Status: ✅ Wired.
- Action: "User clicks Save generated cards" — frontend: `app/study/page.tsx` (`StudyPageInner.handleSave`) → calls `POST /api/generate/save` → updates deck count in UI. Status: ✅ Wired.
- Action: "User starts review" — frontend: `app/review/[[...deckId]]/page.tsx` (initial load) → calls `GET /api/review/session` → session loaded. Status: ✅ Wired.
- Action: "User rates card in review" — frontend: `app/review/...` (handleRating) → calls `POST /api/review` with `{ card_id, rating }` → server updates card, revlog, user XP/streak. Status: ✅ Wired.
- Action: "Create deck" — frontend: `app/dashboard/decks/page.tsx` → `POST /api/decks`. Status: ✅ Wired.
- Action: "Edit/Delete deck" — frontend: same file → `PATCH`/`DELETE` `/api/decks/:id`. Status: ✅ Wired.
- Many other flows (cards list, edit card, delete card, stats) are wired to their respective API endpoints. Status: ✅ Wired unless noted otherwise.

## Auth Flow
- On register/login the server returns a JWT and sets an httpOnly cookie named `token` (`app/api/auth/*/route.ts`).
- Server-side verification: `lib/auth.ts` verifies JWT using `JWT_SECRET`.
- Server-side route protection example: `app/dashboard/layout.tsx` reads `cookies()` and calls `verifyToken` — redirects to `/login` if invalid.
- `lib/middleware.getUserFromRequest` reads `Authorization: Bearer ...` header or `token` cookie to return the `userId` for API handlers.

Gaps / Issues:
- `settings-client.tsx` uses a local `mockUser` for the settings UI and also deletes `localStorage` keys on logout. The app relies on httpOnly cookies for auth; removing localStorage is not sufficient to log out the server session. There is a server `/api/auth/logout` route that clears the cookie, but `settings-client.tsx` does not call it. Status: ⚠️ Partial — fix required to call real endpoints.

## Animations & UX
- `framer-motion` is used widely for micro-interactions and transitions:
  - `components/ui/*` (DashboardHeader, DeckCard, MobileNav, SidebarNav, StreakBadge, XPBar) — motion wrappers and animated progress bars.
  - `app/review/[[...deckId]]/page.tsx` — card flip animations, popups, celebration transitions.
  - `app/dashboard/*`, `app/dashboard/decks/*`, `app/study/page.tsx` — entrance and hover animations.
- CSS animations are defined in `app/globals.css` (page-in, float-up, confetti overlay, xp shimmer). Status: ✅ Implemented across the UI.

## What Is Working End to End
- Register → user created in DB (via Drizzle) + token cookie set. (Register UI → `/api/auth/register`).
- Login → authentication and cookie set (Login UI → `/api/auth/login`).
- Add content flow: paste notes → `POST /api/generate` (AI) → preview → `POST /api/generate/save` → cards inserted into DB. (UI `app/study/page.tsx` → API). End-to-end present.
- Deck CRUD: create, update, delete decks with DB persistence (`/api/decks`).
- Review flow: load session (`GET /api/review/session`), rate card (`POST /api/review`) → FSRS scheduling (`ts-fsrs`), card updates, `revlog` entry inserted, user XP and streak updated. End-to-end present.
- Stats: `/api/stats` aggregates DB data and is used by Dashboard. End-to-end present assuming DB has data.

## What Is Incomplete or Broken
- `app/dashboard/settings/settings-client.tsx` uses mocked user data and does not call `/api/auth/me` or `/api/auth/logout` (client-side logout clears localStorage only). Status: ⚠️ Partial — fix required to call real endpoints.
- `app/auth/login.tsx` and `app/auth/register.tsx` files exist but are empty (unused placeholders). Could be confusing. Status: ⚠️ Partial.
- No explicit rate limiting or safeguards around `/api/generate` (AI) and `/api/generate/save` — risk of overuse or hitting API limits. Status: ⚠️ Needs work.
- No tests in the repo; no CI configuration observed.
- No server-side validation for some user inputs beyond basic checks (most endpoints trust request body shapes). Consider stricter validation.
- No obvious mechanism in code to verify that migrations were applied to a running DB — migrations exist, but application of them is environment-specific.
- Links in UI referencing `/forgot-password` appear but no route/file exists in project. Status: ❌ Missing.

## What Has Not Been Started
Per V1 scope items, everything core is present in the codebase, but the following are missing or not implemented in repo:
- Forgot password flow (UI + backend) — not present.
- Server-side settings endpoints (settings UI is mocked) — partial.
- Automated rate limiting / quota enforcement for AI generation — not implemented.
- Automated tests and CI — not started.

## Decisions Made
- Use of Drizzle ORM + Postgres: chosen for type-safe SQL and migrations.
- Cookie-based JWT auth (httpOnly `token` cookie): chosen to simplify secure storage of tokens and server-side SSR access.
- AI provider abstraction: `lib/ai.ts` implements `generateContentInterceptor` with Gemini primary and Groq fallback when Gemini returns 503.
- FSRS library (`ts-fsrs`): used to compute card scheduling and to persist FSRS-derived fields on `cards`.
- XP & streak on review: server awards XP based on rating and computes streak as described in `app/api/review/route.ts`.

## Next Steps — Recommended (priority order with file pointers)
1. Fix settings server wiring: update `app/dashboard/settings/settings-client.tsx` to call `GET /api/auth/me` for user data and call `POST /api/auth/logout` to log out server-side. Files: [app/dashboard/settings/settings-client.tsx](app/dashboard/settings/settings-client.tsx). Status: actionable fix.
2. Remove or implement placeholder files: either implement or delete `app/auth/login.tsx` and `app/auth/register.tsx` to avoid confusion. Files: [app/auth/login.tsx](app/auth/login.tsx), [app/auth/register.tsx](app/auth/register.tsx).
3. Add rate limiting and retry/backoff on `/api/generate` to avoid hitting Gemini/Groq limits. Files: `app/api/generate/route.ts` and `lib/ai.ts`.
4. Add server-side input validation (e.g., Zod) for API bodies (register, login, generate, save, review) to harden endpoints. Files: `app/api/*/route.ts`.
5. Implement forgot-password flow (UI + API) or remove links that reference it. Add route `app/forgot-password/page.tsx` and `app/api/auth/forgot` endpoints.
6. Add integration tests for the primary flows: auth, generate/save, review session. Add basic CI to run lint/tests.
7. Document environment and deployment checklist in `README.md` (DB seeds, applying drizzle migrations, environment variables). `README.md` is helpful but could include a short troubleshooting section.

---
This audit is based strictly on the repository files present in the workspace. I did not run the app or connect to any external services, so runtime issues that depend on environment (missing env vars, database state, external API keys) are not verified here.
