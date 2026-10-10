"use client"

import { useState, type ReactNode } from "react"
import { useProfile } from "@/lib/profile-context"
import { WelcomeScreen } from "@/components/welcome-screen"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { Shield } from "lucide-react"

export function AppShell({ children }: { children: ReactNode }) {
  const { name, ready } = useProfile()
  const [menuOpen, setMenuOpen] = useState(false)

  if (!ready) {
    return (
      <div className="grid min-h-dvh place-items-center bg-background">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Shield className="size-8 text-primary" />
          <p className="text-sm">Initializing secure session…</p>
        </div>
      </div>
    )
  }

  if (!name) return <WelcomeScreen />

  return (
    <div className="min-h-dvh bg-background">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="lg:pl-64">
        <Topbar onMenu={() => setMenuOpen(true)} />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">{children}</main>
      </div>
    </div>
  )
}
