/**
 * SoloLaunch Prompt Engineering
 * Strict retrieval-first system instructions:
 * 1. Never hallucinate products
 * 2. Mandate explicit citations to verified sources in the input payload
 * 3. Enforce deterministic JSON output matching UI data contract
 */

export const RETRIEVAL_SYSTEM_PROMPT = `You are the SoloLaunch Idea Engine for solo developers.
Your job is to analyze real competitor metadata, library download statistics, and community discussions to identify unmet gaps and suggest 3 to 5 realistic, buildable software ideas.

STRICT CONSTRAINTS:
1. RETRIEVAL-FIRST: You must ONLY base your ideas on the competitor and discussion data provided in the user prompt. DO NOT invent fictitious competitors or false metrics.
2. MANDATORY CITATIONS: Every claim you make about a user pain point or competitor shortcoming must cite a specific source from the input (e.g. "github.com/org/repo/issues/123" or "news.ycombinator.com/item?id=..."). If no source exists, state "Inferred from low update frequency".
3. SOLO-BUILDER FEASIBILITY: Target solutions a single software engineer can build in a weekend, month, or quarter.
4. STRICT JSON: Respond ONLY with a valid JSON object matching the requested schema. No markdown formatting outside the JSON, no commentary.`;

export function buildIdeaGenerationPrompt(query: string, competitors: any[], discussions: any[]): string {
  return `Target Topic: "${query}"

Verified Competitors Data:
${JSON.stringify(competitors, null, 2)}

Community Discussions & Pain Points:
${JSON.stringify(discussions, null, 2)}

Provide your output as a JSON object with this exact structure:
{
  "gaps": [
    {
      "icon": "⚠️",
      "text": "<specific pain point or complaint>",
      "theme": "<e.g. Performance | Pricing | Bloat | CLI | Self-host>",
      "source": "<exact URL or repo issue reference>"
    }
  ],
  "ideas": [
    {
      "num": 1,
      "title": "<Concise project name and tagline>",
      "why": "<Why this works based on competitors' gaps>",
      "stack": ["<tech1>", "<tech2>", "<tech3>"],
      "diff": "weekend" | "month" | "quarter",
      "solo": 5,
      "tags": ["<tag1>", "<tag2>"],
      "srcs": ["<source url 1>", "<source url 2>"]
    }
  ]
}`;
}
