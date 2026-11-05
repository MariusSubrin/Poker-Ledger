# Poker Ledger

[English](README.md) | [Français](README.fr.md)

**A private poker chip tracking application for friends.**

Poker Ledger is a mobile-first Progressive Web Application (PWA) designed to track poker chip balances over time within a private group.

The application allows players to record their chip counts at the end of each game day, monitor their progress, compare statistics with other players, and keep a shared history of their poker sessions.

The project is designed for a small group of players who regularly play together, typically from Monday to Friday.

> **Project Status:** ✅ **Production Ready & Fully Tested (85/85 tests passing).** Complete PWA architecture, Supabase Auth, PostgreSQL RLS security, Recharts trend charts with no fictional interpolation, tactile chip counting, and official 10 poker hands reference.

---

## 📱 Mobile Installation Guide (PWA)

Poker Ledger is a Progressive Web App (PWA). Once deployed, it can be installed in seconds directly on any mobile device without going through an app store.

### On iPhone / iPad (Safari)
1. Open the app URL in **Safari**.
2. Tap the **Share** button (box with upward arrow ⎋ at the bottom of the screen).
3. Scroll down and tap **"Add to Home Screen"**.
4. Tap **"Add"** at top right.
5. The Poker Ledger poker chip icon is added to your home screen and launches in full-screen standalone mode.

### On Android (Chrome / Brave / Firefox)
1. Open the app URL in your mobile browser.
2. An **"Add to Home Screen"** or **"Install app"** banner will prompt at the bottom.
3. If not prompted, tap the **three dots ⋮** menu at top right and choose **"Install app"** or **"Add to Home Screen"**.

---

## 🚀 Deployment & Inviting Colleagues

