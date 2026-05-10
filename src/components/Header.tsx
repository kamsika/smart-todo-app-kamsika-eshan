"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { clearSession, getSession } from "@/utils/localStorage"
import { useEffect, useState } from "react"
import type { Session } from "@/types"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    setSession(getSession())
  }, [pathname])

  const isAuth = pathname === "/login" || pathname === "/signup"
  if (isAuth) return null

  function logout() {
    clearSession()
    setSession(null)
    router.push("/login")
  }

  const linkBase = "text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)]"

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight">
           Smart Todo
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className={linkBase}>
            Home
          </Link>
          <Link href="/tasks" className={linkBase}>
            Tasks
          </Link>
          {session ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-[var(--color-muted)]">
                Hi, <span className="text-[var(--color-fg)]">{session.name}</span>
              </span>
              <button
                onClick={logout}
                className="rounded-lg border border-[var(--color-border)] bg-white px-4 py-1.5 hover:bg-[color:var(--color-surface-2)]"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-lg border border-[var(--color-border)] bg-white px-4 py-1.5 hover:bg-[color:var(--color-surface-2)]"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-[color:var(--color-primary)] px-4 py-1.5 font-medium text-white hover:bg-[color:var(--color-primary-2)]"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
