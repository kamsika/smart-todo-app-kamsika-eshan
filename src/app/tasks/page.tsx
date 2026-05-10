"use client"

import { useEffect, useMemo, useState } from "react"
import type { Task, TaskFilter } from "@/types"
import { getTasks, saveTasks } from "@/utils/localStorage"
import TaskItem from "@/components/TaskItem"
import TaskFilterBar from "@/components/TaskFilter"

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState("")
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<TaskFilter>("all")

  useEffect(() => {
    setTasks(getTasks())
  }, [])

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  function addTask() {
    const trimmed = title.trim()
    if (!trimmed) return

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: trimmed,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    setTasks(prev => {
      const next = [newTask, ...prev]
      saveTasks(next)
      return next
    })
    setTitle("")
  }

  function toggleTask(id: string) {
    setTasks(prev => {
      const next = prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
      saveTasks(next)
      return next
    })
  }

  function deleteTask(id: string) {
    setTasks(prev => {
      const next = prev.filter(t => t.id !== id)
      saveTasks(next)
      return next
    })
  }

  function clearCompleted() {
    setTasks(prev => {
      const next = prev.filter(t => !t.completed)
      saveTasks(next)
      return next
    })
  }

  const visibleTasks = useMemo(() => {
    const q = query.trim().toLowerCase()
    return tasks.filter(t => {
      if (filter === "pending" && t.completed) return false
      if (filter === "completed" && !t.completed) return false
      if (!q) return true
      return t.title.toLowerCase().includes(q)
    })
  }, [tasks, filter, query])

  const completedCount = useMemo(() => tasks.filter(t => t.completed).length, [tasks])
  const pendingCount = tasks.length - completedCount

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="text-4xl font-semibold tracking-tight">My Tasks</h1>
      <p className="mt-2 text-[var(--color-muted)]">
        Add, complete, and delete your tasks below.
      </p>

      <div className="mt-8 rounded-2xl bg-[color:var(--color-surface)] p-6 shadow-[var(--shadow-card)]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") addTask()
              }}
              placeholder="What do you need to do?"
              className="flex-1 rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/25"
            />
            <button
              onClick={addTask}
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <TaskFilterBar
              filter={filter}
              setFilter={setFilter}
              allCount={tasks.length}
              pendingCount={pendingCount}
              completedCount={completedCount}
            />

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full sm:w-56 rounded-xl border border-[var(--color-border)] bg-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/25"
              />
              <button
                onClick={clearCompleted}
                className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm hover:bg-[color:var(--color-surface-2)]"
              >
                Clear Completed
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        {visibleTasks.length === 0 ? (
          <div className="text-center text-[var(--color-muted)]">
            No tasks yet. Add one above!
          </div>
        ) : (
          visibleTasks.map(task => (
            <TaskItem key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
          ))
        )}
      </div>
    </div>
  )
}
