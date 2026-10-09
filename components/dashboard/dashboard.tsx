"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShieldAlert,
  Activity,
  Lightbulb,
  Zap,
  TrendingUp,
  ArrowUpRight,
  Flame,
  Radio,
  Trophy,
  Brain,
  Swords,
} from "lucide-react"
import { Panel, PanelHeader, Badge, Meter, severityTone } from "@/components/ui-kit"
import { RiskGauge } from "@/components/dashboard/risk-gauge"
import { useProfile, levelFromScore } from "@/lib/profile-context"
import { useThreatFeed } from "@/lib/use-threat-feed"
import { DAILY_TIPS } from "@/lib/data"

function StatCard({
  icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub: string
  tone: "cyan" | "purple" | "red" | "green"
}) {
  const ring: Record<string, string> = {
    cyan: "text-primary",
    purple: "text-accent",
    red: "text-destructive",
    green: "text-success",
  }
  return (
    <Panel className="p-4">
      <div className="flex items-center justify-between">
        <span className={ring[tone]}>{icon}</span>
        <ArrowUpRight className="size-4 text-muted-foreground" />
      </div>
      <p className="mt-3 text-2xl font-bold tabular-nums">{value}</p>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </Panel>
  )
}

export function Dashboard() {
  const { name, xp, awarenessScore, riskScore, streak, completedModules, badges } = useProfile()
  const { events, total } = useThreatFeed(2000, 8)
  const [tipIndex, setTipIndex] = useState(0)

  useEffect(() => {
    setTipIndex(Math.floor(Math.random() * DAILY_TIPS.length))
  }, [])

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 scanline">
        <div className="grid-bg absolute inset-0 opacity-40" aria-hidden />
        <div className="relative z-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge tone="cyan">
              <Radio className="size-3 animate-pulse" />
              Live SOC Feed
            </Badge>
            <h1 className="mt-3 text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome back, <span className="text-primary text-glow">{name}</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Awareness level: <span className="text-foreground">{levelFromScore(awarenessScore)}</span> · {" "}
              {streak}-day streak · {completedModules.length} modules complete
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/simulations"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <Swords className="size-4" />
              Run Simulation
            </Link>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <Brain className="size-4" />
              Take Quiz
            </Link>
          </div>
        </div>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={<Flame className="size-5" />} label="Global Attacks" value={total.toLocaleString()} sub="Detected today" tone="red" />
        <StatCard icon={<Zap className="size-5" />} label="Your XP" value={xp.toLocaleString()} sub={`${badges.length} badges earned`} tone="cyan" />
        <StatCard icon={<TrendingUp className="size-5" />} label="Awareness" value={`${awarenessScore}%`} sub="Knowledge index" tone="purple" />
        <StatCard icon={<Activity className="size-5" />} label="Streak" value={`${streak}d`} sub="Keep learning daily" tone="green" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Risk + health */}
        <Panel className="lg:col-span-1">
          <PanelHeader title="Security Health" subtitle="Your personal posture" icon={<ShieldAlert className="size-4" />} />
          <div className="p-4">
            <RiskGauge score={riskScore} />
            <div className="mt-4 space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-muted-foreground">Awareness</span>
                  <span className="font-medium">{awarenessScore}%</span>
                </div>
                <Meter value={awarenessScore} tone="cyan" />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-muted-foreground">Protection coverage</span>
                  <span className="font-medium">{Math.max(0, 100 - riskScore)}%</span>
                </div>
                <Meter value={Math.max(0, 100 - riskScore)} tone="green" />
              </div>
            </div>
          </div>
        </Panel>

        {/* Threat feed */}
        <Panel className="lg:col-span-2">
          <PanelHeader
            title="Threat Activity Feed"
            subtitle="Simulated real-time intrusions"
            icon={<Activity className="size-4" />}
            action={
              <Link href="/threat-map" className="text-xs text-primary hover:underline">
                View map
              </Link>
            }
          />
          <div className="divide-y divide-border">
            <AnimatePresence initial={false}>
              {events.map((e) => (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 px-4 py-2.5"
                >
                  <span className="font-mono text-xs text-muted-foreground tabular-nums">
                    {new Date(e.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </span>
                  <Badge tone={severityTone(e.severity)}>{e.severity}</Badge>
                  <span className="truncate text-sm">
                    <span className="font-medium">{e.type}</span>{" "}
                    <span className="text-muted-foreground">
                      {e.sourceCode} → {e.targetCode}
                    </span>
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Panel>
      </div>

      {/* Daily tip + quick links */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-2" glow>
          <PanelHeader title="Daily Cyber Tip" icon={<Lightbulb className="size-4" />} />
          <div className="flex items-start gap-3 p-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-warning/15 text-warning">
              <Lightbulb className="size-5" />
            </span>
            <p className="text-pretty text-sm leading-relaxed">{DAILY_TIPS[tipIndex]}</p>
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Continue Learning" icon={<Trophy className="size-4" />} />
          <div className="space-y-2 p-3">
            {[
              { href: "/academy", label: "Cyber Academy", desc: "Structured courses" },
              { href: "/scam-hub", label: "India Scam Hub", desc: "Avoid common frauds" },
              { href: "/toolkit", label: "Safety Toolkit", desc: "Password & checklists" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-sm hover:bg-muted"
              >
                <span>
                  <span className="font-medium">{l.label}</span>
                  <span className="block text-xs text-muted-foreground">{l.desc}</span>
                </span>
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}
