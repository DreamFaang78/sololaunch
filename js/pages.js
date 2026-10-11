// =====================================================
// SoloLaunch – Page Renderers
// Each function returns an HTML string for a page
// =====================================================

import { REPOS, PACKAGES, APPS, IDEA_RESULTS, LEADERBOARD, TRENDING_TAGS, TECH_STACK, DATA_SOURCES, LANG_COLORS } from './data.js';
import { Icons, fmtNum, difficultyBadge, registryBadge } from './icons.js';

// ── HOME PAGE ─────────────────────────────────────────
export function renderHome() {
  return `
  <section class="hero container--wide">
    <div class="hero-eyebrow">${Icons.bolt} Built for Solo Developers · Open Source · MIT</div>
    <h1 class="hero-title">
      Discover Trending Builds.<br>
      <span class="gradient-text">Generate Your Next Idea.</span>
    </h1>
    <p class="hero-subtitle">The free, open-source Product Hunt for indie hackers. Real stats, real sources, no paywalls — ever.</p>
    <div class="hero-search">
      <div class="hero-search-inner">
        <span style="color:var(--text-muted);flex-shrink:0">${Icons.search}</span>
        <input id="hero-search-input" type="text" placeholder='Try "invoice tool", "habit tracker", "PDF tools"…'>
        <button class="btn btn-primary" id="hero-search-btn">
          ${Icons.sparkle} Generate Ideas
        </button>
      </div>
      <div class="hero-tags">
        <span class="hero-tag" data-q="invoice tool">🧾 Invoice tools</span>
        <span class="hero-tag" data-q="habit tracker">✅ Habit trackers</span>
        <span class="hero-tag" data-q="pdf tools">📄 PDF tools</span>
        <span class="hero-tag" data-q="ai tools">🤖 AI tools</span>
        <span class="hero-tag" data-q="cli tools">⚡ CLI apps</span>
        <button class="btn btn-ghost btn-sm" id="surprise-me-btn">${Icons.surprise} Surprise me</button>
      </div>
    </div>
    <div class="hero-stats">
      <div class="hero-stat"><div class="hero-stat-value" data-count="2847">0</div><div class="hero-stat-label">Projects indexed</div></div>
      <div class="hero-stat"><div class="hero-stat-value" data-count="8">0</div><div class="hero-stat-label">Data sources</div></div>
      <div class="hero-stat"><div class="hero-stat-value" data-count="142">0</div><div class="hero-stat-label">Ideas generated today</div></div>
      <div class="hero-stat"><div class="hero-stat-value" data-count="100">0</div><div class="hero-stat-label">% free forever</div></div>
    </div>
  </section>

  <div class="container--wide" style="padding-bottom: 80px;">
    <!-- Trending chips -->
    <div class="trending-strip">
      <span style="font-size:0.78rem;color:var(--text-muted);flex-shrink:0;margin-right:4px;">🔥 Trending:</span>
      ${TRENDING_TAGS.map(t => `<span class="trending-chip">${t.fire ? '🔥' : ''}${t.label}</span>`).join('')}
    </div>

    <!-- Tabs -->
    <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin:24px 0 20px;">
      <div class="tabs" id="main-tabs">
        <button class="tab-btn active" data-tab="repos">${Icons.github} GitHub Repos <span class="tab-count">${REPOS.length}</span></button>
        <button class="tab-btn" data-tab="software">${Icons.package} Trending Software <span class="tab-count">${PACKAGES.length}</span></button>
        <button class="tab-btn" data-tab="apps">🚀 Apps <span class="tab-count">${APPS.length}</span></button>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <button class="btn btn-sm btn-secondary" id="view-grid-btn" title="Grid view">${Icons.grid}</button>
        <button class="btn btn-sm btn-secondary" id="view-list-btn" title="List view">${Icons.list}</button>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters-bar" style="margin-bottom:20px;" id="filters-bar">
      <select class="filter-select" id="filter-time">
        <option value="today">Today</option>
        <option value="week" selected>This Week</option>
        <option value="month">This Month</option>
      </select>
      <select class="filter-select" id="filter-lang">
        <option value="">All Languages</option>
        <option>TypeScript</option><option>JavaScript</option>
        <option>Python</option><option>Rust</option><option>Go</option>
      </select>
      <div class="spacer"></div>
      <span class="sort-label">Sort by:</span>
      <select class="filter-select" id="filter-sort">
        <option value="trending">Trending</option>
        <option value="stars">Most Stars</option>
        <option value="downloads">Most Downloads</option>
        <option value="newest">Newest</option>
      </select>
    </div>

    <!-- Tab panes -->
    <div id="tab-repos" class="tab-pane">
      <div class="cards-grid cards-grid--list" id="repos-list">
        ${REPOS.map((r, i) => renderRepoCard(r, i + 1)).join('')}
      </div>
    </div>
    <div id="tab-software" class="tab-pane hidden">
      <div class="cards-grid cards-grid--masonry" id="pkg-list">
        ${PACKAGES.map(p => renderPkgCard(p)).join('')}
      </div>
    </div>
    <div id="tab-apps" class="tab-pane hidden">
      <div class="cards-grid cards-grid--list" id="apps-list">
        ${APPS.map((a, i) => renderAppCard(a, i + 1)).join('')}
      </div>
    </div>

    <!-- Leaderboard -->
    <div style="margin-top:56px;">
      <div class="section-header">
        <div>
          <h2 class="section-title">${Icons.trophy} Leaderboard</h2>
          <p class="section-subtitle">Community-submitted projects, ranked by upvotes + traction</p>
        </div>
        <div class="tabs" id="lb-tabs" style="background:transparent;padding:0;">
          <button class="tab-btn active" data-lbtab="daily" style="font-size:0.8rem;padding:6px 14px;">Daily</button>
          <button class="tab-btn" data-lbtab="weekly" style="font-size:0.8rem;padding:6px 14px;">Weekly</button>
        </div>
      </div>
      <div class="card" style="overflow:hidden;">
        <div id="lb-daily">${renderLeaderboard('daily')}</div>
        <div id="lb-weekly" class="hidden">${renderLeaderboard('weekly')}</div>
      </div>
    </div>
  </div>
  `;
}

