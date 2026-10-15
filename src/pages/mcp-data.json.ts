import type { APIRoute } from "astro"
import { buildMcpData } from "../lib/mcp-data"

export const GET: APIRoute = () =>
  new Response(JSON.stringify(buildMcpData()), {
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=300", "Access-Control-Allow-Origin": "*" },
  })
