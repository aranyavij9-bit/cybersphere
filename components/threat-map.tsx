"use client"

import { useEffect, useRef, useState } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from "react-simple-maps"
import { motion, AnimatePresence } from "framer-motion"
import { Globe, Radio, Activity } from "lucide-react"
import { Panel, PanelHeader, Badge, severityTone } from "@/components/ui-kit"
import { PageHeader } from "@/components/page-header"
import { GEO_COUNTRIES, GEO_URL, type GeoCountry } from "@/lib/geo-data"
import { ATTACK_TYPES } from "@/lib/data"

interface Arc {
  id: string
  from: GeoCountry
  to: GeoCountry
  type: string
  severity: "Critical" | "High" | "Medium" | "Low"
  at: number
}

const SEVERITIES: Arc["severity"][] = ["Critical", "High", "Medium", "Low"]
const sevColor: Record<Arc["severity"], string> = {
  Critical: "var(--destructive)",
  High: "var(--warning)",
  Medium: "var(--accent)",
  Low: "var(--primary)",
}

function pick<T>(a: T[]): T {
  return a[Math.floor(Math.random() * a.length)]
}

function makeArc(): Arc {
  let from = pick(GEO_COUNTRIES)
  let to = pick(GEO_COUNTRIES)
  while (to.code === from.code) to = pick(GEO_COUNTRIES)
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    from,
    to,
    type: pick(ATTACK_TYPES),
    severity: pick(SEVERITIES),
    at: Date.now(),
  }
}

export function ThreatMap() {
  const [arcs, setArcs] = useState<Arc[]>([])
  const [feed, setFeed] = useState<Arc[]>([])
  const [total, setTotal] = useState(0)
  const seeded = useRef(false)

  useEffect(() => {
    if (!seeded.current) {
      seeded.current = true
      const init = Array.from({ length: 5 }, makeArc)
      setArcs(init)
      setFeed(init)
      setTotal(24310 + Math.floor(Math.random() * 5000))
    }
    const id = setInterval(() => {
      const a = makeArc()
      setArcs((prev) => [...prev, a].slice(-8))
      setFeed((prev) => [a, ...prev].slice(0, 30))
      setTotal((c) => c + 1 + Math.floor(Math.random() * 2))
    }, 1500)
    return () => clearInterval(id)
  }, [])

  // expire arcs visually
  useEffect(() => {
    const id = setInterval(() => {
      setArcs((prev) => prev.filter((a) => Date.now() - a.at < 6000))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const topTargets = feed.reduce<Record<string, number>>((acc, a) => {
    acc[a.to.name] = (acc[a.to.name] || 0) + 1
    return acc
  }, {})
  const ranked = Object.entries(topTargets)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <div>
      <PageHeader
        icon={<Globe className="size-5" />}
        title="Live Threat Map"
        description="Simulated real-time attack routes between countries. Continuously generated so the SOC view always stays active."
        action={
          <Badge tone="cyan">
            <Radio className="size-3 animate-pulse" />
            Live
          </Badge>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Panel className="overflow-hidden">
          <PanelHeader
            title="Global Attack Activity"
            subtitle={`${total.toLocaleString()} attacks tracked`}
            icon={<Activity className="size-4" />}
          />
          <div className="relative bg-background">
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" />
            <ComposableMap
              projectionConfig={{ scale: 145 }}
              width={800}
              height={400}
              style={{ width: "100%", height: "auto" }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="oklch(0.24 0.025 255)"
                      stroke="oklch(0.32 0.03 255)"
                      strokeWidth={0.4}
                      style={
                        {
                          default: { outline: "none" },
                          hover: { fill: "oklch(0.28 0.03 255)", outline: "none" },
                          pressed: { outline: "none" },
                        } as never
                      }
                    />
                  ))
                }
              </Geographies>

              {arcs.map((a) => (
                <Line
                  key={a.id}
                  from={a.from.coords}
                  to={a.to.coords}
                  stroke={sevColor[a.severity]}
                  strokeWidth={1.2}
                  strokeLinecap="round"
                  style={{ opacity: 0.7, filter: `drop-shadow(0 0 2px ${sevColor[a.severity]})` }}
                />
              ))}

              {GEO_COUNTRIES.map((c) => {
                const isTarget = arcs.some((a) => a.to.code === c.code)
                return (
                  <Marker key={c.code} coordinates={c.coords}>
                    <circle
                      r={isTarget ? 4 : 2}
                      fill={isTarget ? "var(--destructive)" : "var(--primary)"}
                      opacity={isTarget ? 0.9 : 0.5}
                    />
                    {isTarget && (
                      <circle r={4} fill="none" stroke="var(--destructive)" strokeWidth={0.8}>
                        <animate attributeName="r" from="4" to="11" dur="1.4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.8" to="0" dur="1.4s" repeatCount="indefinite" />
                      </circle>
                    )}
                  </Marker>
                )
              })}
            </ComposableMap>
          </div>
          <div className="flex flex-wrap gap-3 border-t border-border px-4 py-3 text-xs">
            {SEVERITIES.map((s) => (
              <span key={s} className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full" style={{ background: sevColor[s] }} />
                {s}
              </span>
            ))}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel>
            <PanelHeader title="Top Targeted" subtitle="By recent volume" />
            <div className="space-y-2 p-3">
              {ranked.map(([name, count], i) => (
                <div key={name} className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm">
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{i + 1}</span>
                    {name}
                  </span>
                  <span className="font-mono text-xs text-destructive">{count}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Live Attack Stream" />
            <div className="max-h-72 divide-y divide-border overflow-y-auto">
              <AnimatePresence initial={false}>
                {feed.slice(0, 12).map((a) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 px-3 py-2 text-xs"
                  >
                    <Badge tone={severityTone(a.severity)}>{a.severity}</Badge>
                    <span className="truncate">
                      <span className="font-medium">{a.type}</span>{" "}
                      <span className="text-muted-foreground">
                        {a.from.code} → {a.to.code}
                      </span>
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
