import { Badge, Box, HStack, Sparkline, Stack, Text } from "@indoku/ui"
import type { RichDoc } from "../types"

const r = (name: string, type: string, description: string, def?: string) => ({ name, type, required: false, default: def, description })
const up = [10, 12, 11, 15, 14, 18, 17, 21]
const down = [21, 19, 20, 16, 17, 13, 12, 9]
const stocks = [
  { name: "AAPL", price: "$231.4", values: [10, 12, 11, 15, 14, 18, 17, 21] },
  { name: "TSLA", price: "$412.9", values: [21, 19, 20, 16, 17, 13, 12, 9] },
  { name: "NVDA", price: "$188.2", values: [8, 9, 12, 11, 15, 14, 19, 22] },
]

export function SparkBasic() {
  return <Sparkline values={up} />
}
export function SparkArea() {
  return <Sparkline values={up} area width={200} height={48} />
}
export function SparkTrend() {
  return (
    <HStack gap="6">
      <Sparkline values={up} color="trend" />
      <Sparkline values={down} color="trend" />
    </HStack>
  )
}
export function SparkInteractive() {
  return <Sparkline values={[4, 7, 5, 9, 12, 8, 14, 11, 16]} width={260} height={64} interactive area />
}
export function SparkStocks() {
  return (
    <Stack maxW="sm" gap="3">
      {stocks.map((s) => {
        const change = ((s.values[s.values.length - 1] - s.values[0]) / s.values[0]) * 100
        return (
          <HStack key={s.name} justify="space-between">
            <Box>
              <Text fontWeight="medium">{s.name}</Text>
              <Text fontSize="sm" color="fg.muted">{s.price}</Text>
            </Box>
            <Sparkline values={s.values} color="trend" />
            <Badge colorPalette={change >= 0 ? "green" : "red"}>{change >= 0 ? "+" : ""}{change.toFixed(1)}%</Badge>
          </HStack>
        )
      })}
    </Stack>
  )
}

export const doc: RichDoc = {
  intro: ["Tiny inline charts for tables, cards and lists."],
  importCode: `import { Sparkline } from "@indoku/ui"`,
  examples: [
    { id: "basic", title: "Basic", fn: "SparkBasic", helpers: ["up"] },
    { id: "area", title: "Area", fn: "SparkArea", helpers: ["up"] },
    { id: "trend", title: "Trend color", description: "`color=trend` is green when the series ends higher, red when lower.", fn: "SparkTrend", helpers: ["up", "down"] },
    { id: "interactive", title: "Interaction tooltip", description: "Hover to read a value.", fn: "SparkInteractive" },
    { id: "stocks", title: "Stock composition", description: "Sparklines inside a watchlist.", fn: "SparkStocks", helpers: ["stocks"] },
  ],
  props: [
    { part: "Sparkline", rows: [
      r("values", "number[]", "Data points."),
      r("color", "string", "Color token, or trend.", "'blue'"),
      r("area", "boolean", "Fill under the line.", "false"),
      r("interactive", "boolean", "Show the hovered value.", "false"),
      r("width / height", "number", "Size in px.", "120 / 32")
    ] },
  ],
  seeAlso: ["line-chart"],
}
