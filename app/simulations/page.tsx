"use client"

import { useState } from "react"
import { Swords, Network, Mail, KeyRound, Bug } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { DDoSSim } from "@/components/simulations/ddos-sim"
import { PhishingSim } from "@/components/simulations/phishing-sim"
import { BruteForceSim } from "@/components/simulations/brute-force-sim"
import { MalwareSim } from "@/components/simulations/malware-sim"
import { cn } from "@/lib/utils"

const TABS = [
  { id: "ddos", label: "DDoS", icon: Network },
  { id: "phishing", label: "Phishing", icon: Mail },
  { id: "brute", label: "Brute Force", icon: KeyRound },
  { id: "malware", label: "Malware", icon: Bug },
] as const

export default function SimulationsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("ddos")

  return (
    <div>
      <PageHeader
        icon={<Swords className="size-5" />}
        title="Attack Simulation Center"
        description="Safe, frontend-only simulations that show how attacks unfold and how defenders respond. No real systems are touched."
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {TABS.map((t) => {
          const Icon = t.icon
          const active = tab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-muted",
              )}
            >
              <Icon className="size-4" />
              {t.label}
            </button>
          )
        })}
      </div>

      {tab === "ddos" && <DDoSSim />}
      {tab === "phishing" && <PhishingSim />}
      {tab === "brute" && <BruteForceSim />}
      {tab === "malware" && <MalwareSim />}
    </div>
  )
}
