"use client"

import { motion } from "framer-motion"

export function RiskGauge({ score }: { score: number }) {
  // score 0-100 where lower = safer. Display arc.
  const radius = 70
  const circumference = Math.PI * radius // half circle
  const pct = Math.max(0, Math.min(100, score))
  const offset = circumference - (pct / 100) * circumference

  const tone =
    pct >= 70 ? "var(--destructive)" : pct >= 40 ? "var(--warning)" : "var(--success)"
  const label = pct >= 70 ? "High Risk" : pct >= 40 ? "Moderate" : "Secure"

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 180 100" className="w-full max-w-[220px]">
        <path
          d="M 20 90 A 70 70 0 0 1 160 90"
          fill="none"
          stroke="var(--secondary)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <motion.path
          d="M 20 90 A 70 70 0 0 1 160 90"
          fill="none"
          stroke={tone}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 6px ${tone})` }}
        />
        <text x="90" y="78" textAnchor="middle" className="fill-foreground text-3xl font-bold">
          {pct}
        </text>
      </svg>
      <p className="-mt-2 text-sm font-medium" style={{ color: tone }}>
        {label}
      </p>
      <p className="text-xs text-muted-foreground">Personal Risk Index</p>
    </div>
  )
}
