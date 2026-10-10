"use client"

import { useMemo, useState } from "react"
import { Terminal, AlertTriangle, Play, Sparkles, ShieldAlert, Info } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Panel, Badge } from "@/components/ui-kit"
import { cn } from "@/lib/utils"

const SAMPLE = `2024-06-10 02:14:07 INFO  user=alice action=login ip=10.0.0.4 status=success
2024-06-10 02:15:31 INFO  user=alice action=view ip=10.0.0.4 resource=/dashboard
2024-06-10 02:18:44 WARN  user=admin action=login ip=203.0.113.55 status=failed
2024-06-10 02:18:46 WARN  user=admin action=login ip=203.0.113.55 status=failed
2024-06-10 02:18:48 WARN  user=admin action=login ip=203.0.113.55 status=failed
2024-06-10 02:18:50 WARN  user=admin action=login ip=203.0.113.55 status=failed
2024-06-10 02:18:52 WARN  user=admin action=login ip=203.0.113.55 status=failed
2024-06-10 02:18:55 ERROR user=admin action=login ip=203.0.113.55 status=success
2024-06-10 02:19:10 INFO  user=admin action=download ip=203.0.113.55 resource=/exports/customers.csv size=240MB
2024-06-10 02:20:02 INFO  user=admin action=exec ip=203.0.113.55 cmd="whoami && cat /etc/passwd"
2024-06-10 02:21:15 WARN  outbound connection to 185.220.101.7:443 bytes=512000000
2024-06-10 02:22:40 INFO  user=bob action=login ip=10.0.0.9 status=success
2024-06-10 02:25:00 ERROR sql query="SELECT * FROM users WHERE id=1 OR 1=1 --" source=/api/items`

interface Finding {
  line: number
  text: string
  severity: "Critical" | "High" | "Medium" | "Info"
  reason: string
}

const RULES: { test: RegExp; severity: Finding["severity"]; reason: string }[] = [
  { test: /1=1|--|UNION\s+SELECT|OR\s+1/i, severity: "Critical", reason: "Possible SQL injection pattern detected." },
  { test: /cat\s+\/etc\/passwd|whoami|\/bin\/sh|rm\s+-rf/i, severity: "Critical", reason: "Suspicious command execution / reconnaissance." },
  { test: /bytes=\d{9,}|size=\d+MB/i, severity: "High", reason: "Large data transfer - possible exfiltration." },
  { test: /status=failed/i, severity: "Medium", reason: "Failed authentication attempt." },
  { test: /outbound connection to \d+\.\d+\.\d+\.\d+/i, severity: "High", reason: "Outbound connection to external IP." },
  { test: /ERROR/i, severity: "Medium", reason: "Error-level event worth reviewing." },
]

function analyze(text: string): Finding[] {
  const lines = text.split("\n").filter(Boolean)
  const out: Finding[] = []
  // Brute-force detection: many failed logins from same IP
  const failsByIp: Record<string, number> = {}
  lines.forEach((l) => {
    const m = l.match(/status=failed.*ip=(\S+)|ip=(\S+).*status=failed/)
    if (m) {
      const ip = m[1] || m[2]
      if (ip) failsByIp[ip] = (failsByIp[ip] || 0) + 1
    }
  })
  lines.forEach((line, i) => {
    for (const rule of RULES) {
      if (rule.test.test(line)) {
        out.push({ line: i + 1, text: line, severity: rule.severity, reason: rule.reason })
        break
      }
    }
  })
  Object.entries(failsByIp).forEach(([ip, n]) => {
    if (n >= 4) {
      out.push({
        line: 0,
        text: `${n} failed logins from ${ip}`,
        severity: "Critical",
        reason: "Brute-force pattern: repeated failed logins from a single source.",
      })
    }
  })
  return out
}

const SEV_TONE: Record<Finding["severity"], string> = {
  Critical: "red",
  High: "amber",
  Medium: "butter",
  Info: "muted",
}

export default function LogAnalyzerPage() {
  const [input, setInput] = useState(SAMPLE)
  const [findings, setFindings] = useState<Finding[] | null>(null)

  const summary = useMemo(() => {
    if (!findings) return null
    return {
      Critical: findings.filter((f) => f.severity === "Critical").length,
      High: findings.filter((f) => f.severity === "High").length,
      Medium: findings.filter((f) => f.severity === "Medium").length,
    }
  }, [findings])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Log Analyzer"
        description="Paste server or auth logs and the analyzer flags brute-force attempts, injections, data exfiltration, and other anomalies."
        icon={<Terminal className="size-5" />}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel className="flex flex-col p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Log input</span>
            <button
              onClick={() => setInput(SAMPLE)}
              className="text-xs text-primary hover:underline"
            >
              Load sample
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="h-72 w-full resize-none rounded-xl border border-border bg-background p-3 font-mono text-xs leading-relaxed outline-none focus:border-primary"
          />
          <button
            onClick={() => setFindings(analyze(input))}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            <Play className="size-4" /> Analyze logs
          </button>
        </Panel>

        <Panel className="flex flex-col p-4">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <span className="text-sm font-medium">Analysis results</span>
          </div>

          {!findings && (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
              <ShieldAlert className="size-8 opacity-40" />
              Run the analyzer to scan your logs for threats.
            </div>
          )}

          {findings && (
            <>
              {summary && (
                <div className="mb-3 grid grid-cols-3 gap-2 text-center">
                  {(["Critical", "High", "Medium"] as const).map((s) => (
                    <div key={s} className="rounded-2xl border border-border p-2">
                      <p className="font-display text-lg font-semibold">{summary[s]}</p>
                      <Badge tone={SEV_TONE[s] as never}>{s}</Badge>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex-1 space-y-2 overflow-y-auto">
                {findings.length === 0 && (
                  <div className="flex items-center gap-2 rounded-2xl border border-success/30 bg-success/5 p-3 text-sm text-success">
                    <Info className="size-4" /> No suspicious activity detected.
                  </div>
                )}
                {findings.map((f, i) => (
                  <div
                    key={i}
                    className={cn(
                      "rounded-2xl border p-3 text-sm",
                      f.severity === "Critical" ? "border-destructive/40 bg-destructive/5" : "border-border",
                    )}
                  >
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <Badge tone={SEV_TONE[f.severity] as never}>
                        <AlertTriangle className="size-3" /> {f.severity}
                      </Badge>
                      {f.line > 0 && <span className="font-mono text-xs text-muted-foreground">line {f.line}</span>}
                    </div>
                    <p className="font-mono text-xs leading-relaxed text-foreground/80 break-all">{f.text}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{f.reason}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </Panel>
      </div>
    </div>
  )
}
