import { pageBySlug, pages, toMarkdown } from "../content/pages"
import { guideBySlug, guides } from "./guides"

export const siteTagline = "IndokuUI is a standalone React UI library with a minimal shadcn-style design and dozens of ready-made components. Created by @indokudev."

/** URL path of a page: the introduction guide lives at /docs. */
export const pathOf = (slug: string) => (slug === "introduction" ? "/docs" : `/docs/${slug}`)

/** Plain Markdown for any guide or component slug, or undefined if it does not exist. */
export function markdownFor(slug: string, origin = ""): string | undefined {
  const guide = guideBySlug.get(slug)
  if (guide) return guide.body.trimStart()
  const page = pageBySlug.get(slug)
  return page ? toMarkdown(page, origin) : undefined
}

export function titleFor(slug: string): { title: string; description: string } | undefined {
  const guide = guideBySlug.get(slug)
  if (guide) return { title: guide.title, description: guide.description }
  const page = pageBySlug.get(slug)
  return page ? { title: page.name, description: page.description } : undefined
}

export const allSlugs = () => [...guides.map((g) => g.slug), ...pages.map((p) => p.slug)]
