import { Chart } from "@indoku/ui"
import type { RichDoc } from "../types"

export function ChartInstall() {
  const sales = [120, 180, 150, 220, 260, 240]
  return <Chart.LineChart categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]} series={[{ name: "Sales", values: sales }]} />
}

export function ChartUseChart() {
  const series = [
    { name: "Revenue", values: [120, 180, 150, 220, 260, 240] },
    { name: "Cost", color: "red", values: [80, 90, 100, 110, 120, 130] },
  ]
  const chart = Chart.useChart({ series, format: (v) => `$${v}k` })
  return (
    <div>
      <Chart.LineChart categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]} series={series} highlight={chart.active} yTickFormat={chart.format} />
      <Chart.ChartLegend items={series.map((s, i) => ({ name: s.name, color: chart.colors[i] }))} chart={chart} />
    </div>
  )
}

export function ChartSorted() {
  const data = [
    { name: "Organic", value: 45 },
    { name: "Direct", value: 25 },
    { name: "Referral", value: 18 },
    { name: "Social", value: 12 },
  ]
  const sorted = Chart.sortChartData(data, (d) => d.value, "desc")
  return <Chart.BarChart categories={sorted.map((d) => d.name)} series={[{ name: "Visits", values: sorted.map((d) => d.value) }]} yTickFormat={Chart.compactFormat} />
}

export function BarGrouped() {
  return (
    <Chart.BarChart
      legend
      categories={["Q1", "Q2", "Q3", "Q4"]}
      series={[
        { name: "2025", values: [40, 65, 52, 90] },
        { name: "2026", values: [55, 70, 80, 110] },
      ]}
    />
  )
}

export function BarStacked() {
  return (
    <Chart.BarChart
      mode="stacked"
      legend
      categories={["Mon", "Tue", "Wed", "Thu", "Fri"]}
      series={[
        { name: "Web", values: [30, 40, 35, 50, 45] },
        { name: "iOS", values: [20, 25, 30, 22, 28] },
        { name: "Android", values: [15, 18, 20, 25, 30] },
      ]}
    />
  )
}

export function BarPercent() {
  return (
    <Chart.BarChart
      mode="percent"
      legend
      categories={["A", "B", "C", "D"]}
      series={[
        { name: "Passed", values: [60, 45, 80, 70] },
        { name: "Failed", values: [40, 55, 20, 30] },
      ]}
    />
  )
}

export function BarSegmentDemo() {
  return (
    <Chart.BarSegment
      data={[
        { name: "Design", value: 420 },
        { name: "Engineering", value: 860 },
        { name: "Marketing", value: 310 },
      ]}
    />
  )
}

export function HistogramDemo() {
  const values = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 7, 8, 8, 9]
  return <Chart.Histogram values={values} bins={5} />
}

export function RangeBarDemo() {
  return (
    <Chart.RangeBarChart
      data={[
        { label: "Mon", min: 18, max: 27 },
        { label: "Tue", min: 20, max: 30 },
        { label: "Wed", min: 17, max: 25 },
        { label: "Thu", min: 21, max: 33 },
      ]}
    />
  )
}

export function CandlestickDemo() {
  return (
    <Chart.CandlestickChart
      data={[
        { label: "1", open: 100, high: 112, low: 96, close: 108 },
        { label: "2", open: 108, high: 115, low: 104, close: 106 },
        { label: "3", open: 106, high: 110, low: 98, close: 101 },
        { label: "4", open: 101, high: 120, low: 99, close: 118 },
        { label: "5", open: 118, high: 124, low: 112, close: 114 },
      ]}
    />
  )
}

export function LineDashed() {
  return (
    <Chart.LineChart
      legend
      categories={["Jan", "Feb", "Mar", "Apr", "May"]}
      series={[
        { name: "Actual", values: [10, 25, 18, 32, 40] },
        { name: "Forecast", color: "orange", dashed: true, values: [12, 22, 24, 30, 38] },
      ]}
    />
  )
}

export function LineGradient() {
  return <Chart.LineChart area gradient showDots categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]} series={[{ name: "Users", values: [30, 45, 38, 62, 70, 91] }]} />
}

