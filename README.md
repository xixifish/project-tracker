# Project Tracker
A lightweight project management tool to organize tasks and track progress on a Kanban board.

## Tech Stack
| Tech | Why |
|------|-----|
| Next.js 16 | App Router for file-based routing, Server Actions, SSR |
| TypeScript | Type safety, better DX, fewer runtime bugs |
| Tailwind CSS | Rapid UI development, consistent design system |
| @hello-pangea/dnd | Accessible drag-and-drop for kanban board |
| Prisma | Type-safe ORM for database access |
| Neon | Serverless PostgreSQL database |

## Getting Started
### Prerequisites
- Node.js 18+
- pnpm

### Run Locally
**SSH**
git clone git@github.com:xixifish/project-tracker.git
**or HTTPS**
git clone https://github.com/xixifish/project-tracker.git

cd project-tracker
pnpm install

Create a `.env.local` file in the root and add your database connection string:
```
DATABASE_URL="your_neon_postgres_connection_string"
```

pnpm run dev

Open http://localhost:3000

## Project Structure
```
src/
  ├── app/          # Pages and layouts (App Router)
  ├── components/   # Reusable UI components
  └── types/        # TypeScript type definitions
prisma/
  ├── schema.prisma # Database schema
  └── seed.ts       # Database seed script
```

## Features
- [x] Responsive sidebar navigation
- [x] Kanban board with columns (To Do, In Progress, Done)
- [x] Drag and drop cards between columns
- [x] Create / edit / delete cards
- [ ] Persist data to database
- [ ] User authentication
- [ ] Dashboard with project analytics

### User Interactions
**Edit task**
1. User hovers on a card — edit and delete buttons appear.
2. User clicks edit — task content becomes an inline input with save and cancel buttons.
3. User clicks save — changes are applied. Cancel discards the edit and restores the original content.

**Delete task**
1. User hovers on a card — edit and delete buttons appear.
2. User clicks delete — the task is removed from the column immediately.

**Add task**
1. User clicks "Add Task" at the bottom of a column — an inline form appears.
2. User types content and clicks save — the new task appears at the bottom of the column.

## Roadmap
- **Stage 1** - UI foundation: layout, kanban board, drag-and-drop ✅
- **Stage 2** - CRUD operations: add, edit, delete tasks ✅
- **Stage 3** - Database persistence: Prisma + Neon, Server Actions
- **Stage 4** - Dashboard with task analytics
- **Stage 5** - User authentication (Clerk)
- **Stage 6** - Deployment to Vercel
