"use client"

import { usePathname } from "next/navigation"

export default function Footer() {
  const pathname = usePathname()
  const isAuth = pathname === "/login" || pathname === "/signup"
  if (isAuth) return null

  return (
    <footer className="mt-10 border-t border-[var(--color-border)] bg-white/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6 text-sm text-[var(--color-muted)]">
        <span>© {new Date().getFullYear()} Smart Todo </span>
        <span className="hidden sm:inline">Built with Next.js + TypeScript + Tailwind</span>
      </div>
    </footer>
  )
}
