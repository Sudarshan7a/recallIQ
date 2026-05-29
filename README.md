# RecallIQ — API Documentation

AI-powered spaced repetition study tool.
Built with Next.js, PostgreSQL, Drizzle ORM, FSRS, and Gemini AI.

---

## Tech Stack

- **Frontend** — Next.js 16 + TypeScript + Tailwind CSS
- **Database** — PostgreSQL (local) via Drizzle ORM
- **AI** — Google Gemini 2.5 Flash Lite
- **Algorithm** — FSRS (Free Spaced Repetition Scheduler)
- **Auth** — JWT + bcrypt

---

## Setup

1. Clone the repo
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Create `.env.local`:
   ```
   DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/recalliq
   GEMINI_API_KEY=your_gemini_api_key
   JWT_SECRET=your_jwt_secret
   ```
4. Push database schema:
   ```bash
   pnpm drizzle-kit push
   ```
5. Run dev server:
   ```bash
   pnpm dev
   ```

---

## Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

Token is returned on login and register.

---

## API Endpoints

---

### Auth

#### POST /api/auth/register

Register a new user.

**Body:**

```json
{
  "name": "Rahul",
  "email": "rahul@test.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "user": {
    "id": "5d91a5ad-4cc5-4017-88f1-1b4456fe445c",
    "name": "Rahul",
    "email": "rahul@test.com"
  },
  "token": "jwt_token"
}
```

---

#### POST /api/auth/login

Login with email and password.

**Body:**

```json
{
  "email": "rahul@test.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "user": {
    "id": "5d91a5ad-4cc5-4017-88f1-1b4456fe445c",
    "name": "Rahul",
    "email": "rahul@test.com"
  },
  "token": "jwt_token"
}
```

---

#### POST /api/auth/logout

Logout and clear cookie.

**Response:**

```json
{ "success": true }
```

---

#### GET /api/auth/me

Get current logged in user.

**Response:**

```json
{
  "user": {
    "id": "5d91a5ad-4cc5-4017-88f1-1b4456fe445c",
    "name": "Rahul",
    "email": "rahul@test.com",
    "xp": 20,
    "streak": 1,
    "desiredRetention": 0.9,
    "createdAt": "2026-05-29T12:00:00Z"
  }
}
```

---

### Decks

#### GET /api/decks

Get all decks for current user.

**Response:**

```json
{
  "decks": [
    {
      "id": "1f64d1c5-4e65-4a4c-9aa5-b8fdbb8c2e11",
      "name": "Networking",
      "description": "Computer networking concepts",
      "domain": "cs",
      "createdAt": "2026-05-29T12:00:00Z"
    }
  ]
}
```

---

#### POST /api/decks

Create a new deck.

**Body:**

```json
{
  "name": "Networking",
  "description": "Computer networking concepts",
  "domain": "cs"
}
```

**Response:**

```json
{
  "deck": {
    "id": "1f64d1c5-4e65-4a4c-9aa5-b8fdbb8c2e11",
    "name": "Networking",
    "description": "Computer networking concepts",
    "domain": "cs",
    "createdAt": "2026-05-29T12:00:00Z"
  }
}
```

---

#### GET /api/decks/:id

Get a single deck with all its cards.

**Response:**

```json
{
  "deck": {
    "id": "1f64d1c5-4e65-4a4c-9aa5-b8fdbb8c2e11",
    "name": "Networking",
    "description": "Computer networking concepts",
    "domain": "cs"
  },
  "cards": []
}
```

---

#### PATCH /api/decks/:id

Update deck name or description.

**Body:**

```json
{
  "name": "Updated name",
  "description": "Updated description"
}
```

---

#### DELETE /api/decks/:id

Delete a deck and all its cards.

**Response:**

```json
{ "success": true }
```

---

### Cards

#### GET /api/cards

Get cards with optional filters.

**Query params:**

- `deck_id` — filter by deck
- `importance` — core / good_to_know / optional
- `tag` — filter by tag
- `due_today=true` — only due cards

**Response:**

```json
{
  "cards": [],
  "count": 3
}
```

---

#### GET /api/cards/:id

Get a single card.

---

#### PATCH /api/cards/:id

Update a card.

**Body:**

```json
{
  "front": "Updated question",
  "back": "Updated answer",
  "importance": "core",
  "tags": ["ssl-tls", "security"]
}
```

---

#### DELETE /api/cards/:id

Delete a card.

**Response:**

```json
{ "success": true }
```

---

#### PATCH /api/cards/:id/importance

Quickly update importance of a card.
Used during review sessions.

**Body:**

```json
{ "importance": "core" }
```

---

### AI Generation

#### POST /api/generate

Generate flashcards from text using Gemini AI.
Returns a preview — cards are NOT saved yet.

**Body:**

```json
{
  "text": "SSL stands for Secure Socket Layer...",
  "deck_id": "uuid",
  "domain": "cs"
}
```

**Response:**

```json
{
  "cards": [
    {
      "front": "Why can't two parties communicate securely without SSL?",
      "back": "Without encryption data travels as plain text...",
      "importance": "core",
      "tags": ["ssl-tls", "security"]
    }
  ],
  "count": 1
}
```

