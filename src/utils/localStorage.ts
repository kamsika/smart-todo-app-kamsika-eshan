import type { Session, Task, User } from "@/types"

const TASKS_KEY = "smart_todo_tasks"
const USERS_KEY = "smart_todo_users"
const SESSION_KEY = "smart_todo_session"

function safeParseJson<T>(raw: string | null): T | null {
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function getTasks(): Task[] {
  return safeParseJson<Task[]>(localStorage.getItem(TASKS_KEY)) ?? []
}

export function saveTasks(tasks: Task[]) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
}

export function getUsers(): User[] {
  return safeParseJson<User[]>(localStorage.getItem(USERS_KEY)) ?? []
}

export function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getSession(): Session | null {
  return safeParseJson<Session>(localStorage.getItem(SESSION_KEY))
}

export function saveSession(session: Session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}
