"use client"

import { useEffect, useState } from "react"
import { Menu, Activity, Zap, ShieldCheck } from "lucide-react"
import { useProfile, levelFromScore } from "@/lib/profile-context"
import { Badge } from "@/components/ui-kit"

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return "Good morning"
  if (h < 17) return "Good afternoon"
  return "Good evening"
}

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const { name, xp, awarenessScore } = useProfile()
  const [clock, setClock] = useState("")

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md">
      <button
        onClick={onMenu}
        className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground hover:bg-muted lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </button>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold tracking-tight">
          {greeting()}, <span className="text-primary">{name ?? "Operator"}</span>
        </p>
        <p className="hidden text-xs text-muted-foreground sm:block">
          {levelFromScore(awarenessScore)} · Live monitoring active
        </p>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden items-center gap-2 md:flex">
          <Badge tone="green">
            <Activity className="size-3" />
            Systems Nominal
          </Badge>
          <Badge tone="cyan">
            <Zap className="size-3" />
            {xp} XP
          </Badge>
          <Badge tone="purple">
            <ShieldCheck className="size-3" />
            {awarenessScore}%
          </Badge>
        </div>
        <div className="rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-xs tabular-nums text-primary">
          {clock}
        </div>
      </div>
    </header>
  )
}
