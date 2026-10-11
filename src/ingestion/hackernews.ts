/**
 * Hacker News (Algolia API) Ingestion Service
 * Free Tier: Generous public endpoint, no key required
 * Used for: Uncovering user complaints, "Show HN" feedback, and unmet product gaps
 */

export interface HNItem {
  id: string;
  title: string;
  url: string;
  points: number;
  commentsCount: number;
  createdAt: string;
  hnUrl: string;
}

export async function searchHackerNews(query: string): Promise<HNItem[]> {
  try {
    const url = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&tags=story&hitsPerPage=10`;
    const res = await fetch(url);
    if (!res.ok) return [];

    const data = await res.json() as any;
    const hits = data.hits || [];

    return hits.map((h: any): HNItem => ({
      id: h.objectID,
      title: h.title,
      url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
      points: h.points || 0,
      commentsCount: h.num_comments || 0,
      createdAt: h.created_at,
      hnUrl: `https://news.ycombinator.com/item?id=${h.objectID}`,
    }));
  } catch (err) {
    console.error('[Hacker News API] Search error:', err);
    return [];
  }
}
