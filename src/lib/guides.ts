import { docs, groups } from "../content/registry"

const raw = import.meta.glob<string>("../content/guides/*.md", { query: "?raw", import: "default", eager: true })

export interface Guide {
  slug: string
  title: string
  description: string
  section: string
  /** Sidebar sub-heading inside the section; falls back to the section label. */
  group: string
  body: string
  markdown: string
}

const order = ["introduction", "installation", "science", "mcp", "ai-skills", "vite", "astro", "styling", "theming", "color-mode"]

export const guides: Guide[] = Object.entries(raw)
  .map(([path, markdown]) => {
    const slug = path.replace(/^.*\/(.+)\.md$/, "$1")
    const m = markdown.match(/^---\n([\s\S]*?)\n---\n?/)
    const fm = Object.fromEntries((m?.[1] ?? "").split("\n").map((l) => [l.slice(0, l.indexOf(":")).trim(), l.slice(l.indexOf(":") + 1).trim()]))
    return { slug, title: fm.title ?? slug, description: fm.description ?? "", section: fm.section ?? "start", group: fm.group ?? "", body: markdown.slice(m?.[0].length ?? 0), markdown }
  })
  .sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug))

export const guideBySlug = new Map(guides.map((g) => [g.slug, g]))

/** Sidebar data shared by every page. */
export const nav = {
  guides: guides.map((g) => ({ slug: g.slug, title: g.title, section: g.section, group: g.group })),
  groups: groups.map((g) => ({ name: g, items: docs.filter((d) => d.group === g).map((d) => ({ slug: d.slug, name: d.name, description: d.description })) })),
}
