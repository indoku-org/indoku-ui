import { Box, ChartLegend, LineChart, Text, chartTokens, sortChartData, useChart, BarChart } from "@indoku/ui"
import type { RichDoc } from "../types"

const r = (name: string, type: string, description: string, def?: string) => ({ name, type, required: false, default: def, description })
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
const revenue = [120, 180, 150, 240, 210, 300]
const costs = [80, 110, 100, 150, 140, 170]
const series = [
  { name: "Revenue", values: revenue },
  { name: "Costs", values: costs },
]
const sales = [
  { name: "Tea", value: 340 },
  { name: "Coffee", value: 910 },
  { name: "Juice", value: 220 },
  { name: "Soda", value: 580 },
]

export function UseChartLegend() {
  const chart = useChart({ series })
  return (
    <Box maxW="2xl">
      <LineChart series={series} categories={months} highlight={chart.active} />
      <ChartLegend chart={chart} items={series.map((s, i) => ({ name: s.name, color: chart.colors[i] }))} />
    </Box>
  )
}
export function UseChartFormat() {
  const chart = useChart({ format: (v) => `$${v.toFixed(0)}k` })
  return <Text>{chart.format(1234)} and {chart.format(87)}</Text>
}
export function UseChartSorting() {
  const sorted = sortChartData(sales, (d) => d.value, "desc")
  return <Box maxW="2xl"><BarChart series={[{ name: "Sales", values: sorted.map((d) => d.value) }]} categories={sorted.map((d) => d.name)} /></Box>
}
export function UseChartTokens() {
  return <Text fontSize="sm" fontFamily="mono">sizes {JSON.stringify(chartTokens.size)} spacing {JSON.stringify(chartTokens.spacing)}</Text>
}

export const doc: RichDoc = {
  intro: ["Charts are plain SVG themed by IndokuUI, with no extra dependency. Install `@indoku/ui` and import what you need.", "`useChart` shares colors, number formatting and legend highlighting between charts and your own markup."],
  importCode: `import { useChart, ChartLegend, sortChartData, chartTokens } from "@indoku/ui"`,
  examples: [
    { id: "legend", title: "Legend highlighting", description: "Hover a legend item to dim the other series.", fn: "UseChartLegend", helpers: ["months", "revenue", "costs", "series"] },
    { id: "format", title: "Formatting", description: "Pass `format` to change how numbers print.", fn: "UseChartFormat" },
    { id: "sorting", title: "Sorting", description: "`sortChartData` sorts without mutating.", fn: "UseChartSorting", helpers: ["sales"] },
    { id: "tokens", title: "Size and spacing tokens", fn: "UseChartTokens" },
  ],
  props: [
    { part: "useChart(options)", rows: [
      r("series", "{ name?; color? }[]", "Used to resolve colors."),
      r("format", "(v: number) => string", "Number formatter. Default: compact."),
      r("highlight", "number | null", "Force the highlighted series.")
    ] },
    { part: "Returned object", rows: [
      r("colors", "string[]", "Resolved series colors."),
      r("active / setActive", "number | null", "Highlighted series."),
      r("opacity(i)", "number", "1, or 0.2 when dimmed."),
      r("legendProps(i)", "object", "Spread on your own legend item."),
      r("format(v)", "string", "Formatter."),
      r("tokens", "object", "chartTokens: size, spacing, padding.")
    ] },
  ],
  seeAlso: ["chart"],
}
