"use client"

import { Users, MessageSquare, ThumbsUp, TrendingUp, Calendar, Pin, MessagesSquare } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Panel, Badge } from "@/components/ui-kit"

interface Discussion {
  id: string
  author: string
  role: string
  badgeTone: "cyan" | "purple" | "amber" | "green" | "muted"
  title: string
  body: string
  tag: string
  likes: number
  replies: number
  at: string
  pinned?: boolean
}

const DISCUSSIONS: Discussion[] = [
  {
    id: "d1",
    author: "Priya Verma",
    role: "Teacher",
    badgeTone: "cyan",
    title: "Ran the phishing simulator with my Class 9 students - eye-opening results",
    body: "On the first attempt only 4/10 students spotted the fake emails. After we reviewed sender spoofing and link-hovering, they caught 9/10 on the retry. This is now part of my weekly digital-literacy session.",
    tag: "Teaching",
    likes: 47,
    replies: 12,
    at: "5h ago",
    pinned: true,
  },
  {
    id: "d2",
    author: "Rohan Patel",
    role: "Developer",
    badgeTone: "purple",
    title: "The Log Analyzer instantly flagged a SQL injection pattern",
    body: "I pasted in a sample access log and it highlighted the ' OR 1=1 -- payload right away. Great way to explain to junior devs why parameterized queries actually matter instead of just telling them to.",
    tag: "Discussion",
    likes: 38,
    replies: 9,
    at: "12h ago",
  },
  {
    id: "d3",
    author: "Vikram Singh",
    role: "Parent",
    badgeTone: "amber",
    title: "Set up a family 'safe word' after the deepfake scam section",
    body: "My uncle nearly fell for an AI-voice 'son in trouble, send money now' call last month. After reading the digital-arrest and deepfake breakdown here, we agreed on a code phrase. Highly recommend every family does this.",
    tag: "Awareness",
    likes: 84,
    replies: 21,
    at: "1d ago",
  },
  {
    id: "d4",
    author: "Ananya Gupta",
    role: "Security Analyst",
    badgeTone: "green",
    title: "How I dropped my personal risk score from 71 to 28",
    body: "Worked through the Safety Toolkit one item per day - MFA everywhere, a password manager, offline backups, and secure DNS. Two weeks later the dashboard gauge is green. The incremental approach really kept me going.",
    tag: "Wins",
    likes: 63,
    replies: 15,
    at: "2d ago",
  },
  {
    id: "d5",
    author: "Aarav Sharma",
    role: "Student",
    badgeTone: "cyan",
    title: "Got a fake 'KYC expired' SMS - recognized it instantly thanks to the Scam Hub",
    body: "The message had a shortened link and that classic urgency: 'account blocked in 24 hours'. I remembered the UPI/KYC breakdown, reported it, and warned my hostel group chat. Nobody clicked. Small win but it felt great.",
    tag: "Wins",
    likes: 56,
    replies: 8,
    at: "3d ago",
  },
]

const TRENDING = [
  { tag: "#PhishingAwareness", posts: 128 },
  { tag: "#UPIScams", posts: 96 },
  { tag: "#DeepfakeFraud", posts: 74 },
  { tag: "#PasswordHygiene", posts: 61 },
  { tag: "#RansomwareDefense", posts: 43 },
]

const EVENTS = [
  { title: "Live AMA: Spotting Modern Scams", when: "Sat · 6:00 PM IST", host: "Security Analysts Circle" },
  { title: "Workshop: Hardening Your Home Wi-Fi", when: "Sun · 11:00 AM IST", host: "CyberSphere Community" },
  { title: "Quiz Night: Threat Identification", when: "Wed · 8:00 PM IST", host: "Cyber Academy" },
]

const MEMBERS = [
  { name: "Priya Verma", role: "Teacher", contributions: 142 },
  { name: "Ananya Gupta", role: "Security Analyst", contributions: 118 },
  { name: "Rohan Patel", role: "Developer", contributions: 97 },
  { name: "Vikram Singh", role: "Parent", contributions: 64 },
  { name: "Aarav Sharma", role: "Student", contributions: 51 },
]

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Community"
        description="Real stories, shared wins, and lessons from people building their cyber awareness together."
        icon={<Users className="size-5" />}
      />

      {/* Top stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Members", value: "12,480", icon: Users },
          { label: "Discussions", value: "3,217", icon: MessagesSquare },
          { label: "Wins shared", value: "1,894", icon: ThumbsUp },
          { label: "Online now", value: "326", icon: TrendingUp },
        ].map((s) => (
          <Panel key={s.label} className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <s.icon className="size-4 text-primary" />
              <span className="text-xs">{s.label}</span>
            </div>
            <p className="mt-2 font-display text-2xl font-semibold">{s.value}</p>
          </Panel>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Discussions feed */}
        <div className="space-y-3">
          {DISCUSSIONS.map((d) => (
            <Panel key={d.id} className="p-5">
              <div className="mb-3 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                  {d.author.charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    {d.author}
                    {d.pinned && (
                      <span className="inline-flex items-center gap-1 text-xs font-normal text-primary">
                        <Pin className="size-3" /> Pinned
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <Badge tone={d.badgeTone}>{d.role}</Badge> · {d.at}
                  </p>
                </div>
                <Badge tone="muted">{d.tag}</Badge>
              </div>
              <h3 className="text-pretty text-base font-semibold leading-snug">{d.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{d.body}</p>
              <div className="mt-4 flex items-center gap-5 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <ThumbsUp className="size-3.5" /> {d.likes}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MessageSquare className="size-3.5" /> {d.replies} replies
                </span>
              </div>
            </Panel>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Panel className="p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <TrendingUp className="size-4 text-primary" /> Trending topics
            </h3>
            <ul className="space-y-2.5">
              {TRENDING.map((t) => (
                <li key={t.tag} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-primary">{t.tag}</span>
                  <span className="text-xs text-muted-foreground">{t.posts} posts</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel className="p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Calendar className="size-4 text-primary" /> Upcoming events
            </h3>
            <ul className="space-y-3">
              {EVENTS.map((e) => (
                <li key={e.title} className="rounded-2xl border border-border/60 p-3">
                  <p className="text-sm font-medium leading-snug">{e.title}</p>
                  <p className="mt-1 text-xs text-primary">{e.when}</p>
                  <p className="text-xs text-muted-foreground">by {e.host}</p>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel className="p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Users className="size-4 text-primary" /> Top contributors
            </h3>
            <ul className="space-y-3">
              {MEMBERS.map((m) => (
                <li key={m.name} className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-full bg-muted text-xs font-semibold">
                    {m.name.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1 text-sm">
                    <p className="font-medium leading-tight">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                  </div>
                  <span className="text-xs text-primary">{m.contributions}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel className="p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Community guidelines</p>
            <p className="mt-1 leading-relaxed">
              Be respectful, never share real credentials or personal data, and keep discussions focused on defense and
              awareness.
            </p>
          </Panel>
        </div>
      </div>
    </div>
  )
}
