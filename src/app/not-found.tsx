import Link from "next/link"

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col items-center justify-center px-4 text-center">
      <div className="rounded-2xl border border-[var(--color-border)] bg-[color:var(--color-surface)] p-8">
        <div className="text-5xl font-semibold tracking-tight">404</div>
        <p className="mt-2 text-[var(--color-muted)]">Page not found..</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-[color:var(--color-primary)] px-4 py-2 font-medium text-black"
          >
            Go Home
          </Link>
          <Link
            href="/tasks"
            className="rounded-lg border border-[var(--color-border)] bg-[color:var(--color-surface-2)] px-4 py-2 font-medium hover:bg-[color:var(--color-surface)]"
          >
            Open Tasks
          </Link>
        </div>
      </div>
    </div>
  )
}
