import type { APIRoute } from "astro"
import { callTool as sharedCall, tools as sharedTools, type McpData } from "@indoku/ui-mcp/tools"
import { pages } from "../content/pages"
import { markdownFor } from "../lib/docs-md"
import { buildMcpData } from "../lib/mcp-data"

export const prerender = false

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id, MCP-Protocol-Version",
}

// Same tools as the stdio package @indoku/ui-mcp, plus full-page Markdown.
const tools = [
  ...sharedTools,
  {
    name: "get_component_docs",
    description: "Get the full Markdown docs of one component: import, anatomy, examples, props, accessibility.",
    inputSchema: { type: "object", properties: { slug: { type: "string", description: "Component slug, e.g. \"data-table\"." } }, required: ["slug"] },
  },
]

const text = (t: string, isError = false) => ({ content: [{ type: "text", text: t }], ...(isError ? { isError: true } : {}) })

function callTool(name: string, args: Record<string, unknown>, origin: string) {
  if (name === "get_component_docs") {
    const slug = String(args.slug ?? "")
    const md = pages.some((p) => p.slug === slug) ? markdownFor(slug, origin) : undefined
    return md ? text(md) : text(`Unknown component "${slug}". Use list_components to see valid slugs.`, true)
  }
  return sharedCall(name, args, buildMcpData() as unknown as McpData)
}

interface Rpc {
  jsonrpc?: string
  id?: string | number | null
  method?: string
  params?: { name?: string; arguments?: Record<string, unknown> }
}

function handle(msg: Rpc, origin: string) {
  const id = msg.id ?? null
  const ok = (result: unknown) => ({ jsonrpc: "2.0", id, result })
  const err = (code: number, message: string) => ({ jsonrpc: "2.0", id, error: { code, message } })
  switch (msg.method) {
    case "initialize":
      return ok({
        protocolVersion: "2025-03-26",
        capabilities: { tools: {} },
        serverInfo: { name: "indoku-ui-docs", version: "0.1.0" },
        instructions: "Look up IndokuUI (@indoku/ui) components, props and examples. Start with search_docs or list_components.",
      })
    case "ping":
      return ok({})
    case "tools/list":
      return ok({ tools })
    case "tools/call": {
      const res = callTool(msg.params?.name ?? "", msg.params?.arguments ?? {}, origin)
      return res ? ok(res) : err(-32602, `Unknown tool: ${msg.params?.name}`)
    }
    default:
      return err(-32601, `Method not found: ${msg.method}`)
  }
}

export const OPTIONS: APIRoute = () => new Response(null, { status: 204, headers: cors })

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ error: "This MCP endpoint accepts POST (Streamable HTTP, JSON-RPC 2.0)." }), {
    status: 405,
    headers: { ...cors, Allow: "POST, OPTIONS", "Content-Type": "application/json" },
  })

export const POST: APIRoute = async ({ request, site }) => {
  const origin = (site ?? new URL(request.url)).origin
  let body: Rpc | Rpc[]
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    })
  }
  const msgs: Rpc[] = Array.isArray(body) ? body : [body]
  const batch = Array.isArray(body)
  // Notifications (no id) get no response body.
  const replies = msgs.filter((m) => m.id !== undefined).map((m) => handle(m, origin))
  if (!replies.length) return new Response(null, { status: 202, headers: cors })
  return new Response(JSON.stringify(batch ? replies : replies[0]), { headers: { ...cors, "Content-Type": "application/json" } })
}
