import {
  LayoutDashboard,
  Swords,
  Globe,
  Newspaper,
  ShieldAlert,
  GraduationCap,
  Brain,
  History,
  Terminal,
  Lightbulb,
  Trophy,
  Wrench,
  BarChart3,
  Users,
  User,
  type LucideIcon,
} from "lucide-react"

export interface NavItem {
  href: string
  label: string
  icon: LucideIcon
  group: string
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Command Center", icon: LayoutDashboard, group: "Operations" },
  { href: "/simulations", label: "Attack Simulations", icon: Swords, group: "Operations" },
  { href: "/threat-map", label: "Live Threat Map", icon: Globe, group: "Operations" },
  { href: "/log-analyzer", label: "Log Analyzer", icon: Terminal, group: "Operations" },
  { href: "/analytics", label: "Analytics Center", icon: BarChart3, group: "Operations" },
  { href: "/news", label: "Cyber News", icon: Newspaper, group: "Intelligence" },
  { href: "/scam-hub", label: "India Scam Hub", icon: ShieldAlert, group: "Intelligence" },
  { href: "/timeline", label: "Threat Timeline", icon: History, group: "Intelligence" },
  { href: "/recommendations", label: "Recommendations", icon: Lightbulb, group: "Intelligence" },
  { href: "/academy", label: "Cyber Academy", icon: GraduationCap, group: "Learn" },
  { href: "/quiz", label: "Security Quiz", icon: Brain, group: "Learn" },
  { href: "/toolkit", label: "Safety Toolkit", icon: Wrench, group: "Learn" },
  { href: "/achievements", label: "Achievements", icon: Trophy, group: "Learn" },
  { href: "/community", label: "Community", icon: Users, group: "About" },
  { href: "/creator", label: "Meet the Creator", icon: User, group: "About" },
]

export const DAILY_TIPS = [
  "Enable multi-factor authentication (MFA) on every account that supports it.",
  "Never share OTPs - no legitimate bank or company will ever ask for them.",
  "Hover over links before clicking to verify the real destination URL.",
  "Use a password manager so every account gets a unique, strong password.",
  "Banks never ask you to 'verify KYC' through a random WhatsApp link.",
  "Keep your devices and apps updated to patch known vulnerabilities.",
  "A QR code can hide a malicious payment request - read details before paying.",
  "Deepfake voices are real; verify urgent money requests through a second channel.",
]

export interface Scam {
  id: string
  title: string
  emoji?: string
  how: string
  example: string
  warnings: string[]
  prevention: string[]
  severity: "Critical" | "High" | "Medium"
}

