// =====================================================
// SoloLaunch – Main Application
// Client-side router, event binding, interactions
// =====================================================

import { renderHome, renderIdeaGenerator, renderSubmit, renderProfile, renderAbout } from './pages.js';
import { IDEA_RESULTS, REPOS, PACKAGES, APPS } from './data.js';

// ── State ─────────────────────────────────────────────
const state = {
  page: 'home',
  loggedIn: false,
  votedProjects: new Set(),
  savedIdeas: [],
  currentIdeaResults: null,
  toasts: [],
};

// ── Router ────────────────────────────────────────────
const ROUTES = {
  home:      { title: 'SoloLaunch – Discover & Build', render: renderHome },
  ideas:     { title: 'Idea Generator – SoloLaunch',   render: () => renderIdeaGenerator() },
  submit:    { title: 'Submit a Project – SoloLaunch', render: () => renderSubmit(state.loggedIn) },
  profile:   { title: 'Your Profile – SoloLaunch',     render: renderProfile },
  about:     { title: 'About & Open Source – SoloLaunch', render: renderAbout },
};

function navigate(page, opts = {}) {
  if (!ROUTES[page]) return;
  state.page = page;
  document.title = ROUTES[page].title;

  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });

  // Render page content
  const main = document.getElementById('main-content');
  main.innerHTML = ROUTES[page].render();
  main.scrollTop = 0;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Post-render hooks
  afterRender(page, opts);
}

function afterRender(page, opts) {
  if (page === 'home') bindHome();
  if (page === 'ideas') bindIdeas(opts);
  if (page === 'submit') bindSubmit();
  if (page === 'about') bindAbout();
  // Animate counters on home
  if (page === 'home') animateCounters();
  // Bind all upvote buttons
  bindUpvotes();
}

// ── Counter Animation ─────────────────────────────────
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.count.includes('%') ? '%' : '';
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString() + suffix;
      if (current >= target) clearInterval(timer);
    }, 30);
  });
}

// ── Home Page Bindings ────────────────────────────────
function bindHome() {
  // Hero search
  const heroInput = document.getElementById('hero-search-input');
  const heroBtn   = document.getElementById('hero-search-btn');

  function doHeroSearch() {
    const q = heroInput?.value?.trim();
    if (!q) { showToast('Enter a topic to search for ideas!', 'info'); return; }
    navigate('ideas', { query: q });
  }
  heroBtn?.addEventListener('click', doHeroSearch);
  heroInput?.addEventListener('keydown', e => { if (e.key === 'Enter') doHeroSearch(); });

  // Hero tags
  document.querySelectorAll('.hero-tag[data-q]').forEach(el => {
    el.addEventListener('click', () => {
      if (heroInput) heroInput.value = el.dataset.q;
      navigate('ideas', { query: el.dataset.q });
    });
  });

  // Surprise me
  document.getElementById('surprise-me-btn')?.addEventListener('click', () => {
    const surprises = ['recipe sharing app', 'bookmark manager', 'log parser', 'open-source Calendly', 'markdown CMS'];
    const q = surprises[Math.floor(Math.random() * surprises.length)];
    navigate('ideas', { query: q });
  });

  // Main tabs
  document.querySelectorAll('#main-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#main-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      ['repos','software','apps'].forEach(t => {
        document.getElementById(`tab-${t}`)?.classList.toggle('hidden', t !== tab);
      });
    });
  });

  // Leaderboard tabs
  document.querySelectorAll('#lb-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#lb-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.lbtab;
      document.getElementById('lb-daily')?.classList.toggle('hidden', tab !== 'daily');
      document.getElementById('lb-weekly')?.classList.toggle('hidden', tab !== 'weekly');
    });
  });

  // Trending chips
  document.querySelectorAll('.trending-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      navigate('ideas', { query: chip.textContent.replace('🔥','').trim() });
    });
  });

  // View toggle
  document.getElementById('view-grid-btn')?.addEventListener('click', () => {
    document.getElementById('repos-list')?.classList.replace('cards-grid--list','cards-grid--masonry');
    document.getElementById('apps-list')?.classList.replace('cards-grid--list','cards-grid--masonry');
  });
  document.getElementById('view-list-btn')?.addEventListener('click', () => {
    document.getElementById('repos-list')?.classList.replace('cards-grid--masonry','cards-grid--list');
    document.getElementById('apps-list')?.classList.replace('cards-grid--masonry','cards-grid--list');
  });

  // Filters (visual feedback only — full filtering would call API in real app)
  document.getElementById('filter-sort')?.addEventListener('change', e => {
    showToast(`Sorting by: ${e.target.options[e.target.selectedIndex].text}`, 'info');
  });
}

