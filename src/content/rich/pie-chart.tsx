import { DonutChart, PieChart } from "@indoku/ui"
import type { RichDoc } from "../types"

const r = (name: string, type: string, description: string, def?: string) => ({ name, type, required: false, default: def, description })
const data = [
  { name: "Chrome", value: 540 },
  { name: "Safari", value: 260 },
  { name: "Firefox", value: 110 },
  { name: "Edge", value: 90 },
]

export function PieBasic() {
  return <PieChart data={data} legend />
}
export function DonutBasic() {
  return <DonutChart data={data} legend />
}
export function PiePadAngle() {
  return <DonutChart data={data} padAngle={6} innerRadiusRatio={0.5} />
}
export function DonutRadialText() {
  return <DonutChart data={data} radialText={{ label: "1,000", sublabel: "visits" }} legend />
}
export function PieDetached() {
  return <PieChart data={data} detached={[0]} legend />
}

export const doc: RichDoc = {
  intro: ["Pie and donut charts with angle padding, center text and detached slices."],
  importCode: `import { DonutChart, PieChart } from "@indoku/ui"`,
  examples: [
    { id: "pie", title: "Pie", fn: "PieBasic", helpers: ["data"] },
    { id: "donut", title: "Donut", fn: "DonutBasic", helpers: ["data"] },
    { id: "pad", title: "Angle padding", description: "`padAngle` leaves a gap between slices.", fn: "PiePadAngle", helpers: ["data"] },
    { id: "radial", title: "Radial text", description: "`radialText` prints a label in the hole.", fn: "DonutRadialText", helpers: ["data"] },
    { id: "detached", title: "Detached segments", description: "Push slices out with `detached`.", fn: "PieDetached", helpers: ["data"] },
  ],
  props: [
    { part: "PieChart / DonutChart", rows: [
      r("data", "PieDatum[]", "Slices: name, value, color?"),
      r("innerRadiusRatio", "number", "0 = pie; DonutChart defaults to 0.6."),
      r("padAngle", "number", "Degrees between slices.", "0"),
      r("detached", "number[]", "Slice indexes pushed outwards."),
      r("radialText", "{ label: string; sublabel?: string }", "Text in the center.")
    ] },
  ],
  seeAlso: ["bar-chart"],
}
