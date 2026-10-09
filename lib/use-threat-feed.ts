"use client"

import { useEffect, useState, useRef } from "react"
import { COUNTRIES, ATTACK_TYPES } from "@/lib/data"

export interface ThreatEvent {
  id: string
  source: string
  sourceCode: string
  target: string
  targetCode: string
  type: string
  severity: "Critical" | "High" | "Medium" | "Low"
  at: number
  sx: number
  sy: number
  tx: number
  ty: number
}

const SEVERITIES: ThreatEvent["severity"][] = ["Critical", "High", "Medium", "Low"]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function makeThreat(): ThreatEvent {
  let s = pick(COUNTRIES)
  let t = pick(COUNTRIES)
  while (t.code === s.code) t = pick(COUNTRIES)
  const sev = pick(SEVERITIES)
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    source: s.name,
    sourceCode: s.code,
    target: t.name,
    targetCode: t.code,
    type: pick(ATTACK_TYPES),
    severity: sev,
    at: Date.now(),
    sx: s.x,
    sy: s.y,
    tx: t.x,
    ty: t.y,
  }
}

export function useThreatFeed(intervalMs = 1800, max = 40) {
  const [events, setEvents] = useState<ThreatEvent[]>([])
  const [total, setTotal] = useState(0)
  const seeded = useRef(false)

  useEffect(() => {
    if (!seeded.current) {
      seeded.current = true
      const initial = Array.from({ length: 8 }, makeThreat)
      setEvents(initial)
      setTotal(18452 + Math.floor(Math.random() * 4000))
    }
    const id = setInterval(() => {
      const batch = 1 + Math.floor(Math.random() * 2)
      const news = Array.from({ length: batch }, makeThreat)
      setEvents((prev) => [...news, ...prev].slice(0, max))
      setTotal((c) => c + batch)
    }, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs, max])

  return { events, total }
}
