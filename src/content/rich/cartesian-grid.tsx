import { Box, LineChart, BarChart } from "@indoku/ui"
import type { RichDoc } from "../types"

const r = (name: string, type: string, description: string, def?: string) => ({ name, type, required: false, default: def, description })
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
const revenue = [120, 180, 150, 240, 210, 300]
const costs = [80, 110, 100, 150, 140, 170]
const usd = (v: number) => `$${v}k`

export function GridFormat() {
  return <Box maxW="2xl"><LineChart series={[{ name: "Revenue", values: revenue }]} categories={months} yTickFormat={usd} xTickFormat={(m) => m.toUpperCase()} /></Box>
}
export function GridAxes() {
  return <Box maxW="2xl"><LineChart series={[{ name: "Revenue ($k)", values: revenue }, { name: "Margin (%)", values: [30, 38, 33, 41, 36, 44], axis: "right" }]} categories={months} legend rightTickFormat={(v) => v + "%"} /></Box>
}
export function GridReference() {
  return <Box maxW="2xl"><BarChart series={[{ name: "Revenue", values: revenue }]} categories={months} referenceLines={[{ value: 200, label: "Target" }, { value: 150, label: "Break-even", color: "orange", dashed: false }]} /></Box>
}
export function GridNone() {
  return <Box maxW="2xl"><LineChart series={[{ name: "Revenue", values: revenue }]} categories={months} showGrid={false} showAxes={false} height={120} /></Box>
}

export const doc: RichDoc = {
  intro: ["Axes, grid and reference lines are props of every cartesian chart. `CartesianGrid` and `ChartAxis` are exported for custom SVG."],
  importCode: `import { CartesianGrid, ChartAxis } from "@indoku/ui"`,
  examples: [
    { id: "format", title: "Custom tick formatting", description: "`yTickFormat` and `xTickFormat`.", fn: "GridFormat", helpers: ["months", "revenue", "usd"] },
    { id: "axes", title: "Multiple axes", description: "A right axis for series with `axis: right`.", fn: "GridAxes", helpers: ["months", "revenue"] },
    { id: "reference", title: "Reference lines", description: "Horizontal guides with labels.", fn: "GridReference", helpers: ["months", "revenue"] },
    { id: "none", title: "No grid or axes", fn: "GridNone", helpers: ["months", "revenue"] },
  ],
  props: [
    { part: "Shared props", rows: [
      r("showGrid / showAxes", "boolean", "Toggle grid lines and axes.", "true"),
      r("referenceLines", "{ value; label?; color?; axis?; dashed? }[]", "Guides."),
      r("yTickFormat / rightTickFormat", "(v: number) => string", "Y tick labels."),
      r("xTickFormat", "(label: string, i: number) => string", "X tick labels.")
    ] },
  ],
  seeAlso: ["line-chart"],
}