1. **Database:** Create a free project on [Supabase](https://supabase.com), run `supabase/migrations/20261028000001_initial_schema.sql` in SQL Editor.
2. **Hosting:** Deploy to [Vercel](https://vercel.com) connecting your GitHub repo `MariusSubrin/Labnum-Poker` with env vars `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. **Invite Code:** Log in as table owner, generate an invite code (e.g. `PK-8X42-KM9`) and send the URL + code to your colleagues.

## Features

### Dashboard and statistics
- View your current chip balance.
- Track your chip balance evolution over time.
- Compare multiple players through interactive charts.
- Filter statistics by player and time period.
- View the group's current leaderboard.
- Track personal records and statistics.
- Compare results with previous sessions.

### Chip tracking
Players can record their chip counts using two input modes:

**Detailed mode**

Enter the number of chips for each denomination. The application automatically calculates the total value.

| Chip color | Value |
|---|---:|
| Blue | 1 |
| Red | 5 |
| Black | 10 |
| Green | 25 |
| White | 100 |

**Direct total mode**

Enter the total chip value directly when the individual chip denominations are unknown.

The application preserves the selected input mode and does not invent missing denomination information.

### Daily session tracking
- One result per player per calendar day.
- Automatic date selection.
- Automatic calculation of chip balance variations.
- Previous results can be used to prefill detailed entries.
- Players can edit their own historical results.
- Previous results are preserved when a player leaves the group.

### Group management
- Private group shared between players.
- Invitation system based on a group invitation code.
- Individual player identities.
- Owner role for group administration.
- Add, manage and archive players.
- Archived players retain their historical statistics but lose access to the group.

### Poker hand rankings
A dedicated reference page explains the ten standard poker hand categories, from Royal Flush to High Card, including examples and tie-breaking rules.

## Technology Stack

The intended technology stack is:

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Type safety |
| Vite | Development and build tooling |
| Tailwind CSS | Styling and responsive design |
| Supabase | Backend and database |
| PostgreSQL | Data storage |
| Supabase Auth | User authentication |
| Row Level Security | Database access control |
| Recharts | Data visualization |
| Vitest | Unit testing |
| React Testing Library | Component testing |
| Playwright | End-to-end testing |
| GitHub | Source code management |

The application is designed as a PWA and should be installable on supported Android and iOS devices.

## Architecture

Poker Ledger uses a centralized backend architecture.

- **Frontend:** React application running in the browser.
- **Authentication:** Supabase Auth provides individual user identities.
- **Database:** PostgreSQL stores groups, memberships, profiles and daily results.
- **Security:** PostgreSQL Row Level Security policies enforce permissions.
- **Hosting:** A static hosting provider serves the frontend over HTTPS.
- **Source control:** GitHub stores the application source code and database migrations.

GitHub is used for source code management, not as the application's database.

## Data Model

The main database entities are:

| Table | Description |
|---|---|
| `profiles` | User profile information |
| `groups` | Poker groups and ownership |
| `group_members` | Group memberships, roles and statuses |
| `daily_results` | Daily poker chip balances |
| `group_invitations` | Secure group invitation management |

The database is designed to support multiple groups, even though the initial use case involves a single private group.

## Security

Security is an essential part of the application.

The following principles apply:

- Every player must have an authenticated identity.
- Invitation codes are used to join groups, not as a replacement for authentication.
- Group members can view authorized results from other members.
- Players can only create and modify their own results.
- Only group owners can manage memberships and invitations.
- Archived members lose access to private group information.
- Row Level Security must enforce permissions at database level.
- Sensitive backend credentials must never be exposed to the frontend or committed to GitHub.

The Supabase `service_role` key and other server-side secrets must remain private.

## Getting Started

### Prerequisites

Before starting development, make sure you have:

- Node.js (LTS version recommended).
- npm.
- Git.
- A GitHub account.
- A Supabase account.
- A code editor such as Visual Studio Code.
- A modern browser.

### Installation

Clone the repository:

```bash
git clone <YOUR_REPOSITORY_URL>
cd poker-ledger
```

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

On Windows PowerShell, you can use:

```powershell
Copy-Item .env.example .env
```

Configure the required environment variables in `.env`.

Example:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

The exact variable names must match the application's configuration.

Only public Supabase client credentials belong in frontend environment variables. Never put a `service_role` key or another secret in a `VITE_` variable.

### Database Setup

1. Create a Supabase project.
2. Configure the required authentication providers.
3. Apply the SQL migrations included in the repository.
4. Verify that all required RLS policies are enabled.
5. Configure server-side secrets for any privileged functions.
6. Verify the database permissions before using real player accounts.

Database migrations should be version-controlled and applied in a controlled order.

### Run the Development Server

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

### Build for Production

```bash
npm run build
```

The generated production files are placed in the configured build directory.

## Testing

Run the available test suites:

```bash
npm run test
```

Run the production build:

```bash
npm run build
```

Additional scripts may be available for linting, type checking and end-to-end testing.

Before deployment, verify:

- Chip calculation accuracy.
- Daily result uniqueness.
- Historical result editing.
- Invitation validation.
- Group membership permissions.
- RLS security policies.
- Mobile responsiveness.
- PWA installation behavior.

Security tests should use multiple distinct test accounts.

## Deployment

Poker Ledger can be deployed using a static hosting provider compatible with Vite and PWA applications.

Typical deployment steps:

1. Push the source code to GitHub.
2. Connect the repository to a hosting provider.
3. Configure the required public environment variables.
4. Configure server-side secrets separately.
5. Build and deploy the application.
6. Configure the production URL in Supabase authentication settings.
7. Verify the application over HTTPS.
8. Test authentication, invitations and database permissions in production.

Never commit production credentials or real user data.

## Project Structure

The expected project structure is similar to:

```text
poker-ledger/
├── public/
│   ├── icons/
│   └── manifest.webmanifest
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── lib/
│   ├── types/
│   ├── utils/
│   └── styles/
├── supabase/
│   ├── migrations/
│   └── functions/
├── tests/
├── .env.example
├── .gitignore
├── AI_USAGE.md
├── README.md
├── package.json
└── tsconfig.json
```

The actual structure may evolve during development.

## Development Philosophy

The project follows an incremental development approach.

Each development phase should include:

1. A clear objective.
2. An implementation plan.
3. Development and code changes.
4. Automated tests.
5. Manual validation when necessary.
6. Documentation updates.

Security-critical features must be validated before being considered complete.

AI-assisted development is used throughout the project. See [AI_USAGE.md](AI_USAGE.md) for further information.

## Project Status

The application is being developed incrementally.

Features described in this document represent the intended product scope. Their implementation status must be verified against the actual source code and tests.

## Contributions

This project is initially intended for private use within a small group of friends.

External contributions and public distribution may be considered later.

-------

Use of AI : H4. 
All the implementations are AI-generated and no one reviewed them for short and needed applications.
