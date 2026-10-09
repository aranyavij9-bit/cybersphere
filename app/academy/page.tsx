"use client"

import { GraduationCap, CheckCircle2, Circle, BookOpen } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Panel, Badge, Meter } from "@/components/ui-kit"
import { ACADEMY, type AcademyModule } from "@/lib/data"
import { useProfile } from "@/lib/profile-context"
import { cn } from "@/lib/utils"

const LEVEL_TONE: Record<AcademyModule["level"], string> = {
  Beginner: "green",
  Intermediate: "amber",
  Advanced: "red",
}

export default function AcademyPage() {
  const { completedModules, completeModule, ready } = useProfile()
  const done = completedModules.length
  const pct = Math.round((done / ACADEMY.length) * 100)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cyber Academy"
        description="Structured learning paths from beginner fundamentals to advanced SOC operations. Complete modules to earn XP."
        icon={<GraduationCap className="size-5" />}
      />

      <Panel className="p-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold">Learning progress</span>
          <span className="font-mono text-muted-foreground">
            {done}/{ACADEMY.length} modules
          </span>
        </div>
        <Meter value={pct} tone="cyan" />
      </Panel>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ACADEMY.map((m) => {
          const isDone = completedModules.includes(m.id)
          return (
            <Panel key={m.id} className="flex flex-col p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="grid size-9 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                  <BookOpen className="size-4" />
                </span>
                <Badge tone={LEVEL_TONE[m.level] as never}>{m.level}</Badge>
              </div>
              <h3 className="font-semibold">{m.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.summary}</p>
              <ul className="my-3 space-y-1.5">
                {m.lessons.map((l) => (
                  <li key={l} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Circle className="size-3 text-primary/60" />
                    {l}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => completeModule(m.id)}
                disabled={!ready || isDone}
                className={cn(
                  "mt-auto inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                  isDone
                    ? "border-success/40 bg-success/10 text-success"
                    : "border-primary bg-primary text-primary-foreground hover:bg-primary/90",
                )}
              >
                {isDone ? (
                  <>
                    <CheckCircle2 className="size-4" /> Completed
                  </>
                ) : (
                  "Mark as complete (+40 XP)"
                )}
              </button>
            </Panel>
          )
        })}
      </div>
    </div>
  )
}
