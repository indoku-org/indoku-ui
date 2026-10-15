import { PeriodicTable } from "../../science-ui"
import { ELEMENTS, molarMass } from "@indoku/science"
import { useState } from "react"
import type { RichDoc } from "../types"

export function PeriodicTableBasic() {
  return <PeriodicTable elements={ELEMENTS} />
}

export function PeriodicTableSelect() {
  const [selected, setSelected] = useState(26)
  const el = ELEMENTS[selected - 1]
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <PeriodicTable elements={ELEMENTS} selected={selected} onSelect={(e) => setSelected(e.number)} />
      <small>
        {el.name} ({el.symbol}) · Z = {el.number} · molar mass {molarMass(el.symbol).toFixed(3)} g/mol
      </small>
    </div>
  )
}

export const doc: RichDoc = {
  intro: [
    "The 18-column periodic table with separate lanthanide and actinide rows and a detail panel. Cells are colored by category.",
    "It accepts any list of elements with the `PeriodicElement` shape. `ELEMENTS` from `@indoku/science` fits as-is (all 118 elements, computed period, group and category).",
  ],
  importCode: `import { PeriodicTable } from "@indoku/ui"\nimport { ELEMENTS } from "@indoku/science"`,
  examples: [
    { id: "basic", title: "Basic usage", fn: "PeriodicTableBasic" },
    { id: "controlled", title: "Controlled selection", description: "Read the selected element and compute with it.", fn: "PeriodicTableSelect" },
  ],
  a11y: ["Cells are buttons with the element name as label."],
  seeAlso: ["science-calculators", "plot-3d"],
}