export function LineBiaxial() {
  return (
    <Chart.LineChart
      legend
      categories={["Jan", "Feb", "Mar", "Apr", "May"]}
      rightTickFormat={(v) => `${v}%`}
      series={[
        { name: "Revenue", values: [120, 150, 170, 160, 210] },
        { name: "Conversion", color: "green", axis: "right", values: [2.1, 2.4, 3.0, 2.8, 3.6] },
      ]}
    />
  )
}

export function LineConnectNulls() {
  return <Chart.LineChart connectNulls seriesLabels categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]} series={[{ name: "Signups", values: [10, 20, null, 35, null, 50] }]} />
}

export function AreaGradient() {
  return <Chart.AreaChart categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]} series={[{ name: "Traffic", values: [20, 35, 30, 50, 65, 60] }]} />
}

export function AreaPercent() {
  return (
    <Chart.AreaChart
      mode="percent"
      legend
      categories={["Jan", "Feb", "Mar", "Apr", "May"]}
      series={[
        { name: "Free", values: [50, 45, 40, 35, 30] },
        { name: "Pro", values: [30, 35, 40, 45, 50] },
        { name: "Team", values: [20, 20, 20, 20, 20] },
      ]}
    />
  )
}

export function AreaReference() {
  return (
    <Chart.AreaChart
      showDots
      referenceArea={{ from: 2, to: 3, label: "Promo" }}
      categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
      series={[{ name: "Orders", values: [12, 18, 40, 52, 30, 28] }]}
    />
  )
}

export function PieDemo() {
  return (
    <Chart.PieChart
      legend
      padAngle={2}
      detached={[0]}
      data={[
        { name: "Organic", value: 45 },
        { name: "Direct", value: 25 },
        { name: "Referral", value: 18 },
        { name: "Social", value: 12 },
      ]}
    />
  )
}

export function DonutDemo() {
  return (
    <Chart.DonutChart
      legend
      radialText={{ label: "100", sublabel: "visits" }}
      data={[
        { name: "Organic", value: 45 },
        { name: "Direct", value: 25 },
        { name: "Referral", value: 18 },
        { name: "Social", value: 12 },
      ]}
    />
  )
}

export function RadarDemo() {
  return (
    <Chart.RadarChart
      legend
      grid="filled"
      axes={["Speed", "Power", "Range", "Armor", "Stealth"]}
      series={[
        { name: "Alpha", values: [8, 6, 7, 5, 9] },
        { name: "Beta", color: "orange", values: [5, 9, 6, 8, 4] },
      ]}
    />
  )
}

export function RadarCircle() {
  return <Chart.RadarChart grid="circle" axes={["HTML", "CSS", "JS", "TS", "Node"]} series={[{ name: "Skills", values: [9, 8, 9, 7, 6] }]} />
}

export function ScatterDemo() {
  return (
    <Chart.ScatterChart
      trendLine
      legend
      series={[
        { name: "Group A", points: [{ x: 1, y: 2 }, { x: 2, y: 3.5 }, { x: 3, y: 3 }, { x: 4, y: 5.2 }, { x: 5, y: 6 }] },
        { name: "Group B", color: "orange", points: [{ x: 1, y: 5 }, { x: 2, y: 4.2 }, { x: 3, y: 3.8 }, { x: 4, y: 2.5 }, { x: 5, y: 2 }] },
      ]}
    />
  )
}

export function ScatterConnected() {
  return <Chart.ScatterChart connect dotSize={5} series={[{ name: "Path", points: [{ x: 0, y: 0 }, { x: 2, y: 3 }, { x: 4, y: 1 }, { x: 6, y: 5 }, { x: 8, y: 4 }] }]} />
}

export function SparklineDemo() {
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <Chart.Sparkline values={[3, 5, 4, 7, 6, 9, 12]} />
      <Chart.Sparkline values={[12, 10, 11, 8, 7, 5, 4]} color="trend" area />
      <Chart.Sparkline values={[4, 8, 6, 10, 9, 14]} interactive width={160} height={40} />
    </div>
  )
}

