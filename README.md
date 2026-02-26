# Mission Control

Jarvis's command centre. A Next.js dashboard backed by Convex for real-time task management, memory browsing, and agent orchestration.

## Stack

- **Next.js** (App Router, TypeScript)
- **Convex** — real-time database + backend functions
- **shadcn/ui + Tailwind CSS** — UI components
- **@dnd-kit** — drag-and-drop task board

---

## Local Setup

### Prerequisites

- Node.js 20+
- npm / pnpm
- A [Convex](https://convex.dev) account (free tier is fine)

### 1. Clone the repo

```bash
git clone https://github.com/jarvis-ai-cio/mission-control.git
cd mission-control
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Convex

If you haven't already, install the Convex CLI:

```bash
npm install -g convex
```

Log in and initialise the project:

```bash
npx convex dev
```

This will:
- Prompt you to log in to Convex
- Create a new project (or link to an existing one)
- Deploy your schema and functions
- Print your `NEXT_PUBLIC_CONVEX_URL`

### 4. Configure environment variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Fill in the values:

```env
# From `npx convex dev` output
NEXT_PUBLIC_CONVEX_URL=https://<your-deployment>.convex.cloud

# Jarvis Gateway — only needed if using the /api/cron sync endpoint
# Leave blank for local dev unless you're testing agent memory sync
OPENCLAW_GATEWAY_URL=https://jarvis.lemming-neon.ts.net
OPENCLAW_GATEWAY_TOKEN=<your-gateway-token>
```

### 5. Run the dev server

In one terminal, keep Convex running:

```bash
npx convex dev
```

In another terminal, start Next.js:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_CONVEX_URL` | ✅ | Convex deployment URL — from `npx convex dev` |
| `OPENCLAW_GATEWAY_URL` | Optional | Jarvis gateway base URL — for memory sync cron |
| `OPENCLAW_GATEWAY_TOKEN` | Optional | Jarvis gateway auth token — for memory sync cron |

---

## Project Structure

```
app/                  # Next.js App Router pages + API routes
  api/cron/           # Memory sync endpoint (called by Jarvis cron)
components/           # Shared UI components
convex/               # Convex schema + backend functions
  schema.ts           # Database schema (tasks, memories)
  tasks.ts            # Task CRUD functions
  memories.ts         # Memory sync functions
lib/                  # Client utilities
  convex-provider.tsx # Convex client provider
hooks/                # React hooks
```

---

## Deployment

The production instance is deployed via FluxCD on DigitalOcean Kubernetes. See `interstellar-labs/do-k8s-infra` for the Helm configuration.

For ad-hoc deployment, this project can be deployed to Vercel with zero config — just set the environment variables in the Vercel dashboard.
