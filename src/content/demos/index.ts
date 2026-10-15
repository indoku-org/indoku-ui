import type { ComponentType } from "react"
import { demos as legacy } from "./legacy"
import { extraDemos } from "./extra-index"

/** Rich doc files (src/content/rich/<slug>.tsx): each exports `doc` plus the demo functions it references. */
const rich = import.meta.glob<Record<string, unknown>>("../rich/*.tsx", { eager: true })

const slugOf = (path: string) => path.replace(/^.*\/(.+)\.tsx$/, "$1")

/** slug -> exampleId -> component. Used by the page island (SSR + hydration). */
export const demoMap: Record<string, Record<string, ComponentType>> = {}

for (const [slug, v] of Object.entries({ ...legacy, ...extraDemos })) demoMap[slug] = { basic: v.Demo }

for (const [path, mod] of Object.entries(rich)) {
  const slug = slugOf(path)
  const doc = mod.doc as { examples: { id: string; fn: string }[] } | undefined
  if (!doc) continue
  demoMap[slug] = {}
  for (const ex of doc.examples) {
    const C = mod[ex.fn]
    if (typeof C !== "function") throw new Error(`rich/${slug}.tsx: demo "${ex.fn}" is not exported`)
    demoMap[slug][ex.id] = C as ComponentType
  }
}

export const baselineSources: Record<string, string> = Object.fromEntries(
  Object.entries({ ...legacy, ...extraDemos }).map(([slug, v]) => [slug, v.source]),
)
