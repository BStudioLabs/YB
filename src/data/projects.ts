export type ProjectCategory = "web" | "security" | "systems";

export interface Project {
  slug: string;
  title: string;
  year: string;
  category: ProjectCategory;
  tags: string[];
  summary: string;
  problem: string;
  solution: string;
  stack: string[];
  results: string[];
  image_url?: string | null;
}

export const categories: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "security", label: "Security" },
  { id: "systems", label: "Systems" },
];

export const projects: Project[] = [
  {
    slug: "atlas-commerce",
    title: "Atlas Commerce",
    year: "2026",
    category: "web",
    tags: ["Next.js", "Stripe", "Headless"],
    summary:
      "A headless storefront for a Moroccan artisan collective selling into the EU market.",
    problem:
      "The collective ran on a slow legacy theme: 9-second mobile loads, a 70% cart abandonment rate, and no way to localize pricing or content for European buyers.",
    solution:
      "Rebuilt as a headless Next.js storefront with edge-rendered product pages, Stripe for multi-currency checkout, and a translation-ready CMS so the team publishes in three languages without touching code.",
    stack: ["Next.js", "TypeScript", "Stripe", "Sanity", "Vercel"],
    results: [
      "Largest Contentful Paint cut from 9.1s to 1.2s on mid-range mobiles",
      "Checkout conversion up 38% in the first quarter",
      "Content team publishes independently — zero developer tickets for copy changes",
    ],
  },
  {
    slug: "finguard-audit",
    title: "FinGuard Audit",
    year: "2026",
    category: "security",
    tags: ["Pentest", "OWASP", "Hardening"],
    summary:
      "Full application security audit and hardening pass for a fintech onboarding platform.",
    problem:
      "Ahead of a banking partnership, the platform needed a third-party security review. Internal tests had never covered authorization logic or the mobile API surface.",
    solution:
      "Ran a structured OWASP-based assessment across web and API: authorization matrix testing, session lifecycle review, and infrastructure hardening. Delivered fixes with the findings, not just a PDF of problems.",
    stack: ["Burp Suite", "OWASP ASVS", "Node.js", "PostgreSQL", "Docker"],
    results: [
      "14 findings including 2 critical IDORs in the KYC document flow — all fixed and retested",
      "Session and token policy rewritten; account takeover paths closed",
      "Passed the partner bank's independent review on the first attempt",
    ],
  },
  {
    slug: "medina-logistics-os",
    title: "Medina Logistics OS",
    year: "2025",
    category: "systems",
    tags: ["Dashboard", "Realtime", "Postgres"],
    summary:
      "A realtime operations dashboard replacing WhatsApp threads and spreadsheets for a delivery fleet.",
    problem:
      "Dispatch for 40+ drivers ran on group chats and a shared spreadsheet. No live view of deliveries, no accountability trail, and end-of-day reconciliation took two hours.",
    solution:
      "Built an internal OS: live delivery map, driver assignment queue, and automatic reconciliation — backed by Postgres with realtime subscriptions so dispatch sees status changes the second they happen.",
    stack: ["React", "Supabase", "PostgreSQL", "Mapbox", "Tailwind"],
    results: [
      "Daily reconciliation reduced from ~2 hours to under 5 minutes",
      "Failed-delivery rate down 22% with live exception alerts",
      "Onboarded the full fleet in one week — no training manual needed",
    ],
  },
  {
    slug: "studio-noir",
    title: "Studio Noir Portfolio",
    year: "2025",
    category: "web",
    tags: ["Design", "Motion", "3D"],
    summary:
      "An award-bait portfolio site for a photography duo, built around motion and negative space.",
    problem:
      "The duo's work was strong but their site was a default template grid — indistinguishable from ten thousand others and invisible to the agencies they wanted to attract.",
    solution:
      "Designed and built a custom experience: WebGL image distortion on scroll, a film-strip navigation metaphor, and an editorial type system. Every interaction tuned to keep the photography as the loudest element on the page.",
    stack: ["Next.js", "Framer Motion", "WebGL", "Vercel"],
    results: [
      "Featured on two design showcase galleries within a month of launch",
      "Average session time tripled compared to the old template",
      "Three agency inquiries directly attributed to the site in the first quarter",
    ],
  },
  {
    slug: "vaultpass-recon",
    title: "VaultPass Recon",
    year: "2025",
    category: "security",
    tags: ["Bug Bounty", "API Security"],
    summary:
      "Authorized security research engagement against a password manager's public API surface.",
    problem:
      "The vendor's bug bounty program had gone quiet — the easy findings were gone, and they wanted depth: business-logic and API authorization flaws automated scanners can't reach.",
    solution:
      "Systematic recon and API mapping, then focused manual testing of sharing, recovery and team-vault flows — the places where authorization logic gets complicated and assumptions break.",
    stack: ["Burp Suite", "Python", "OWASP", "GraphQL"],
    results: [
      "Critical vault-sharing authorization flaw reported and patched within 72 hours",
      "Two high-severity findings in the account recovery flow",
      "Engagement extended — now a standing quarterly review",
    ],
  },
  {
    slug: "sahara-booking",
    title: "Sahara Booking Engine",
    year: "2024",
    category: "systems",
    tags: ["Automation", "API", "CRM"],
    summary:
      "A booking and CRM automation engine for a desert tour operator drowning in manual admin.",
    problem:
      "Every booking arrived by email or Instagram DM and was re-typed into three different systems. Double-bookings were monthly events and deposits regularly went untracked.",
    solution:
      "Built a central booking engine with availability rules, automated deposit links, and a lightweight CRM. Inbound requests from every channel land in one queue with one source of truth for the calendar.",
    stack: ["Node.js", "PostgreSQL", "Stripe", "Twilio", "React"],
    results: [
      "Double-bookings eliminated — zero incidents in the first season",
      "Admin time per booking cut from ~25 minutes to under 3",
      "Deposit collection rate up to 98% with automated payment links",
    ],
  },
];