export const SCAMS: Scam[] = [
  {
    id: "upi",
    title: "UPI / Fake Payment Fraud",
    how: "Scammers send a 'collect request' disguised as a payment, or trick you into approving a transaction by entering your UPI PIN to 'receive' money.",
    example: "A buyer on OLX says they'll pay, then sends a request to PAY them and tells you to enter your PIN to confirm receipt.",
    warnings: [
      "You are asked to enter your UPI PIN to RECEIVE money (you never need to).",
      "Urgent pressure to scan a QR code to get a refund.",
      "Unknown 'collect requests' appearing in your UPI app.",
    ],
    prevention: [
      "Remember: PIN is only needed to SEND money, never to receive it.",
      "Decline unknown collect requests.",
      "Verify the merchant name before approving any transaction.",
    ],
    severity: "Critical",
  },
  {
    id: "otp",
    title: "OTP Scam",
    how: "Fraudsters impersonate bank or company staff and create urgency to make you reveal a one-time password sent to your phone.",
    example: "A caller claims your account will be blocked and asks for the OTP 'to verify your identity'.",
    warnings: ["Caller asks for an OTP", "Threats that your account/card will be blocked", "Caller already knows some of your details to sound legit"],
    prevention: ["Never share OTPs with anyone", "Hang up and call the official number on your card", "Banks never call to ask for OTPs"],
    severity: "Critical",
  },
  {
    id: "kyc",
    title: "KYC Update Scam",
    how: "You receive an SMS/WhatsApp saying your KYC has expired and your account will be frozen unless you click a link or call a number.",
    example: "'Dear customer, your bank KYC is suspended. Click here to update or account will be blocked in 24 hrs.'",
    warnings: ["Shortened or misspelled links", "Countdown urgency (24 hours)", "Requests to download a 'support' app like AnyDesk"],
    prevention: ["Do KYC only at the official branch or app", "Never install screen-sharing apps for 'support'", "Report to 1930 (cyber helpline)"],
    severity: "High",
  },
  {
    id: "qr",
    title: "QR Code Scam",
    how: "A QR code is presented as a way to 'receive' money but actually authorizes a payment FROM your account.",
    example: "A seller asks you to scan a QR to get your refund - scanning debits your account instead.",
    warnings: ["Asked to scan a QR to receive money", "Unexpected payment amount after scanning", "QR shared over chat by a stranger"],
    prevention: ["Scanning a QR is for PAYING, not receiving", "Always read the amount and payee", "Never scan QR codes from strangers"],
    severity: "High",
  },
  {
    id: "job",
    title: "Work-From-Home / Job Scam",
    how: "Fake recruiters offer easy online jobs (liking videos, rating hotels) then ask for a deposit to 'unlock' higher earnings.",
    example: "A Telegram group promises ₹5000/day for simple tasks but asks you to 'recharge your wallet' first.",
    warnings: ["Upfront payment required for a job", "Too-good-to-be-true earnings", "Communication only over Telegram/WhatsApp"],
    prevention: ["Legit jobs never ask you to pay them", "Research the company independently", "Avoid 'task-based' investment combos"],
    severity: "High",
  },
  {
    id: "whatsapp",
    title: "WhatsApp Impersonation Scam",
    how: "A scammer uses a profile photo of someone you know (often with an international number) and asks for urgent money.",
    example: "'Hi, this is your relative, I lost my phone and need ₹10,000 urgently, I'll repay tomorrow.'",
    warnings: ["Unknown number with a familiar photo", "Urgent money request", "Refusal to take a phone call"],
    prevention: ["Verify by calling the real person", "Be suspicious of +xx international codes", "Never transfer money based on chat alone"],
    severity: "Medium",
  },
  {
    id: "investment",
    title: "Investment / Trading Scam",
    how: "Fake apps and 'mentors' promise guaranteed high returns, show fake profits, then block you when you try to withdraw.",
    example: "A stock-tips group adds you to a 'VIP' app showing huge gains until you deposit more and can't withdraw.",
    warnings: ["Guaranteed/fixed high returns", "Pressure to invest more to withdraw", "Unregistered apps and platforms"],
    prevention: ["No legit investment is guaranteed", "Verify with SEBI/RBI registered entities", "Withdraw a small amount early to test"],
    severity: "Critical",
  },
  {
    id: "deepfake",
    title: "Deepfake / AI Voice Scam",
    how: "AI clones a familiar voice or face to impersonate a family member, boss, or official in a video/voice call requesting money.",
    example: "A 'video call' from a relative in distress asks for an emergency transfer - but it's an AI-generated face.",
    warnings: ["Unusually urgent requests over call", "Slightly off audio/video sync", "Pressure to keep it secret"],
    prevention: ["Verify through a separate trusted channel", "Agree on a family safe-word", "Slow down - urgency is the manipulation"],
    severity: "Critical",
  },
]

export interface TimelineEvent {
  id: string
  name: string
  date: string
  year: number
  type: string
  impact: string
  lesson: string
}

export const TIMELINE: TimelineEvent[] = [
  { id: "stuxnet", name: "Stuxnet", date: "2010", year: 2010, type: "Industrial Worm", impact: "First known cyber weapon to cause physical damage, targeting industrial control systems.", lesson: "Critical infrastructure needs air-gapping and rigorous supply-chain security." },
  { id: "wannacry", name: "WannaCry", date: "May 2017", year: 2017, type: "Ransomware", impact: "Infected 200,000+ computers across 150 countries, crippling hospitals and businesses.", lesson: "Patch systems promptly; unsupported software is a massive liability." },
  { id: "notpetya", name: "NotPetya", date: "June 2017", year: 2017, type: "Wiper Malware", impact: "Caused over $10 billion in damages globally, disguised as ransomware.", lesson: "Maintain offline backups and segment networks to limit blast radius." },
  { id: "solarwinds", name: "SolarWinds", date: "Dec 2020", year: 2020, type: "Supply Chain Attack", impact: "Compromised software updates affected thousands of organizations including US agencies.", lesson: "Trust but verify your software supply chain and monitor for anomalies." },
  { id: "colonial", name: "Colonial Pipeline", date: "May 2021", year: 2021, type: "Ransomware", impact: "Shut down the largest US fuel pipeline, causing widespread shortages.", lesson: "Incident response plans and MFA on remote access are essential." },
]

export interface AcademyModule {
  id: string
  title: string
  level: "Beginner" | "Intermediate" | "Advanced"
  summary: string
  lessons: string[]
}