export function GridAxisDemo() {
  return (
    <Chart.LineChart
      showGrid
      categories={["Mon", "Tue", "Wed", "Thu", "Fri"]}
      xTickFormat={(label) => label.slice(0, 1)}
      yTickFormat={(v) => `${v} ms`}
      referenceLines={[{ value: 60, label: "SLA", color: "red.500", dashed: true }]}
      series={[{ name: "Latency", values: [42, 55, 48, 63, 51] }]}
    />
  )
}

export const doc: RichDoc = {
  intro: [
    "Pure SVG charts with no extra dependency. Every chart reads colors from the theme tokens, so light and dark mode work out of the box.",
    "The family: `LineChart`, `AreaChart`, `BarChart`, `BarSegment`, `Histogram`, `RangeBarChart`, `CandlestickChart`, `PieChart`, `DonutChart`, `RadarChart`, `ScatterChart` and `Sparkline`. Shared pieces are `useChart`, `ChartLegend`, `CartesianGrid` and `ChartAxis`.",
  ],
  importCode: `import { Chart } from "@indoku/ui"\n\n// <Chart.LineChart />, <Chart.BarChart />, Chart.useChart(), ...`,
  anatomy: `Chart.LineChart | AreaChart | BarChart | ...\n  CartesianGrid (grid lines)\n  ChartAxis (bottom / left / right)\n  ChartLegend (interactive, driven by useChart)`,
  examples: [
    { id: "installation", title: "Installation", description: "Charts ship inside @indoku/ui. Only React and Emotion are required.", fn: "ChartInstall" },
    { id: "use-chart", title: "useChart", description: "Shared tokens, number formatting and legend highlight.", fn: "ChartUseChart" },
    { id: "sorting", title: "Sorting", description: "sortChartData and compactFormat helpers.", fn: "ChartSorted" },
    { id: "bar-grouped", title: "Bar: grouped", fn: "BarGrouped" },
    { id: "bar-stacked", title: "Bar: stacked", fn: "BarStacked" },
    { id: "bar-percent", title: "Bar: percent", fn: "BarPercent" },
    { id: "bar-segment", title: "Bar segment", description: "One segmented bar for composition.", fn: "BarSegmentDemo" },
    { id: "histogram", title: "Histogram", fn: "HistogramDemo" },
    { id: "range-bar", title: "Range bar", fn: "RangeBarDemo" },
    { id: "candlestick", title: "Candlestick", fn: "CandlestickDemo" },
    { id: "line-dashed", title: "Line: dashed series", fn: "LineDashed" },
    { id: "line-gradient", title: "Line: gradient area", fn: "LineGradient" },
    { id: "line-biaxial", title: "Line: biaxial", description: "Per-series `axis` with `rightTickFormat`.", fn: "LineBiaxial" },
    { id: "line-nulls", title: "Line: connect nulls + series labels", fn: "LineConnectNulls" },
    { id: "area-gradient", title: "Area: gradient fill", fn: "AreaGradient" },
    { id: "area-percent", title: "Area: percent", fn: "AreaPercent" },
    { id: "area-reference", title: "Area: reference area and dots", fn: "AreaReference" },
    { id: "pie", title: "Pie: padding and detached segment", fn: "PieDemo" },
    { id: "donut", title: "Donut: radial text", fn: "DonutDemo" },
    { id: "radar-filled", title: "Radar: filled grid", fn: "RadarDemo" },
    { id: "radar-circle", title: "Radar: circle grid", fn: "RadarCircle" },
    { id: "scatter", title: "Scatter: groups and trend lines", fn: "ScatterDemo" },
    { id: "scatter-connected", title: "Scatter: connected dots", fn: "ScatterConnected" },
    { id: "sparkline", title: "Sparkline", description: "Plain, trend-colored with area, and interactive tooltip.", fn: "SparklineDemo" },
    { id: "grid-axis", title: "Grid, axis and reference lines", fn: "GridAxisDemo" },
  ],
  a11y: ["Charts are decorative SVG; pair them with a table or text summary for screen readers.", "Legend items are focusable and highlight their series on focus."],
  notes: ["`null` values create gaps unless `connectNulls` is set.", "Series colors accept a palette name (`blue`) or a full token (`blue.500`)."],
  seeAlso: ["plot-2d", "data-table"],
}
