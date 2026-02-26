# AGENTS.md — Mission Control

Guidelines for AI agents working on this codebase.

## What This App Is

Mission Control is Jarvis's personal dashboard — a real-time Next.js app backed by Convex. It surfaces task management, memory browsing, and agent orchestration for Chuka and Jarvis to work from.

## Stack

- **Next.js 15** — App Router, React Server Components where appropriate
- **Convex** — real-time database + serverless backend functions
- **shadcn/ui + Tailwind CSS** — component library and styling
- **TypeScript strict** — no `any`, no shortcuts
- **@dnd-kit** — drag-and-drop for the task board

## Project Structure

```
app/
  (dashboard)/          # Authenticated dashboard layout + routes
    tasks/              # Task board (kanban)
    memory/             # Memory file browser
    calendar/           # Calendar view
  api/
    cron/               # Memory sync endpoint (called by Jarvis)
convex/
  schema.ts             # Database schema — source of truth for data shapes
  tasks.ts              # Task mutations + queries
  memories.ts           # Memory sync functions
components/
  sidebar.tsx           # Main navigation
  tasks/                # Task board components
  memory/               # Memory browser components
  ui/                   # Shared primitives (shadcn)
lib/
  convex-provider.tsx   # Convex client setup
hooks/                  # Shared React hooks
```

## Coding Standards

- **TypeScript strict** — all types explicit, no implicit `any`
- **Server Components by default** — only add `"use client"` when you need interactivity or browser APIs
- **Convex for all data** — no direct DB calls, no REST endpoints for data. Everything goes through Convex queries/mutations
- **shadcn/ui components** — reach for existing components before building custom ones. Check `components/ui/` first
- **Tailwind for styling** — no inline styles, no CSS modules, no external CSS files beyond `globals.css`
- **Error + loading states** — every async UI must handle loading and error explicitly. Never leave them blank.

## Convex Conventions

- Schema changes go in `convex/schema.ts` first — never mutate data shapes without updating the schema
- Queries are read-only — mutations handle all writes
- Use `.index()` for any field you filter or sort by
- Function names: `get<Thing>`, `list<Things>`, `create<Thing>`, `update<Thing>`, `delete<Thing>`

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_CONVEX_URL` | Convex deployment URL — required |
| `OPENCLAW_GATEWAY_URL` | Jarvis gateway URL — for memory sync cron |
| `OPENCLAW_GATEWAY_TOKEN` | Jarvis gateway auth token — for memory sync cron |

Never hardcode secrets. Never commit `.env.local`.

## Running Locally

See `README.md` for full setup. Quick version:

```bash
npm install
npx convex dev        # terminal 1 — keep running
npm run dev           # terminal 2
```

## Task Protocol

1. Read this file and `README.md` before touching anything
2. Create `tasks.md` in the project root with a checkbox list of subtasks
3. Make changes in a feature branch: `feat/<short-description>`
4. Run `npm run build` and `npm run lint` before marking done — no broken builds
5. Open a PR when done — don't merge yourself
6. Write `done.txt` on completion:
   ```
   STATUS: complete
   SUMMARY: <what you built>
   BRANCH: <branch name>
   PR: <PR URL>
   ```
