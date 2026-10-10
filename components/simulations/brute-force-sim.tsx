"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, RotateCcw, KeyRound } from "lucide-react"
import { Panel, PanelHeader, Badge } from "@/components/ui-kit"
import { Button } from "@/components/ui/button"

const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%"

// Rough crack-time estimate for display (educational, simplified)
function estimateCrackTime(pw: string): string {
  let pool = 0
  if (/[a-z]/.test(pw)) pool += 26
  if (/[A-Z]/.test(pw)) pool += 26
  if (/[0-9]/.test(pw)) pool += 10
  if (/[^a-zA-Z0-9]/.test(pw)) pool += 12
  if (pool === 0 || pw.length === 0) return "instant"
  const guesses = Math.pow(pool, pw.length) / 2
  const perSec = 1e10 // 10 billion/sec offline
  const seconds = guesses / perSec
  if (seconds < 1) return "instant"
  if (seconds < 60) return `${Math.round(seconds)} sec`
  if (seconds < 3600) return `${Math.round(seconds / 60)} min`
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`
  if (seconds < 2.6e6) return `${Math.round(seconds / 86400)} days`
  if (seconds < 3.15e7) return `${Math.round(seconds / 2.6e6)} months`
  if (seconds < 3.15e11) return `${Math.round(seconds / 3.15e7)} years`
  return "centuries"
}

function Cracker({ target, label, weak }: { target: string; label: string; weak: boolean }) {
  const [running, setRunning] = useState(false)
  const [guess, setGuess] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [cracked, setCracked] = useState(false)
  const lockedRef = useRef(0)

  useEffect(() => {
    if (!running || cracked) return
    const id = setInterval(() => {
      setAttempts((a) => a + (weak ? 1 : 1))
      // weak password: gradually lock characters. strong: mostly random churn
      if (weak) {
        const speed = 0.08
        if (Math.random() < speed && lockedRef.current < target.length) {
          lockedRef.current += 1
        }
        const locked = target.slice(0, lockedRef.current)
        const rest = Array.from({ length: target.length - lockedRef.current }, () =>
          CHARS[Math.floor(Math.random() * CHARS.length)],
        ).join("")
        setGuess(locked + rest)
        if (lockedRef.current >= target.length) {
          setCracked(true)
          setRunning(false)
        }
      } else {
        setGuess(
          Array.from({ length: target.length }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join(""),
        )
      }
    }, 40)
    return () => clearInterval(id)
  }, [running, cracked, target, weak])

  function reset() {
    setRunning(false)
    setGuess("")
    setAttempts(0)
    setCracked(false)
    lockedRef.current = 0
  }

  return (
    <div className="rounded-2xl border border-border p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <Badge tone={weak ? "red" : "green"}>{weak ? "Weak" : "Strong"}</Badge>
      </div>
      <p className="mb-1 text-xs text-muted-foreground">Target password</p>
      <code className="mb-3 block rounded bg-muted px-2 py-1 font-mono text-sm">{target}</code>
      <p className="mb-1 text-xs text-muted-foreground">Attacker guess</p>
      <code
        className="mb-3 block rounded px-2 py-1 font-mono text-sm"
        style={{
          background: cracked ? "color-mix(in oklch, var(--destructive) 14%, transparent)" : "var(--muted)",
          color: cracked ? "var(--destructive)" : "var(--foreground)",
        }}
      >
        {guess || "-".repeat(target.length)}
      </code>
      <div className="mb-3 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Attempts</span>
        <span className="font-mono tabular-nums">{attempts.toLocaleString()}</span>
      </div>
      <div className="mb-3 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Est. real crack time</span>
        <span className="font-mono font-medium" style={{ color: weak ? "var(--destructive)" : "var(--success)" }}>
          {estimateCrackTime(target)}
        </span>
      </div>
      {cracked && (
        <p className="mb-3 rounded bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive">
          Password cracked!
        </p>
      )}
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setRunning((r) => !r)} disabled={cracked}>
          {running ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          {running ? "Pause" : "Attack"}
        </Button>
        <Button size="sm" variant="ghost" onClick={reset}>
          <RotateCcw className="size-3.5" />
          Reset
        </Button>
      </div>
    </div>
  )
}

export function BruteForceSim() {
  return (
    <Panel>
      <PanelHeader
        title="Brute Force Visualization"
        subtitle="Why password strength matters"
        icon={<KeyRound className="size-4" />}
      />
      <div className="grid gap-4 p-4 md:grid-cols-2">
        <Cracker target="cat123" label="Common password" weak />
        <Cracker target="9xK!mP2$vQ7" label="Random strong password" weak={false} />
      </div>
      <div className="mx-4 mb-4 rounded-2xl border border-border bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">
        <p className="mb-1 font-medium text-foreground">The takeaway</p>
        A short, common password is guessed almost instantly because attackers try dictionaries and
        common patterns first. Each extra character and character type multiplies the search space,
        pushing real-world crack time into years or centuries. Use long passphrases and a password
        manager.
      </div>
    </Panel>
  )
}
