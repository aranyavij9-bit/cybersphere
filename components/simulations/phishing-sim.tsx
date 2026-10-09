"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Check, X, AlertTriangle, RotateCcw } from "lucide-react"
import { Panel, PanelHeader, Badge } from "@/components/ui-kit"
import { Button } from "@/components/ui/button"
import { useProfile } from "@/lib/profile-context"

interface FakeEmail {
  id: string
  from: string
  subject: string
  preview: string
  suspicious: boolean
  flags: string[]
}

const EMAILS: FakeEmail[] = [
  {
    id: "1",
    from: "security@paypa1-support.com",
    subject: "Urgent: Your account has been limited",
    preview: "We detected unusual activity. Verify within 24 hours or your account will be permanently closed. Click here to restore access.",
    suspicious: true,
    flags: ["Misspelled domain (paypa1)", "Creates urgency / deadline", "Threatens account closure", "Generic verify link"],
  },
  {
    id: "2",
    from: "no-reply@github.com",
    subject: "Your weekly repository digest",
    preview: "Here's a summary of activity across your repositories this week. 4 new stars, 2 pull requests.",
    suspicious: false,
    flags: ["Legitimate sender domain", "No urgent call to action", "Expected, routine content"],
  },
  {
    id: "3",
    from: "hr-payroll@company-rewards.net",
    subject: "You have a pending bonus payment of $1,250",
    preview: "Confirm your banking details to release your pending bonus. Download the attached form and reply with your account number.",
    suspicious: true,
    flags: ["Asks for banking details", "Unexpected money offer", "Unusual external domain", "Requests sensitive info via reply"],
  },
  {
    id: "4",
    from: "team@notion.so",
    subject: "Sarah shared a document with you",
    preview: "Sarah invited you to collaborate on 'Q3 Planning'. Open in Notion to view.",
    suspicious: false,
    flags: ["Known service domain", "Specific, expected context", "No credential request"],
  },
  {
    id: "5",
    from: "support@amaz0n-delivery.info",
    subject: "Your package could not be delivered",
    preview: "Pay a small $1.99 redelivery fee to reschedule. Enter your card details on our secure portal now.",
    suspicious: true,
    flags: ["Misspelled domain (amaz0n)", "Small fee to harvest card data", "Pressure to act 'now'", "Suspicious TLD (.info)"],
  },
]

export function PhishingSim() {
  const { addXp } = useProfile()
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState<null | { correct: boolean }>(null)
  const [done, setDone] = useState(false)

  const email = EMAILS[index]

  function answer(markSuspicious: boolean) {
    if (answered) return
    const correct = markSuspicious === email.suspicious
    if (correct) {
      setScore((s) => s + 1)
      addXp(10)
    }
    setAnswered({ correct })
  }

  function next() {
    if (index + 1 >= EMAILS.length) {
      setDone(true)
      return
    }
    setIndex((i) => i + 1)
    setAnswered(null)
  }

  function restart() {
    setIndex(0)
    setScore(0)
    setAnswered(null)
    setDone(false)
  }

  return (
    <Panel>
      <PanelHeader
        title="Phishing Email Simulator"
        subtitle="Classify each message: safe or suspicious"
        action={<Badge tone="cyan">{done ? `${score}/${EMAILS.length}` : `${index + 1}/${EMAILS.length}`}</Badge>}
      />
      <div className="p-4">
        {done ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <div className="grid size-14 place-items-center rounded-full bg-primary/15 text-primary">
              <Mail className="size-7" />
            </div>
            <h3 className="text-lg font-semibold">
              You scored {score} / {EMAILS.length}
            </h3>
            <p className="max-w-sm text-sm text-muted-foreground">
              {score === EMAILS.length
                ? "Perfect! You have a sharp eye for phishing red flags."
                : "Keep practicing - checking the sender domain and resisting urgency are your best defenses."}
            </p>
            <Button onClick={restart} variant="outline">
              <RotateCcw className="size-4" />
              Try Again
            </Button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={email.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Email mock */}
              <div className="rounded-lg border border-border bg-background">
                <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                  <span className="grid size-9 place-items-center rounded-full bg-muted text-muted-foreground">
                    <Mail className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{email.subject}</p>
                    <p className="truncate font-mono text-xs text-muted-foreground">{email.from}</p>
                  </div>
                </div>
                <p className="px-4 py-4 text-sm leading-relaxed text-muted-foreground">{email.preview}</p>
              </div>

              {!answered ? (
                <div className="mt-4 flex gap-2">
                  <Button size="lg" variant="outline" className="flex-1 border-success/40 text-success hover:bg-success/10" onClick={() => answer(false)}>
                    <Check className="size-4" />
                    Looks Safe
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1 border-destructive/40 text-destructive hover:bg-destructive/10" onClick={() => answer(true)}>
                    <AlertTriangle className="size-4" />
                    Suspicious
                  </Button>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-3">
                  <div
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium ${
                      answered.correct
                        ? "border-success/40 bg-success/10 text-success"
                        : "border-destructive/40 bg-destructive/10 text-destructive"
                    }`}
                  >
                    {answered.correct ? <Check className="size-4" /> : <X className="size-4" />}
                    {answered.correct ? "Correct!" : "Not quite."} This email is{" "}
                    {email.suspicious ? "a phishing attempt." : "legitimate."}
                  </div>
                  <div className="rounded-lg border border-border bg-muted/30 p-3">
                    <p className="mb-2 text-xs font-medium">Key signals:</p>
                    <ul className="space-y-1">
                      {email.flags.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className={`mt-1 size-1.5 shrink-0 rounded-full ${email.suspicious ? "bg-destructive" : "bg-success"}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button onClick={next} className="w-full" size="lg">
                    {index + 1 >= EMAILS.length ? "See Results" : "Next Email"}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </Panel>
  )
}