// ── REPO CARD ─────────────────────────────────────────
function renderRepoCard(r, rank) {
  const langColor = LANG_COLORS[r.language] || '#8b5cf6';
  return `
  <div class="card repo-card fade-in" style="animation-delay:${rank * 0.05}s" data-id="${r.id}">
    <div class="repo-card-header">
      <div>
        <div class="repo-card-title">
          <span class="repo-card-owner text-muted">${r.owner} /</span>
          <a href="${r.url}" target="_blank" class="repo-card-name hover-underline">${r.name}</a>
          ${r.trending ? `<span class="badge badge-orange">${Icons.flame} Trending</span>` : ''}
        </div>
        <p class="repo-card-desc" style="margin-top:6px;">${r.desc}</p>
      </div>
      <a href="${r.url}" target="_blank" class="btn btn-secondary btn-sm" style="flex-shrink:0;">${Icons.external} View</a>
    </div>
    <div class="repo-card-stats">
      <span class="repo-stat" title="Stars">${Icons.star} <strong>${fmtNum(r.stars)}</strong></span>
      <span class="repo-stat" title="Forks">${Icons.fork} ${fmtNum(r.forks)}</span>
      <span class="repo-stat" title="Open Issues">${Icons.issue} ${fmtNum(r.issues)}</span>
      <span class="repo-stat" style="color:${langColor}">
        <span class="lang-dot" style="background:${langColor}"></span>${r.language}
      </span>
      <span class="repo-stat" style="font-size:0.72rem;">${r.license}</span>
      <span class="repo-stat" style="font-size:0.72rem;color:var(--text-muted)">Updated ${r.last_commit}</span>
      ${r.growth ? `<span class="diff-up">↑${r.growth}% this week</span>` : ''}
    </div>
    <div style="margin-top:10px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
      ${r.topics.map(t => `<span class="badge badge-gray">${Icons.tag} ${t}</span>`).join('')}
      <span style="margin-left:auto;" class="badge badge-source">${Icons.info} Source: ${r.source} · updated ${r.updated}</span>
    </div>
  </div>`;
}

