import { cn } from "@/lib/utils"
import type { ReactNode, HTMLAttributes } from "react"

export function Panel({
  className,
  children,
  glow,
  ...props
}: HTMLAttributes<HTMLDivElement> & { glow?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card/80 backdrop-blur-sm",
        glow && "glow-cyan",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function PanelHeader({
  title,
  subtitle,
  icon,
  action,
}: {
  title: string
  subtitle?: string
  icon?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
      <div className="flex items-center gap-2.5 min-w-0">
        {icon && <span className="text-primary shrink-0">{icon}</span>}
        <div className="min-w-0">
          <h3 className="text-sm font-semibold tracking-tight truncate">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}

type Tone = "cyan" | "purple" | "red" | "amber" | "green" | "muted"

const toneMap: Record<Tone, string> = {
  cyan: "bg-primary/15 text-primary border-primary/30",
  purple: "bg-accent/15 text-accent border-accent/30",
  red: "bg-destructive/15 text-destructive border-destructive/30",
  amber: "bg-warning/15 text-warning border-warning/30",
  green: "bg-success/15 text-success border-success/30",
  muted: "bg-muted text-muted-foreground border-border",
}

export function Badge({
  children,
  tone = "muted",
  className,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium leading-none",
        toneMap[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Meter({
  value,
  tone = "cyan",
  className,
}: {
  value: number
  tone?: Tone
  className?: string
}) {
  const barTone: Record<Tone, string> = {
    cyan: "bg-primary",
    purple: "bg-accent",
    red: "bg-destructive",
    amber: "bg-warning",
    green: "bg-success",
    muted: "bg-muted-foreground",
  }
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-secondary", className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-700", barTone[tone])}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  )
}

export function severityTone(s: string): Tone {
  if (s === "Critical") return "red"
  if (s === "High") return "amber"
  if (s === "Medium") return "purple"
  return "cyan"
}
