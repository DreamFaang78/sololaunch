// =====================================================
// SoloLaunch – Mock Data Store
// All data is representative; real app fetches from APIs
// =====================================================

const LANG_COLORS = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572A5',
  Rust: '#dea584', Go: '#00ADD8', Swift: '#FA7343', Kotlin: '#A97BFF',
  CSS: '#563d7c', HTML: '#e34c26', Java: '#b07219', 'C++': '#f34b7d',
  Ruby: '#701516', PHP: '#4F5D95', Zig: '#ec915c', Elixir: '#6e4a7e',
  Dart: '#00B4AB', Shell: '#89e051',
};

const DIFFICULTY = { weekend: 'Weekend', month: 'Month', quarter: 'Quarter' };

// ── GitHub Repos ──────────────────────────────────────
const REPOS = [
  {
    id: 'r1', owner: 'vercel', name: 'next.js', full: 'vercel/next.js',
    desc: 'The React Framework – created and maintained by Vercel. Production-ready framework for full-stack web applications.',
    stars: 128400, forks: 27100, issues: 3240, language: 'JavaScript',
    license: 'MIT', last_commit: '2 hours ago', topics: ['react','framework','ssr','typescript'],
    url: 'https://github.com/vercel/next.js', source: 'GitHub API', updated: '2 hours ago', trending: true, growth: 12,
  },
  {
    id: 'r2', owner: 'microsoft', name: 'vscode', full: 'microsoft/vscode',
    desc: 'Visual Studio Code – an open source code editor that runs everywhere, built on web technologies.',
    stars: 165200, forks: 29800, issues: 7400, language: 'TypeScript',
    license: 'MIT', last_commit: '4 hours ago', topics: ['editor','typescript','electron','dev-tools'],
    url: 'https://github.com/microsoft/vscode', source: 'GitHub API', updated: '4 hours ago', trending: true, growth: 8,
  },
  {
    id: 'r3', owner: 'astro-build', name: 'astro', full: 'astro-build/astro',
    desc: 'Build faster websites with a next-gen island architecture. Zero JS by default with opt-in interactivity.',
    stars: 48900, forks: 2500, issues: 640, language: 'TypeScript',
    license: 'MIT', last_commit: '1 hour ago', topics: ['astro','static-site','web','performance'],
    url: 'https://github.com/astro-build/astro', source: 'GitHub API', updated: '1 hour ago', trending: true, growth: 34,
  },
  {
    id: 'r4', owner: 'facebook', name: 'react', full: 'facebook/react',
    desc: 'The library for web and native user interfaces. Declarative, component-based, and highly composable.',
    stars: 228000, forks: 46700, issues: 1100, language: 'JavaScript',
    license: 'MIT', last_commit: '6 hours ago', topics: ['react','ui','javascript','components'],
    url: 'https://github.com/facebook/react', source: 'GitHub API', updated: '6 hours ago', trending: false, growth: 5,
  },
  {
    id: 'r5', owner: 'sst', name: 'ion', full: 'sst/ion',
    desc: 'SST v3 – Deploy fullstack apps to your own AWS account. Next.js, Remix, Hono, Drizzle, all in TypeScript.',
    stars: 5800, forks: 340, issues: 112, language: 'TypeScript',
    license: 'MIT', last_commit: '3 hours ago', topics: ['aws','serverless','iac','typescript'],
    url: 'https://github.com/sst/ion', source: 'GitHub API', updated: '3 hours ago', trending: true, growth: 67,
  },
  {
    id: 'r6', owner: 'drizzle-team', name: 'drizzle-orm', full: 'drizzle-team/drizzle-orm',
    desc: 'TypeScript ORM that loves SQL. Fully type-safe with a simple API, works with PostgreSQL, MySQL, SQLite.',
    stars: 26400, forks: 760, issues: 900, language: 'TypeScript',
    license: 'Apache-2.0', last_commit: '5 hours ago', topics: ['orm','sql','typescript','postgres'],
    url: 'https://github.com/drizzle-team/drizzle-orm', source: 'GitHub API', updated: '5 hours ago', trending: true, growth: 42,
  },
  {
    id: 'r7', owner: 'honojs', name: 'hono', full: 'honojs/hono',
    desc: 'Fast, Lightweight, Web-standards. Support for any JavaScript runtime – Cloudflare, Deno, Bun, Node, AWS Lambda.',
    stars: 21700, forks: 620, issues: 88, language: 'TypeScript',
    license: 'MIT', last_commit: '8 hours ago', topics: ['hono','web-framework','cloudflare','lambda'],
    url: 'https://github.com/honojs/hono', source: 'GitHub API', updated: '8 hours ago', trending: true, growth: 58,
  },
  {
    id: 'r8', owner: 'biomejs', name: 'biome', full: 'biomejs/biome',
    desc: 'One toolchain for your web project. Linter, formatter, bundler and more – all in Rust, absurdly fast.',
    stars: 14800, forks: 480, issues: 320, language: 'Rust',
    license: 'MIT', last_commit: '12 hours ago', topics: ['rust','linter','formatter','toolchain'],
    url: 'https://github.com/biomejs/biome', source: 'GitHub API', updated: '12 hours ago', trending: true, growth: 29,
  },
  {
    id: 'r9', owner: 'shadcn', name: 'ui', full: 'shadcn/ui',
    desc: 'Beautifully designed components built with Radix UI and Tailwind CSS. Not a component library, it is how you build yours.',
    stars: 72000, forks: 4600, issues: 580, language: 'TypeScript',
    license: 'MIT', last_commit: '10 hours ago', topics: ['react','ui','components','tailwind'],
    url: 'https://github.com/shadcn/ui', source: 'GitHub API', updated: '10 hours ago', trending: true, growth: 22,
  },
  {
    id: 'r10', owner: 'lucia-auth', name: 'lucia', full: 'lucia-auth/lucia',
    desc: 'Auth library for TypeScript. Flexible, database-agnostic, and fully open source authentication solution.',
    stars: 9400, forks: 320, issues: 64, language: 'TypeScript',
    license: 'MIT', last_commit: '1 day ago', topics: ['auth','typescript','sessions','oauth'],
    url: 'https://github.com/lucia-auth/lucia', source: 'GitHub API', updated: '1 day ago', trending: false, growth: 18,
  },
];

