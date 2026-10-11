# 🚀 SoloLaunch

> **The free, open-source Product Hunt + Retrieval-First Idea Generator for solo developers.**  
> Real stats. Real sources. No paywalls, no gatekeeping — ever.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/DreamFaang78/sololaunch?style=social)](https://github.com/DreamFaang78/sololaunch)
[![Author](https://img.shields.io/badge/Author-DreamFaang78-8b5cf6)](https://github.com/DreamFaang78)
[![Built with SST](https://img.shields.io/badge/IaC-SST%20v3-06b6d4)](https://sst.dev)
[![AWS Budget](https://img.shields.io/badge/AWS%20Budget-$100%20Credit%20Capped-10b981)](docs/aws-budget-setup.md)

---

## ⚡ Why SoloLaunch?

Solo developers often waste weeks building ideas that already have entrenched competitors, or struggle to find problems with verified demand:
- **Product Hunt** is built for marketing and upvote campaigns, not research — it doesn't show GitHub stars or package downloads.
- **Trend data is fragmented** across GitHub, npm, PyPI, and Hacker News.
- **Commercial idea tools** charge high monthly subscriptions, hide their sources, and hallucinate market demand.

**SoloLaunch solves this with two core capabilities:**
1. **Discover Feed:** A clean, ranked feed of trending **Apps**, **Trending Software** (npm/PyPI), and **GitHub Repos** — with verified numbers and direct source badges.
2. **Retrieval-First Idea Generator:** Enter any topic (e.g., *"invoice tool"*, *"habit tracker"*, *"PDF tools"*), and SoloLaunch instantly scans competitors, calculates market signals, extracts user complaints from open issues and Hacker News, and synthesizes 3–5 viable, buildable ideas.

---

## 🏷️ The "Clear Mention" Rule

> **Numbers never appear without a source and a timestamp.**

Every single card shows a verified badge such as:
`Source: GitHub API · updated 2 hours ago` or `Source: npm Registry API`.  
If an idea was synthesized with AI, it explicitly links every pain point back to the source issue or thread.

---

## 🏗️ Architecture

SoloLaunch runs on **100% free tiers** and is deployable to your own AWS account under a **$100 AWS credit** budget ($0 out of pocket):

```
                                    ┌────────────────────────────────────────────────────────┐
                                    │                   Client (Browser)                     │
                                    └───────────────┬────────────────────────┬───────────────┘
                                                    │                        │
                                        Static Site Requests             API Requests
                                                    │                        │
                                                    ▼                        ▼
                                            ┌───────────────┐        ┌───────────────┐
                                            │ CloudFront /  │        │  AWS Lambda   │
                                            │  S3 (Static)  │        │  (Hono API)   │
                                            └───────────────┘        └───────┬───────┘
                                                                             │
                    ┌──────────────────────────┬─────────────────────────────┼────────────────────────────┐
                    ▼                          ▼                             ▼                            ▼
            ┌───────────────┐          ┌───────────────┐             ┌───────────────┐            ┌───────────────┐
            │ GitHub / npm  │          │ Hacker News   │             │   Postgres    │            │Amazon Bedrock │
            │   PyPI APIs   │          │  Algolia API  │             │ Aurora / Neon │            │ (Nova / Lite) │
            └───────────────┘          └───────────────┘             └───────────────┘            └───────────────┘
                    ▲
                    │ (Nightly Cron)
            ┌───────┴───────┐
            │  EventBridge  │
            │ Ingestion Job │
            └───────────────┘
```

### The Stack

| Layer | Choice | Why |
| :--- | :--- | :--- |
| **Frontend** | Vanilla JS / CSS Design System + SPA Router | Lightning-fast (<50ms load), zero hydration penalty, works directly in browser |
| **Backend API** | [Hono](https://hono.dev) on AWS Lambda | Ultra-lightweight web-standards API behind Lambda Function URL |
| **Database & ORM** | [Drizzle ORM](https://orm.drizzle.team) + PostgreSQL | Fully type-safe schemas, scale-to-zero compute |
| **AI Synthesis** | [Amazon Bedrock](https://aws.amazon.com/bedrock/) (Amazon Nova) | Stays within AWS credit; deterministic retrieval prompt schema |
| **Ingestion** | EventBridge Scheduler + Node workers | Scheduled daily pulls with generous free-tier limits |
| **Hosting** | AWS S3 + CloudFront | HTTPS via free ACM certificate on `alphacreation.online` |
| **IaC** | [SST v3](https://sst.dev) | One-command deploy to your AWS account |

---

## 🏃 Quick Start

### 1. Run Locally (Zero Setup — 10 Seconds)

You can launch the full UI right now with zero backend setup:
```bash
git clone https://github.com/DreamFaang78/sololaunch.git
cd sololaunch

# Open directly in your browser:
# Windows:
start index.html
# macOS:
open index.html
# Linux:
xdg-open index.html
```

Or run a local static server:
```bash
npx serve .
```

### 2. Deploy to AWS with SST v3

Deploy the full serverless stack to your own AWS account:

```bash
# 1. Install dependencies
npm install

# 2. Configure AWS credentials
aws configure

# 3. Deploy to production
npx sst deploy --stage production
```

---

## 💰 $0 Out-of-Pocket Budget Guard

SoloLaunch is designed to operate safely inside a $100 AWS promotional credit.
Follow our [AWS Budget Alerts Guide](docs/aws-budget-setup.md) to automatically set email alerts at:
- **$20 threshold** (early notice)
- **$50 threshold** (halfway review)
- **$80 threshold** (urgent action cutoff)

**Cost Traps Avoided:**
- ❌ No NAT Gateway (saves ~$32/month)
- ❌ No AWS WAF (saves ~$10+/month)
- ❌ No OpenSearch (saves ~$35+/month)
- ✅ Aurora Serverless scales to zero when idle

---

## 📂 Repository Structure

```
sololaunch/
├── index.html               # Production self-contained SPA (Discover feed + Idea Generator)
├── css/
│   └── style.css            # SoloLaunch design system (glassmorphism, tokens, responsive)
├── js/
│   ├── app.js               # Client-side router and state management
│   ├── data.js              # Seed data for repos, software, and apps
│   ├── icons.js             # SVG icon library and formatting utilities
│   └── pages.js             # Page renderers (Home, Ideas, Submit, Profile, About)
├── src/
│   ├── api/                 # Hono API router for Lambda Function URL
│   ├── db/                  # Drizzle ORM PostgreSQL schema and connection
│   ├── ai/                  # Bedrock AI integration & retrieval prompts
│   └── ingestion/           # GitHub, npm, PyPI, and Hacker News fetchers
├── data/
│   └── sololaunch-dataset.json # Public weekly snapshot dataset
├── docs/
│   ├── self-host.md         # 15-minute self-hosting walkthrough
│   ├── data-sources.md      # How to add a new data source plugin
│   └── aws-budget-setup.md  # Setting up budget alerts for $100 credits
├── sst.config.ts            # SST v3 infrastructure definition
├── package.json             # Project scripts and dependencies
├── LICENSE                  # MIT License
└── README.md                # Project documentation
```

---

## 🗺️ Roadmap

- [x] **v1.0 (Current):**
  - [x] Discover feed with Apps, Trending Software, and GitHub Repos
  - [x] Retrieval-First Idea Generator with verified competitor traction
  - [x] Solo Developer Leaderboard and GitHub OAuth demo flow
  - [x] SST v3 infrastructure and Drizzle ORM schema
  - [x] Public JSON dataset snapshot
- [ ] **v1.1:**
  - [ ] Apify-powered GitHub Trending actor ingestion
  - [ ] Historical star & download growth charts
  - [ ] Public REST API endpoint for third-party bots
  - [ ] RSS and email digest for weekly trending builds

---

## 🤝 Contributing

SoloLaunch is open to all contributors!  
Check out our [Contributing Guide](CONTRIBUTING.md) and [Data Sources Guide](docs/data-sources.md) to get started.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

Maintained by **[DreamFaang78](https://github.com/DreamFaang78)**.
