"use client"

import { useState } from "react"
import { Brain, CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Panel, Badge } from "@/components/ui-kit"
import { QUIZZES, type Quiz } from "@/lib/data"
import { useProfile } from "@/lib/profile-context"
import { cn } from "@/lib/utils"

const DIFF_TONE: Record<Quiz["difficulty"], string> = {
  Beginner: "green",
  Intermediate: "amber",
  Advanced: "red",
}

function QuizRunner({ quiz, onExit }: { quiz: Quiz; onExit: () => void }) {
  const { recordQuiz } = useProfile()
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [locked, setLocked] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [recorded, setRecorded] = useState(false)

  const question = quiz.questions[idx]
  const isLast = idx === quiz.questions.length - 1

  function choose(i: number) {
    if (locked) return
    setSelected(i)
    setLocked(true)
    if (i === question.answer) setScore((s) => s + 1)
  }

  function next() {
    if (isLast) {
      setDone(true)
      if (!recorded) {
        recordQuiz(quiz.id, score, quiz.questions.length)
        setRecorded(true)
      }
      return
    }
    setIdx((n) => n + 1)
    setSelected(null)
    setLocked(false)
  }

  if (done) {
    const pct = Math.round((score / quiz.questions.length) * 100)
    return (
      <Panel className="mx-auto max-w-lg p-8 text-center">
        <span className="mx-auto mb-4 grid size-16 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary">
          <Trophy className="size-8" />
        </span>
        <h2 className="font-display text-xl font-semibold">Quiz complete!</h2>
        <p className="mt-1 text-muted-foreground">
          You scored {score} / {quiz.questions.length} ({pct}%)
        </p>
        <p className="mt-2 text-sm text-primary">+{score * 15} XP earned</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={onExit}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-primary/40"
          >
            Back to quizzes
          </button>
        </div>
      </Panel>
    )
  }

  return (
    <Panel className="mx-auto max-w-2xl p-6">
      <div className="mb-4 flex items-center justify-between text-sm">
        <Badge tone={DIFF_TONE[quiz.difficulty] as never}>{quiz.title}</Badge>
        <span className="font-mono text-muted-foreground">
          {idx + 1} / {quiz.questions.length}
        </span>
      </div>
      <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${((idx + (locked ? 1 : 0)) / quiz.questions.length) * 100}%` }}
        />
      </div>

      <h3 className="text-pretty text-lg font-semibold leading-snug">{question.q}</h3>

      <div className="mt-4 space-y-2">
        {question.options.map((opt, i) => {
          const isAnswer = i === question.answer
          const isPicked = i === selected
          return (
            <button
              key={opt}
              onClick={() => choose(i)}
              disabled={locked}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-colors",
                !locked && "hover:border-primary/40",
                locked && isAnswer && "border-success/50 bg-success/10 text-success",
                locked && isPicked && !isAnswer && "border-destructive/50 bg-destructive/10 text-destructive",
                !locked && "border-border",
                locked && !isAnswer && !isPicked && "border-border opacity-60",
              )}
            >
              {opt}
              {locked && isAnswer && <CheckCircle2 className="size-4 shrink-0" />}
              {locked && isPicked && !isAnswer && <XCircle className="size-4 shrink-0" />}
            </button>
          )
        })}
      </div>

      {locked && (
        <div className="mt-4 rounded-2xl border border-border bg-muted/40 p-3 text-sm leading-relaxed text-muted-foreground">
          {question.explain}
        </div>
      )}

      <div className="mt-5 flex justify-end">
        <button
          onClick={next}
          disabled={!locked}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-40"
        >
          {isLast ? "Finish" : "Next"} <ArrowRight className="size-4" />
        </button>
      </div>
    </Panel>
  )
}

export default function QuizPage() {
  const { quizHistory } = useProfile()
  const [active, setActive] = useState<Quiz | null>(null)

  if (active) {
    return (
      <div className="space-y-6">
        <PageHeader title={active.title} description="Answer each question and learn from the explanations." icon={<Brain className="size-5" />} />
        <QuizRunner quiz={active} onExit={() => setActive(null)} />
      </div>
    )
  }

  function bestScore(id: string) {
    const runs = quizHistory.filter((h) => h.id === id)
    if (runs.length === 0) return null
    return runs.reduce((m, r) => Math.max(m, r.score), 0)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Security Quiz"
        description="Test your knowledge across phishing, passwords, Indian scams, and advanced threats. Earn XP for every correct answer."
        icon={<Brain className="size-5" />}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {QUIZZES.map((q) => {
          const best = bestScore(q.id)
          return (
            <Panel key={q.id} className="flex flex-col p-5">
              <div className="mb-2 flex items-center justify-between">
                <Badge tone={DIFF_TONE[q.difficulty] as never}>{q.difficulty}</Badge>
                {best !== null && (
                  <span className="flex items-center gap-1 text-xs text-success">
                    <Trophy className="size-3.5" /> Best {best}/{q.questions.length}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold">{q.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{q.questions.length} questions</p>
              <button
                onClick={() => setActive(q)}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                {best !== null ? (
                  <>
                    <RotateCcw className="size-4" /> Retake quiz
                  </>
                ) : (
                  "Start quiz"
                )}
              </button>
            </Panel>
          )
        })}
      </div>
    </div>
  )
}
