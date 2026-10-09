"use client"

import { useState } from "react"
import { ShieldAlert, AlertTriangle, Eye, CheckCircle2, Phone, ChevronDown } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Panel, Badge } from "@/components/ui-kit"
import { SCAMS, type Scam } from "@/lib/data"
import { cn } from "@/lib/utils"

const SEV_TONE: Record<Scam["severity"], string> = {
  Critical: "red",
  High: "amber",
  Medium: "cyan",
}

function ScamCard({ scam }: { scam: Scam }) {
  const [open, setOpen] = useState(false)
  return (
    <Panel className="overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 p-4 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-destructive/30 bg-destructive/10 text-destructive">
            <ShieldAlert className="size-4" />
          </span>
          <div>
            <h3 className="font-semibold leading-tight">{scam.title}</h3>
            <Badge tone={SEV_TONE[scam.severity] as never} className="mt-1">
              {scam.severity}
            </Badge>
          </div>
        </div>
        <ChevronDown className={cn("size-5 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="space-y-4 border-t border-border px-4 py-4 text-sm">
          <div>
            <p className="mb-1 font-medium text-foreground">How it works</p>
            <p className="leading-relaxed text-muted-foreground">{scam.how}</p>
          </div>
          <div className="rounded-lg border border-border bg-muted/40 p-3">
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Real-world example</p>
            <p className="leading-relaxed text-foreground/90">{scam.example}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 flex items-center gap-1.5 font-medium text-warning">
                <Eye className="size-4" /> Warning signs
              </p>
              <ul className="space-y-1.5">
                {scam.warnings.map((w) => (
                  <li key={w} className="flex gap-2 leading-relaxed text-muted-foreground">
                    <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-warning" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 flex items-center gap-1.5 font-medium text-success">
                <CheckCircle2 className="size-4" /> How to stay safe
              </p>
              <ul className="space-y-1.5">
                {scam.prevention.map((p) => (
                  <li key={p} className="flex gap-2 leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-success" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Panel>
  )
}

export default function ScamHubPage() {
  const [filter, setFilter] = useState<"All" | Scam["severity"]>("All")
  const list = SCAMS.filter((s) => filter === "All" || s.severity === filter)

  return (
    <div className="space-y-6">
      <PageHeader
        title="India Scam Hub"
        description="Learn the most common digital scams in India, how to spot them, and how to protect yourself and your family."
        icon={<ShieldAlert className="size-5" />}
      />

      <Panel className="flex flex-wrap items-center justify-between gap-3 border-destructive/30 bg-destructive/5 p-4">
        <div className="flex items-center gap-3">
          <Phone className="size-5 text-destructive" />
          <div className="text-sm">
            <p className="font-semibold">Victim of a cyber fraud?</p>
            <p className="text-muted-foreground">
              Call the National Cyber Crime Helpline <span className="font-mono font-semibold text-foreground">1930</span> or
              report at cybercrime.gov.in
            </p>
          </div>
        </div>
      </Panel>

      <div className="flex flex-wrap gap-2">
        {(["All", "Critical", "High", "Medium"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              filter === f
                ? "border-primary bg-primary/15 text-primary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        {list.map((s) => (
          <ScamCard key={s.id} scam={s} />
        ))}
      </div>
    </div>
  )
}