---

#### POST /api/generate/save

Save approved generated cards to database.

**Body:**

```json
{
  "deck_id": "uuid",
  "cards": [
    {
      "front": "...",
      "back": "...",
      "importance": "core",
      "tags": ["ssl-tls"]
    }
  ]
}
```

**Response:**

```json
{
  "saved_count": 3,
  "cards": []
}
```

---

### Review

#### POST /api/review

Submit a review rating for a card.
Updates FSRS schedule, awards XP, updates streak.

**Body:**

```json
{
  "card_id": "uuid",
  "rating": 3
}
```

**Ratings:**

- `1` — Forgot (resets card)
- `2` — Hard (short interval)
- `3` — Got it (standard interval)
- `4` — Easy (long interval)

**Response:**

```json
{
  "updated_card": {},
  "xp_earned": 10,
  "next_due": "2026-05-30T...",
  "streak": 1
}
```

---

#### GET /api/review/session

Get today's due cards for a review session.

**Query params:**

- `deck_id` — filter by deck (optional)
- `mode` — normal (default) or exam (core cards only)
- `limit` — max cards (default 20)

**Response:**

```json
{
  "cards": [],
  "count": 14,
  "mode": "normal"
}
```

---

### Stats

#### GET /api/stats

Get dashboard stats for current user.

**Response:**

```json
{
  "streak": 1,
  "xp": 20,
  "cards_reviewed_today": 2,
  "total_cards": 3,
  "due_today": 3,
  "accuracy_rate": 100,
  "weak_spots": [
    {
      "deckId": "uuid",
      "lapses": 0,
      "count": 3
    }
  ],
  "heatmap": [{ "date": "2026-05-27", "count": 2 }]
}
```

---

## Database Schema

Note: Database columns use snake_case. API responses return camelCase via Drizzle ORM mapping.

### users

| Column            | Type      | Notes            |
| ----------------- | --------- | ---------------- |
| id                | uuid      | primary key      |
| name              | varchar   |                  |
| email             | varchar   | unique           |
| password          | text      | bcrypt hashed    |
| desired_retention | real      | default 0.9      |
| xp                | integer   | default 0        |
| streak            | integer   | default 0        |
| last_studied_at   | timestamp | for streak logic |
| created_at        | timestamp |                  |

### decks

| Column      | Type      | Notes                      |
| ----------- | --------- | -------------------------- |
| id          | uuid      | primary key                |
| user_id     | uuid      | foreign key → users        |
| name        | varchar   |                            |
| description | text      |                            |
| domain      | varchar   | cs / medical / general etc |
| created_at  | timestamp |                            |

### cards

| Column           | Type      | Notes                               |
| ---------------- | --------- | ----------------------------------- |
| id               | uuid      | primary key                         |
| deck_id          | uuid      | foreign key → decks                 |
| user_id          | uuid      | foreign key → users                 |
| front            | text      | question                            |
| back             | text      | answer                              |
| importance       | enum      | core / good_to_know / optional      |
| tags             | text[]    | array of tags                       |
| source_text      | text      | original input                      |
| state            | enum      | new / learning / review / suspended |
| due_date         | timestamp | FSRS calculated                     |
| stability        | real      | FSRS stability                      |
| difficulty       | real      | FSRS difficulty                     |
| retrievability   | real      | FSRS retrievability                 |
| reps             | integer   | times reviewed                      |
| lapses           | integer   | times forgotten                     |
| last_reviewed_at | timestamp |                                     |
| created_at       | timestamp |                                     |

### revlog

| Column         | Type      | Notes                  |
| -------------- | --------- | ---------------------- |
| id             | uuid      | primary key            |
| card_id        | uuid      | foreign key → cards    |
| user_id        | uuid      | foreign key → users    |
| rating         | integer   | 1-4                    |
| elapsed_days   | real      | days since last review |
| scheduled_days | real      | days until next review |
| review_time    | timestamp |                        |

---

## FSRS Rating Guide

| Rating | Label  | Effect                                     |
| ------ | ------ | ------------------------------------------ |
| 1      | Forgot | Resets card, increases difficulty          |
| 2      | Hard   | Short interval, slight difficulty increase |
| 3      | Got it | Standard interval, difficulty stable       |
| 4      | Easy   | Long interval, difficulty decreases        |

---

## Importance Levels

| Level        | Description                      | Exam Mode |
| ------------ | -------------------------------- | --------- |
| core         | Must know — fundamental concepts | Included  |
| good_to_know | Useful but not critical          | Excluded  |
| optional     | Advanced or niche detail         | Excluded  |

---

## XP System

| Rating | XP Earned |
| ------ | --------- |
| Forgot | 5 XP      |
| Hard   | 8 XP      |
| Got it | 10 XP     |
| Easy   | 15 XP     |

---

## Streak Logic

- Study today for first time → streak = 1
- Study today, already studied today → streak unchanged
- Study today, last studied yesterday → streak + 1
- Study today, missed 1+ days → streak resets to 1
