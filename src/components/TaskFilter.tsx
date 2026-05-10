"use client"

import type { TaskFilter } from "@/types"

interface Props {
  filter: TaskFilter
  setFilter: (value: TaskFilter) => void
  allCount: number
  pendingCount: number
  completedCount: number
}

export default function TaskFilterBar({
  filter,
  setFilter,
  allCount,
  pendingCount,
  completedCount,
}: Props) {
  const base =
    "inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm shadow-sm hover:bg-[color:var(--color-surface-2)]"

  function badge(count: number, active: boolean) {
    return (
      <span
        className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs ${
          active ? "bg-white/25 text-white" : "bg-[color:var(--color-bg)] text-[var(--color-muted)]"
        }`}
      >
        {count}
      </span>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setFilter("all")}
        className={`${base} ${
          filter === "all"
            ? "bg-[color:var(--color-primary)] text-white border-transparent"
            : "text-[var(--color-muted)]"
        }`}
      >
        All {badge(allCount, filter === "all")}
      </button>
      <button
        onClick={() => setFilter("pending")}
        className={`${base} ${
          filter === "pending"
            ? "bg-[color:var(--color-primary)] text-white border-transparent"
            : "text-[var(--color-muted)]"
        }`}
      >
        Pending {badge(pendingCount, filter === "pending")}
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`${base} ${
          filter === "completed"
            ? "bg-[color:var(--color-primary)] text-white border-transparent"
            : "text-[var(--color-muted)]"
        }`}
      >
        Completed  {badge(completedCount, filter === "completed")}
      </button>
    </div>
  )
}