// ── Trending Software / Packages ──────────────────────
const PACKAGES = [
  {
    id: 'p1', name: 'hono', registry: 'npm', emoji: '🔥',
    desc: 'Ultra-fast web framework for the Edges. Tiny, zero-dependency, works on Cloudflare Workers, Deno, Bun and Node.',
    weekly_downloads: 1420000, growth: +38.2, latest_version: '4.6.14',
    license: 'MIT', url: 'https://npmjs.com/package/hono',
    source: 'npm Registry API', updated: '1 hour ago',
    tags: ['web', 'framework', 'edge'],
  },
  {
    id: 'p2', name: 'drizzle-orm', registry: 'npm', emoji: '🐉',
    desc: 'Headless TypeScript ORM with a drizzle of magic. SQL-like API that TypeScript loves.',
    weekly_downloads: 980000, growth: +44.1, latest_version: '0.36.1',
    license: 'Apache-2.0', url: 'https://npmjs.com/package/drizzle-orm',
    source: 'npm Registry API', updated: '2 hours ago',
    tags: ['orm', 'sql', 'typescript'],
  },
  {
    id: 'p3', name: 'bun', registry: 'npm', emoji: '🥟',
    desc: 'All-in-one JavaScript runtime and toolkit. Blazing fast, with a built-in bundler, test runner, and npm client.',
    weekly_downloads: 2100000, growth: +61.7, latest_version: '1.1.30',
    license: 'MIT', url: 'https://npmjs.com/package/bun',
    source: 'npm Registry API', updated: '30 min ago',
    tags: ['runtime', 'bundler', 'fast'],
  },
  {
    id: 'p4', name: 'fastapi', registry: 'pypi', emoji: '⚡',
    desc: 'FastAPI framework – high performance, easy to learn, fast to code. Ready for production.',
    weekly_downloads: 8700000, growth: +22.5, latest_version: '0.115.4',
    license: 'MIT', url: 'https://pypi.org/project/fastapi/',
    source: 'PyPI JSON API + pypistats', updated: '3 hours ago',
    tags: ['python', 'api', 'async'],
  },
  {
    id: 'p5', name: 'zod', registry: 'npm', emoji: '🛡',
    desc: 'TypeScript-first schema declaration and validation library. Infers static TypeScript type automatically.',
    weekly_downloads: 24000000, growth: +18.3, latest_version: '3.23.8',
    license: 'MIT', url: 'https://npmjs.com/package/zod',
    source: 'npm Registry API', updated: '1 hour ago',
    tags: ['validation', 'typescript', 'schema'],
  },
  {
    id: 'p6', name: 'uv', registry: 'pypi', emoji: '🦀',
    desc: 'An extremely fast Python package and project manager, written in Rust. Drop-in replacement for pip.',
    weekly_downloads: 3400000, growth: +88.4, latest_version: '0.4.28',
    license: 'MIT', url: 'https://pypi.org/project/uv/',
    source: 'PyPI JSON API + pypistats', updated: '45 min ago',
    tags: ['python', 'package-manager', 'rust'],
  },
  {
    id: 'p7', name: '@biomejs/biome', registry: 'npm', emoji: '🧬',
    desc: 'One toolchain for your web project. Lints, formats, and more – all at Rust speed.',
    weekly_downloads: 670000, growth: +51.2, latest_version: '1.9.3',
    license: 'MIT', url: 'https://npmjs.com/package/@biomejs/biome',
    source: 'npm Registry API', updated: '2 hours ago',
    tags: ['linter', 'formatter', 'toolchain'],
  },
  {
    id: 'p8', name: 'effect', registry: 'npm', emoji: '🌊',
    desc: 'A powerful TypeScript framework for building production-grade, highly-composable and type-safe applications.',
    weekly_downloads: 340000, growth: +72.8, latest_version: '3.10.9',
    license: 'MIT', url: 'https://npmjs.com/package/effect',
    source: 'npm Registry API', updated: '3 hours ago',
    tags: ['fp', 'typescript', 'composable'],
  },
];

