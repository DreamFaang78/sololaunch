PRD: SoloLaunch – Product Hunt + Idea Generator for Solo Developers
Working name: SoloLaunch (rename freely). Version 1.0 · October 2026 · Author: DreamFaang78 (https://github.com/DreamFaang78) · Budget: $100 AWS credits plus free tiers · License: MIT (open source)
1. Overview
SoloLaunch is a free, open-source website for solo developers. It does two jobs:
1. Discover – a Product Hunt-style feed of what is trending in three categories: Apps, Trending Software, and GitHub Repos. Every entry shows its real numbers (stars, downloads, forks, last update) and clearly says where the data came from.
2. Get ideas – an idea generator. A developer types a topic (for example "habit tracker" or "PDF tools"), and SoloLaunch shows existing competitors with their stars and downloads, finds gaps, and suggests project ideas, with no paywall and no gatekeeping.
The whole system runs on free tiers (free Apify account, free public APIs, AWS hosting on alphacreation.online, free-tier AI), with a $100 AWS credit covering the servers, database, and storage, and the full source code is public so anyone can fork or self-host it.
2. Problem
• Solo developers often get stuck on "what should I build?" and waste weeks on ideas that already have a strong competitor.
• Product Hunt is built for launches and marketing, not for research. It is crowded, upvote-driven, and does not show GitHub stars or package downloads.
• Trend and competitor data is scattered across GitHub, npm, PyPI, Hacker News, and app directories. Checking it by hand takes hours.
• Many idea tools are paid, filtered, or hide their sources.
3. Goals and Non-Goals
Goals
• G1: Show trending Apps, Software, and GitHub Repos in one clean place, each with verified stats and a source label.
• G2: Let a developer search any idea and see competitors, their traction, and gaps in under 30 seconds.
• G3: Generate useful, unfiltered project ideas with simple AI.
• G4: Spend no more than the $100 AWS credit, with $0 out of pocket, at MVP scale.
• G5: Be fully open source with a stack a beginner can understand and contribute to.
Non-goals (for v1)
• No paid plans, ads, or sponsored listings.
• No complex social network (no DMs, no follower graph).
• No mobile app (responsive web only).
• No claim of exact revenue or user numbers for closed-source products; we only show data that is publicly available.
4. Target Users
Persona
Need
How SoloLaunch helps
Solo builder / indie hacker
Find a buildable idea with proof of demand
Idea generator and competitor stats
Student developer (like hackathon participants)
Portfolio project that is not a to-do app
Ideas ranked by difficulty and gap
Open-source maintainer
Visibility for their repo
Repo listing with stats
Developer researching a niche
Quick competitor scan
Search with stars, downloads, last update
5. Core Features
5.1 Three Categories (the main feed)
The home page has three tabs: Apps, Trending Software, GitHub Repos. Each tab is a ranked list with filters (time range: today / week / month; language; tag) and sorting (trending, most stars, most downloads, newest).
Category
What it contains
Details shown on each card
Apps
Products and apps built by developers (web, mobile, desktop, SaaS), including community-submitted ones
Name, tagline, screenshot/logo, maker, tags, link, upvotes, data source
Trending Software
Libraries, tools, and packages gaining attention (npm, PyPI, etc.)
Name, description, weekly downloads, growth %, latest version, license, data source
GitHub Repos
Open-source repositories
Stars, forks, open issues, language, license, last commit, owner, topics, data source
"Clear mention" rule: every card shows a small source badge such as Source: GitHub API · updated 2 hours ago. Numbers never appear without a source and a timestamp. Each card also has a link to the original page.
5.2 Product Hunt for Solo Developers
• Submit a project: name, link, tagline, category, tags, "built by one person" flag. Login is via GitHub OAuth only.
• Upvote and comment (simple threaded comments).
• Daily and weekly leaderboard of community submissions.
• Maker profile: the developer's submitted projects, their GitHub handle, and links.
• Auto-pulled stats (stars, downloads) shown next to the upvote count so quality is judged on real traction, not only votes.
5.3 Idea Generator (key differentiator)
Flow
1. User enters a keyword or problem (for example "invoice tool for freelancers"), or clicks "Surprise me".
2. SoloLaunch searches its own database first, then fetches live data if the result is thin: GitHub repositories by topic or keyword, npm and PyPI packages, and Hacker News discussions.
3. The results page shows:
    ◦ Present competitors: name, link, stars, weekly downloads, last updated, license.
    ◦ Market signal: how many repos and packages exist, how active they are, and how recently they were updated.
    ◦ Gaps: complaints and missing features found in open issues and Hacker News threads, summarized by AI.
    ◦ Idea cards (3 to 5): one-line idea, why it could work, suggested stack, difficulty (weekend / month / quarter), and a "solo-friendliness" score.
4. User can save ideas, copy them as Markdown, or turn one into a project submission.
Principles
• No filter: the generator does not hide ideas for being "too competitive" or "too small". It shows the facts and lets the developer decide.
• Every claim in the AI output must point to a visible source (repo, package, thread). If the AI cannot cite a source, it must say so.
5.4 Open Source by Default
• Public GitHub repository under the MIT license.
• Ingestion scripts, database schema, and prompts are all in the repo.
• A docs/ folder with "self-host in 15 minutes" instructions and a "how to add a new data source" guide (a plugin-style sources/ folder).
• Public JSON export of the dataset (weekly snapshot) so anyone can build on it.
6. Data Sources (All Free)
Limits change, so check each provider's current terms before launch.
Source
Used for
Access
Notes
GitHub REST/GraphQL API
Repo stars, forks, topics, issues, last commit
Free personal token
Roughly 5,000 requests per hour with a token; the main backbone
GitHub Trending page
Daily/weekly trending repos
Apify actor (no official API)
Use a free-plan Apify actor for scraping
Apify (free plan)
Scraping trending pages, app directories, Product Hunt-like listings
Free monthly platform credits
Budget the credits; schedule few, small runs
npm registry and downloads API
Package info and weekly downloads
Free, no key
Public endpoints
PyPI JSON API and pypistats
Python package info and downloads
Free, no key
Download stats via the pypistats API
Hacker News (Algolia API)
Discussions, "Show HN" posts, pain points
Free, no key
Good for gap discovery
Product Hunt API
Optional: recent launches
Free developer token
Check terms; may restrict commercial use, so treat as optional
Dev.to / Lobsters / Reddit
Optional extra signals
Free or limited
Reddit API terms are strict; skip in v1
Rule for data: store only public metadata and counts, always keep the source URL, and respect each provider's terms and rate limits. Do not copy full README or article text.
7. Recommended Stack (Modern, AWS-Native, Open)
Layer
Choice
Why
Frontend
Astro 5 with React islands, TypeScript, Tailwind CSS v4, shadcn/ui
Project pages are prebuilt for fast loads and search ranking; React runs only where the page is interactive (upvotes, idea search)
Hosting and domain
S3 + CloudFront, with alphacreation.online (Route 53 or your registrar's DNS) and a free ACM certificate
Static site on AWS's CDN with HTTPS; rebuilt after each nightly data refresh
API
Hono (TypeScript) on AWS Lambda behind a Lambda Function URL, with Zod validation
Tiny, fast, one language across the stack; pay per request
Database
Amazon Aurora Serverless v2 (PostgreSQL) with Drizzle ORM, accessed through the Data API
Full-text search (pg_trgm) and optional semantic search (pgvector) in one database; the Data API means Lambdas need no VPC or NAT gateway
Auth
Better Auth (open source) with GitHub login, sessions stored in the same database
GitHub-only login stays simple; Amazon Cognito has no built-in GitHub provider
Scheduled ingestion
EventBridge Scheduler → SQS → Lambda workers
Fan out API calls with retries and no server to run
Scraping
Apify free account, called from Lambda
Used only where no official API exists
File storage
S3
Weekly public JSON export and cached snapshots
AI
Amazon Bedrock (start with Amazon Nova models) behind one small wrapper; free-tier APIs as a fallback
Stays inside AWS; check that your credit covers the model you pick
Infrastructure as code
SST (TypeScript, deploys to your own AWS account) or AWS CDK
One command deploys everything, and the repo doubles as the self-host guide
Monitoring
CloudWatch and AWS Budgets alerts
Free basics; catches cost surprises early
EventBridge Scheduler → SQS → Lambda workers → GitHub / npm / PyPI / HN APIs + Apify
                                      ↓
                       Aurora Serverless v2 (Postgres, Data API)
                          ↑                         ↓
   Hono API on Lambda ← Astro site + React islands   Nightly static rebuild → S3 + CloudFront (alphacreation.online)
                          ↓
   Idea Generator → Amazon Bedrock (cached) → idea cards
Cost control tricks
• Cache every API and AI response in the database (for example 24 hours for stats, 7 days for idea results).
• Pre-compute trending lists in the nightly job and rebuild the static pages from them instead of querying on each page view.
• Limit idea generations per user per day (for example 10) to protect the AI quota.
• Keep Apify runs small and infrequent (daily or weekly).
• Set AWS Budgets alerts at $20, $50, and $80 so the $100 credit is never used up unnoticed.
• Let Aurora scale to zero when idle and cap its maximum capacity (for example 2 ACUs).
• Avoid services with fixed monthly charges that drain credits: NAT gateways, AWS WAF, OpenSearch.
8. Data Model (Simplified)
• projects – id, category (app / software / repo), name, tagline, url, source, source_url, maker_id, tags[], created_at
• repo_stats – project_id, stars, forks, open_issues, language, license, last_commit, fetched_at
• package_stats – project_id, registry (npm/pypi), weekly_downloads, latest_version, fetched_at
• votes – user_id, project_id, created_at
• comments – id, project_id, user_id, body, created_at
• users – id, github_handle, avatar, bio
• idea_searches – query, results_json, created_at (cache)
• saved_ideas – user_id, idea_json, created_at
Stats are stored as time-stamped rows so the site can draw growth charts (stars or downloads over time).
9. Pages and UX
1. Home – hero search bar ("Find an idea or check a competitor"), tabs for Apps / Trending Software / GitHub Repos, today's top 10.
2. Category page – filters, sort, infinite list.
3. Project detail – description, live stats with source badges, growth chart, similar projects, comments.
4. Idea Generator – search box, results page with competitors table, gaps, and idea cards.
5. Submit – short form, GitHub login required.
6. Maker profile – submissions and stats.
7. About / Open Source – repo link, how data is collected, contribution guide, data export.
Design principles: fast, minimal, dark mode by default, no popups, no signup wall for browsing or for the first idea searches.
10. AI Approach (Easy and Honest)
• Retrieval first: the AI only receives the competitor and discussion data we fetched; it does not invent products.
• Prompt output format: fixed JSON (idea, reason, stack, difficulty, sources[]) so the UI can render it reliably.
• Gap summary: a short summarization of top open issues and HN comments, with links.
• Fallback: if the free AI quota is exhausted, show the competitor table and gap data without AI, and a message that idea cards will return shortly.
• Transparency: a label on every AI output ("AI-generated from the sources listed").
11. MVP Scope and Timeline (about 4 weeks, solo)
Week
Deliverables
1
Repo setup, SST deploy to AWS on alphacreation.online, Aurora schema, GitHub API ingestion, GitHub Repos tab with stars and forks
2
npm and PyPI ingestion, Trending Software tab, source badges, project detail page
3
Idea Generator: competitor search, market signal, one AI idea-card prompt, caching
4
GitHub login, submit and upvote for Apps tab, polish, docs, public launch (Show HN, Reddit r/SideProject, X)
v1.1 and later: Apify-powered GitHub Trending scrape, growth charts, weekly email digest (free tier), browser extension, public API, "build log" pages for makers.
12. Success Metrics
• 500 unique visitors and 100 idea searches in the first month.
• 50 community-submitted apps in the first two months.
• 100 GitHub stars on the SoloLaunch repo in three months.
• Median idea search result in under 10 seconds.
• At least 95 percent of listed items show a valid source and timestamp.
• Monthly cost: $0 out of pocket (AWS use covered by the $100 credit).
13. Risks and Mitigations
Risk
Impact
Mitigation
Free API or Apify credit limits reached
Stale data
Aggressive caching, small scheduled runs, graceful fallback
Scraping terms violations
Legal and block risk
Prefer official APIs; use scraping only for public pages and check terms
AI hallucination
Misleading ideas
Retrieval-only prompts, mandatory sources, visible AI label
Cold start (empty Apps tab)
Low engagement
Seed with auto-pulled GitHub and npm data; you submit the first 20 projects
Spam submissions
Low quality
GitHub login, rate limits, report button
Free-tier changes
Cost surprise
Keep the stack portable (plain Postgres, provider-agnostic AI wrapper)
AWS credit runs out or expires
Unexpected bill or jobs stop
AWS Budgets alerts, check the credit expiry date, keep Lambda jobs short and daily
Aurora is the biggest cost driver
Credit drains faster than planned
Scale to zero, cap capacity, cache heavily; fall back to a smaller design (for example DynamoDB for votes and stats) if needed
14. Open Questions
1. Final product name and which address on alphacreation.online to use (for example a subdomain like sololaunch.alphacreation.online).
2. Should "Apps" include only open-source apps, or any app a solo developer built?
3. Which AI will be the default: Amazon Bedrock (check that the AWS credit covers the model) or a free-tier API?
4. Should the Product Hunt API be used at all, given its terms?
5. Will the weekly data export be a public JSON file on S3 or a read-only API?
6. When does the $100 AWS credit expire, and what happens to the jobs after that?
7. Should DNS for alphacreation.online move to Route 53 (small monthly fee) or stay at your registrar?
15. Next Steps
1. Create the public GitHub repo with an MIT license and a README of this vision.
2. Set AWS Budgets alerts at $20, $50, and $80 so the $100 credit is never used up unnoticed.
3. Bootstrap the repo with SST and deploy a hello-world API and Astro site to your AWS account.
4. Point alphacreation.online to CloudFront and request a free ACM certificate.
5. Generate a GitHub token and a free Apify token; store them in AWS SSM Parameter Store or Lambda environment variables, never in the repo.
6. Build the database schema from section 8 with Drizzle migrations.
7. Ship the GitHub Repos tab first, since it needs only one API and proves the pipeline.