"use client"

import { useState } from "react"
import { Newspaper, TrendingUp, Search, Bookmark, BookmarkCheck } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Panel, Badge } from "@/components/ui-kit"
import { NEWS, NEWS_CATEGORIES, type NewsCategory } from "@/lib/data"
import { useProfile } from "@/lib/profile-context"
import { cn } from "@/lib/utils"

const CAT_COLORS: Record<NewsCategory, string> = {
  "Data Breach": "red",
  Malware: "amber",
  "AI Security": "cyan",
  "Government Attacks": "red",
  "Financial Fraud": "amber",
}

export default function NewsPage() {
  const { bookmarks, toggleBookmark } = useProfile()
  const [cat, setCat] = useState<NewsCategory | "All">("All")
  const [query, setQuery] = useState("")

  const filtered = NEWS.filter((n) => {
    const matchCat = cat === "All" || n.category === cat
    const matchQuery =
      !query ||
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.summary.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQuery
  })
  const trending = NEWS.filter((n) => n.trending).slice(0, 5)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cyber News Center"
        description="Curated threat intelligence and breaking security headlines."
        icon={<Newspaper className="size-5" />}
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search headlines..."
                className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {(["All", ...NEWS_CATEGORIES] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  cat === c
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((n) => {
              const saved = bookmarks.includes(n.id)
              return (
                <Panel key={n.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge tone={CAT_COLORS[n.category] as never}>{n.category}</Badge>
                        {n.trending && (
                          <span className="flex items-center gap-1 text-[11px] font-medium text-primary">
                            <TrendingUp className="size-3" /> Trending
                          </span>
                        )}
                      </div>
                      <h3 className="text-pretty font-semibold leading-snug">{n.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{n.summary}</p>
                      <p className="text-xs text-muted-foreground">
                        {n.source} · {n.hoursAgo}h ago
                      </p>
                    </div>
                    <button
                      onClick={() => toggleBookmark(n.id)}
                      aria-label={saved ? "Remove bookmark" : "Bookmark article"}
                      className={cn(
                        "shrink-0 rounded-md p-2 transition-colors",
                        saved ? "text-primary" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
                    </button>
                  </div>
                </Panel>
              )
            })}
            {filtered.length === 0 && (
              <Panel className="p-8 text-center text-sm text-muted-foreground">No headlines match your filters.</Panel>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Panel className="p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <TrendingUp className="size-4 text-primary" /> Trending Now
            </h3>
            <ol className="space-y-3">
              {trending.map((n, i) => (
                <li key={n.id} className="flex gap-3 text-sm">
                  <span className="font-mono text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="leading-snug text-muted-foreground">{n.title}</span>
                </li>
              ))}
            </ol>
          </Panel>

          <Panel className="p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Bookmark className="size-4 text-primary" /> Saved Articles
            </h3>
            {bookmarks.length === 0 ? (
              <p className="text-sm text-muted-foreground">Bookmark articles to read them later.</p>
            ) : (
              <ul className="space-y-2">
                {NEWS.filter((n) => bookmarks.includes(n.id)).map((n) => (
                  <li key={n.id} className="text-sm leading-snug text-muted-foreground">
                    {n.title}
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>
    </div>
  )
}