// ── Apps (community submitted) ─────────────────────────
const APPS = [
  {
    id: 'a1', name: 'Pika', tagline: 'Effortlessly create beautiful screenshots and mockups for your app', emoji: '📸',
    maker: 'dhravya', maker_handle: 'dhravya', category: 'Design Tool', solo: true,
    tags: ['design','screenshots','productivity'], upvotes: 842,
    url: 'https://pika.style', stars: 2100, source: 'Community + GitHub API', updated: '6 hours ago',
  },
  {
    id: 'a2', name: 'Raycast', tagline: 'Your shortcut to everything. A blazingly fast, totally extendable launcher', emoji: '🚀',
    maker: 'peduarte', maker_handle: 'peduarte', category: 'Productivity', solo: false,
    tags: ['launcher','macos','productivity'], upvotes: 3240,
    url: 'https://raycast.com', stars: null, source: 'Community Submission', updated: '1 day ago',
  },
  {
    id: 'a3', name: 'Gitpod', tagline: 'Cloud development environments, automated and ready to code', emoji: '🏗',
    maker: 'svenefftinge', maker_handle: 'svenefftinge', category: 'Developer Tool', solo: false,
    tags: ['cloud','devenv','open-source'], upvotes: 1560,
    url: 'https://gitpod.io', stars: 12800, source: 'Community + GitHub API', updated: '2 hours ago',
  },
  {
    id: 'a4', name: 'Papermark', tagline: 'Open-source DocSend alternative. Share documents with real-time analytics', emoji: '📄',
    maker: 'mfts0', maker_handle: 'mfts0', category: 'SaaS', solo: true,
    tags: ['documents','analytics','open-source'], upvotes: 674,
    url: 'https://papermark.io', stars: 5200, source: 'Community + GitHub API', updated: '4 hours ago',
  },
  {
    id: 'a5', name: 'Documenso', tagline: 'The open-source DocuSign alternative for document signing', emoji: '✍️',
    maker: 'timleslie', maker_handle: 'timleslie', category: 'SaaS', solo: true,
    tags: ['documents','signing','open-source'], upvotes: 521,
    url: 'https://documenso.com', stars: 8900, source: 'Community + GitHub API', updated: '3 hours ago',
  },
  {
    id: 'a6', name: 'Wasp', tagline: 'The fastest way to develop full-stack React + Node.js apps. No boilerplate', emoji: '🐝',
    maker: 'martinovicm', maker_handle: 'martinovicm', category: 'Developer Tool', solo: false,
    tags: ['react','node','fullstack','framework'], upvotes: 893,
    url: 'https://wasp-lang.dev', stars: 14200, source: 'Community + GitHub API', updated: '5 hours ago',
  },
  {
    id: 'a7', name: 'Supabase', tagline: 'The open source Firebase alternative. Instant backend with Postgres', emoji: '⚡',
    maker: 'kiwicopple', maker_handle: 'kiwicopple', category: 'Backend', solo: false,
    tags: ['database','postgres','backend','open-source'], upvotes: 4120,
    url: 'https://supabase.com', stars: 73200, source: 'Community + GitHub API', updated: '1 hour ago',
  },
  {
    id: 'a8', name: 'Cal.com', tagline: 'Scheduling infrastructure for absolutely everyone. Open source Calendly', emoji: '📅',
    maker: 'peer', maker_handle: 'peer', category: 'Productivity', solo: false,
    tags: ['scheduling','calendar','open-source'], upvotes: 2380,
    url: 'https://cal.com', stars: 32100, source: 'Community + GitHub API', updated: '2 hours ago',
  },
];

