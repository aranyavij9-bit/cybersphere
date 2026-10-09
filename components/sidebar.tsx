"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { NAV_ITEMS } from "@/lib/data"

const GROUPS = ["Operations", "Intelligence", "Learn", "About"]

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between gap-2 border-b border-sidebar-border px-4 py-4">
          <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
            <span className="grid size-9 place-items-center rounded-lg border border-primary/30 bg-primary/10 glow-cyan">
              <Shield className="size-5 text-primary" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-tight">CyberSphere</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-primary">SOC Console</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-sidebar-accent lg:hidden"
            aria-label="Close menu"
          >
            <X className="size-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {GROUPS.map((group) => (
            <div key={group} className="mb-3">
              <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {group}
              </p>
              <ul className="space-y-0.5">
                {NAV_ITEMS.filter((i) => i.group === group).map((item) => {
                  const active = pathname === item.href
                  const Icon = item.icon
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                          active
                            ? "bg-sidebar-accent font-medium text-primary"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                        )}
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="truncate">{item.label}</span>
                        {active && <span className="ml-auto size-1.5 rounded-full bg-primary" />}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-sidebar-border px-4 py-3">
          <p className="text-[11px] text-muted-foreground">
            Awareness over offense. Educational use only.
          </p>
        </div>
      </aside>
    </>
  )
}
