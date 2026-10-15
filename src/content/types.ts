export interface DocMeta {
  slug: string
  name: string
  group: string
  description: string
  /** File name (without extension) in src/components used to extract the props table. */
  propsFile?: string
}

export interface VariantGroup {
  recipe: string
  options: { key: string; values: string[] }[]
}

export interface PropRow {
  name: string
  type: string
  required: boolean
  default?: string
  description: string
}

export interface Example {
  id: string
  title: string
  description?: string
  /** Exact source of the rendered demo. */
  code: string
}

export interface DocPage extends DocMeta {
  /** Intro paragraphs (inline `code` allowed). */
  intro: string[]
  /** `import { … } from "@indoku/ui"` line(s). */
  importCode: string
  /** Composition tree, plain text. */
  anatomy?: string
  examples: Example[]
  props: { part: string; rows: PropRow[] }[]
  /** Theme variants read from the live theme (recipes and slot recipes). */
  variants: VariantGroup[]
  a11y: string[]
  notes: string[]
  seeAlso: string[]
}

/** What a rich doc file (src/content/rich/<slug>.tsx) exports as `doc`. */
export interface RichDoc {
  intro?: string[]
  importCode?: string
  anatomy?: string
  /** `fn` is the exported demo function; its source becomes the code tab. `helpers` are extra top-level names to include. */
  examples: { id: string; title: string; description?: string; fn: string; helpers?: string[] }[]
  /** Hand-written props tables, for components that have no own source file to extract from. */
  props?: { part: string; rows: PropRow[] }[]
  a11y?: string[]
  notes?: string[]
  seeAlso?: string[]
}
