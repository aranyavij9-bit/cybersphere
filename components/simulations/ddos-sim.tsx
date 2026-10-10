"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, ShieldCheck, RotateCcw } from "lucide-react"
import { Panel, PanelHeader, Badge, Meter } from "@/components/ui-kit"
import { Button } from "@/components/ui/button"

interface Packet {
  id: number
  x: number
  y: number
  malicious: boolean
}

export function DDoSSim() {
  const [running, setRunning] = useState(false)
  const [mitigated, setMitigated] = useState(false)
  const [load, setLoad] = useState(8)
  const [packets, setPackets] = useState<Packet[]>([])
  const [rps, setRps] = useState(120)
  const counter = useRef(0)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      counter.current += 1
      const spawn = mitigated ? 4 : 14
      const fresh: Packet[] = Array.from({ length: spawn }, (_, i) => ({
        id: counter.current * 100 + i,
        x: Math.random() * 100,
        y: 0,
        malicious: mitigated ? Math.random() > 0.7 : Math.random() > 0.25,
      }))
      setPackets((prev) => [...prev, ...fresh].slice(-120))
      setLoad((l) => {
        const target = mitigated ? 35 : 98
        return Math.round(l + (target - l) * 0.18)
      })
      setRps((r) => {
        const target = mitigated ? 900 : 14800
        return Math.round(r + (target - r) * 0.15)
      })
    }, 220)
    return () => clearInterval(id)
  }, [running, mitigated])

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setPackets((prev) =>
        prev.map((p) => ({ ...p, y: p.y + 6 + Math.random() * 4 })).filter((p) => p.y < 105),
      )
    }, 60)
    return () => clearInterval(id)
  }, [running])

  function reset() {
    setRunning(false)
    setMitigated(false)
    setLoad(8)
    setRps(120)
    setPackets([])
  }

  const status = !running ? "Idle" : mitigated ? "Mitigating" : load > 90 ? "Overloaded" : "Under Attack"
  const statusTone = !running ? "muted" : mitigated ? "green" : "red"

  return (
    <Panel>
      <PanelHeader
        title="DDoS Attack Simulation"
        subtitle="Distributed Denial of Service - availability attack"
        action={<Badge tone={statusTone as "muted" | "green" | "red"}>{status}</Badge>}
      />
      <div className="grid gap-4 p-4 lg:grid-cols-[1.4fr_1fr]">
        {/* Visualization */}
        <div className="relative h-72 overflow-hidden rounded-2xl border border-border bg-background">
          {packets.map((p) => (
            <span
              key={p.id}
              className="absolute size-1.5 rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                backgroundColor: p.malicious ? "var(--destructive)" : "var(--primary)",
                boxShadow: `0 0 6px ${p.malicious ? "var(--destructive)" : "var(--primary)"}`,
              }}
            />
          ))}
          {/* server */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-3">
            <div
              className="grid h-12 w-40 place-items-center rounded-2xl border text-xs font-medium transition-colors"
              style={{
                borderColor: load > 90 ? "var(--destructive)" : "var(--primary)",
                color: load > 90 ? "var(--destructive)" : "var(--primary)",
                background: load > 90 ? "color-mix(in oklch, var(--destructive) 12%, transparent)" : "color-mix(in oklch, var(--primary) 10%, transparent)",
              }}
            >
              TARGET SERVER
            </div>
          </div>
        </div>

        {/* Controls + metrics */}
        <div className="flex flex-col gap-4">
          <div className="space-y-3 rounded-2xl border border-border p-3">
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-muted-foreground">Server load</span>
                <span className="font-mono font-medium">{load}%</span>
              </div>
              <Meter value={load} tone={load > 90 ? "red" : load > 50 ? "amber" : "green"} />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Requests / sec</span>
              <span className="font-mono font-semibold tabular-nums">{rps.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button size="lg" onClick={() => setRunning((r) => !r)}>
              {running ? <Pause className="size-4" /> : <Play className="size-4" />}
              {running ? "Pause" : "Start Attack"}
            </Button>
            <Button
              size="lg"
              variant={mitigated ? "secondary" : "outline"}
              onClick={() => setMitigated((m) => !m)}
              disabled={!running}
            >
              <ShieldCheck className="size-4" />
              {mitigated ? "Mitigation On" : "Mitigate"}
            </Button>
            <Button size="lg" variant="ghost" onClick={reset}>
              <RotateCcw className="size-4" />
              Reset
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">
            <p className="mb-1 font-medium text-foreground">What is happening?</p>
            A botnet floods the server with junk traffic (red packets) so legitimate users (cyan)
            can&apos;t get through. Enabling <span className="text-success">mitigation</span> applies
            rate-limiting and traffic scrubbing (like a CDN/WAF), dropping malicious requests and
            restoring availability.
          </div>
        </div>
      </div>
    </Panel>
  )
}