// ── PACKAGE CARD ──────────────────────────────────────
function renderPkgCard(p) {
  const maxDL = 24_000_000;
  const pct = Math.min(100, Math.round((p.weekly_downloads / maxDL) * 100));
  const growthClass = p.growth >= 0 ? 'diff-up' : 'diff-down';
  const growthSign = p.growth >= 0 ? '↑' : '↓';
  const regBadge = p.registry === 'npm' ? 'badge-red' : 'badge-cyan';
  const regIcon = p.registry === 'npm' ? Icons.npm : Icons.pypi;
  return `
  <div class="card pkg-card fade-in">
    <div class="pkg-card-header">
      <div class="pkg-icon">${p.emoji}</div>
      <div style="flex:1;min-width:0;">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <span style="font-weight:700;font-size:0.95rem;font-family:'JetBrains Mono',monospace;">${p.name}</span>
          <span class="badge ${regBadge}">${regIcon} ${p.registry}</span>
          <span class="badge badge-gray">${p.license}</span>
        </div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">v${p.latest_version}</div>
      </div>
      <a href="${p.url}" target="_blank" class="btn btn-ghost btn-sm btn-icon" title="View on registry">${Icons.external}</a>
    </div>
    <p class="pkg-card-desc">${p.desc}</p>
    <div class="pkg-downloads" style="margin-bottom:6px;">
      <span style="font-size:0.75rem;color:var(--text-muted);flex-shrink:0;">${Icons.download}</span>
      <div class="downloads-bar"><div class="downloads-fill" style="width:${pct}%"></div></div>
      <span style="font-size:0.8rem;font-weight:700;flex-shrink:0;font-family:'JetBrains Mono',monospace;">${fmtNum(p.weekly_downloads)}/wk</span>
      <span class="${growthClass}">${growthSign}${Math.abs(p.growth)}%</span>
    </div>
    <div style="margin-top:10px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
      ${p.tags.map(t => `<span class="badge badge-gray">${t}</span>`).join('')}
      <span style="margin-left:auto;" class="badge badge-source">${Icons.info} ${p.source} · ${p.updated}</span>
    </div>
  </div>`;
}

// ── APP CARD ──────────────────────────────────────────
function renderAppCard(a, rank) {
  return `
  <div class="card project-card fade-in" style="animation-delay:${rank * 0.05}s" data-id="${a.id}">
    <div class="project-card-rank" style="color:${rank <= 3 ? 'var(--accent-orange)' : 'var(--text-muted)'}">${rank <= 3 ? ['🥇','🥈','🥉'][rank-1] : rank}</div>
    <div class="project-card-logo">${a.emoji}</div>
    <div class="project-card-body">
      <div class="project-card-header">
        <div style="min-width:0;">
          <div class="project-card-name">${a.name} ${a.solo ? '<span class="badge badge-purple" style="font-size:0.65rem;vertical-align:middle;">Solo</span>' : ''}</div>
          <div class="project-card-tagline">${a.tagline}</div>
        </div>
      </div>
      <div class="project-card-meta">
        <span class="project-card-stat">${Icons.user} <a href="#profile" style="color:var(--text-secondary)">@${a.maker_handle}</a></span>
        ${a.stars ? `<span class="project-card-stat">${Icons.star} ${fmtNum(a.stars)} stars</span>` : ''}
        <span class="badge badge-gray">${a.category}</span>
      </div>
      <div class="project-card-tags">
        ${a.tags.map(t => `<span class="badge badge-purple">${t}</span>`).join('')}
      </div>
      <div class="project-card-source">
        <span class="badge badge-source">${Icons.info} ${a.source} · ${a.updated}</span>
        <a href="${a.url}" target="_blank" class="btn btn-ghost btn-sm" style="margin-left:auto;">${Icons.external} Visit</a>
      </div>
    </div>
    <div class="project-card-actions">
      <button class="upvote-btn" data-id="${a.id}" data-votes="${a.upvotes}">
        ${Icons.upvote}
        <span class="vote-count">${fmtNum(a.upvotes)}</span>
      </button>
    </div>
  </div>`;
}

