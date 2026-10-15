import type { ComponentType } from "react"
import { extractSource } from "../../lib/source"
import * as X from "./extra"
import raw from "./extra.tsx?raw"

const table: Record<string, [ComponentType, string, string[]?]> = {
  prose: [X.ProseDemo, "ProseDemo"],
  "code-block": [X.CodeBlockDemo, "CodeBlockDemo"],
  "color-swatch": [X.ColorSwatchDemo, "ColorSwatchDemo"],
  "password-input": [X.PasswordInputDemo, "PasswordInputDemo"],
  "rich-text-editor": [X.RichTextEditorDemo, "RichTextEditorDemo"],
  "date-picker": [X.DatePickerDemo, "DatePickerDemo"],
  "date-input": [X.DateInputDemo, "DateInputDemo"],
  "color-picker": [X.ColorPickerDemo, "ColorPickerDemo"],
  "number-input": [X.NumberInputDemo, "NumberInputDemo"],
  "tags-input": [X.TagsInputDemo, "TagsInputDemo"],
  rating: [X.RatingDemo, "RatingDemo"],
  "pin-input": [X.PinInputDemo, "PinInputDemo"],
  listbox: [X.ListboxDemo, "ListboxDemo", ["frameworks", "listFrameworks"]],
  "tree-view": [X.TreeViewDemo, "TreeViewDemo", ["tree"]],
  dialog: [X.DialogDemo, "DialogDemo"],
  "floating-panel": [X.FloatingPanelDemo, "FloatingPanelDemo"],
}

export const extraDemos: Record<string, { Demo: ComponentType; source: string }> = Object.fromEntries(
  Object.entries(table).map(([slug, [Demo, fn, helpers]]) => [slug, { Demo, source: extractSource(raw, fn, helpers) }]),
)
