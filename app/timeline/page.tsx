"use client"

import { History, Zap, BookOpen } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Panel, Badge } from "@/components/ui-kit"
import { TIMELINE } from "@/lib/data"

export default function TimelinePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Threat Timeline"
        description="Landmark cyber attacks that shaped modern security - and the lessons each one taught the world."
        icon={<History className="size-5" />}
      />

      <div className="relative">
        <div className="absolute bottom-0 left-4 top-0 w-px bg-border sm:left-1/2" aria-hidden />
        <div className="space-y-8">
          {TIMELINE.map((e, i) => (
            <div
              key={e.id}
              className={`relative flex flex-col gap-4 sm:flex-row ${i % 2 === 1 ? "sm:flex-row-reverse" : ""}`}
            >
              <div className="absolute left-4 top-2 z-10 grid size-3 -translate-x-1/2 place-items-center sm:left-1/2">
                <span className="size-3 rounded-full border-2 border-primary bg-background" />
              </div>
              <div className="hidden flex-1 sm:block" />
              <div className="flex-1 pl-10 sm:pl-0">
                <Panel className="p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h3 className="font-semibold">{e.name}</h3>
                    <Badge tone="cyan">{e.date}</Badge>
                  </div>
                  <Badge tone="amber" className="mb-3">
                    {e.type}
                  </Badge>
                  <div className="space-y-3 text-sm">
                    <p className="flex gap-2 leading-relaxed text-muted-foreground">
                      <Zap className="mt-0.5 size-4 shrink-0 text-destructive" />
                      {e.impact}
                    </p>
                    <p className="flex gap-2 rounded-2xl border border-success/30 bg-success/5 p-3 leading-relaxed text-foreground/90">
                      <BookOpen className="mt-0.5 size-4 shrink-0 text-success" />
                      <span>
                        <span className="font-medium text-success">Lesson: </span>
                        {e.lesson}
                      </span>
                    </p>
                  </div>
                </Panel>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