export const ACADEMY: AcademyModule[] = [
  { id: "networking", title: "Networking Basics", level: "Beginner", summary: "Understand how data travels across the internet and where it can be intercepted.", lessons: ["IP addresses & DNS", "Ports & protocols (HTTP/HTTPS)", "How packets travel", "Why HTTPS matters"] },
  { id: "hygiene", title: "Cyber Hygiene", level: "Beginner", summary: "Daily habits that dramatically reduce your personal attack surface.", lessons: ["Strong unique passwords", "Software updates", "Safe Wi-Fi habits", "Recognizing suspicious messages"] },
  { id: "privacy", title: "Digital Privacy", level: "Beginner", summary: "Control what data you share and how it can be used against you.", lessons: ["Data minimization", "App permissions", "Privacy settings", "Your digital footprint"] },
  { id: "auth", title: "Authentication", level: "Intermediate", summary: "How identity is verified and how attackers try to bypass it.", lessons: ["Passwords vs passphrases", "Multi-factor authentication", "Passkeys & biometrics", "Session security"] },
  { id: "encryption", title: "Encryption", level: "Intermediate", summary: "How data is protected in transit and at rest.", lessons: ["Symmetric vs asymmetric", "TLS in your browser", "End-to-end encryption", "Why you can't 'see' encrypted data"] },
  { id: "threat-intel", title: "Threat Intelligence", level: "Advanced", summary: "How defenders track adversaries and predict attacks.", lessons: ["Indicators of compromise (IOCs)", "Threat actor profiles", "MITRE ATT&CK basics", "Sharing intelligence"] },
  { id: "soc", title: "SOC Operations", level: "Advanced", summary: "How a Security Operations Center monitors and responds to incidents.", lessons: ["SIEM & log analysis", "Alert triage", "Incident response lifecycle", "Blue team fundamentals"] },
]

export interface QuizQuestion {
  q: string
  options: string[]
  answer: number
  explain: string
}

export interface Quiz {
  id: string
  title: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  questions: QuizQuestion[]
}

export const QUIZZES: Quiz[] = [
  {
    id: "phishing-basics",
    title: "Spot the Phish",
    difficulty: "Beginner",
    questions: [
      { q: "An email says 'Your account is suspended, click here to verify within 24 hours.' What is the biggest red flag?", options: ["The company logo", "Urgency and a verification link", "The email has an unsubscribe link", "It was sent in the morning"], answer: 1, explain: "Creating urgency to make you click a link is a classic phishing tactic." },
      { q: "Which sender address is most suspicious for a message claiming to be from your bank?", options: ["alerts@yourbank.com", "support@yourbank.com", "yourbank-secure@gmail.com", "no-reply@yourbank.com"], answer: 2, explain: "Banks use their own domain, not free email providers like gmail.com." },
      { q: "What should you do if unsure about a link in an email?", options: ["Click to check", "Hover to preview the URL and verify independently", "Forward it to friends", "Reply asking if it's real"], answer: 1, explain: "Hovering reveals the true destination; always verify through official channels." },
    ],
  },
  {
    id: "passwords",
    title: "Password Power",
    difficulty: "Beginner",
    questions: [
      { q: "Which password is strongest?", options: ["Password123", "qwerty", "Tr0ub4dor", "correct-horse-battery-staple-92"], answer: 3, explain: "Long passphrases with multiple words are far stronger than short complex ones." },
      { q: "Why use a different password for each site?", options: ["It's the law", "So a breach of one doesn't expose all accounts", "Sites require it", "It loads faster"], answer: 1, explain: "Reusing passwords means one breach can cascade across all your accounts." },
      { q: "What's the safest way to manage many passwords?", options: ["Write them in a notebook", "Reuse one strong password", "Use a password manager", "Memorize all of them"], answer: 2, explain: "Password managers generate and store unique strong passwords securely." },
    ],
  },
  {
    id: "india-scams",
    title: "Scam Defender (India)",
    difficulty: "Intermediate",
    questions: [
      { q: "When do you need to enter your UPI PIN?", options: ["To receive money", "To send/pay money", "To check balance only", "Whenever asked"], answer: 1, explain: "UPI PIN is ONLY required to send money. If asked to enter it to 'receive', it's a scam." },
      { q: "A caller asks for your OTP to 'stop your account from being blocked.' You should:", options: ["Share it quickly", "Share only half", "Refuse and hang up", "Ask them to call back"], answer: 2, explain: "Never share OTPs. Legitimate institutions never ask for them." },
      { q: "What is the national cyber crime helpline number in India?", options: ["100", "1930", "1800", "112"], answer: 1, explain: "1930 is the dedicated helpline for reporting financial cyber fraud in India." },
    ],
  },
  {
    id: "advanced-threats",
    title: "Threat Analyst",
    difficulty: "Advanced",
    questions: [
      { q: "A DDoS attack primarily targets a system's:", options: ["Confidentiality", "Availability", "Encryption keys", "Source code"], answer: 1, explain: "DDoS overwhelms resources to deny availability to legitimate users." },
      { q: "What best describes a supply-chain attack?", options: ["Phishing employees", "Compromising a trusted vendor/software to reach targets", "Brute forcing passwords", "Physical theft"], answer: 1, explain: "Attackers compromise trusted software/vendors (e.g. SolarWinds) to reach many victims." },
      { q: "Which is a strong defense against ransomware?", options: ["Paying quickly", "Disabling antivirus", "Offline, tested backups", "Sharing passwords"], answer: 2, explain: "Reliable offline backups let you recover without paying attackers." },
    ],
  },
]

