"use client"

import { Trophy, Star, Flame, Award, Lock, Target, GraduationCap, Brain } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Panel, Badge, Meter } from "@/components/ui-kit"
import { useProfile, levelFromScore, type BadgeId } from "@/lib/profile-context"
import { ACADEMY, QUIZZES } from "@/lib/data"
import { cn } from "@/lib/utils"

const BADGE_META: Record<BadgeId, { label: string; xp: number; desc: string }> = {
  rookie: { label: "Cyber Rookie", xp: 50, desc: "Earned your first 50 XP." },
  hunter: { label: "Threat Hunter", xp: 200, desc: "Reached 200 XP exploring the platform." },
  analyst: { label: "Security Analyst", xp: 500, desc: "Reached 500 XP. You know your stuff." },
  guardian: { label: "Cyber Guardian", xp: 1000, desc: "Reached 1000 XP. Elite defender status." },
}

const ORDER: BadgeId[] = ["rookie", "hunter", "analyst", "guardian"]

export default function AchievementsPage() {
  const { xp, badges, streak, awarenessScore, completedModules, quizHistory } = useProfile()
  const level = levelFromScore(awarenessScore)
  const nextBadge = ORDER.find((b) => !badges.includes(b))
  const nextThreshold = nextBadge ? BADGE_META[nextBadge].xp : null
  const quizzesTaken = new Set(quizHistory.map((q) => q.id)).size

  const stats = [
    { label: "Total XP", value: xp, icon: Star, tone: "text-primary" },
    { label: "Day Streak", value: streak, icon: Flame, tone: "text-warning" },
    { label: "Modules Done", value: `${completedModules.length}/${ACADEMY.length}`, icon: GraduationCap, tone: "text-success" },
    { label: "Quizzes Taken", value: `${quizzesTaken}/${QUIZZES.length}`, icon: Brain, tone: "text-accent" },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Achievements"
        description="Track your progress, badges, and streaks as you level up your security awareness."
        icon={<Trophy className="size-5" />}
      />

      <Panel className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid size-14 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
            <Award className="size-7" />
          </span>
          <div>
            <p className="text-sm text-muted-foreground">Current rank</p>
            <p className="text-xl font-bold">{level}</p>
          </div>
        </div>
        <div className="sm:w-64">
          <div className="mb-1 flex justify-between text-xs text-muted-foreground">
            <span>Awareness</span>
            <span>{awarenessScore}/100</span>
          </div>
          <Meter value={awarenessScore} tone="cyan" />
        </div>
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Panel key={s.label} className="p-4">
            <s.icon className={cn("mb-2 size-5", s.tone)} />
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </Panel>
        ))}
      </div>

      <div>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          <Target className="size-4" /> Badges
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ORDER.map((b) => {
            const earned = badges.includes(b)
            const meta = BADGE_META[b]
            return (
              <Panel
                key={b}
                className={cn("flex flex-col items-center p-5 text-center", !earned && "opacity-60")}
              >
                <span
                  className={cn(
                    "mb-3 grid size-14 place-items-center rounded-full border",
                    earned
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border bg-muted text-muted-foreground",
                  )}
                >
                  {earned ? <Trophy className="size-6" /> : <Lock className="size-5" />}
                </span>
                <p className="font-semibold">{meta.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{meta.desc}</p>
                <Badge tone={earned ? "green" : "muted"} className="mt-3">
                  {earned ? "Unlocked" : `${meta.xp} XP`}
                </Badge>
              </Panel>
            )
          })}
        </div>
      </div>

      {nextThreshold && (
        <Panel className="p-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold">Next badge: {BADGE_META[nextBadge!].label}</span>
            <span className="font-mono text-muted-foreground">
              {xp}/{nextThreshold} XP
            </span>
          </div>
          <Meter value={Math.min(100, Math.round((xp / nextThreshold) * 100))} tone="amber" />
        </Panel>
      )}
    </div>
  )
}