// ── Idea Page Bindings ────────────────────────────────
function bindIdeas(opts = {}) {
  const input  = document.getElementById('idea-input');
  const genBtn = document.getElementById('idea-search-btn');
  const resultsContainer = document.getElementById('idea-results-container');

  if (opts.query && input) input.value = opts.query;

  function doGenerate() {
    const q = input?.value?.trim();
    if (!q) { showToast('Enter a topic first!', 'info'); return; }

    // Show loading state
    resultsContainer.innerHTML = `
      <div class="loading-state">
        <div class="spinner spinner-lg"></div>
        <div>Scanning GitHub, npm, PyPI, and Hacker News…</div>
        <div style="font-size:0.8rem;color:var(--text-muted);">Usually takes 3–8 seconds on first search</div>
        <div class="progress-bar" style="width:280px;margin-top:8px;"><div class="progress-fill" id="search-progress" style="width:0%"></div></div>
      </div>`;

    // Animate progress bar
    let pct = 0;
    const progressInterval = setInterval(() => {
      pct = Math.min(pct + Math.random() * 15, 90);
      const fill = document.getElementById('search-progress');
      if (fill) fill.style.width = pct + '%';
    }, 200);

    // Simulate API call delay
    setTimeout(() => {
      clearInterval(progressInterval);
      const fill = document.getElementById('search-progress');
      if (fill) fill.style.width = '100%';

      setTimeout(() => {
        // Find matching result key
        const key = Object.keys(IDEA_RESULTS).find(k => q.toLowerCase().includes(k));
        if (key) {
          const { renderIdeaGenerator } = window.SoloLaunch._pages;
          resultsContainer.innerHTML = `<div class="fade-in">${window.SoloLaunch._renderResults(IDEA_RESULTS[key])}</div>`;
        } else {
          // Use invoice tool as fallback demo
          const fallback = IDEA_RESULTS['invoice tool'];
          const fakeResult = { ...fallback, query: q };
          resultsContainer.innerHTML = `<div class="fade-in">${window.SoloLaunch._renderResults(fakeResult)}</div>`;
        }
      }, 200);
    }, 2200);
  }

  genBtn?.addEventListener('click', doGenerate);
  input?.addEventListener('keydown', e => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) doGenerate();
  });

  // Examples
  document.querySelectorAll('.idea-example[data-q]').forEach(el => {
    el.addEventListener('click', () => {
      if (input) input.value = el.dataset.q;
      doGenerate();
    });
  });

  // Surprise
  document.getElementById('idea-surprise')?.addEventListener('click', () => {
    const surprises = ['invoice tool', 'habit tracker', 'open-source Notion', 'Stripe alternative', 'static site CMS'];
    if (input) input.value = surprises[Math.floor(Math.random() * surprises.length)];
    doGenerate();
  });

  // Auto-generate if query passed via nav
  if (opts.query) {
    setTimeout(doGenerate, 100);
  }
}

// ── Submit Page Bindings ──────────────────────────────
function bindSubmit() {
  document.getElementById('github-login-btn')?.addEventListener('click', () => {
    showModal('GitHub Login (Demo)', `
      <p style="color:var(--text-secondary);margin-bottom:20px;">In production, this redirects to GitHub OAuth. For this demo, we'll log you in instantly.</p>
      <button class="github-btn w-full" id="mock-login-confirm">${window.SoloLaunch._icons.github} Connect with GitHub (Demo)</button>
    `);
    setTimeout(() => {
      document.getElementById('mock-login-confirm')?.addEventListener('click', () => {
        state.loggedIn = true;
        closeModal();
        showToast('✅ Logged in as @DreamFaang78 (demo)', 'success');
        navigate('submit');
      });
    }, 50);
  });

  document.getElementById('submit-form')?.addEventListener('submit', e => {
    e.preventDefault();
    if (!state.loggedIn) { showToast('Please log in with GitHub first', 'error'); return; }
    const name = document.getElementById('proj-name')?.value?.trim();
    if (!name) { showToast('Project name is required', 'error'); return; }
    showToast(`🚀 "${name}" submitted successfully! It'll appear in the feed shortly.`, 'success');
    setTimeout(() => navigate('home'), 1500);
  });
}

