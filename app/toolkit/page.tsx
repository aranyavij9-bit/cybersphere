"use client"

import { Wrench, ShieldCheck } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Panel, Meter, Badge } from "@/components/ui-kit"
import { TOOLKIT, type ToolkitItem } from "@/lib/data"
import { useProfile } from "@/lib/profile-context"
import { cn } from "@/lib/utils"

const CATEGORIES: ToolkitItem["category"][] = ["Accounts", "Devices", "Network", "Awareness"]

export default function ToolkitPage() {
  const { toolkitChecklist, toggleChecklist, ready } = useProfile()
  const checked = TOOLKIT.filter((t) => toolkitChecklist[t.id]).length
  const pct = Math.round((checked / TOOLKIT.length) * 100)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Safety Toolkit"
        description="Work through this personalized security checklist. Each step you complete lowers your risk score on the dashboard."
        icon={<Wrench className="size-5" />}
      />

      <Panel className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-success" />
            <span className="font-semibold">Your security posture</span>
          </div>
          <span className="font-mono text-sm text-muted-foreground">
            {checked}/{TOOLKIT.length} complete
          </span>
        </div>
        <Meter value={pct} tone={pct >= 70 ? "green" : pct >= 40 ? "amber" : "red"} />
        <p className="mt-2 text-sm text-muted-foreground">
          {pct >= 70
            ? "Strong posture. You've hardened most of your attack surface."
            : pct >= 40
              ? "Decent start - keep going to close the remaining gaps."
              : "High exposure. Complete the high-impact items first."}
        </p>
      </Panel>

      <div className="grid gap-6 md:grid-cols-2">
        {CATEGORIES.map((cat) => (
          <Panel key={cat} className="p-4">
            <h3 className="mb-3 flex items-center justify-between text-sm font-semibold">
              {cat}
              <Badge tone="muted">
                {TOOLKIT.filter((t) => t.category === cat && toolkitChecklist[t.id]).length}/
                {TOOLKIT.filter((t) => t.category === cat).length}
              </Badge>
            </h3>
            <ul className="space-y-2">
              {TOOLKIT.filter((t) => t.category === cat).map((t) => {
                const done = !!toolkitChecklist[t.id]
                return (
                  <li key={t.id}>
                    <button
                      onClick={() => toggleChecklist(t.id)}
                      disabled={!ready}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition-colors",
                        done ? "border-success/40 bg-success/5" : "border-border hover:border-primary/40",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 grid size-5 shrink-0 place-items-center rounded border transition-colors",
                          done ? "border-success bg-success text-background" : "border-muted-foreground/40",
                        )}
                      >
                        {done && <ShieldCheck className="size-3.5" />}
                      </span>
                      <span>
                        <span className={cn("block text-sm font-medium", done && "text-success")}>{t.label}</span>
                        <span className="block text-xs leading-relaxed text-muted-foreground">{t.detail}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </Panel>
        ))}
      </div>
    </div>
  )
}
