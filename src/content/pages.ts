import props from "../generated/props.json"
import { extractSource } from "../lib/source"
import { baselineSources } from "./demos"
import { bySlug, docs, groups } from "./registry"
import { variantsFor } from "./variants"
import type { DocPage, PropRow, RichDoc } from "./types"

const richMods = import.meta.glob<{ doc?: RichDoc }>("./rich/*.tsx", { eager: true })
const richRaw = import.meta.glob<string>("./rich/*.tsx", { query: "?raw", import: "default", eager: true })
const slugOf = (p: string) => p.replace(/^.*\/(.+)\.tsx$/, "$1")

const importNames: Record<string, string> = {
  "qr-code": "QrCode",
  "date-picker": "DatePickerField",
  "date-input": "DateInputField",
  "checkbox-radio-and-switch": "Checkbox, RadioGroup, Switch",
  rating: "RatingGroup",
  "password-input": "PasswordInput, PasswordStrengthMeter, passwordStrength",
  kbd: "Kbd, KbdGroup",
  chat: "Message, Bubble, MessageScroller, Marker",
  form: "Form, useForm",
  toast: "Toaster, toaster",
  "input-otp": "InputOTP",
  "toggle-group": "ToggleGroup",
  "button-group": "ButtonGroup",
}

const defaultImport = (name: string, slug: string) =>
  importNames[slug] ?? name.replace(/[^A-Za-z0-9]+(.)?/g, (_, c: string | undefined) => (c ? c.toUpperCase() : ""))

const allProps = props as unknown as Record<string, Record<string, PropRow[]>>

function propTables(file?: string) {
  if (!file || !allProps[file]) return []
  return Object.entries(allProps[file]).map(([part, rows]) => ({ part, rows }))
}

export const pages: DocPage[] = docs.map((meta) => {
  const rich = richMods[`./rich/${meta.slug}.tsx`]?.doc
  const raw = richRaw[`./rich/${meta.slug}.tsx`]
  const examples = rich
    ? rich.examples.map((e) => ({
        id: e.id,
        title: e.title,
        description: e.description,
        code: extractSource(raw ?? "", e.fn, e.helpers),
      }))
    : [{ id: "basic", title: "Basic usage", code: baselineSources[meta.slug] ?? "" }]
  return {
    ...meta,
    intro: rich?.intro ?? [meta.description],
    importCode: rich?.importCode ?? `import { ${defaultImport(meta.name, meta.slug)} } from "@indoku/ui"`,
    anatomy: rich?.anatomy,
    examples,
    props: rich?.props ?? propTables(meta.propsFile),
    variants: variantsFor(meta.slug),
    a11y: rich?.a11y ?? [],
    notes: rich?.notes ?? [],
    seeAlso: rich?.seeAlso ?? [],
  }
})

export const pageBySlug = new Map(pages.map((p) => [p.slug, p]))
export { bySlug, docs, groups }

const fence = (code: string, lang = "tsx") => "```" + lang + "\n" + code.trim() + "\n```"

/** Plain Markdown for a component page (served at /docs/<slug>.md and by the MCP server). */
export function toMarkdown(p: DocPage, origin = ""): string {
  const out: string[] = [`# ${p.name}`, "", ...p.intro.flatMap((t) => [t, ""])]
  out.push(`Group: ${p.group}`, "")
  out.push("## Import", "", fence(p.importCode), "")
  if (p.anatomy) out.push("## Anatomy", "", fence(p.anatomy, "text"), "")
  out.push("## Examples", "")
  for (const e of p.examples) out.push(`### ${e.title}`, "", ...(e.description ? [e.description, ""] : []), fence(e.code), "")
  if (p.variants.length) {
    out.push("## Variants", "", "Set these as props. Values come from the live theme.", "")
    for (const g of p.variants) {
      if (p.variants.length > 1) out.push(`### ${g.recipe}`, "")
      for (const o of g.options) out.push(`- \`${o.key}\`: ${o.values.map((v) => "`" + v + "`").join(", ")}`)
      out.push("")
    }
  }
  if (p.props.length) {
    out.push("## Props", "")
    for (const t of p.props) {
      out.push(`### ${t.part}`, "", "| Prop | Type | Default | Description |", "| --- | --- | --- | --- |")
      for (const r of t.rows)
        out.push(`| \`${r.name}\`${r.required ? " *" : ""} | \`${r.type.replace(/\|/g, "\\|")}\` | ${r.default ? "`" + r.default + "`" : ""} | ${r.description.replace(/\n/g, " ").replace(/\|/g, "\\|")} |`)
      out.push("")
    }
    out.push("`*` = required. Style props and HTML attributes are accepted too.", "")
  }
  if (p.a11y.length) out.push("## Accessibility", "", ...p.a11y.map((a) => `- ${a}`), "")
  if (p.notes.length) out.push("## Notes", "", ...p.notes.map((a) => `- ${a}`), "")
  if (p.seeAlso.length) out.push("## See also", "", ...p.seeAlso.map((s) => `- ${bySlug.get(s)?.name ?? s}: ${origin}/docs/${s}`), "")
  return out.join("\n").trimEnd() + "\n"
}

/** Tiny scored search over name, description, intro and example titles. */
export function search(query: string, limit = 8) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!terms.length) return []
  return pages
    .map((p) => {
      const name = p.name.toLowerCase()
      const text = [p.description, ...p.intro, ...p.examples.map((e) => e.title + " " + (e.description ?? ""))].join(" ").toLowerCase()
      let score = 0
      for (const t of terms) {
        if (name === t || p.slug === t) score += 10
        else if (name.includes(t) || p.slug.includes(t)) score += 5
        if (p.group.toLowerCase().includes(t)) score += 1
        if (text.includes(t)) score += 2
      }
      return { p, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p)
}
