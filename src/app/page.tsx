"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import type { Task } from "@/types"
import { getSession, getTasks } from "@/utils/localStorage"

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    setTasks(getTasks())
    setName(getSession()?.name ?? null)
  }, [])

  const total = tasks.length
  const completed = useMemo(() => tasks.filter(t => t.completed).length, [tasks])
  const pending = total - completed
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight"> Smart Todo App </h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Stay organised. Stay productive. One task at a time.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/tasks"
            className="rounded-xl bg-[color:var(--color-primary)] px-6 py-3 font-medium text-white shadow-sm hover:bg-[color:var(--color-primary-2)]"
          >
            Manage Tasks
          </Link>
          <Link
            href={name ? "/tasks" : "/signup"}
            className="rounded-xl border border-[var(--color-border)] bg-white px-6 py-3 font-medium text-[var(--color-fg)] shadow-sm hover:bg-[color:var(--color-surface-2)]"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <StatCard label="Total Tasks" value={total} tone="blue" />
        <StatCard label="Pending" value={pending} tone="amber" />
        <StatCard label="Completed" value={completed} tone="green" />
      </div>

      <div className="mx-auto mt-8 max-w-3xl">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--color-muted)]">Progress</span>
          <span className="text-[var(--color-fg)]">{progress}%</span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-white shadow-sm">
          <div
            className="h-full rounded-full bg-[color:var(--color-primary)] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <FeatureCard title="Add Tasks Quickly" text="Type your task and press Enter. It's that simple." />
        <FeatureCard title="Filter with Ease" text="Switch between All, Pending, and Completed views instantly." />
        <FeatureCard title="Saved Automatically" text="All your tasks are stored in localStorage — no server needed." />
        <FeatureCard title="Fully Responsive" text="Works beautifully on desktop, tablet, and mobile." />
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone: "blue" | "amber" | "green"
}) {
  const tones: Record<typeof tone, string> = {
    blue: "bg-[#eef2ff]",
    amber: "bg-[#fff7ed]",
    green: "bg-[#ecfdf5]",
  }
  return (
    <div className={`rounded-2xl ${tones[tone]} p-6 text-center shadow-sm`}>
      <div className="text-3xl font-semibold text-[color:var(--color-primary)]">{value}</div>
      <div className="mt-2 text-sm text-[var(--color-muted)]">{label}</div>
    </div>
  )
}

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="font-medium">{title}</div>
      <div className="mt-1 text-sm text-[var(--color-muted)]">{text}</div>
    </div>
  )
}