export const COUNTRIES = [
  { name: "United States", code: "US", x: 22, y: 38 },
  { name: "Russia", code: "RU", x: 62, y: 28 },
  { name: "China", code: "CN", x: 74, y: 42 },
  { name: "India", code: "IN", x: 68, y: 52 },
  { name: "Brazil", code: "BR", x: 33, y: 68 },
  { name: "Germany", code: "DE", x: 50, y: 33 },
  { name: "United Kingdom", code: "GB", x: 47, y: 31 },
  { name: "Nigeria", code: "NG", x: 49, y: 58 },
  { name: "Australia", code: "AU", x: 82, y: 75 },
  { name: "Japan", code: "JP", x: 83, y: 41 },
  { name: "Iran", code: "IR", x: 60, y: 45 },
  { name: "Canada", code: "CA", x: 22, y: 26 },
]

export const ATTACK_TYPES = ["DDoS", "Phishing", "Malware", "Ransomware", "Brute Force", "Data Exfiltration", "SQL Injection"]

export const NEWS_CATEGORIES = ["Data Breach", "Malware", "AI Security", "Government Attacks", "Financial Fraud"] as const
export type NewsCategory = (typeof NEWS_CATEGORIES)[number]

export interface NewsItem {
  id: string
  title: string
  source: string
  category: NewsCategory
  summary: string
  trending: boolean
  hoursAgo: number
}

export const NEWS: NewsItem[] = [
  { id: "n1", title: "Major retailer discloses breach affecting 4.2M customer records", source: "ThreatPost", category: "Data Breach", summary: "Exposed data includes names, emails and hashed passwords. Customers urged to reset credentials and enable MFA.", trending: true, hoursAgo: 2 },
  { id: "n2", title: "New ransomware strain targets healthcare backup systems", source: "BleepingWire", category: "Malware", summary: "The variant specifically seeks and encrypts backup volumes, raising the stakes for unprepared organizations.", trending: true, hoursAgo: 5 },
  { id: "n3", title: "Researchers demonstrate prompt-injection risks in AI assistants", source: "AI Defense Daily", category: "AI Security", summary: "Crafted inputs can manipulate LLM agents into leaking data, underscoring the need for input validation.", trending: true, hoursAgo: 8 },
  { id: "n4", title: "State-sponsored group linked to critical infrastructure intrusions", source: "CyberGov", category: "Government Attacks", summary: "Persistent access was discovered in energy-sector networks; agencies issue mitigation guidance.", trending: false, hoursAgo: 12 },
  { id: "n5", title: "UPI fraud complaints rise sharply, regulators push awareness drive", source: "FinSecure", category: "Financial Fraud", summary: "Authorities emphasize that PINs are never needed to receive money and promote the 1930 helpline.", trending: true, hoursAgo: 14 },
  { id: "n6", title: "Phishing kit-as-a-service lowers barrier for credential theft", source: "ThreatPost", category: "Malware", summary: "Subscription kits bundle convincing templates and hosting, making detection and takedown harder.", trending: false, hoursAgo: 20 },
  { id: "n7", title: "Cloud misconfiguration exposes millions of sensitive documents", source: "CloudWatchSec", category: "Data Breach", summary: "An unsecured storage bucket left files publicly accessible for weeks before discovery.", trending: false, hoursAgo: 26 },
  { id: "n8", title: "Deepfake voice scams cost businesses millions in wire fraud", source: "FinSecure", category: "Financial Fraud", summary: "Attackers clone executives' voices to authorize fraudulent transfers; verification protocols recommended.", trending: true, hoursAgo: 30 },
  { id: "n9", title: "Open-source maintainers warn of rising dependency hijacking", source: "DevSecToday", category: "AI Security", summary: "Malicious packages mimic popular libraries to slip into build pipelines.", trending: false, hoursAgo: 36 },
  { id: "n10", title: "Government issues advisory on patching widely-used VPN flaw", source: "CyberGov", category: "Government Attacks", summary: "Active exploitation observed; immediate patching and credential rotation advised.", trending: false, hoursAgo: 40 },
]

