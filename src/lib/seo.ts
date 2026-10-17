/**
 * Single source of truth for SEO: robots.txt, sitemap.xml, <meta name="robots">
 * and the X-Robots-Tag header all read from here, so they can never disagree.
 *
 * Model: ALLOWLIST. A path is indexable only if a rule below says so.
 * Anything unknown (new routes, 404s, API endpoints) defaults to noindex.
 */
import { docs } from "../content/registry"
import { guides } from "./guides"

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"

export interface SeoRule {
  /** Exact path (string) or pattern. Trailing slash is ignored. First match wins. */
  path: string | RegExp
  index: boolean
  /** Follow links on the page (default true). */
  follow?: boolean
}

/* ------------------------------------------------------------------ */
/* Edit these                                                          */
/* ------------------------------------------------------------------ */

export const RULES: SeoRule[] = [
  // Machine endpoints: never in search results.
  { path: /^\/mcp(-data\.json)?$/, index: false, follow: false },
  // Markdown twins of every doc page are duplicates of the HTML page.
  // NOTE: not Disallowed in robots.txt on purpose, crawlers must be able to
  // fetch them to see the noindex header.
  { path: /^\/docs\/[^/]+\.md$/, index: false, follow: true },
  // OG images should not show up as standalone results.
  { path: /^\/og\//, index: false, follow: false },

  // Public pages.
  { path: "/", index: true },
  { path: "/docs", index: true },
  { path: /^\/docs\/[^/]+$/, index: true },
]

/** Paths blocked from crawling entirely (robots.txt Disallow). Keep this tiny. */
export const DISALLOW = ["/mcp", "/mcp-data.json"]

/** Flip these to true to block a whole category (lists below). All off = every crawler is welcome. */
export const BLOCK_AI_TRAINING_BOTS = false
export const BLOCK_SCRAPER_BOTS = false
export const BLOCK_AI_SEARCH_BOTS = false

/** Crawlers that collect data for model TRAINING. */
export const AI_TRAINING_BOTS = [
  "GPTBot",
  "Google-Extended",
  "CCBot",
  "ClaudeBot",
  "anthropic-ai",
  "Applebot-Extended",
  "Bytespider",
  "Amazonbot",
  "Meta-ExternalAgent",
  "FacebookBot",
  "cohere-ai",
  "Diffbot",
  "ImagesiftBot",
  "Omgilibot",
  "AI2Bot",
  "Ai2Bot-Dolma",
  "Timpibot",
]

/** AI search / user-triggered fetchers (they cite you, they don't train). */
export const AI_SEARCH_BOTS = ["OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Perplexity-User", "Claude-User", "Claude-SearchBot", "DuckAssistBot", "YouBot"]

/** Aggressive SEO scrapers and archivers. */
export const SCRAPER_BOTS = ["AhrefsBot", "SemrushBot", "MJ12bot", "DotBot", "PetalBot", "ia_archiver", "archive.org_bot"]

/* ------------------------------------------------------------------ */
/* Environment guard                                                   */
/* ------------------------------------------------------------------ */

/**
 * Only the production deployment may be indexed.
 * Preview deployments, local dev and INDEXING=false are always noindex.
 */
export function indexingEnabled(): boolean {
  const env = typeof process !== "undefined" ? process.env : ({} as Record<string, string | undefined>)
  if (env.INDEXING === "false") return false
  if (env.VERCEL_ENV) return env.VERCEL_ENV === "production"
  return import.meta.env.PROD
}

/* ------------------------------------------------------------------ */
/* Per page API                                                        */
/* ------------------------------------------------------------------ */

const normalize = (path: string) => {
  const p = path.split(/[?#]/)[0] ?? "/"
  return p.length > 1 ? p.replace(/\/+$/, "") : "/"
}

const ruleFor = (path: string) => {
  const p = normalize(path)
  return RULES.find((r) => (typeof r.path === "string" ? r.path === p : r.path.test(p)))
}

export function isIndexable(path: string): boolean {
  return indexingEnabled() && (ruleFor(path)?.index ?? false)
}

/** Value for <meta name="robots"> and the X-Robots-Tag header. */
export function robotsFor(path: string, status = 200): string {
  const rule = ruleFor(path)
  if (!indexingEnabled() || status >= 400 || !rule?.index) {
    return rule?.follow === true ? "noindex, follow" : "noindex, nofollow"
  }
  return `index, ${rule.follow === false ? "nofollow" : "follow"}, max-image-preview:large, max-snippet:-1, max-video-preview:-1`
}

/** Canonical URL for a path (no query string, no trailing slash). */
export const canonicalFor = (path: string, site: URL | string) => new URL(normalize(path), site).href

/* ------------------------------------------------------------------ */
/* robots.txt                                                          */
/* ------------------------------------------------------------------ */

const group = (agents: string[], lines: string[]) => [...agents.map((a) => `User-agent: ${a}`), ...lines, ""].join("\n")

export function robotsTxt(site: URL | string): string {
  if (!indexingEnabled()) {
    return `# Non-production deployment: nothing may be crawled.\nUser-agent: *\nDisallow: /\n`
  }
  const blocked = [
    ...(BLOCK_AI_TRAINING_BOTS ? AI_TRAINING_BOTS : []),
    ...(BLOCK_SCRAPER_BOTS ? SCRAPER_BOTS : []),
    ...(BLOCK_AI_SEARCH_BOTS ? AI_SEARCH_BOTS : []),
  ]
  return [
    "# IndokuUI docs. All crawlers welcome.",
    group(["*"], ["Allow: /", ...DISALLOW.map((p) => `Disallow: ${p}`)]),
    ...(blocked.length ? [group(blocked, ["Disallow: /"])] : []),
    `Sitemap: ${new URL("/sitemap.xml", site).href}`,
    "",
  ].join("\n")
}

/* ------------------------------------------------------------------ */
/* sitemap.xml                                                         */
/* ------------------------------------------------------------------ */

export interface SitemapEntry {
  path: string
  priority: number
  changefreq: ChangeFreq
  lastmod?: Date | string
}

/** Every URL that *could* be in the sitemap. Filtered by isIndexable() below. */
function candidates(): SitemapEntry[] {
  return [
    { path: "/", priority: 1, changefreq: "weekly" },
    { path: "/docs", priority: 0.9, changefreq: "weekly" },
    ...guides.filter((g) => g.slug !== "introduction").map((g) => ({ path: `/docs/${g.slug}`, priority: 0.8, changefreq: "monthly" as const })),
    ...docs.map((d) => ({ path: `/docs/${d.slug}`, priority: 0.7, changefreq: "monthly" as const })),
  ]
}

export function sitemapEntries(): SitemapEntry[] {
  const seen = new Set<string>()
  return candidates().filter((e) => {
    if (seen.has(e.path) || !isIndexable(e.path)) return false
    seen.add(e.path)
    return true
  })
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

export function sitemapXml(site: URL | string): string {
  const urls = sitemapEntries().map((e) => {
    const lastmod = e.lastmod ? `<lastmod>${new Date(e.lastmod).toISOString()}</lastmod>` : ""
    return `  <url><loc>${esc(canonicalFor(e.path, site))}</loc>${lastmod}<changefreq>${e.changefreq}</changefreq><priority>${e.priority.toFixed(1)}</priority></url>`
  })
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`
}
