# Project Tracker
A full-stack project management application built as a portfolio project — focusing on real-world engineering decisions, not just working code.

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
- [x] Persist data to database (Prisma + Neon)
- [x] Optimistic UI updates for snappy interactions
- [ ] User authentication
- [ ] Dashboard with project analytics

### User Interactions
**Edit task**
1. User hovers on a card — background highlights and cursor changes to pointer.
2. User clicks the card — an inline edit form appears with task content and due date inputs.
3. User edits and clicks Save, or presses Enter — changes are applied.

**Delete task**
1. User hovers on a card — a trash icon appears in the top-right corner.
2. User clicks the icon — the task is removed from the column immediately.

**Add task**
1. User clicks "Add Task" at the bottom of a column — an inline form appears.
2. User types content and clicks save — the new task appears at the bottom of the column.

## Roadmap

- **Stage 1** - UI foundation: layout, kanban board, drag-and-drop ✅
- **Stage 2** - CRUD operations: add, edit, delete tasks ✅
- **Stage 3** - Database persistence: Prisma + Neon, Server Actions ✅
- **Stage 4** - Task data enrichment: due dates, priorities, labels, richer task details
- **Stage 5** - Deployment to Vercel
- **Stage 6** - Search and filtering: keyword search, filter by status/priority/due date/label, highlight overdue
- **Stage 7** - Dashboard and analytics: task counts, completion rate, overdue tasks, workflow trends
- **Stage 8** - Multi-board support and configurable columns: create/rename/delete boards and columns, custom workflows per board
- **Stage 9** - Authentication: personal boards, user accounts

See [DEVLOG.md](./DEVLOG.md) for decisions, trade-offs, and lessons learned along the way.
