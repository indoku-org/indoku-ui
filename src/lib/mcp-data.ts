import { defaultSystem as system } from "@indoku/ui"
import { pages } from "../content/pages"
import { guideBySlug } from "./guides"

type Obj = Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any

const cfg = ((system as unknown as { _config?: { theme?: Obj } })._config?.theme ?? {}) as Obj

const isToken = (v: unknown) => !!v && typeof v === "object" && "value" in (v as Obj)

function flatten(node: Obj | undefined, prefix = ""): string[] {
  const out: string[] = []
  for (const [k, v] of Object.entries(node ?? {})) {
    const name = k === "DEFAULT" ? prefix : prefix ? `${prefix}.${k}` : k
    if (isToken(v)) out.push(name)
    else if (v && typeof v === "object") out.push(...flatten(v as Obj, name))
  }
  return out.filter(Boolean)
}

const keys = (o: Obj | undefined) => Object.keys(o ?? {})

function themeData() {
  const palettes = Object.entries((cfg.tokens?.colors ?? {}) as Obj)
    .filter(([, v]) => v && !isToken(v) && typeof v === "object" && "500" in (v as Obj))
    .map(([k]) => k)
  const semantic = flatten(cfg.semanticTokens?.colors)
  const base = semantic.filter((n) => !palettes.some((p) => n.startsWith(`${p}.`)))
  const sample = palettes.includes("blue") ? "blue" : palettes[0]
  const suffixes = semantic.filter((n) => sample && n.startsWith(`${sample}.`)).map((n) => n.slice(sample.length + 1))
  if (suffixes.length) base.push(`<palette>.{${suffixes.join(",")}}`)
  return {
    colorPalettes: palettes,
    semanticColors: base,
    spacing: keys(cfg.tokens?.spacing),
    radii: [...new Set([...keys(cfg.tokens?.radii), ...flatten(cfg.semanticTokens?.radii)])],
    fonts: keys(cfg.tokens?.fonts),
    fontSizes: keys(cfg.tokens?.fontSizes),
    fontWeights: keys(cfg.tokens?.fontWeights),
    breakpoints: (cfg.breakpoints ?? {}) as Record<string, string>,
    recipes: keys(cfg.recipes),
    slotRecipes: keys(cfg.slotRecipes),
    overrides: [
      "Neutral palette: gray is zinc (same as shadcn/ui zinc preset).",
      "Fonts: Inter with a system fallback stack (heading, body); mono stack for code.",
      "Radii: l1 = 0.375rem, l2 = 0.5rem, l3 = 0.75rem.",
      "Dark mode: bg = gray.950, bg.panel = gray.900; light bg and bg.panel = white.",
      "Body: bg = bg, color = fg, font size sm.",
      "Recipes restyled to be minimal: button, input, textarea, badge, kbd, mark, skeleton, card, toast, checkbox, radio group, switch, alert, select, combobox, pin input, progress, accordion, avatar, breadcrumb, clipboard, data list, stat, status, steps, tabs, carousel.",
    ],
  }
}

let cached: unknown

/** Everything the MCP tools need, served at /mcp-data.json and used by /mcp. */
export function buildMcpData() {
  return (cached ??= {
    generatedAt: new Date().toISOString(),
    components: pages.map((p) => ({
      slug: p.slug,
      name: p.name,
      group: p.group,
      description: p.description,
      importCode: p.importCode,
      anatomy: p.anatomy,
      props: p.props,
      examples: p.examples.map((e) => ({ id: e.id, title: e.title, description: e.description, code: e.code })),
      variants: p.variants,
    })),
    theme: themeData(),
    guides: {
      installation: guideBySlug.get("installation")?.body ?? "",
      vite: guideBySlug.get("vite")?.body ?? "",
      astro: guideBySlug.get("astro")?.body ?? "",
    },
  })
}
