import type { APIRoute } from "astro"
import { markdownFor } from "../../lib/docs-md"

export const GET: APIRoute = ({ params, site, request }) => {
  const origin = (site ?? new URL(request.url)).origin
  const md = markdownFor(params.slug ?? "", origin)
  if (!md) return new Response("Not found", { status: 404 })
  return new Response(md, { headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=300" } })
}