export const COMMUNITY_SEED = [
  { name: "Aarav Sharma", role: "Student" },
  { name: "Priya Verma", role: "Teacher" },
  { name: "Rohan Patel", role: "Developer" },
  { name: "Ananya Gupta", role: "Analyst" },
  { name: "Vikram Singh", role: "Parent" },
]

export interface ToolkitItem {
  id: string
  label: string
  detail: string
  category: "Accounts" | "Devices" | "Network" | "Awareness"
}

export const TOOLKIT: ToolkitItem[] = [
  { id: "mfa", label: "Enable multi-factor authentication everywhere", detail: "Add a second factor (app or hardware key) to email, banking, and social accounts.", category: "Accounts" },
  { id: "pwmgr", label: "Use a password manager", detail: "Generate and store unique strong passwords so one breach can't cascade.", category: "Accounts" },
  { id: "unique-pw", label: "Replace reused passwords", detail: "Reused passwords let attackers pivot from one leaked site to all others.", category: "Accounts" },
  { id: "breach", label: "Check your email in a breach database", detail: "See if your credentials have appeared in known data breaches and rotate them.", category: "Accounts" },
  { id: "updates", label: "Turn on automatic updates", detail: "Patches close the vulnerabilities that malware and ransomware exploit.", category: "Devices" },
  { id: "lock", label: "Set a screen lock + biometric", detail: "Protect a lost or stolen device from immediate access.", category: "Devices" },
  { id: "backup", label: "Keep an offline backup", detail: "An offline copy is your best defense against ransomware.", category: "Devices" },
  { id: "antivirus", label: "Run reputable security software", detail: "Keep real-time protection enabled and definitions current.", category: "Devices" },
  { id: "wifi", label: "Secure your home Wi-Fi", detail: "Use WPA3/WPA2, a strong router password, and change default admin credentials.", category: "Network" },
  { id: "vpn", label: "Use a trusted VPN on public Wi-Fi", detail: "Encrypt traffic when on untrusted networks like cafes and airports.", category: "Network" },
  { id: "dns", label: "Enable secure DNS filtering", detail: "Block known malicious domains before they ever load.", category: "Network" },
  { id: "phish", label: "Learn to spot phishing", detail: "Check sender addresses, hover links, and never act on urgency.", category: "Awareness" },
  { id: "otp-rule", label: "Never share OTPs or PINs", detail: "No legitimate bank or company will ever ask for them.", category: "Awareness" },
  { id: "verify", label: "Verify before you trust", detail: "Confirm urgent money or data requests through a separate trusted channel.", category: "Awareness" },
]

export interface Recommendation {
  id: string
  title: string
  body: string
  priority: "High" | "Medium" | "Low"
  tag: string
}

export const RECOMMENDATIONS: Recommendation[] = [
  { id: "r1", title: "Turn on MFA for your primary email", body: "Your email is the recovery point for every other account. Securing it first blocks the most common takeover path.", priority: "High", tag: "Accounts" },
  { id: "r2", title: "Audit reused passwords", body: "Adopt a password manager and replace duplicates. Credential stuffing relies entirely on password reuse.", priority: "High", tag: "Accounts" },
  { id: "r3", title: "Schedule an offline backup", body: "Ransomware can't extort what you can restore for free. Keep at least one disconnected copy.", priority: "Medium", tag: "Devices" },
  { id: "r4", title: "Review app permissions", body: "Revoke access from apps you no longer use, especially those with access to contacts or files.", priority: "Medium", tag: "Devices" },
  { id: "r5", title: "Practice phishing identification", body: "Run the phishing simulator weekly to keep your detection skills sharp.", priority: "Low", tag: "Awareness" },
  { id: "r6", title: "Set a family safe-word", body: "Agree on a code phrase to defeat AI voice/deepfake emergency scams targeting relatives.", priority: "Medium", tag: "Awareness" },
]

