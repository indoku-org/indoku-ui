import { Box, AreaChart } from "@indoku/ui"
import type { RichDoc } from "../types"

const r = (name: string, type: string, description: string, def?: string) => ({ name, type, required: false, default: def, description })
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
const revenue = [120, 180, 150, 240, 210, 300]
const costs = [80, 110, 100, 150, 140, 170]
const stacked = [
  { name: "Web", values: [40, 55, 50, 80, 70, 110] },
  { name: "Mobile", values: [30, 45, 40, 70, 65, 90] },
  { name: "API", values: [20, 30, 25, 50, 45, 70] },
]

export function AreaGradient() {
  return <Box maxW="2xl"><AreaChart series={[{ name: "Revenue", values: revenue }]} categories={months} /></Box>
}
export function AreaStacked() {
  return <Box maxW="2xl"><AreaChart series={stacked} categories={months} mode="stacked" legend /></Box>
}
export function AreaPercent() {
  return <Box maxW="2xl"><AreaChart series={stacked} categories={months} mode="percent" legend /></Box>
}
export function AreaReference() {
  return <Box maxW="2xl"><AreaChart series={[{ name: "Revenue", values: revenue }]} categories={months} referenceArea={{ from: 2, to: 4, label: "Campaign" }} /></Box>
}
export function AreaDots() {
  return <Box maxW="2xl"><AreaChart series={[{ name: "Revenue", values: revenue }]} categories={months} showDots gradient={false} /></Box>
}

export const doc: RichDoc = {
  intro: ["Filled series over time: overlapping, stacked or normalized to 100%."],
  importCode: `import { AreaChart } from "@indoku/ui"`,
  examples: [
    { id: "gradient", title: "Gradient fill", fn: "AreaGradient", helpers: ["months", "revenue"] },
    { id: "stacked", title: "Stacked", description: "`mode=stacked` adds series on top of each other.", fn: "AreaStacked", helpers: ["months", "stacked"] },
    { id: "percent", title: "Percent", description: "`mode=percent` shows each share of the total.", fn: "AreaPercent", helpers: ["months", "stacked"] },
    { id: "reference", title: "Reference area", description: "Shade a range of categories.", fn: "AreaReference", helpers: ["months", "revenue"] },
    { id: "dots", title: "Dot markers", description: "`showDots` marks every point.", fn: "AreaDots", helpers: ["months", "revenue"] },
  ],
  props: [
    { part: "AreaChart", rows: [
      r("mode", "'overlap' | 'stacked' | 'percent'", "How series combine.", "'overlap'"),
      r("gradient", "boolean", "Gradient or flat fill.", "true"),
      r("showDots", "boolean", "Circle on every point.", "false"),
      r("referenceArea", "{ from: number; to: number; label?: string }", "Shaded span between two category indexes.")
    ] },
  ],
  seeAlso: ["line-chart", "bar-chart"],
}
