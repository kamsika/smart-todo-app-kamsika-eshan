"use client"

import type  { Task } from "@/types"

interface Props {
  task: Task
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function TaskItem({ task, toggleTask, deleteTask }: Props) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
            className="mt-1 h-4 w-4 accent-[color:var(--color-primary)]"
          />

          <div>
            <div className={task.completed ? "line-through text-[var(--color-muted)]" : ""}>
              {task.title}
            </div>
            <div className="mt-1 text-xs text-[var(--color-muted)]">
              Created {formatDate(task.createdAt)}
            </div>
          </div>
        </div>

        <button
          onClick={() => deleteTask(task.id)}
          className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-1.5 text-sm text-[color:var(--color-danger)] hover:bg-[color:var(--color-surface-2)]"
          aria-label="Delete task"
          title="Delete"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