// ── LEADERBOARD ───────────────────────────────────────
function renderLeaderboard(period) {
  const data = LEADERBOARD[period];
  const rankClass = ['gold', 'silver', 'bronze'];
  return data.map((item, i) => `
    <div class="lb-row">
      <div class="lb-rank ${rankClass[i] || ''}">${i < 3 ? ['🥇','🥈','🥉'][i] : item.rank}</div>
      <div class="lb-info">
        <div class="lb-name">${item.emoji} ${item.name}</div>
        <div class="lb-meta">${item.tagline} · by @${item.maker}</div>
      </div>
      <div class="lb-votes">${Icons.upvote} ${fmtNum(item.votes)}</div>
    </div>
  `).join('');
}

// ── IDEA GENERATOR PAGE ───────────────────────────────
export function renderIdeaGenerator(query = '', resultKey = '') {
  const hasResults = resultKey && IDEA_RESULTS[resultKey];
  return `
  <div class="idea-hero container">
    <div class="hero-eyebrow">${Icons.sparkle} AI-Powered · Retrieval-First · Every Claim Has a Source</div>
    <h1 class="hero-title" style="font-size:clamp(2rem,5vw,3.5rem);">
      Find Your <span class="gradient-text">Next Project</span>
    </h1>
    <p class="hero-subtitle">Type a topic or problem. We'll scan GitHub, npm, PyPI, and HN — then generate real, buildable ideas with competitor data.</p>

    <div class="idea-search-wrap">
      <div class="idea-input-container">
        <textarea id="idea-input" placeholder='Describe a problem or topic… e.g. "invoice tool for freelancers" or "open-source Calendly"' rows="2">${query}</textarea>
        <div class="idea-input-actions">
          <button class="btn btn-ghost btn-sm" id="idea-surprise" title="Surprise me">${Icons.surprise} Surprise</button>
          <button class="btn btn-primary" id="idea-search-btn">
            ${Icons.sparkle} Generate
          </button>
        </div>
      </div>
      <div class="idea-examples">
        <span class="idea-example" data-q="invoice tool">🧾 Invoice tools</span>
        <span class="idea-example" data-q="habit tracker">✅ Habit trackers</span>
        <span class="idea-example" data-q="pdf tools">📄 PDF tools</span>
        <span class="idea-example" data-q="auth library">🔐 Auth libraries</span>
        <span class="idea-example" data-q="cli tools">⚡ CLI apps</span>
      </div>
    </div>
  </div>

  <div class="container" id="idea-results-container">
    ${hasResults ? renderIdeaResults(IDEA_RESULTS[resultKey]) : renderIdeaEmpty()}
  </div>
  `;
}

function renderIdeaEmpty() {
  return `
  <div class="empty-state" style="padding:40px 0 80px;">
    <div class="empty-state-icon">💡</div>
    <div class="empty-state-title">Ready to discover ideas</div>
    <div class="empty-state-desc">Type a topic above or click one of the examples to get started.<br>No account needed for your first 10 searches.</div>
  </div>`;
}

