import { Accordion, Alert, Avatar, Badge, Box, Button, Card, Checkbox, Code, ColorSwatch, Flex, Heading, Input, Kbd, Progress, Skeleton, Stack, Status, Switch, Tabs, Text, Textarea } from "@indoku/ui"
import type { ReactNode } from "react"
import type { VariantGroup } from "../content/types"

type Render = (p: Record<string, unknown>) => ReactNode

/** Tiny live renderers, keyed by theme recipe name. Recipes without one still list their values. */
const live: Record<string, Render> = {
  button: (p) => <Button {...p}>Button</Button>,
  badge: (p) => <Badge {...p}>Badge</Badge>,
  kbd: (p) => <Kbd {...p}>⌘K</Kbd>,
  input: (p) => <Input placeholder="Email" w="36" {...p} />,
  textarea: (p) => <Textarea placeholder="Message" w="36" rows={2} {...p} />,
  avatar: (p) => (
    <Avatar.Root {...p}>
      <Avatar.Fallback name="Indoku Dev" />
    </Avatar.Root>
  ),
  progress: (p) => (
    <Progress.Root w="32" value={60} {...p}>
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  ),
  skeleton: (p) => <Skeleton h="4" w="28" {...p} />,
  status: (p) => (
    <Status.Root {...p}>
      <Status.Indicator />
      Online
    </Status.Root>
  ),
  card: (p) => (
    <Card.Root w="32" size="sm" {...p}>
      <Card.Body>Card</Card.Body>
    </Card.Root>
  ),
  alert: (p) => (
    <Alert.Root w="56" {...p}>
      <Alert.Indicator />
      <Alert.Title>Heads up</Alert.Title>
    </Alert.Root>
  ),
  switch: (p) => (
    <Switch.Root {...p}>
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Label</Switch.Label>
    </Switch.Root>
  ),
  checkbox: (p) => (
    <Checkbox.Root defaultChecked {...p}>
      <Checkbox.HiddenInput />
      <Checkbox.Control />
      <Checkbox.Label>Label</Checkbox.Label>
    </Checkbox.Root>
  ),
  tabs: (p) => (
    <Tabs.Root defaultValue="a" {...p}>
      <Tabs.List>
        <Tabs.Trigger value="a">One</Tabs.Trigger>
        <Tabs.Trigger value="b">Two</Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  ),
  accordion: (p) => (
    <Accordion.Root collapsible defaultValue={["a"]} w="56" {...p}>
      <Accordion.Item value="a">
        <Accordion.ItemTrigger>Question</Accordion.ItemTrigger>
        <Accordion.ItemContent>Answer</Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  ),
  colorSwatch: (p) => <ColorSwatch value="#3b82f6" {...p} />,
}

const asProp = (v: string): unknown => (v === "true" ? true : v === "false" ? false : v)

export function Variants({ groups }: { groups: VariantGroup[] }) {
  return (
    <Stack gap="8">
      {groups.map((g) => {
        const render = live[g.recipe] as Render | undefined
        return (
          <Stack key={g.recipe} gap="5">
            {groups.length > 1 && <Heading as="h3" size="md" textTransform="capitalize">{g.recipe}</Heading>}
            {g.options.map((o) => (
              <Stack key={o.key} gap="2">
                <Flex align="center" gap="2">
                  <Code fontSize="sm" fontWeight="medium">{o.key}</Code>
                  <Text fontSize="xs" color="fg.muted">{o.values.length} options</Text>
                </Flex>
                {render && o.values[0] !== "true" ? (
                  <Flex wrap="wrap" gap="4" align="end" borderWidth="1px" rounded="l3" p="5" overflowX="auto">
                    {o.values.map((v) => (
                      <Stack key={v} gap="2" align="center">
                        {render({ [o.key]: asProp(v) })}
                        <Text fontSize="xs" color="fg.muted">{v}</Text>
                      </Stack>
                    ))}
                  </Flex>
                ) : (
                  <Flex wrap="wrap" gap="2">
                    {o.values.map((v) => (
                      <Box key={v} as="span" fontSize="xs" fontFamily="mono" borderWidth="1px" rounded="l1" px="2" py="0.5" bg="bg.muted">{v}</Box>
                    ))}
                  </Flex>
                )}
              </Stack>
            ))}
          </Stack>
        )
      })}
    </Stack>
  )
}
