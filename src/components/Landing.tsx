import { Badge, Box, Button, Card, CodeBlock, ColorModeButton, Container, Flex, HStack, Heading, Link, Provider, SimpleGrid, Stack, Text, version } from "@indoku/ui"
import type { ReactNode } from "react"
import { LuArrowRight, LuBot } from "react-icons/lu"
import { InputOtpDemo, QrCodeDemo, QuestionnaireDemo, ResizableDemo, ToggleDemo } from "../content/demos/new"

interface Props {
  count: number
  groups: { name: string; items: { slug: string; name: string }[] }[]
}

const features = [
  ["No extra dependencies", "Only React and Emotion are required. QR codes, OTP input, resizable panels, the highlighter and the rich text editor are written from scratch."],
  ["Semantic HTML", "nav, aside, ul, table, dialog, fieldset — easier to make accessible and to style than piles of divs."],
  ["Light and dark", "A built-in Provider and color mode, with no flash on load and no next-themes."],
  ["SSR ready", "Works with Vite, Astro React islands and Next.js. Browser-only components are marked use client."],
  ["AI friendly docs", "Markdown for every page and an MCP server, so your assistant reads the real docs."],
  ["Standalone", "Its own engine, tokens and recipes. Shadcn-style defaults you can customise or replace."],
]

const showcase: { title: string; slug: string; span?: boolean; node: ReactNode }[] = [
  { title: "Questionnaire", slug: "questionnaire", span: true, node: <QuestionnaireDemo /> },
  { title: "QR Code", slug: "qr-code", node: <QrCodeDemo /> },
  { title: "Input OTP", slug: "input-otp", node: <InputOtpDemo /> },
  { title: "Toggle Group", slug: "toggle", node: <ToggleDemo /> },
  { title: "Resizable", slug: "resizable", span: true, node: <ResizableDemo /> },
]

export default function Landing({ count, groups }: Props) {
  return (
    <Provider>
      <Box as="header" position="sticky" top="0" zIndex="10" bg="bg/80" backdropFilter="blur(8px)" borderBottomWidth="1px">
        <Container maxW="6xl" h="14" display="flex" alignItems="center" justifyContent="space-between">
          <HStack gap="2"><Heading size="sm">IndokuUI</Heading><Badge variant="outline">v{version}</Badge><Text fontSize="xs" color="fg.muted">by @indokudev</Text></HStack>
          <HStack gap="1">
            <Button asChild variant="ghost" size="sm"><a href="/docs">Docs</a></Button>
            <Button asChild variant="ghost" size="sm"><a href="/docs/mcp">MCP</a></Button>
            <ColorModeButton />
          </HStack>
        </Container>
      </Box>

      <Box as="main">
        <Box as="section" py={{ base: "16", md: "24" }} borderBottomWidth="1px">
          <Container maxW="4xl">
            <Stack gap="6" align="center" textAlign="center">
              <Badge variant="outline">v{version} · shadcn style</Badge>
              <Heading as="h1" size={{ base: "4xl", md: "6xl" }} letterSpacing="tight" lineHeight="1.05">React UI, with the shadcn look.</Heading>
              <Text fontSize={{ base: "md", md: "lg" }} color="fg.muted" maxW="2xl">
                IndokuUI is a standalone React UI library with a minimal, shadcn-style design, its own styling engine and dozens of ready-made components.
              </Text>
              <HStack gap="3" wrap="wrap" justify="center">
                <Button asChild size="lg"><a href="/docs/installation">Get started <LuArrowRight /></a></Button>
                <Button asChild size="lg" variant="outline"><a href="/docs/button">Browse components</a></Button>
              </HStack>
              <Box w="full" maxW="md"><CodeBlock.Root code="npm i @indoku/ui" language="bash" copyable /></Box>
            </Stack>
          </Container>
        </Box>

        <Box as="section" py="16">
          <Container maxW="6xl">
            <Stack gap="2" mb="8">
              <Heading size="2xl">Try it live</Heading>
              <Text color="fg.muted">These are real IndokuUI components, not screenshots. Click, type, drag.</Text>
            </Stack>
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap="4">
              {showcase.map((s) => (
                <Card.Root key={s.slug} gridColumn={s.span ? { lg: "1 / -1" } : undefined} minW="0">
                  <Card.Header>
                    <Flex justify="space-between" align="center">
                      <Card.Title>{s.title}</Card.Title>
                      <Link variant="plain" href={`/docs/${s.slug}`} fontSize="sm" color="fg.muted">Docs →</Link>
                    </Flex>
                  </Card.Header>
                  <Card.Body overflowX="auto">{s.node}</Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        <Box as="section" py="16" bg="bg.muted" borderBlockWidth="1px">
          <Container maxW="6xl">
            <Heading size="2xl" mb="8">Why IndokuUI</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="8">
              {features.map(([t, d]) => (
                <Stack key={t} gap="1"><Heading size="md">{t}</Heading><Text color="fg.muted" fontSize="sm">{d}</Text></Stack>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        <Box as="section" py="16">
          <Container maxW="6xl">
            <HStack gap="3" mb="2"><Heading size="2xl">{count} components documented</Heading></HStack>
            <Text color="fg.muted" mb="8">Each page has live examples, code and props. <LuBot style={{ display: "inline" }} /> All of it is available to your AI assistant through the <Link variant="plain" href="/docs/mcp" textDecoration="underline">MCP server</Link>.</Text>
            <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap="6">
              {groups.map((g) => (
                <Stack key={g.name} gap="2" as="nav" aria-label={g.name}>
                  <Text fontSize="xs" color="fg.muted" textTransform="uppercase" letterSpacing="wider">{g.name}</Text>
                  {g.items.map((d) => <Link variant="plain" key={d.slug} href={`/docs/${d.slug}`} fontSize="sm" _hover={{ textDecoration: "underline" }}>{d.name}</Link>)}
                </Stack>
              ))}
            </SimpleGrid>
          </Container>
        </Box>
      </Box>

      <Box as="footer" borderTopWidth="1px" py="8">
        <Container maxW="6xl"><Text fontSize="sm" color="fg.muted">Created by @indokudev · IndokuUI v{version}</Text></Container>
      </Box>
    </Provider>
  )
}