// ── About Page Bindings ───────────────────────────────
function bindAbout() {
  document.getElementById('export-json-btn')?.addEventListener('click', e => {
    e.preventDefault();
    showToast('📦 Weekly dataset export starting… (demo)', 'success');
  });
}

// ── Upvotes ───────────────────────────────────────────
function bindUpvotes() {
  document.querySelectorAll('.upvote-btn').forEach(btn => {
    const id = btn.dataset.id;
    if (state.votedProjects.has(id)) btn.classList.add('voted');

    btn.addEventListener('click', () => {
      const countEl = btn.querySelector('.vote-count');
      const currentRaw = parseInt(btn.dataset.votes);
      if (state.votedProjects.has(id)) {
        state.votedProjects.delete(id);
        btn.classList.remove('voted');
        btn.dataset.votes = currentRaw - 1;
        countEl.textContent = formatNum(currentRaw - 1);
      } else {
        state.votedProjects.add(id);
        btn.classList.add('voted');
        btn.dataset.votes = currentRaw + 1;
        countEl.textContent = formatNum(currentRaw + 1);
        // Micro-animation
        btn.style.transform = 'scale(1.15)';
        setTimeout(() => { btn.style.transform = ''; }, 200);
      }
    });
  });
}

function formatNum(n) {
  if (n >= 1000) return (n/1000).toFixed(1) + 'k';
  return n.toString();
}

// ── Modal ─────────────────────────────────────────────
function showModal(title, bodyHtml) {
  const existing = document.getElementById('modal-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <span class="modal-title">${title}</span>
        <button class="btn btn-ghost btn-icon" id="modal-close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="modal-body">${bodyHtml}</div>
    </div>`;
  document.body.appendChild(overlay);

  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
}

function closeModal() {
  document.getElementById('modal-overlay')?.remove();
}

// ── Toast ─────────────────────────────────────────────
let toastContainer;
function showToast(message, type = 'info') {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type]}</span> <span>${message}</span>`;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ── Keyboard Shortcut ─────────────────────────────────
document.addEventListener('keydown', e => {
  // Cmd/Ctrl + K → go to idea generator
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    navigate('ideas');
  }
  // Escape → close modal
  if (e.key === 'Escape') closeModal();
});

// ── Nav Search ────────────────────────────────────────
document.querySelector('.nav-search-btn')?.addEventListener('click', () => navigate('ideas'));

// ── Nav Links ─────────────────────────────────────────
document.querySelectorAll('.nav-link[data-page]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navigate(link.dataset.page);
  });
});

// ── Public API (used by page HTML onclick attrs) ───────
import { renderIdeaResults as _renderResultsFn } from './pages.js';

// We need to expose some functions inline since pages use onclick=""
window.SoloLaunch = {
  navigate,
  showToast,
  _icons: { github: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>` },
  _renderResults: null, // set below
  _pages: { renderIdeaGenerator },
  copyIdea(idx) {
    const container = document.getElementById('idea-results-container');
    const cards = container?.querySelectorAll('.idea-card');
    if (!cards?.[idx]) return;
    const title = cards[idx].querySelector('.idea-card-title')?.textContent;
    const why   = cards[idx].querySelector('.idea-card-why')?.textContent;
    const text = `## ${title}\n\n${why}\n\n*Generated by SoloLaunch – sololaunch.alphacreation.online*`;
    navigator.clipboard?.writeText(text).then(() => showToast('Copied as Markdown!', 'success'));
  },
  saveIdea(idx) {
    showToast('💾 Idea saved to your profile (demo)', 'success');
  },
  submitFromIdea() {
    navigate('submit');
  },
};

// Expose renderIdeaResults for dynamic re-render
import { renderIdeaResults as rirf } from './pages.js';
// Since pages.js doesn't export renderIdeaResults directly, we inline a wrapper
window.SoloLaunch._renderResults = function(data) {
  // Re-use the full idea generator render but just the results portion
  navigate('ideas');
  setTimeout(() => {
    const resultsContainer = document.getElementById('idea-results-container');
    if (resultsContainer) {
      // Trigger the generate flow with the data
      const input = document.getElementById('idea-input');
      if (input) input.value = data.query;
      document.getElementById('idea-search-btn')?.click();
    }
  }, 100);
  return '';
};

// ── Init ──────────────────────────────────────────────
navigate('home');
