"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"
import { lsGet, lsSet, idbGet, idbSet } from "@/lib/storage"

export type BadgeId = "rookie" | "hunter" | "analyst" | "guardian"

export interface ProfileState {
  name: string | null
  xp: number
  awarenessScore: number // 0-100
  completedModules: string[]
  quizHistory: { id: string; score: number; total: number; at: number }[]
  badges: BadgeId[]
  streak: number
  lastActive: string | null
  riskScore: number // 0-100, lower is safer
  toolkitChecklist: Record<string, boolean>
  bookmarks: string[]
}

const DEFAULT: ProfileState = {
  name: null,
  xp: 0,
  awarenessScore: 25,
  completedModules: [],
  quizHistory: [],
  badges: [],
  streak: 0,
  lastActive: null,
  riskScore: 58,
  toolkitChecklist: {},
  bookmarks: [],
}

interface ProfileContextValue extends ProfileState {
  ready: boolean
  setName: (name: string) => void
  addXp: (amount: number) => void
  completeModule: (id: string) => void
  recordQuiz: (id: string, score: number, total: number) => void
  toggleChecklist: (id: string) => void
  toggleBookmark: (id: string) => void
  setRiskScore: (n: number) => void
  reset: () => void
}

const ProfileContext = createContext<ProfileContextValue | null>(null)

const XP_BADGES: { id: BadgeId; xp: number }[] = [
  { id: "rookie", xp: 50 },
  { id: "hunter", xp: 200 },
  { id: "analyst", xp: 500 },
  { id: "guardian", xp: 1000 },
]

function computeBadges(xp: number): BadgeId[] {
  return XP_BADGES.filter((b) => xp >= b.xp).map((b) => b.id)
}

function awarenessLevel(score: number): string {
  if (score >= 85) return "Cyber Guardian"
  if (score >= 65) return "Security Analyst"
  if (score >= 45) return "Threat Hunter"
  if (score >= 25) return "Cyber Rookie"
  return "Novice"
}

export function levelFromScore(score: number) {
  return awarenessLevel(score)
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProfileState>(DEFAULT)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const name = lsGet<string | null>("cs:name", null)
      const stored = await idbGet<ProfileState>("kv", "profile")
      const base = stored ? { ...DEFAULT, ...stored } : DEFAULT
      const today = new Date().toDateString()
      let streak = base.streak
      if (base.lastActive !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString()
        streak = base.lastActive === yesterday ? base.streak + 1 : 1
      }
      if (mounted) {
        setState({ ...base, name, streak, lastActive: today })
        setReady(true)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const persist = useCallback((next: ProfileState) => {
    setState(next)
    idbSet("kv", "profile", next)
  }, [])

  const setName = useCallback(
    (name: string) => {
      lsSet("cs:name", name)
      setState((s) => {
        const next = { ...s, name }
        idbSet("kv", "profile", next)
        return next
      })
    },
    [],
  )

  const addXp = useCallback((amount: number) => {
    setState((s) => {
      const xp = s.xp + amount
      const next = {
        ...s,
        xp,
        badges: computeBadges(xp),
        awarenessScore: Math.min(100, s.awarenessScore + Math.round(amount / 25)),
        riskScore: Math.max(5, s.riskScore - Math.round(amount / 40)),
      }
      idbSet("kv", "profile", next)
      return next
    })
  }, [])

  const completeModule = useCallback((id: string) => {
    setState((s) => {
      if (s.completedModules.includes(id)) return s
      const xp = s.xp + 40
      const next = {
        ...s,
        completedModules: [...s.completedModules, id],
        xp,
        badges: computeBadges(xp),
        awarenessScore: Math.min(100, s.awarenessScore + 4),
        riskScore: Math.max(5, s.riskScore - 3),
      }
      idbSet("kv", "profile", next)
      idbSet("progress", id, { at: Date.now() })
      return next
    })
  }, [])

  const recordQuiz = useCallback((id: string, score: number, total: number) => {
    setState((s) => {
      const gained = score * 15
      const xp = s.xp + gained
      const next = {
        ...s,
        xp,
        badges: computeBadges(xp),
        quizHistory: [{ id, score, total, at: Date.now() }, ...s.quizHistory].slice(0, 50),
        awarenessScore: Math.min(100, s.awarenessScore + Math.round((score / total) * 8)),
        riskScore: Math.max(5, s.riskScore - Math.round((score / total) * 5)),
      }
      idbSet("kv", "profile", next)
      idbSet("quiz", `${id}:${Date.now()}`, { score, total, at: Date.now() })
      return next
    })
  }, [])

  const toggleChecklist = useCallback((id: string) => {
    setState((s) => {
      const checked = !s.toolkitChecklist[id]
      const toolkitChecklist = { ...s.toolkitChecklist, [id]: checked }
      const next = {
        ...s,
        toolkitChecklist,
        riskScore: Math.max(5, s.riskScore + (checked ? -2 : 2)),
        awarenessScore: Math.min(100, Math.max(0, s.awarenessScore + (checked ? 1 : -1))),
      }
      idbSet("kv", "profile", next)
      return next
    })
  }, [])

  const toggleBookmark = useCallback((id: string) => {
    setState((s) => {
      const has = s.bookmarks.includes(id)
      const bookmarks = has ? s.bookmarks.filter((b) => b !== id) : [...s.bookmarks, id]
      const next = { ...s, bookmarks }
      idbSet("kv", "profile", next)
      return next
    })
  }, [])

  const setRiskScore = useCallback(
    (n: number) =>
      setState((s) => {
        const next = { ...s, riskScore: n }
        idbSet("kv", "profile", next)
        return next
      }),
    [],
  )

  const reset = useCallback(() => {
    lsSet("cs:name", null)
    localStorage.removeItem("cs:name")
    persist(DEFAULT)
    setState({ ...DEFAULT, name: null })
  }, [persist])

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        ready,
        setName,
        addXp,
        completeModule,
        recordQuiz,
        toggleChecklist,
        toggleBookmark,
        setRiskScore,
        reset,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider")
  return ctx
}

export function useAwarenessLevel() {
  const { awarenessScore } = useProfile()
  return awarenessLevel(awarenessScore)
}
