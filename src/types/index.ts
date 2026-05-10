export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: string
}

export type TaskFilter = "all" | "pending" | "completed"

export interface User {
  name: string
  email: string
  password: string
  createdAt: string
}

export interface Session  {
  email: string
  name: string
  loggedInAt: string
}
