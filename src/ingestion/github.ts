/**
 * GitHub API Ingestion Service
 * Free Tier: Personal token yields ~5,000 requests/hour
 */

export interface GitHubRepoData {
  owner: string;
  name: string;
  fullName: string;
  description: string;
  stars: number;
  forks: number;
  openIssues: number;
  language: string;
  license: string;
  lastCommit: string;
  topics: string[];
  url: string;
  source: string;
  updatedAt: string;
}

export async function searchGitHubRepos(query: string, token?: string): Promise<GitHubRepoData[]> {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'SoloLaunch-Ingestion/1.0',
  };
  if (token || process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${token || process.env.GITHUB_TOKEN}`;
  }

  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=10`;
  
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      console.warn(`[GitHub API] HTTP ${res.status}: ${res.statusText}`);
      return [];
    }
    const data = await res.json() as any;
    const items = data.items || [];

    return items.map((r: any): GitHubRepoData => ({
      owner: r.owner?.login || '',
      name: r.name,
      fullName: r.full_name,
      description: r.description || 'No description provided.',
      stars: r.stargazers_count,
      forks: r.forks_count,
      openIssues: r.open_issues_count,
      language: r.language || 'Unknown',
      license: r.license?.spdx_id || r.license?.name || 'Unlicensed',
      lastCommit: r.pushed_at ? new Date(r.pushed_at).toISOString() : new Date().toISOString(),
      topics: r.topics || [],
      url: r.html_url,
      source: 'GitHub API',
      updatedAt: new Date().toISOString(),
    }));
  } catch (err) {
    console.error('[GitHub API] Fetch error:', err);
    return [];
  }
}
