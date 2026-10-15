import { Box, ScatterChart } from "@indoku/ui"
import type { RichDoc } from "../types"

const r = (name: string, type: string, description: string, def?: string) => ({ name, type, required: false, default: def, description })
const pts = (n: number, a: number, b: number, seed: number) =>
  Array.from({ length: n }, (_, i) => {
    const x = 1 + (i * 9) / n
    return { x: +x.toFixed(2), y: +(a * x + b + 3 * Math.sin(i * seed)).toFixed(2) }
  })
const groupA = pts(18, 2, 4, 1.3)
const groupB = pts(18, 1, 14, 2.1)

export function ScatterBasic() {
  return <Box maxW="2xl"><ScatterChart series={[{ name: "Group A", points: groupA }]} /></Box>
}
export function ScatterGrouped() {
  return <Box maxW="2xl"><ScatterChart series={[{ name: "Group A", points: groupA }, { name: "Group B", points: groupB }]} legend /></Box>
}
export function ScatterTrend() {
  return <Box maxW="2xl"><ScatterChart series={[{ name: "Group A", points: groupA }, { name: "Group B", points: groupB }]} trendLine legend /></Box>
}
export function ScatterConnected() {
  return <Box maxW="2xl"><ScatterChart series={[{ name: "Path", points: groupA.slice(0, 10) }]} connect /></Box>
}

export const doc: RichDoc = {
  intro: ["Relationships between two numeric variables."],
  importCode: `import { ScatterChart } from "@indoku/ui"`,
  examples: [
    { id: "basic", title: "Basic", fn: "ScatterBasic", helpers: ["pts", "groupA"] },
    { id: "grouped", title: "Grouped data", description: "One series per group.", fn: "ScatterGrouped", helpers: ["pts", "groupA", "groupB"] },
    { id: "trend", title: "Trend lines", description: "`trendLine` fits a least-squares line per group.", fn: "ScatterTrend", helpers: ["pts", "groupA", "groupB"] },
    { id: "connect", title: "Dot connectors", description: "`connect` joins the points in order.", fn: "ScatterConnected", helpers: ["pts", "groupA"] },
  ],
  props: [
    { part: "ScatterChart", rows: [
      r("series", "ScatterSeries[]", "Groups of { x, y } points."),
      r("trendLine", "boolean", "Linear regression per group.", "false"),
      r("connect", "boolean", "Line through points in order.", "false"),
      r("dotSize", "number", "Dot radius.", "4")
    ] },
  ],
  seeAlso: ["line-chart"],
}