function renderIdeaResults(data) {
  return `
  <div class="idea-results">
    <div class="idea-results-header">
      <div>
        <h2 style="font-size:1.3rem;font-weight:800;">Results for: <span class="text-gradient">"${data.query}"</span></h2>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-top:4px;">
          Found ${data.competitors.length} competitors · ${data.ideas.length} ideas generated
        </p>
      </div>
      <div class="ai-label"><div class="ai-dot"></div> AI-generated from the sources listed</div>
    </div>

    <!-- Competitors -->
    <div class="idea-section">
      <div class="idea-section-title">📊 Existing Competitors</div>
      <div class="card" style="overflow:hidden;">
        <table class="competitor-table">
          <thead><tr>
            <th>Name</th><th>Stars</th><th>Downloads/wk</th><th>License</th><th>Last Updated</th><th>Registry</th><th></th>
          </tr></thead>
          <tbody>
            ${data.competitors.map(c => `
            <tr>
              <td><strong>${c.name}</strong></td>
              <td class="mono">${c.stars ? `${Icons.star} ${fmtNum(c.stars)}` : '—'}</td>
              <td class="mono">${c.downloads ? `${Icons.download} ${fmtNum(c.downloads)}` : '—'}</td>
              <td><span class="badge badge-gray">${c.license}</span></td>
              <td class="mono" style="color:var(--text-muted);font-size:0.75rem;">${c.updated}</td>
              <td><span class="badge ${registryBadge(c.registry)}">${c.registry}</span></td>
              <td><a href="${c.url}" target="_blank" class="btn btn-ghost btn-sm btn-icon">${Icons.external}</a></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Market Signals -->
    <div class="idea-section">
      <div class="idea-section-title">${Icons.chart} Market Signals</div>
      <div class="market-signals">
        <div class="signal-card">
          <div class="signal-value text-gradient">${data.signals.repos}</div>
          <div class="signal-label">Repos found</div>
        </div>
        <div class="signal-card">
          <div class="signal-value text-gradient">${data.signals.packages}</div>
          <div class="signal-label">Packages indexed</div>
        </div>
        <div class="signal-card">
          <div class="signal-value text-gradient">${data.signals.active}</div>
          <div class="signal-label">Actively maintained</div>
        </div>
        <div class="signal-card">
          <div class="signal-value text-gradient">${fmtNum(data.signals.avg_stars)}</div>
          <div class="signal-label">Avg stars</div>
        </div>
        <div class="signal-card">
          <div class="signal-value" style="font-size:1rem;color:var(--accent-orange);">${data.signals.last_updated}</div>
          <div class="signal-label">Median last update</div>
        </div>
      </div>
    </div>

    <!-- Gaps -->
    <div class="idea-section">
      <div class="idea-section-title">🔍 Gaps & Complaints Found</div>
      <div class="gaps-list">
        ${data.gaps.map(g => `
        <div class="gap-item">
          <div class="gap-icon">${g.icon}</div>
          <div>
            <div class="gap-text">${g.text} <span class="badge badge-gray" style="vertical-align:middle;">${g.theme}</span></div>
            <div class="gap-source">${Icons.info} Source: <a href="#" style="color:var(--accent-cyan);">${g.source}</a></div>
          </div>
        </div>`).join('')}
      </div>
    </div>

    <!-- Idea Cards -->
    <div class="idea-section">
      <div class="idea-section-title">${Icons.idea} Generated Project Ideas (${data.ideas.length})</div>
      <div class="idea-cards">
        ${data.ideas.map(idea => renderIdeaCard(idea)).join('')}
      </div>
    </div>
  </div>`;
}

function renderIdeaCard(idea) {
  const filled = idea.solo_score;
  const dots = Array(5).fill(0).map((_, i) => `<div class="solo-dot ${i < filled ? 'filled' : ''}"></div>`).join('');
  return `
  <div class="idea-card">
    <div class="idea-card-num">Idea ${String(idea.num).padStart(2,'0')}</div>
    <div class="idea-card-title">${idea.title}</div>
    <p class="idea-card-why">${idea.why}</p>
    <div class="idea-card-meta">
      <span class="badge ${difficultyBadge(idea.difficulty)}">⏱ ${idea.difficulty === 'weekend' ? 'Weekend' : idea.difficulty === 'month' ? '1 Month' : '1 Quarter'}</span>
      ${idea.tags.map(t => `<span class="badge badge-gray">${t}</span>`).join('')}
    </div>
    <div class="idea-card-stack">Suggested stack: ${idea.stack.map(s => `<span>${s}</span>`).join(', ')}</div>
    <div class="idea-card-footer">
      <div class="solo-score">Solo ${Icons.user} <div class="solo-score-dots">${dots}</div> ${idea.solo_score}/5</div>
      <div style="flex:1;"></div>
      <button class="btn btn-ghost btn-sm" onclick="window.SoloLaunch.copyIdea(${idea.num - 1})">${Icons.copy} Copy</button>
      <button class="btn btn-ghost btn-sm" onclick="window.SoloLaunch.saveIdea(${idea.num - 1})">${Icons.save} Save</button>
      <button class="btn btn-primary btn-sm" onclick="window.SoloLaunch.submitFromIdea()">${Icons.submit} Submit</button>
    </div>
  </div>`;
}

// ── SUBMIT PAGE ───────────────────────────────────────
export function renderSubmit(loggedIn = false) {
  return `
  <div class="submit-page container">
    <div style="max-width:680px;">
      <div class="section-header" style="margin-bottom:32px;">
        <div>
          <h1 class="hero-title" style="font-size:2.2rem;text-align:left;">Submit a Project</h1>
          <p style="color:var(--text-secondary);margin-top:8px;">Share what you built with the solo developer community. GitHub login required to prevent spam.</p>
        </div>
      </div>

      ${!loggedIn ? `
      <div class="auth-wall" style="margin-bottom:32px;">
        <div style="font-size:2rem;margin-bottom:16px;">🔐</div>
        <h3 style="font-weight:700;margin-bottom:8px;">Connect with GitHub to Submit</h3>
        <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:24px;">We only use GitHub OAuth for identity — no email required, no newsletter.</p>
        <button class="github-btn" id="github-login-btn">
          ${Icons.github} Continue with GitHub
        </button>
        <p style="font-size:0.75rem;color:var(--text-muted);margin-top:16px;">You can browse and use the idea generator without logging in.</p>
      </div>
      ` : ''}

      <form class="submit-form ${!loggedIn ? 'form-disabled' : ''}" id="submit-form">
        <div class="form-group">
          <label class="form-label" for="proj-name">Project Name <span>*</span></label>
          <input class="form-input" id="proj-name" type="text" placeholder="e.g. LiteInvoice" ${!loggedIn ? 'disabled' : ''}>
        </div>
        <div class="form-group">
          <label class="form-label" for="proj-url">Project URL <span>*</span></label>
          <input class="form-input" id="proj-url" type="url" placeholder="https://github.com/you/your-project" ${!loggedIn ? 'disabled' : ''}>
          <div class="form-hint">We'll automatically pull GitHub stars, forks, and license from a GitHub URL.</div>
        </div>
        <div class="form-group">
          <label class="form-label" for="proj-tagline">Tagline <span>* max 100 chars</span></label>
          <input class="form-input" id="proj-tagline" type="text" placeholder="Terminal-first invoice CLI in 200 lines of Bun" maxlength="100" ${!loggedIn ? 'disabled' : ''}>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="proj-category">Category <span>*</span></label>
            <select class="form-input form-select" id="proj-category" ${!loggedIn ? 'disabled' : ''}>
              <option value="">Choose…</option>
              <option>Developer Tool</option><option>SaaS</option><option>CLI App</option>
              <option>Library / Package</option><option>Design Tool</option>
              <option>Productivity</option><option>Backend / API</option><option>Other</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="proj-tags">Tags <span>comma-separated</span></label>
            <input class="form-input" id="proj-tags" type="text" placeholder="cli, invoicing, bun, sqlite" ${!loggedIn ? 'disabled' : ''}>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="proj-desc">Description <span>optional, markdown supported</span></label>
          <textarea class="form-textarea" id="proj-desc" rows="4" placeholder="What problem does this solve? What makes it different?" ${!loggedIn ? 'disabled' : ''}></textarea>
        </div>
        <div class="form-group">
          <label class="form-checkbox">
            <input type="checkbox" id="proj-solo" ${!loggedIn ? 'disabled' : ''}>
            <span class="form-checkbox-label">🦸 I built this alone (no team) — earn the Solo badge</span>
          </label>
        </div>
        <div class="form-group">
          <label class="form-checkbox">
            <input type="checkbox" id="proj-oss" ${!loggedIn ? 'disabled' : ''}>
            <span class="form-checkbox-label">📖 This project is open source (MIT, Apache, GPL, etc.)</span>
          </label>
        </div>
        <div style="padding:16px;border-radius:var(--radius-md);background:var(--bg-glass);border:1px solid var(--border);margin-bottom:24px;font-size:0.82rem;color:var(--text-secondary);">
          ${Icons.info} <strong>Data transparency:</strong> If your URL is a GitHub repo, we'll automatically display stars, forks, and last commit date — and show them with a "Source: GitHub API" badge. We never claim data we don't have a source for.
        </div>
        <button class="btn btn-primary btn-lg w-full" type="submit" id="submit-btn" ${!loggedIn ? 'disabled' : ''}>
          ${Icons.submit} Submit Project
        </button>
      </form>
    </div>
  </div>`;
}

// ── PROFILE PAGE ──────────────────────────────────────
export function renderProfile() {
  return `
  <div class="container" style="padding-bottom:80px;">
    <div class="profile-header">
      <div class="profile-avatar">🧑‍💻</div>
      <div class="profile-info">
        <div class="name">DreamFaang78</div>
        <div class="handle">@DreamFaang78 · <a href="https://github.com/DreamFaang78" target="_blank" style="color:var(--accent-cyan);">GitHub ${Icons.external}</a></div>
        <div class="profile-stats">
          <div class="profile-stat"><div class="profile-stat-value text-gradient">3</div><div class="profile-stat-label">Submissions</div></div>
          <div class="profile-stat"><div class="profile-stat-value text-gradient">1.4k</div><div class="profile-stat-label">Total Upvotes</div></div>
          <div class="profile-stat"><div class="profile-stat-value text-gradient">Oct 2026</div><div class="profile-stat-label">Member since</div></div>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="section-header" style="margin-bottom:20px;">
      <h2 class="section-title">Submitted Projects</h2>
    </div>
    <div class="cards-grid cards-grid--list">
      ${[APPS[3], APPS[4]].map((a, i) => renderAppCard(a, i + 1)).join('')}
    </div>
    <div class="divider" style="margin-top:40px;"></div>
    <div class="section-header" style="margin-bottom:20px;">
      <h2 class="section-title">Saved Ideas</h2>
    </div>
    <div class="empty-state">
      <div class="empty-state-icon">💡</div>
      <div class="empty-state-title">No saved ideas yet</div>
      <div class="empty-state-desc">Use the Idea Generator and click Save on any idea card.</div>
    </div>
  </div>`;
}

// ── ABOUT PAGE ────────────────────────────────────────
export function renderAbout() {
  return `
  <div class="about-page container">
    <div class="about-section">
      <div class="hero-eyebrow" style="display:inline-flex;margin-bottom:20px;">${Icons.github} MIT License · Open Source · v1.0 · October 2026</div>
      <h1 class="about-title">About <span class="text-gradient">SoloLaunch</span></h1>
      <p class="about-desc">SoloLaunch is a free, open-source website for solo developers. It does two things: surface trending projects with real, cited numbers — and generate buildable ideas from live GitHub, npm, and PyPI data. No paywalls, no ads, no sponsored listings. Ever.</p>
      <div style="margin-top:20px;display:flex;gap:12px;flex-wrap:wrap;">
        <a href="https://github.com/DreamFaang78/sololaunch" target="_blank" class="github-btn">${Icons.github} View on GitHub</a>
        <a href="#" class="btn btn-secondary" id="export-json-btn">${Icons.download} Download Weekly Dataset (JSON)</a>
      </div>
    </div>

    <div class="about-section">
      <h2 class="about-title" style="font-size:1.4rem;">The Stack</h2>
      <p class="about-desc" style="margin-bottom:20px;">A modern, AWS-native, beginner-friendly stack. One command deploys everything via SST v3.</p>
      <div class="stack-grid">
        ${TECH_STACK.map(s => `
        <div class="stack-item">
          <div class="stack-item-label">${s.layer}</div>
          <div class="stack-item-value">${s.value}</div>
          <div class="stack-item-why">${s.why}</div>
        </div>`).join('')}
      </div>
    </div>

    <div class="about-section">
      <h2 class="about-title" style="font-size:1.4rem;">Data Sources</h2>
      <p class="about-desc" style="margin-bottom:20px;">Every number on SoloLaunch has a source. We store only public metadata. Full terms compliance.</p>
      <div class="card" style="overflow:hidden;">
        <table class="source-table">
          <thead><tr><th>Source</th><th>Used for</th><th>Access</th><th>Limit</th></tr></thead>
          <tbody>
            ${DATA_SOURCES.map(d => `
            <tr>
              <td><strong>${d.source}</strong></td>
              <td style="color:var(--text-secondary);">${d.used}</td>
              <td><span class="badge badge-green">${d.access}</span></td>
              <td style="font-size:0.78rem;color:var(--text-muted);">${d.limit}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="about-section">
      <h2 class="about-title" style="font-size:1.4rem;">Architecture</h2>
      <div class="card" style="padding:28px;font-family:'JetBrains Mono',monospace;font-size:0.8rem;line-height:2;color:var(--text-secondary);">
        <pre style="white-space:pre-wrap;overflow:auto;">EventBridge Scheduler → SQS → Lambda workers
  → GitHub / npm / PyPI / HN APIs + Apify
                    ↓
       Aurora Serverless v2 (Postgres, Data API)
          ↑                         ↓
Hono API on Lambda ←→ Astro + React Islands
                          ↓
  Nightly rebuild → S3 + CloudFront (alphacreation.online)
                          ↓
  Idea Generator → Amazon Bedrock (Nova) → idea cards (cached)</pre>
      </div>
    </div>

    <div class="about-section">
      <h2 class="about-title" style="font-size:1.4rem;">Cost Controls (staying within $100 AWS credit)</h2>
      <div class="gaps-list">
        ${[
          ['🗄', 'Cache every API & AI response in Postgres (24h for stats, 7 days for idea results)'],
          ['📄', 'Pre-compute trending lists nightly; serve from S3+CloudFront, not per-request Lambda'],
          ['⏱', 'Limit idea generations to 10/user/day to protect AI quota'],
          ['🔄', 'Keep Apify runs small and infrequent (daily or weekly)'],
          ['🔔', 'AWS Budgets alerts at $20, $50, $80 — never miss a spike'],
          ['😴', 'Aurora Serverless v2 scales to zero when idle; max 2 ACUs'],
          ['🚫', 'Avoided: NAT gateways, AWS WAF, OpenSearch — all have fixed monthly fees'],
        ].map(([icon, text]) => `<div class="gap-item"><div class="gap-icon">${icon}</div><div class="gap-text">${text}</div></div>`).join('')}
      </div>
    </div>

    <div class="about-section">
      <h2 class="about-title" style="font-size:1.4rem;">Contributing</h2>
      <p class="about-desc">SoloLaunch uses a plugin-style <code style="background:var(--bg-surface);padding:2px 6px;border-radius:4px;">sources/</code> folder. Adding a new data source (e.g. Cargo crates, Hex packages) takes about 50 lines of TypeScript. See the <a href="#" style="color:var(--accent-cyan);">docs/add-data-source.md</a> guide. Self-hosting takes 15 minutes with SST — see <a href="#" style="color:var(--accent-cyan);">docs/self-host.md</a>.</p>
    </div>
  </div>`;
}
