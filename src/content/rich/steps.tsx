import { Box, Button, HStack, Steps } from "@indoku/ui"
import { LuCheck } from "react-icons/lu"
import type { RichDoc } from "../types"

const items = [
  { title: "Account", description: "Create your login" },
  { title: "Profile", description: "Tell us about you" },
  { title: "Done", description: "Review and finish" },
]

export function StepsHorizontal() {
  return (
    <Steps.Root defaultStep={1} count={items.length}>
      <Steps.List>
        {items.map((s, i) => (
          <Steps.Item key={s.title} index={i}>
            <Steps.Indicator>
              <Steps.Status complete={<LuCheck />} incomplete={<Steps.Number />} current={<Steps.Number />} />
            </Steps.Indicator>
            <Steps.Title>{s.title}</Steps.Title>
            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>
    </Steps.Root>
  )
}

export function StepsVertical() {
  return (
    <Steps.Root orientation="vertical" defaultStep={1} count={items.length} height="260px">
      <Steps.List>
        {items.map((s, i) => (
          <Steps.Item key={s.title} index={i}>
            <Steps.Indicator>
              <Steps.Status complete={<LuCheck />} incomplete={<Steps.Number />} current={<Steps.Number />} />
            </Steps.Indicator>
            <Box flex="1" pb="8">
              <Steps.Title>{s.title}</Steps.Title>
              <Steps.Description>{s.description}</Steps.Description>
            </Box>
            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>
    </Steps.Root>
  )
}

export function StepsControlled() {
  return (
    <Steps.Root defaultStep={0} count={items.length}>
      <Steps.List>
        {items.map((s, i) => (
          <Steps.Item key={s.title} index={i}>
            <Steps.Indicator>
              <Steps.Status complete={<LuCheck />} incomplete={<Steps.Number />} current={<Steps.Number />} />
            </Steps.Indicator>
            <Steps.Title>{s.title}</Steps.Title>
            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>
      {items.map((s, i) => (
        <Steps.Content key={s.title} index={i}>
          {s.description}
        </Steps.Content>
      ))}
      <Steps.CompletedContent>All steps are complete.</Steps.CompletedContent>
      <HStack mt="4">
        <Steps.PrevTrigger asChild>
          <Button>Prev</Button>
        </Steps.PrevTrigger>
        <Steps.NextTrigger asChild>
          <Button>Next</Button>
        </Steps.NextTrigger>
      </HStack>
    </Steps.Root>
  )
}

export const doc: RichDoc = {
  intro: [
    "A step indicator for multi-stage flows. It runs sideways by default; set `orientation=\"vertical\"` to stack the steps top to bottom.",
    "In the vertical layout, put the title and description in a `Box` with `flex=\"1\"` and bottom padding, so the separator stretches to the next step.",
  ],
  importCode: `import { Steps } from "@indoku/ui"`,
  examples: [
    { id: "horizontal", title: "Horizontal", fn: "StepsHorizontal" },
    { id: "vertical", title: "Vertical", description: "`orientation=\"vertical\"` with a fixed height.", fn: "StepsVertical" },
    { id: "controlled", title: "Content and triggers", description: "`Steps.Content`, `PrevTrigger` and `NextTrigger`.", fn: "StepsControlled" },
  ],
  props: [
    {
      part: "Steps.Root",
      rows: [
        { name: "count", type: "number", required: true, description: "Total number of steps." },
        { name: "step / defaultStep", type: "number", required: false, description: "Controlled or initial current step (0-based)." },
        { name: "onStepChange", type: "(details: { step: number }) => void", required: false, description: "Called when the step changes." },
        { name: "orientation", type: "'horizontal' | 'vertical'", required: false, default: "'horizontal'", description: "Layout direction." },
        { name: "linear", type: "boolean", required: false, default: "false", description: "Block jumping ahead of the current step." },
      ],
    },
  ],
  seeAlso: ["tabs"],
}