// ── Idea Generator Results ─────────────────────────────
const IDEA_RESULTS = {
  'invoice tool': {
    query: 'invoice tool for freelancers',
    competitors: [
      { name: 'Invoice Ninja', url: 'https://github.com/invoiceninja/invoiceninja', stars: 8200, downloads: null, license: 'AAL', updated: '2024-11', registry: 'GitHub' },
      { name: 'invoice-zero', url: 'https://github.com/invoice-zero', stars: 340, downloads: null, license: 'MIT', updated: '2023-08', registry: 'GitHub' },
      { name: 'invoicehippo', url: 'https://invoicehippo.com', stars: null, downloads: null, license: 'Proprietary', updated: '2024-09', registry: 'Web' },
    ],
    signals: { repos: 47, packages: 8, active: 12, avg_stars: 820, last_updated: '1 month ago' },
    gaps: [
      { icon: '😤', text: '"None of them support multi-currency invoicing without a paid plan"', source: 'GitHub Issues · invoice-ninja#4821', theme: 'missing feature' },
      { icon: '😩', text: '"PDF export fonts are broken on Linux"', source: 'GitHub Issues · invoice-ninja#5102', theme: 'bug' },
      { icon: '💬', text: '"I just want something lightweight without a 50MB Docker image"', source: 'Hacker News · ask.hn/freelancer-tools-2024', theme: 'pain point' },
      { icon: '🔗', text: '"No native integration with Wise or Revolut for payouts"', source: 'Reddit r/freelance · top comment', theme: 'missing integration' },
    ],
    ideas: [
      {
        num: 1, title: 'LiteInvoice – terminal-first invoice CLI',
        why: 'Developers hate heavy web apps for simple invoicing. A CLI that outputs PDF, sends via email, and stores in SQLite hits a real gap. No Docker, no cloud required.',
        stack: ['Bun', 'PDFKit', 'SQLite', 'Nodemailer'], difficulty: 'weekend', solo_score: 5,
        tags: ['CLI', 'no-cloud', 'terminal'],
        sources: ['github.com/invoiceninja/invoiceninja/issues/5102', 'news.ycombinator.com/item?id=38241'],
      },
      {
        num: 2, title: 'WiseInvoice – Freelancer-to-Wise payment pipeline',
        why: 'Wise and Revolut are dominant among freelancers in Europe and Asia, yet zero open-source invoicing tools natively integrate with them. First-mover advantage.',
        stack: ['Next.js', 'Hono', 'Drizzle', 'Wise API'], difficulty: 'month', solo_score: 4,
        tags: ['Wise', 'payments', 'SaaS'],
        sources: ['reddit.com/r/freelance/comments/xyz', 'news.ycombinator.com/item?id=38900'],
      },
      {
        num: 3, title: 'InvoiceAI – Auto-fill invoices from chat description',
        why: 'Freelancers describe work conversationally. An AI that listens to "I did 3 days React consulting at $150/h" and generates a ready-to-send PDF is a clear differentiator.',
        stack: ['Astro', 'Amazon Bedrock', 'PostgreSQL', 'Puppeteer'], difficulty: 'month', solo_score: 4,
        tags: ['AI', 'NLP', 'automation'],
        sources: ['twitter.com/freelancer_pain/status/1842...'],
      },
      {
        num: 4, title: 'FlatInvoice – Multi-currency, zero-subscription',
        why: 'Every existing tool charges monthly for multi-currency. A one-time-payment or open-source-and-self-host model directly addresses the most upvoted issue on Invoice Ninja.',
        stack: ['SvelteKit', 'Pocketbase', 'ExchangeRate API'], difficulty: 'month', solo_score: 5,
        tags: ['multi-currency', 'one-time', 'OSS'],
        sources: ['github.com/invoiceninja/invoiceninja/issues/4821'],
      },
      {
        num: 5, title: 'InvoiceOS – Open-source invoicing OS in the browser',
        why: 'A PWA-first, offline-capable invoice tool running 100% in browser localStorage means zero server costs and infinite privacy. Fills the gap of "I want local-only".',
        stack: ['Vue 3', 'Vite', 'IndexedDB', 'jsPDF'], difficulty: 'weekend', solo_score: 5,
        tags: ['PWA', 'offline', 'browser'],
        sources: ['news.ycombinator.com/item?id=40012'],
      },
    ],
  },
  'habit tracker': {
    query: 'habit tracker app',
    competitors: [
      { name: 'Loop Habit Tracker', url: 'https://github.com/iSoron/uhabits', stars: 7800, downloads: null, license: 'GPL-3.0', updated: '2024-10', registry: 'GitHub' },
      { name: 'Habitica', url: 'https://github.com/HabitRPG/habitica', stars: 11200, downloads: null, license: 'GPL-3.0', updated: '2024-09', registry: 'GitHub' },
      { name: 'habits', url: 'https://npmjs.com/package/habits', stars: null, downloads: 1200, license: 'MIT', updated: '2022-03', registry: 'npm' },
    ],
    signals: { repos: 124, packages: 23, active: 34, avg_stars: 1200, last_updated: '3 months ago' },
    gaps: [
      { icon: '📊', text: '"No proper analytics – I want to see streaks over years, not just 30 days"', source: 'GitHub Issues · uhabits#1234', theme: 'missing feature' },
      { icon: '🔔', text: '"Notifications are unreliable on Android 14 due to new permissions"', source: 'GitHub Issues · uhabits#2001', theme: 'bug' },
      { icon: '💬', text: '"All these apps try to gamify everything – I just want a dead-simple log"', source: 'Hacker News · news.ycombinator.com/item?id=39812', theme: 'UX frustration' },
      { icon: '🤝', text: '"No accountability partner feature – I want to share my habits with a friend"', source: 'Reddit r/getdisciplined · top comment', theme: 'missing feature' },
    ],
    ideas: [
      {
        num: 1, title: 'StrikeLog – Terminal habit tracker in 200 lines',
        why: 'The simplest possible habit tracker: a CLI that logs to a CSV, shows streaks in ASCII, and never asks for your email.',
        stack: ['Bun', 'SQLite', 'chalk'], difficulty: 'weekend', solo_score: 5,
        tags: ['CLI', 'minimal', 'local'],
        sources: ['news.ycombinator.com/item?id=39812'],
      },
      {
        num: 2, title: 'PairHabit – Accountability buddy habits',
        why: 'No existing open-source habit tracker has a "share with one friend" feature. Two-player accountability has strong research backing and zero current OSS competition.',
        stack: ['Next.js', 'Pusher', 'PostgreSQL', 'Resend'], difficulty: 'month', solo_score: 4,
        tags: ['social', 'accountability', 'realtime'],
        sources: ['reddit.com/r/getdisciplined/comments/abc'],
      },
    ],
  },
};

