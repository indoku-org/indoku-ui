import type { APIRoute } from "astro"
import { robotsTxt } from "../lib/seo"

export const prerender = false

export const GET: APIRoute = ({ site, request }) =>
  new Response(robotsTxt(site ?? new URL(request.url).origin), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600" },
  })
