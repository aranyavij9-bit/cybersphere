"use client"

import { useMemo } from "react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { BarChart3, TrendingUp, ShieldAlert, Activity } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Panel, PanelHeader } from "@/components/ui-kit"
import { ATTACK_TYPES } from "@/lib/data"

const CHART_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"]

function seeded(n: number, salt = 1) {
  return Math.abs(Math.sin(n * 12.9898 * salt) * 43758.5453) % 1
}

export default function AnalyticsPage() {
  const trend = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        day: `D${i + 1}`,
        attacks: Math.round(400 + seeded(i, 1) * 600),
        blocked: Math.round(350 + seeded(i, 2) * 500),
      })),
    [],
  )

  const byType = useMemo(
    () =>
      ATTACK_TYPES.map((t, i) => ({
        type: t,
        count: Math.round(120 + seeded(i, 3) * 880),
      })).sort((a, b) => b.count - a.count),
    [],
  )

  const distribution = useMemo(
    () =>
      ["Critical", "High", "Medium", "Low"].map((sev, i) => ({
        name: sev,
        value: Math.round(20 + seeded(i, 5) * 120),
      })),
    [],
  )

  const readiness = useMemo(
    () =>
      ["Detection", "Response", "Recovery", "Prevention", "Awareness", "Compliance"].map((k, i) => ({
        metric: k,
        score: Math.round(50 + seeded(i, 7) * 45),
      })),
    [],
  )

  const tooltipStyle = {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    color: "var(--popover-foreground)",
    fontSize: 12,
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics Center"
        description="Aggregated threat intelligence and security posture analytics across the monitored estate."
        icon={<BarChart3 className="size-5" />}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel className="overflow-hidden">
          <PanelHeader title="Attack Volume (14 days)" subtitle="Detected vs. blocked" icon={<TrendingUp className="size-4" />} />
          <div className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ left: -20, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="a1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="a2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="attacks" stroke="var(--chart-1)" fill="url(#a1)" strokeWidth={2} />
                <Area type="monotone" dataKey="blocked" stroke="var(--chart-2)" fill="url(#a2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel className="overflow-hidden">
          <PanelHeader title="Attacks by Type" subtitle="Last 30 days" icon={<ShieldAlert className="size-4" />} />
          <div className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byType} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="type" stroke="var(--muted-foreground)" fontSize={9} tickLine={false} interval={0} angle={-25} textAnchor="end" height={50} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--muted)" }} />
                <Bar dataKey="count" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel className="overflow-hidden">
          <PanelHeader title="Severity Distribution" subtitle="Active incidents" icon={<Activity className="size-4" />} />
          <div className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distribution} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {distribution.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pb-4 text-xs">
            {distribution.map((d, i) => (
              <span key={d.name} className="flex items-center gap-1.5 text-muted-foreground">
                <span className="size-2.5 rounded-full" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                {d.name}
              </span>
            ))}
          </div>
        </Panel>

        <Panel className="overflow-hidden">
          <PanelHeader title="Security Readiness" subtitle="Posture across domains" icon={<TrendingUp className="size-4" />} />
          <div className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={readiness}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="metric" stroke="var(--muted-foreground)" fontSize={10} />
                <PolarRadiusAxis stroke="var(--border)" tick={false} axisLine={false} domain={[0, 100]} />
                <Radar dataKey="score" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.4} />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
    </div>
  )
}
