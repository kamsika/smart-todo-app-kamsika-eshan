"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { getUsers, saveSession, saveUsers } from "@/utils/localStorage"
import type { User } from "@/types"

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const canSubmit = useMemo(() => {
    return (
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      password.length >= 6 &&
      confirmPassword.length >= 6
    )
  }, [name, email, password, confirmPassword])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const users = getUsers()
    const normalizedEmail = email.trim().toLowerCase()
    const exists = users.some(u => u.email.toLowerCase() === normalizedEmail)

    if (exists) {
      setError("An account with this email already exists.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    const newUser: User = {
      name: name.trim(),
      email: normalizedEmail,
      password,
      createdAt: new Date().toISOString(),
    }

    saveUsers([...users, newUser])
    saveSession({
      email: newUser.email,
      name: newUser.name,
      loggedInAt: new Date().toISOString(),
    })

    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-[var(--shadow-card)]">
        <h1 className="text-2xl font-semibold tracking-tight">Create Account</h1>
        <p className="mt-1 text-sm text-[var(--color-muted)]">Start organising your tasks today</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <div className="space-y-1">
            <label className="text-sm text-[var(--color-muted)]">Full Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="Your name"
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/25"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-[var(--color-muted)]">Email Address</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/25"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-[var(--color-muted)]">Password</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="Min 6 characters"
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/25"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-[var(--color-muted)]">Confirm Password</label>
            <input
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]/25"
            />
          </div>

          {error ? (
            <div className="rounded-lg border border-[color:var(--color-danger)]/30 bg-[color:var(--color-danger)]/10 px-3 py-2 text-sm text-[color:var(--color-danger)]">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-lg bg-[color:var(--color-primary)] px-3 py-2 font-medium text-white hover:bg-[color:var(--color-primary-2)] disabled:opacity-50"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Already have an account?{" "}
          <Link className="text-[color:var(--color-primary)]" href="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
