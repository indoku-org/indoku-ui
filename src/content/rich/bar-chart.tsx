import { Box, BarChart, BarSegment, CandlestickChart, Histogram, RangeBarChart } from "@indoku/ui"
import type { RichDoc } from "../types"

const r = (name: string, type: string, description: string, def?: string) => ({ name, type, required: false, default: def, description })
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
const revenue = [120, 180, 150, 240, 210, 300]
const costs = [80, 110, 100, 150, 140, 170]
const series = [
  { name: "Revenue", values: revenue },
  { name: "Costs", values: costs },
]
const stacked = [
  { name: "Web", values: [40, 55, 50, 80, 70, 110] },
  { name: "Mobile", values: [30, 45, 40, 70, 65, 90] },
  { name: "API", values: [20, 30, 25, 50, 45, 70] },
]

export function BarGrouped() {
  return <Box maxW="2xl"><BarChart series={series} categories={months} legend /></Box>
}
export function BarStacked() {
  return <Box maxW="2xl"><BarChart series={stacked} categories={months} mode="stacked" legend /></Box>
}
export function BarPercent() {
  return <Box maxW="2xl"><BarChart series={stacked} categories={months} mode="percent" legend /></Box>
}
export function BarRange() {
  const data = months.map((label, i) => ({ label, min: costs[i] / 2, max: revenue[i] / 2 + 40 }))
  return <Box maxW="2xl"><RangeBarChart data={data} /></Box>
}
export function BarHistogram() {
  const values = Array.from({ length: 120 }, (_, i) => 50 + 18 * Math.sin(i * 1.7) + 12 * Math.cos(i * 0.9) + (i % 7))
  return <Box maxW="2xl"><Histogram values={values} bins={10} name="Orders" /></Box>
}
export function BarCandlestick() {
  const data = [
    { label: "Mon", open: 100, high: 112, low: 96, close: 108 },
    { label: "Tue", open: 108, high: 115, low: 101, close: 103 },
    { label: "Wed", open: 103, high: 110, low: 99, close: 109 },
    { label: "Thu", open: 109, high: 121, low: 107, close: 118 },
    { label: "Fri", open: 118, high: 124, low: 110, close: 112 },
  ]
  return <Box maxW="2xl"><CandlestickChart data={data} /></Box>
}
export function BarSegmentDemo() {
  return (
    <Box maxW="lg">
      <BarSegment data={[{ name: "Stocks", value: 5200 }, { name: "Bonds", value: 2400 }, { name: "Cash", value: 1100 }, { name: "Other", value: 600 }]} />
    </Box>
  )
}

export const doc: RichDoc = {
  intro: ["Grouped, stacked and percent bars, plus range, histogram, candlestick and single-bar segments."],
  importCode: `import { BarChart, BarSegment, CandlestickChart, Histogram, RangeBarChart } from "@indoku/ui"`,
  examples: [
    { id: "grouped", title: "Grouped", fn: "BarGrouped", helpers: ["months", "revenue", "costs", "series"] },
    { id: "stacked", title: "Stacked", fn: "BarStacked", helpers: ["months", "stacked"] },
    { id: "percent", title: "Percent", description: "Each bar is normalized to 100%.", fn: "BarPercent", helpers: ["months", "stacked"] },
    { id: "range", title: "Range", description: "Floating bars from `min` to `max`.", fn: "BarRange", helpers: ["months", "revenue", "costs"] },
    { id: "histogram", title: "Histogram", description: "Raw values are binned for you.", fn: "BarHistogram" },
    { id: "candlestick", title: "Candlestick", description: "OHLC data; green when close is at or above open.", fn: "BarCandlestick" },
    { id: "segment", title: "Bar segment", description: "One horizontal bar split by share, with a legend.", fn: "BarSegmentDemo" },
  ],
  props: [
    { part: "BarChart", rows: [
      r("mode", "'grouped' | 'stacked' | 'percent'", "How series combine.", "'grouped'"),
      r("gap", "number", "Gap between groups, 0-1.", "0.3"),
      r("joined", "boolean", "No gap (histogram look).", "false")
    ] },
    { part: "Other bar charts", rows: [
      r("data", "RangeDatum[] | CandleDatum[] | BarSegmentDatum[]", "Data for RangeBarChart, CandlestickChart and BarSegment."),
      r("values / bins", "number[] / number", "Histogram input.")
    ] },
  ],
  seeAlso: ["line-chart", "pie-chart"],
}
