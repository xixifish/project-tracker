# Project Tracker
A lightweight project management tool for small teams to organize tasks, track progress, and collaborate.

## Tech Stack
| Tech | Why |
|------|-----|
| Next.js 14 | App Router for file-based routing, SSR capability |
| TypeScript | Type safety, better DX, fewer runtime bugs |
| Tailwind CSS | Rapid UI development, consistent design system |
| @hello-pangea/dnd | Accessible drag-and-drop for kanban board |

## Getting Start
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
pnpm run dev

Open http://localhost:3000

## Project Structure
```
src/
  ├── app/          # Pages and layouts (App Router)
  ├── components/   # Reusable UI components
  └── data/         # Types and mock data (replaced by DB later)
```

## Features
- [ ] Responsive sidebar navigation
- [x] Kanban board with columns (To Do, In Progress, Done)
- [x] Drag and drop cards between cards
- [ ] Create / edit / delete cards
- [ ] User authentication
- [ ] Real-time collaboration
- [ ] Dashboard with project analytics

### User Interactions
**Edit task**
1. User's mouse hovers on the card, then it shows edit and delete button. 
2. User clicks the edit button, and then the task content text changes to inline input box with save and cancel button. (ensure same mental model as adding task)
3. 

## Roadmap
- **Week 1** - UI foundation: layout, kanban board, drag-and-drop
- **Week 2** - Database + auth (Supabase), CRUD operations
- **Week 3** - Collaboration: team members, assignments, comments
- **Week 4** - Dashboard, testing, CI/CD, deployment
