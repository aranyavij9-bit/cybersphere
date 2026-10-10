"use client";

import {
  User,
  Shield,
  Target,
  Heart,
  Code2,
  Globe,
  Briefcase,
  Mail,
  MapPin,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Panel, Badge } from "@/components/ui-kit";

const VALUES = [
  {
    icon: Shield,
    title: "Awareness over offense",
    body: "Every feature is built to teach defense. Attack simulations are educational visualizations - never functional attack tools.",
  },
  {
    icon: Target,
    title: "Accessible to everyone",
    body: "From students to parents, the goal is to make cybersecurity understandable without a technical background.",
  },
  {
    icon: Heart,
    title: "India-first scam education",
    body: "Dedicated coverage of UPI, OTP, KYC and other scams that affect millions of people across India every day.",
  },
];

const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Recharts",
  "Framer Motion",
];

export default function CreatorPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Meet the Creator"
        description="The mission and the person behind CyberSphere."
        icon={<User className="size-5" />}
      />

      <Panel className="overflow-hidden">
        <div className="border-b border-border bg-primary/5 p-6 sm:p-8">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <span className="grid size-20 shrink-0 place-items-center rounded-3xl border border-primary/30 bg-primary/10 text-primary">
              <Code2 className="size-9" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-semibold">Aranya Vij</h2>
              <a
                href="https://aranyavij.com"
                className="mt-1 inline-block text-sm font-semibold text-primary hover:underline"
              >
                aranyavij.com
              </a>

              <div className="mt-1 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-sm text-muted-foreground">
                <MapPin className="size-4 text-primary" />
                <span className="font-medium text-foreground">USA</span>
                <span className="opacity-60">United States</span>
              </div>
              <p className="mt-1 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
                Aranya Vij is a student from the United States and the creator
                of CyberSphere, an educational cybersecurity awareness platform
                designed to make online safety easier to understand through
                interactive learning experiences.
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                <Badge tone="cyan">Educational</Badge>
                <Badge tone="green">Defense-focused</Badge>
                <Badge tone="amber">India-aware</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-px bg-border sm:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="bg-card p-5">
              <v.icon className="mb-2 size-5 text-primary" />
              <h3 className="font-semibold">{v.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid gap-6 md:grid-cols-2">
        <Panel className="p-5">
          <h3 className="mb-3 font-semibold">Built with</h3>
          <div className="flex flex-wrap gap-2">
            {STACK.map((s) => (
              <Badge key={s} tone="muted">
                {s}
              </Badge>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            All progress, achievements, and community posts are stored locally
            in your browser - no account or server required. Your data stays on
            your device.
          </p>
        </Panel>

        <Panel className="p-5">
          <h3 className="mb-3 font-semibold">Get in touch</h3>
          <div className="space-y-2">
            {[
              { icon: Globe, label: "GitHub", value: "github.com/cybersphere***" },
              {
                icon: Briefcase,
                label: "LinkedIn",
                value: "linkedin.com/in/cybersphere***",
              },
              { icon: Mail, label: "Email", value: "hello@cybersphere*.co" },
            ].map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-3 rounded-2xl border border-border p-3 text-sm"
              >
                <c.icon className="size-4 text-primary" />
                <span className="font-medium">{c.label}</span>
                <span className="ml-auto text-muted-foreground">{c.value}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel className="border-warning/30 bg-warning/5 p-5 text-sm">
        <p className="font-semibold text-warning">Ethical use disclaimer</p>
        <p className="mt-1 leading-relaxed text-muted-foreground">
          CyberSphere is strictly an educational tool. The attack simulations
          are illustrative animations and do not perform any real attacks. Use
          this knowledge only to defend and protect - never to cause harm.
        </p>
      </Panel>
    </div>
  );
}
