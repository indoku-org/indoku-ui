import { Plot3D } from "../../science-ui"
import { MOLECULE_NAMES, dnaScene, moleculeScene, pipeFlowScene } from "@indoku/science"
import { useState } from "react"
import type { RichDoc } from "../types"

export function Plot3DMolecule() {
  const [name, setName] = useState("H2O")
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <select value={name} onChange={(e) => setName(e.target.value)}>
        {MOLECULE_NAMES.map((n) => (
          <option key={n}>{n}</option>
        ))}
      </select>
      <Plot3D scene={moleculeScene(name)} autoRotate />
    </div>
  )
}

export function Plot3DPipe() {
  return <Plot3D scene={pipeFlowScene({ radius: 1, throatRadius: 0.5 })} />
}

export function Plot3DDna() {
  return <Plot3D scene={dnaScene()} height={420} autoRotate />
}

export const doc: RichDoc = {
  intro: [
    "A 3D viewer on a plain 2D canvas with its own perspective projection and painter's algorithm, so it needs no three.js. Drag to orbit, scroll or pinch to zoom.",
    "Scenes come from `@indoku/science` (`moleculeScene`, `pipeFlowScene`, `dnaScene`, `surfaceScene`, ...) or from any object matching `Scene3DLike`.",
  ],
  importCode: `import { Plot3D } from "@indoku/ui"\nimport { moleculeScene } from "@indoku/science"`,
  examples: [
    { id: "molecule", title: "Molecule", description: "Pick a molecule; atoms and bonds are generated for you.", fn: "Plot3DMolecule" },
    { id: "pipe", title: "Pipe flow", description: "Tracers speed up in the narrow section: A₁v₁ = A₂v₂.", fn: "Plot3DPipe" },
    { id: "dna", title: "DNA helix", fn: "Plot3DDna" },
  ],
  notes: ["Fine for a few thousand primitives. Pass `t` to control time yourself, or `controls={false}` to hide the play bar."],
  seeAlso: ["plot-2d", "player"],
}
