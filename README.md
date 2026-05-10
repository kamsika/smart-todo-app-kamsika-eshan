## Smart Todo App

A responsive **Smart Todo Application** built with **Next.js App Router** and **TypeScript**, using **localStorage** for persistence (no backend).

## Technologies Used

- **Next.js**: React framework with App Router, file-based routing, and Server Components
- **TypeScript**: Static typing for JavaScript — catches bugs before runtime
- **Tailwind CSS**: Utility-first CSS framework for fast, responsive styling
- **localStorage**: Browser API for client-side data persistence (no backend required)
- **React Hooks**: `useState`, `useEffect`, `useRouter` for state and side effects
- **Node.js**: JavaScript runtime required to run the Next.js development server

## Features

### Core Features

- **Add Task** — type a task title and press Enter or click Add
- **Display Tasks** — all tasks are listed with their creation date
- **Search Tasks** — live search with a search box (no search button)
- **Mark as Complete** — click the checkbox to toggle a task's completion state
- **Delete Task** — click the delete action to permanently remove a task
- **Filter Tasks** — switch between All, Pending, and Completed views
- **Clear Completed** — remove all done tasks with one click

### Bonus Features

- **Live progress bar** on the Home dashboard
- **Stats cards** showing total, pending, and completed counts
- **User registration (Sign Up) and login** with localStorage persistence
- **Header shows the logged-in user's name** and a logout button
- **Custom 404 Not Found** page
- **Responsive design** — works on mobile, tablet, and desktop

## Routing

- **`/`** — Dashboard with stats, progress bar, and feature highlights
- **`/tasks`** — Full task management (add, search, filter, toggle, delete, clear completed)
- **`/login`** — Login page (auth layout, no header/footer)
- **`/signup`** — Signup page (auth layout, no header/footer)
- **`/*`** — Custom 404 Not Found

The **login** and **signup** pages are placed inside `src/app/(auth)/` — a Next.js **Route Group**.
The parentheses in the folder name mean it **does not appear in the URL**, but it allows a different
`layout.tsx` to be applied, removing the **Header** and **Footer** for auth pages.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open `http://localhost:3000` with your browser to see the result.
