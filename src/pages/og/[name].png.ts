import { Resvg } from "@resvg/resvg-js"
import type { APIRoute } from "astro"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { allSlugs, siteTagline, titleFor } from "../../lib/docs-md"

// Rendered at build time (see `prerender` below), so the fonts are read from the project's public/ folder
// while it still exists. Nothing here runs inside a serverless function.
export const prerender = true

export function getStaticPaths() {
  return ["default", ...allSlugs()].map((name) => ({ params: { name } }))
}

const fontFiles = ["Inter_700Bold.ttf", "Inter_400Regular.ttf"].map((f) => join(process.cwd(), "public/fonts", f))
const missing = fontFiles.filter((f) => !existsSync(f))
if (missing.length) throw new Error("OG image fonts not found: " + missing.join(", ") + ". Commit public/fonts/*.ttf.")

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

function wrap(text: string, max: number, maxLines: number): string[] {
  const lines: string[] = []
  let cur = ""
  for (const w of text.split(/\s+/)) {
    if ((cur + " " + w).trim().length > max) {
      lines.push(cur)
      cur = w
    } else cur = (cur + " " + w).trim()
  }
  if (cur) lines.push(cur)
  if (lines.length > maxLines) {
    lines.length = maxLines
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, "") + "…"
  }
  return lines
}

const cache = new Map<string, Uint8Array>()

function render(title: string, description: string): Uint8Array {
  const key = title + "|" + description
  const hit = cache.get(key)
  if (hit) return hit
  const t = wrap(title, 22, 2)
  const d = wrap(description, 60, 3)
  const dy = 280 + (t.length - 1) * 92 + 80
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#09090b"/>
  <rect x="60" y="60" width="64" height="64" rx="14" fill="#fafafa"/>
  <text x="92" y="106" font-family="Inter" font-size="40" font-weight="700" fill="#09090b" text-anchor="middle">I</text>
  <text x="144" y="104" font-family="Inter" font-size="34" font-weight="700" fill="#fafafa">IndokuUI</text>
  ${t.map((l, i) => `<text x="60" y="${280 + i * 92}" font-family="Inter" font-size="80" font-weight="700" fill="#fafafa">${esc(l)}</text>`).join("\n  ")}
  ${d.map((l, i) => `<text x="60" y="${dy + i * 44}" font-family="Inter" font-size="32" fill="#a1a1aa">${esc(l)}</text>`).join("\n  ")}
  <text x="60" y="580" font-family="Inter" font-size="26" fill="#71717a">by @indokudev · React UI with a shadcn look</text>
</svg>`
  const png = new Resvg(svg, { font: { fontFiles, loadSystemFonts: false, defaultFontFamily: "Inter" } }).render().asPng()
  cache.set(key, png)
  return png
}

export const GET: APIRoute = ({ params }) => {
  const name = params.name ?? "default"
  const info = name === "default" ? { title: "IndokuUI", description: siteTagline } : titleFor(name)
  if (!info) return new Response("Not found", { status: 404 })
  return new Response(render(info.title, info.description) as unknown as BodyInit, { headers: { "Content-Type": "image/png" } })
}
