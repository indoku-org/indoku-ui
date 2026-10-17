import type { APIRoute } from "astro"
import { sitemapXml } from "../lib/seo"

export const prerender = false

export const GET: APIRoute = ({ site, request }) =>
  new Response(sitemapXml(site ?? new URL(request.url).origin), {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600" },
  })
