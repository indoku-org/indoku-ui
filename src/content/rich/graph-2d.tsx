import { Graph2D } from "../../science-ui"
import { compileFn } from "@indoku/science"
import { useMemo, useState } from "react"
import type { RichDoc } from "../types"

export function Graph2DBasic() {
  return (
    <Graph2D
      functions={[
        { fn: Math.sin, label: "sin x" },
        { fn: Math.cos, label: "cos x", color: "danger", dashed: true },
      ]}
    />
  )
}

export function Graph2DPoints() {
  return (
    <Graph2D
      viewport={{ xMin: -2, xMax: 6, yMin: -4, yMax: 10 }}
      functions={[{ fn: (x) => x * x - 2 * x - 3, label: "x² − 2x − 3" }]}
      points={[
        { x: -1, y: 0, label: "root" },
        { x: 3, y: 0, label: "root" },
        { x: 1, y: -4, label: "vertex", color: "warn" },
      ]}
    />
  )
}

export function Graph2DExpression() {
  const [expr, setExpr] = useState("sin(x) / x")
  const result = useMemo(() => {
    try {
      return { fn: compileFn(expr), error: "" }
    } catch (e) {
      return { fn: null, error: (e as Error).message }
    }
  }, [expr])
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <input value={expr} onChange={(e) => setExpr(e.target.value)} placeholder="f(x) = ..." style={{ padding: 6, fontFamily: "monospace" }} />
      {result.error && <small style={{ color: "crimson" }}>{result.error}</small>}
      <Graph2D functions={result.fn ? [{ fn: result.fn, label: `f(x) = ${expr}` }] : []} />
    </div>
  )
}

export function Graph2DStatic() {
  return <Graph2D interactive={false} grid={false} aspect={2} viewport={{ xMin: 0, xMax: 6.3, yMin: -1.5, yMax: 1.5 }} functions={[{ fn: Math.sin }]} />
}

export const doc: RichDoc = {
  intro: [
    "An interactive Cartesian plane drawn with SVG. Plot any number of functions and points; drag to pan, scroll to zoom and hover to read values.",
    "Pair it with `compileFn` from `@indoku/science` to plot expressions typed by the user. Discontinuities such as `tan(x)` are split automatically.",
  ],
  importCode: `import { Graph2D } from "@indoku/ui"\nimport { compileFn } from "@indoku/science"`,
  examples: [
    { id: "basic", title: "Basic usage", description: "Functions are plain JavaScript callbacks.", fn: "Graph2DBasic" },
    { id: "points", title: "Points and viewport", description: "Label key points and choose the initial area.", fn: "Graph2DPoints" },
    { id: "expression", title: "Expression input", description: "compileFn parses text without eval.", fn: "Graph2DExpression" },
    { id: "static", title: "Static", description: "Turn off interaction and grid for a figure.", fn: "Graph2DStatic" },
  ],
  a11y: ["Provide the same data as a table or equation in text for screen readers."],
  notes: ["`CartesianCanvas` is an alias of `Graph2D`."],
  seeAlso: ["plot-2d", "chart", "math"],
}
