import { RadarChart } from "@indoku/ui"
import type { RichDoc } from "../types"

const r = (name: string, type: string, description: string, def?: string) => ({ name, type, required: false, default: def, description })
const axes = ["Speed", "Power", "Range", "Defense", "Magic", "Luck"]
const series = [
  { name: "Knight", values: [60, 90, 30, 85, 10, 50] },
  { name: "Mage", values: [40, 30, 70, 25, 95, 60] },
]

export function RadarPolygon() {
  return <RadarChart axes={axes} series={series} legend />
}
export function RadarCircle() {
  return <RadarChart axes={axes} series={series} grid="circle" legend />
}
export function RadarFilled() {
  return <RadarChart axes={axes} series={series} grid="filled" legend />
}
export function RadarNoLabels() {
  return <RadarChart axes={axes} series={[series[0]]} pointLabels={false} size={220} />
}

export const doc: RichDoc = {
  intro: ["Compare several variables on radial axes."],
  importCode: `import { RadarChart } from "@indoku/ui"`,
  examples: [
    { id: "polygon", title: "Polygon grid", fn: "RadarPolygon", helpers: ["axes", "series"] },
    { id: "circle", title: "Circle grid", fn: "RadarCircle", helpers: ["axes", "series"] },
    { id: "filled", title: "Filled grid", description: "Alternating filled rings.", fn: "RadarFilled", helpers: ["axes", "series"] },
    { id: "labels", title: "Without point labels", fn: "RadarNoLabels", helpers: ["axes", "series"] },
  ],
  props: [
    { part: "RadarChart", rows: [
      r("axes", "string[]", "Axis names (3 or more)."),
      r("series", "ChartSeries[]", "One polygon per series."),
      r("grid", "'polygon' | 'circle' | 'filled'", "Grid shape.", "'polygon'"),
      r("pointLabels", "boolean", "Axis labels.", "true"),
      r("levels / max", "number", "Rings and the axis maximum.")
    ] },
  ],
  seeAlso: ["scatter-chart"],
}
