import { pgTable, text, timestamp, integer, boolean, jsonb, uuid, index } from 'drizzle-orm/pg-core';

// ── Users (GitHub Authenticated) ──────────────────────────
export const users = pgTable('users', {
  id: text('id').primaryKey(), // GitHub ID or UUID
  githubHandle: text('github_handle').notNull().unique(),
  avatarUrl: text('avatar_url'),
  bio: text('bio'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ── Projects (Apps, Software, Repos) ─────────────────────
export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  category: text('category').notNull(), // 'app' | 'software' | 'repo'
  name: text('name').notNull(),
  tagline: text('tagline').notNull(),
  url: text('url').notNull(),
  source: text('source').notNull(), // e.g. 'GitHub API', 'npm Registry', 'Community'
  sourceUrl: text('source_url').notNull(),
  makerId: text('maker_id').references(() => users.id),
  tags: text('tags').array().notNull().default([]),
  soloDev: boolean('solo_dev').default(false).notNull(),
  isOss: boolean('is_oss').default(true).notNull(),
  upvotesCount: integer('upvotes_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('idx_projects_category').on(table.category),
  index('idx_projects_upvotes').on(table.upvotesCount),
]);

// ── Repo Stats (Historical time-stamped snapshots) ───────
export const repoStats = pgTable('repo_stats', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').references(() => projects.id, { onDelete: 'cascade' }).notNull(),
  stars: integer('stars').notNull(),
  forks: integer('forks').notNull(),
  openIssues: integer('open_issues').notNull(),
  language: text('language'),
  license: text('license'),
  lastCommit: timestamp('last_commit'),
  fetchedAt: timestamp('fetched_at').defaultNow().notNull(),
}, (table) => [
  index('idx_repo_stats_project_fetched').on(table.projectId, table.fetchedAt),
]);

// ── Package Stats (npm / PyPI downloads) ──────────────────
export const packageStats = pgTable('package_stats', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').references(() => projects.id, { onDelete: 'cascade' }).notNull(),
  registry: text('registry').notNull(), // 'npm' | 'pypi'
  weeklyDownloads: integer('weekly_downloads').notNull(),
  latestVersion: text('latest_version'),
  growthPct: integer('growth_pct').default(0),
  fetchedAt: timestamp('fetched_at').defaultNow().notNull(),
}, (table) => [
  index('idx_package_stats_project_fetched').on(table.projectId, table.fetchedAt),
]);

// ── Upvotes ───────────────────────────────────────────────
export const votes = pgTable('votes', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  projectId: uuid('project_id').references(() => projects.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('idx_votes_unique_user_project').on(table.userId, table.projectId),
]);

// ── Comments (Simple threaded community comments) ─────────
export const comments = pgTable('comments', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').references(() => projects.id, { onDelete: 'cascade' }).notNull(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  parentId: uuid('parent_id'),
  body: text('body').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('idx_comments_project').on(table.projectId),
]);

// ── Idea Searches (Cache for 7 days per PRD) ──────────────
export const ideaSearches = pgTable('idea_searches', {
  id: uuid('id').defaultRandom().primaryKey(),
  query: text('query').notNull().unique(),
  signals: jsonb('signals').notNull(),
  competitors: jsonb('competitors').notNull(),
  gaps: jsonb('gaps').notNull(),
  ideas: jsonb('ideas').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('idx_idea_searches_query').on(table.query),
]);

// ── Saved Ideas (User bookmarks) ──────────────────────────
export const savedIdeas = pgTable('saved_ideas', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  ideaTitle: text('idea_title').notNull(),
  ideaData: jsonb('idea_data').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('idx_saved_ideas_user').on(table.userId),
]);
