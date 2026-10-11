# 🔌 Adding a New Data Source

SoloLaunch uses a modular ingestion architecture located in `src/ingestion/`. Anyone can contribute a new data source (e.g. Crates.io for Rust, Packagist for PHP, HuggingFace models, or Product Hunt launches) in under 50 lines of TypeScript.

---

## The "Clear Mention" Rule

Every card and statistic in SoloLaunch must adhere to the **Clear Mention** rule:
1. **Never show a number without its source** (e.g. `Source: crates.io API · updated 10m ago`).
2. **Never show data without a timestamp**.
3. **Always link back to the canonical upstream URL**.

---

## Step-by-Step Plugin Guide

### 1. Create a fetcher in `src/ingestion/<provider>.ts`

```typescript
export interface MySourceItem {
  name: string;
  description: string;
  metric: number;
  metricLabel: string; // e.g. "downloads", "installs"
  url: string;
  source: string;
  updatedAt: string;
}

export async function fetchMySource(query: string): Promise<MySourceItem[]> {
  const res = await fetch(`https://api.example.com/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) return [];
  const data = await res.json();

  return data.results.map((item: any) => ({
    name: item.name,
    description: item.summary,
    metric: item.download_count,
    metricLabel: 'downloads',
    url: item.homepage,
    source: 'Example API',
    updatedAt: new Date().toISOString(),
  }));
}
```

### 2. Register in the Hono API Router (`src/api/index.ts`)

Import your fetcher and include it in the concurrent `Promise.all` ingestion handler:

```typescript
import { fetchMySource } from '../ingestion/mysource.js';

// Inside /api/ideas/generate
const [repos, discussions, customItems] = await Promise.all([
  searchGitHubRepos(query),
  searchHackerNews(query),
  fetchMySource(query),
]);
```

### 3. Open a Pull Request!
Ensure tests pass and submit a PR to `DreamFaang78/sololaunch`.
