"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { getUsers, saveSession } from "@/utils/localStorage"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const canSubmit = useMemo(
    () => email.trim().length > 0 && password.length > 0,
    [email, password]
  )

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const users = getUsers()
    const user = users.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    )

    if (!user) {
      setError("Invalid email or password.")
      return
    }

    saveSession({
      email: user.email,
      name: user.name,
      loggedInAt: new Date().toISOString(),
    })

    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-[var(--shadow-card)]">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome  Back</h1>
        <p className="mt-1 text-sm text-[var(--color-muted)]">Sign in to your Smart Todo account</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
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
            Sign In
          </button>
        </form>

        <p className="mt-4 text-sm text-[var(--color-muted)]">
          Don't have an account?{" "}
          <Link className="text-[color:var(--color-primary)]" href="/signup">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
