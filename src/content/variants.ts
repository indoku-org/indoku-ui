import { defaultSystem as system } from "@indoku/ui"
import type { VariantGroup } from "./types"

const theme = ((system as unknown as { _config?: { theme?: Record<string, Record<string, { variants?: Record<string, Record<string, unknown>> }>> } })._config?.theme ?? {}) as Record<
  string,
  Record<string, { variants?: Record<string, Record<string, unknown>> }>
>
const recipes = { ...(theme.recipes ?? {}), ...(theme.slotRecipes ?? {}) }

/** Docs slug -> theme recipe names that style it. Slugs missing here have no theme variants. */
const recipeNames: Record<string, string[]> = {
  button: ["button"],
  badge: ["badge"],
  card: ["card"],
  avatar: ["avatar"],
  skeleton: ["skeleton"],
  progress: ["progress"],
  status: ["status"],
  stat: ["stat"],
  "data-list": ["dataList"],
  accordion: ["accordion"],
  "color-swatch": ["colorSwatch"],
  input: ["input"],
  textarea: ["textarea"],
  "checkbox-radio-and-switch": ["checkbox", "radioGroup", "switch"],
  select: ["select"],
  combobox: ["combobox"],
  listbox: ["listbox"],
  "pin-input": ["pinInput"],
  "number-input": ["numberInput"],
  "tags-input": ["tagsInput"],
  rating: ["ratingGroup"],
  "color-picker": ["colorPicker"],
  "date-picker": ["datePicker"],
  "date-input": ["dateInput"],
  alert: ["alert"],
  dialog: ["dialog"],
  popover: ["popover"],
  menu: ["menu"],
  tabs: ["tabs"],
  breadcrumb: ["breadcrumb"],
  steps: ["steps"],
  kbd: ["kbd"],
  "tree-view": ["treeView"],
  "code-block": ["codeBlock"],
}

/** Components where `colorPalette` changes the look. */
const paletteSlugs = new Set(["button", "badge", "progress", "avatar", "status", "tabs", "alert", "checkbox-radio-and-switch"])
export const palettes = ["gray", "red", "orange", "yellow", "green", "teal", "blue", "cyan", "purple", "pink"]

export function variantsFor(slug: string): VariantGroup[] {
  const out: VariantGroup[] = []
  for (const name of recipeNames[slug] ?? []) {
    const v = recipes[name]?.variants
    if (!v) continue
    const options = Object.entries(v)
      .map(([key, map]) => ({ key, values: Object.keys(map) }))
      .filter((o) => o.values.length > 0)
    if (!options.length) continue
    if (paletteSlugs.has(slug) && out.length === 0) options.push({ key: "colorPalette", values: palettes })
    out.push({ recipe: name, options })
  }
  return out
}
