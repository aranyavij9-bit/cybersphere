"use client"

import { Lightbulb, ArrowRight, ShieldCheck } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Panel, Badge } from "@/components/ui-kit"
import { RECOMMENDATIONS, DAILY_TIPS, type Recommendation } from "@/lib/data"
import { useProfile } from "@/lib/profile-context"
import Link from "next/link"

const PRIORITY_TONE: Record<Recommendation["priority"], string> = {
  High: "red",
  Medium: "amber",
  Low: "cyan",
}

export default function RecommendationsPage() {
  const { riskScore, name } = useProfile()
  // Surface higher-priority items first when risk is high
  const sorted = [...RECOMMENDATIONS].sort((a, b) => {
    const order = { High: 0, Medium: 1, Low: 2 }
    return order[a.priority] - order[b.priority]
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Recommendations"
        description={`Personalized security actions${name ? ` for ${name}` : ""}, prioritized by impact on your risk profile.`}
        icon={<Lightbulb className="size-5" />}
      />

      <Panel className="flex items-center gap-4 p-5">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
          <ShieldCheck className="size-6" />
        </span>
        <div>
          <p className="text-sm text-muted-foreground">Current risk score</p>
          <p className="text-2xl font-bold">
            {riskScore}
            <span className="text-base font-normal text-muted-foreground"> / 100</span>
          </p>
        </div>
        <p className="ml-auto max-w-xs text-pretty text-right text-sm text-muted-foreground">
          Completing the high-priority items below will have the biggest effect on lowering this score.
        </p>
      </Panel>

      <div className="grid gap-4 md:grid-cols-2">
        {sorted.map((r) => (
          <Panel key={r.id} className="flex flex-col gap-3 p-4">
            <div className="flex items-center justify-between gap-2">
              <Badge tone={PRIORITY_TONE[r.priority] as never}>{r.priority} priority</Badge>
              <Badge tone="muted">{r.tag}</Badge>
            </div>
            <h3 className="font-semibold leading-snug">{r.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{r.body}</p>
            <Link
              href="/toolkit"
              className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Take action in Toolkit <ArrowRight className="size-3.5" />
            </Link>
          </Panel>
        ))}
      </div>

      <Panel className="p-5">
        <h3 className="mb-3 flex items-center gap-2 font-semibold">
          <Lightbulb className="size-4 text-primary" /> Daily security tips
        </h3>
        <ul className="grid gap-2 sm:grid-cols-2">
          {DAILY_TIPS.map((tip) => (
            <li key={tip} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              {tip}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}