// ── Leaderboard ───────────────────────────────────────
const LEADERBOARD = {
  daily: [
    { rank: 1, name: 'LiteInvoice', tagline: 'Terminal-first invoice CLI', maker: 'rishi_dev', votes: 284, emoji: '🧾' },
    { rank: 2, name: 'Papermark v2', tagline: 'AI-powered document analytics', maker: 'mfts0', votes: 231, emoji: '📄' },
    { rank: 3, name: 'SnapDiff', tagline: 'Visual regression testing in 1 command', maker: 'coder_ana', votes: 198, emoji: '🖼' },
    { rank: 4, name: 'Templ8r', tagline: 'AI codebase scaffolding from a prompt', maker: 'devmagic', votes: 156, emoji: '🏗' },
    { rank: 5, name: 'SlowQuery', tagline: 'Postgres query advisor with Drizzle support', maker: 'pgfan', votes: 142, emoji: '🐘' },
  ],
  weekly: [
    { rank: 1, name: 'Wasp', tagline: 'Fullstack React + Node without boilerplate', maker: 'martinovicm', votes: 1240, emoji: '🐝' },
    { rank: 2, name: 'Documenso', tagline: 'Open-source DocuSign alternative', maker: 'timleslie', votes: 1108, emoji: '✍️' },
    { rank: 3, name: 'Papermark', tagline: 'Open-source DocSend with analytics', maker: 'mfts0', votes: 894, emoji: '📄' },
    { rank: 4, name: 'WiseInvoice', tagline: 'Freelancer-to-Wise payment pipeline', maker: 'eu_freelancer', votes: 720, emoji: '💸' },
    { rank: 5, name: 'InvoiceOS', tagline: 'Browser-only invoicing, zero server', maker: 'local_first', votes: 640, emoji: '🗂' },
  ],
};

