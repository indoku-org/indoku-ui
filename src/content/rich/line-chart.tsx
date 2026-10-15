import { Box, LineChart } from "@indoku/ui"
import type { RichDoc } from "../types"

const r = (name: string, type: string, description: string, def?: string) => ({ name, type, required: false, default: def, description })
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
const revenue = [120, 180, 150, 240, 210, 300]
const costs = [80, 110, 100, 150, 140, 170]
const series = [
  { name: "Revenue", values: revenue },
  { name: "Costs", values: costs },
]

export function LineBasic() {
  return <Box maxW="2xl"><LineChart series={series} categories={months} legend /></Box>
}
export function LineDashed() {
  return <Box maxW="2xl"><LineChart series={[{ name: "Revenue", values: revenue }, { name: "Forecast", values: [null, null, null, 240, 260, 320], dashed: true }]} categories={months} legend /></Box>
}
export function LineGradient() {
  return <Box maxW="2xl"><LineChart series={[{ name: "Revenue", values: revenue }]} categories={months} gradient /></Box>
}
export function LineBiaxial() {
  return <Box maxW="2xl"><LineChart series={[{ name: "Revenue ($k)", values: revenue }, { name: "Users (k)", values: [1.2, 1.8, 1.5, 2.4, 2.1, 3], axis: "right" }]} categories={months} legend /></Box>
}
export function LineConnectNulls() {
  const gap = [120, 180, null, null, 210, 300]
  return (
    <Box display="grid" gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="4" maxW="3xl">
      <LineChart series={[{ name: "Gap", values: gap }]} categories={months} />
      <LineChart series={[{ name: "Connected", values: gap }]} categories={months} connectNulls />
    </Box>
  )
}
export function LineSeriesLabels() {
  return <Box maxW="2xl"><LineChart series={series} categories={months} seriesLabels showDots={false} /></Box>
}

export const doc: RichDoc = {
  intro: ["Line charts with one or more series. Every example is live."],
  importCode: `import { LineChart } from "@indoku/ui"`,
  examples: [
    { id: "basic", title: "Basic", description: "Hover a legend item to highlight its series.", fn: "LineBasic", helpers: ["months", "revenue", "costs", "series"] },
    { id: "dashed", title: "Dashed", description: "Set `dashed` per series, or on the whole chart.", fn: "LineDashed", helpers: ["months", "revenue"] },
    { id: "gradient", title: "Gradient", description: "`gradient` fades the area under the line.", fn: "LineGradient", helpers: ["months", "revenue"] },
    { id: "biaxial", title: "Biaxial", description: "Give a series `axis: right` for a second y axis.", fn: "LineBiaxial", helpers: ["months", "revenue"] },
    { id: "nulls", title: "Connect nulls", description: "`null` leaves a gap unless `connectNulls` is set.", fn: "LineConnectNulls", helpers: ["months"] },
    { id: "labels", title: "Series labels", description: "`seriesLabels` prints the name at the end of each line.", fn: "LineSeriesLabels", helpers: ["months", "revenue", "costs", "series"] },
  ],
  props: [
    { part: "LineChart", rows: [
      r("series", "ChartSeries[]", "Data. Values accept null; axis and dashed are per series."),
      r("categories", "string[]", "X labels."),
      r("gradient / area", "boolean", "Fill under the line.", "false"),
      r("dashed", "boolean", "Dash every line.", "false"),
      r("connectNulls", "boolean", "Join across null values.", "false"),
      r("seriesLabels", "boolean", "Name at the end of each line.", "false"),
      r("legend", "boolean", "Interactive legend.", "false"),
      r("referenceLines", "ReferenceLineSpec[]", "Horizontal guides.")
    ] },
  ],
  seeAlso: ["chart", "area-chart"],
}
