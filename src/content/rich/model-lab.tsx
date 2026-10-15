import { ModelLab } from "../../science-ui"
import { renderLatex } from "../../lib/latex"
import { catalog } from "@indoku/science"
import type { RichDoc } from "../types"

export function LabAll() {
  return <ModelLab catalog={catalog} renderLatex={renderLatex} />
}

export function LabPhysics() {
  return <ModelLab catalog={catalog} categories={["physics"]} defaultModel="newton-second" renderLatex={renderLatex} />
}

export function LabLifeScience() {
  return <ModelLab catalog={catalog} categories={["chemistry", "biology"]} defaultModel="bohr-atom" renderLatex={renderLatex} />
}

export function LabMath() {
  return <ModelLab catalog={catalog} categories={["math"]} defaultModel="function-plot" renderLatex={renderLatex} />
}

export const doc: RichDoc = {
  intro: [
    "Pick any model from the science engine, move the sliders and watch it change live. Physics (Newton, pendulum, spring, orbit, incline, collision, projectile, fluid flow, waves), chemistry (atoms, molecules), biology (DNA, cell, population growth) and math (functions, lines, trigonometry, surfaces, quadratics) all come from one catalog.",
    "`@indoku/science` decides which models exist and which knobs they have (`catalog.list()`), and computes every frame (`catalog.build()`). `ModelLab` only draws the controls and the scene, so a new model in the engine shows up here with no UI change.",
  ],
  importCode: `import { ModelLab } from "@indoku/ui"\nimport { catalog } from "@indoku/science"\n\n<ModelLab catalog={catalog} />`,
  examples: [
    { id: "all", title: "Every model", description: "All categories. Switch the tab, pick a model, drag a slider.", fn: "LabAll" },
    { id: "physics", title: "Physics: Newton and friends", description: "Raise the friction until the block stops: F − μmg = ma.", fn: "LabPhysics" },
    { id: "life", title: "Atoms, molecules, DNA, cells", description: "Change the atomic number from 1 to 18 and the shells refill.", fn: "LabLifeScience" },
    { id: "math", title: "Math: functions, lines, trigonometry", description: "Type any expression of x, e.g. `x^3 - 4*x` or `sin(x)/x*5`.", fn: "LabMath" },
  ],
  props: [
    {
      part: "ModelLab",
      rows: [
        { name: "catalog", type: "{ list(category?): ModelInfo[]; build(id, params?): Scene }", required: true, description: "`catalog` from `@indoku/science`, or any object with the same two methods." },
        { name: "defaultModel", type: "string", required: false, description: "Model id shown first." },
        { name: "categories", type: "string[]", required: false, description: "Limit the tabs: physics, chemistry, biology, math, shapes." },
        { name: "renderLatex", type: "(latex: string) => ReactNode", required: false, description: "Shows the formula lines of each scene, e.g. `(latex) => <MathRenderer latex={latex} />`." },
        { name: "view3d", type: "(scene, t) => ReactNode", required: false, description: "Custom 3D renderer. Default: `Plot3D`." },
        { name: "height", type: "number", required: false, default: "380", description: "Height of the built-in 3D viewport, in px." },
      ],
    },
  ],
  notes: ["Add your own model with `registerModel({ id, title, category, params, build })` from `@indoku/science`; it appears in the lab automatically."],
  seeAlso: ["plot-2d", "plot-3d", "graph-2d"],
}