// ── Trending chips ────────────────────────────────────
const TRENDING_TAGS = [
  { label: 'AI Tools', fire: true }, { label: 'Rust crates', fire: true },
  { label: 'Edge computing' }, { label: 'LLM wrappers' }, { label: 'PDF tools' },
  { label: 'Auth libraries' }, { label: 'ORM' }, { label: 'Invoice SaaS' },
  { label: 'CLI apps' }, { label: 'Self-hosted' }, { label: 'Web scrapers' },
  { label: 'Scheduling' }, { label: 'Design tools' }, { label: 'Bun' },
];

// ── About / Stack ─────────────────────────────────────
const TECH_STACK = [
  { layer: 'Frontend', value: 'Astro 5 + React Islands', why: 'Static-first, fast loads' },
  { layer: 'Styling', value: 'Tailwind CSS v4 + shadcn/ui', why: 'Design system out of the box' },
  { layer: 'API', value: 'Hono on AWS Lambda', why: 'Tiny, fast, pay-per-request' },
  { layer: 'Database', value: 'Aurora Serverless v2 (Postgres)', why: 'Scales to zero, full-text search' },
  { layer: 'ORM', value: 'Drizzle ORM', why: 'Type-safe, SQL-like queries' },
  { layer: 'Auth', value: 'Better Auth (GitHub OAuth)', why: 'Open source, no lock-in' },
  { layer: 'Hosting', value: 'S3 + CloudFront', why: 'Static CDN, near-zero cost' },
  { layer: 'Scheduled Jobs', value: 'EventBridge → SQS → Lambda', why: 'Serverless fan-out with retries' },
  { layer: 'Scraping', value: 'Apify free plan', why: 'Only for pages with no API' },
  { layer: 'AI', value: 'Amazon Bedrock (Nova models)', why: 'Stays in AWS, covered by credit' },
  { layer: 'IaC', value: 'SST v3', why: 'One command deploy, open source' },
  { layer: 'DNS', value: 'alphacreation.online', why: 'Your domain via Route 53 or registrar' },
];

const DATA_SOURCES = [
  { source: 'GitHub REST/GraphQL API', used: 'Stars, forks, topics, issues, last commit', access: 'Free personal token', limit: '~5,000 req/hr' },
  { source: 'GitHub Trending page', used: 'Daily/weekly trending repos', access: 'Apify actor', limit: 'Free Apify credits' },
  { source: 'npm Registry API', used: 'Package info, weekly downloads', access: 'Free, no key', limit: 'Generous' },
  { source: 'PyPI JSON API + pypistats', used: 'Python package info + downloads', access: 'Free, no key', limit: 'Generous' },
  { source: 'Hacker News (Algolia API)', used: 'Discussions, Show HN, pain points', access: 'Free, no key', limit: 'Generous' },
  { source: 'Apify (free plan)', used: 'Scraping trending pages', access: 'Free monthly credits', limit: 'Budget carefully' },
  { source: 'Amazon Bedrock', used: 'AI idea generation, gap summaries', access: '$100 AWS credit', limit: 'Cache aggressively' },
];

export { REPOS, PACKAGES, APPS, IDEA_RESULTS, LEADERBOARD, TRENDING_TAGS, TECH_STACK, DATA_SOURCES, LANG_COLORS, DIFFICULTY };
