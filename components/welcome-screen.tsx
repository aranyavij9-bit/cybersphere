"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Shield,
  ArrowRight,
  Swords,
  Globe,
  GraduationCap,
  ShieldAlert,
  Terminal,
  BarChart3,
  Lock,
  Eye,
  Zap,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProfile } from "@/lib/profile-context"

const FEATURES = [
  {
    icon: Swords,
    title: "Attack Simulations",
    desc: "Safely experience DDoS, phishing, brute-force, and malware-spread attacks through interactive visualizations.",
  },
  {
    icon: Globe,
    title: "Live Threat Map",
    desc: "Watch real-time global attack arcs and see where threats originate and where they strike.",
  },
  {
    icon: ShieldAlert,
    title: "India Scam Hub",
    desc: "Decode the latest UPI, KYC, OTP, and digital-arrest scams targeting people every single day.",
  },
  {
    icon: Terminal,
    title: "Log Analyzer",
    desc: "Inspect SOC-style logs and learn to spot intrusions, injections, and anomalies like an analyst.",
  },
  {
    icon: GraduationCap,
    title: "Cyber Academy",
    desc: "Bite-sized lessons and scored quizzes that turn security awareness into a daily habit.",
  },
  {
    icon: BarChart3,
    title: "Personal Analytics",
    desc: "Track your risk score, XP, and progress as you harden your digital life over time.",
  },
]

const STATS = [
  { value: "15+", label: "Interactive Modules" },
  { value: "100%", label: "Runs In Your Browser" },
  { value: "0", label: "Accounts Required" },
  { value: "24/7", label: "Threat Feed" },
]

const STEPS = [
  { icon: Eye, title: "Recognize", desc: "Learn what real attacks and scams actually look like." },
  { icon: Zap, title: "Simulate", desc: "Practice in a safe sandbox with zero real-world risk." },
  { icon: Lock, title: "Defend", desc: "Apply a personalized toolkit to lock down your accounts." },
]

export function WelcomeScreen() {
  const { setName } = useProfile()
  const [value, setValue] = useState("")
  const [showForm, setShowForm] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed.length < 1) return
    setName(trimmed)
  }

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-background">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]"
        aria-hidden
      />

      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="grid size-9 place-items-center rounded-xl border border-primary/30 bg-primary/10">
            <Shield className="size-5 text-primary" />
          </div>
          <span className="text-lg font-bold tracking-tight">CyberSphere</span>
        </div>
        <Button onClick={() => setShowForm(true)} size="sm" className="h-9">
          Launch Console
          <ArrowRight className="size-4" />
        </Button>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Threat Intelligence Center · Live
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
          >
            Master cybersecurity by <span className="text-primary text-glow">facing the threats</span> head-on.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            CyberSphere is your personal command center to recognize scams, simulate attacks safely,
            and build the habits that keep you protected online - no account, no risk.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button onClick={() => setShowForm(true)} size="lg" className="h-12 px-6 text-base glow-cyan">
              Get Started Free
              <ArrowRight className="size-5" />
            </Button>
            <p className="text-xs text-muted-foreground">Stored only in your browser · No sign-up</p>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-card/60 p-5 text-center backdrop-blur-sm"
            >
              <p className="text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight">An entire SOC, in one app</h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
            Fifteen interactive modules that take you from curious to cyber-aware.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm transition-colors hover:border-primary/40"
            >
              <div className="mb-4 grid size-11 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                <f.icon className="size-5" />
              </div>
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight">Recognize. Simulate. Defend.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm">
              <span className="absolute right-5 top-5 text-4xl font-bold text-muted/30">{i + 1}</span>
              <div className="mb-4 grid size-11 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                <s.icon className="size-5" />
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card/70 p-8 text-center backdrop-blur-sm sm:p-12">
          <div
            className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]"
            aria-hidden
          />
          <h2 className="relative text-balance text-3xl font-bold tracking-tight">
            Your defense starts with awareness.
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
            Join thousands sharpening their instincts against the scams and attacks that target us every day.
          </p>
          <div className="relative mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {["No account needed", "100% private", "Free forever"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-primary" /> {t}
              </span>
            ))}
          </div>
          <Button onClick={() => setShowForm(true)} size="lg" className="relative mt-7 h-12 px-7 text-base glow-cyan">
            Launch Your Command Center
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border py-6 text-center text-xs text-muted-foreground">
        CyberSphere · Built for awareness, not exploitation. All simulations are educational.
      </footer>

      {/* Name capture modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Get started"
          onClick={() => setShowForm(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex flex-col items-center text-center">
              <div className="mb-4 grid size-14 place-items-center rounded-2xl border border-primary/30 bg-primary/10 glow-cyan">
                <Shield className="size-7 text-primary" />
              </div>
              <h2 className="text-xl font-bold tracking-tight">Welcome to CyberSphere</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">Let&apos;s personalize your command center.</p>
            </div>
            <form onSubmit={submit}>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                What should we call you?
              </label>
              <div className="flex gap-2">
                <input
                  id="name"
                  autoFocus
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter your name"
                  maxLength={24}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none ring-ring/50 focus-visible:ring-2"
                />
                <Button type="submit" size="lg" className="h-10 px-4" disabled={!value.trim()}>
                  Enter
                  <ArrowRight className="size-4" />
                </Button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Stored only in your browser. No account or server required.
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
