# Dev Log

A running record of problems solved, trade-offs made, lessons learned, and what's coming next.

---

## 2026-03-07 — Database persistence, drag-and-drop, and optimistic updates

### What I built
- Connected the board to a Neon PostgreSQL database via Prisma
- Implemented full CRUD for tasks: add, edit, delete — all persisted to the DB
- Wired up drag-and-drop ([@hello-pangea/dnd](https://github.com/hello-pangea/dnd)) with column-to-column card movement, also persisted
- Added optimistic UI updates so the board feels instant

### Problems I solved

**Server/client split in Next.js App Router**
The board needed to be a client component (for drag-and-drop interactivity), but data fetching works better in server components. I solved this by splitting into three layers:
- `page.tsx` (server) — fetches data from DB and transforms it
- `BoardWrapper.tsx` (client, `dynamic` with `ssr: false`) — prevents hydration mismatch
- `Board.tsx` (client) — handles all interactive state

**Database order gaps after deletion**
When a task is deleted, the remaining tasks can have non-contiguous `order` values (e.g. 1, 3, 4 after deleting order=2). This doesn't break anything yet, but will cause subtle bugs if I ever rely on order being sequential. Logged as a known issue to fix later.

### Trade-offs

- **Optimistic updates over server-confirmed updates:** The UI updates immediately and calls the server action in the background. This makes the app feel fast but means a failed server action leaves the UI out of sync. Acceptable for now — a retry or error toast can address it later.
- **No loading states yet:** Skipped skeleton loaders and error boundaries to move faster. Will add before deployment.

### What I learned
- Next.js Server Actions are a clean way to mutate data without building a separate API layer
- `dynamic(() => import(...), { ssr: false })` is the right pattern when a client component uses browser-only APIs on first render
- Prisma's type safety catches a lot of bugs at compile time that would otherwise show up at runtime

### What's next
- Task data enrichment: due dates, priorities, labels
- Deploy early — don't wait until the end

---

## 2026-03-23 — Task data enrichment: due date

### What I built
- Add `dueDate` (optional) and `createdAt` (auto-set) fields to the `Task` model
- Ran a Prisma migration to update the Neon DB schema
- Updated TypeScript types, server actions, and all UI components (Board, Column, Card) to support due dates
- Date input in both add and edit task forms

### Problem I solved

**Prisma client out of sync**
After adding fields to the schema, the Prisma client still had the old types. Fixed by running `pnpm prisma generate` and restarting the language server.

**Date input format mismatch**
A `Date` object's `.toString()` produces a long human-readable string, not the `YYYY-MM-DD` format a date input expects. Use `.toISOString().split('T')[0]` to format it correctly.

**`new Date()` is not `null`**
An empty string passed to `new Date()` produces an invalid Date, 

### Trade-offs
String state for date inputs - kept `taskDueDate` as a string inside components and only convert to `Date | null` at the point of calling the server action. Simpler than storing a `Date` object in state. 

### What I learned
- Controlled date inputs in React work best with string state - convert to `Date` only at the boundary
- Optimistic task objects must satisfy the full TypeScript type, even for fields like `createdAt` that the DB sets automatically

### What's next
- UI polish: column widths, horizontal scroll, improved add/edit form layout






## Template for future entries

```
## YYYY-MM-DD — [Short title]

### What I built

### Problems I solved

### Trade-offs

### What I learned

### What's next
```
