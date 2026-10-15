import { Box, Button, Code, CodeBlock, ColorModeButton, Command, Container, Flex, HStack, Heading, Link, Prose, Provider, Sidebar, Span, Stack, Table, Tabs, Text, Toaster, version } from "@indoku/ui"
import { useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { LuCheck, LuCopy, LuFileText, LuSearch } from "react-icons/lu"
import { demoMap } from "../content/demos"
import type { DocPage } from "../content/types"
import { Variants } from "./VariantPreview"

interface Nav {
  guides: { slug: string; title: string; section: string; group?: string }[]
  groups: { name: string; items: { slug: string; name: string; description?: string }[] }[]
}

interface TocItem {
  id: string
  label: string
  depth: 2 | 3
}

/** `code`, [links](url) in plain strings. */
export function Inline({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\[[^\]]+\]\([^)]+\))/g)
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("`")) return <Code key={i} fontSize="0.875em" bg="bg.muted" px="1.5" py="0.5" rounded="l1">{p.slice(1, -1)}</Code>
        const l = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (l) return <Link variant="plain" key={i} href={l[2]} textDecoration="underline" textUnderlineOffset="3px">{l[1]}</Link>
        return p
      })}
    </>
  )
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

/** Search palette (⌘K), built with the library's own Command component. */
function Search({ nav }: { nav: Nav }) {
  const [open, setOpen] = useState(false)
  const go = (href: string) => {
    setOpen(false)
    window.location.href = href
  }
  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)} color="fg.muted" fontWeight="normal" justifyContent="space-between" w={{ base: "auto", md: "64" }} aria-label="Search docs">
        <HStack gap="2">
          <LuSearch />
          <Span display={{ base: "none", md: "inline" }}>Search docs…</Span>
        </HStack>
        <Command.Shortcut position="static" display={{ base: "none", md: "inline-flex" }}>⌘K</Command.Shortcut>
      </Button>
      <Command.Dialog open={open} onOpenChange={setOpen} hotkey="k" title="Search docs">
        <Command.Input placeholder="Search components and guides…" />
        <Command.List>
          <Command.Empty />
          <Command.Group heading="Getting started">
            {nav.guides.map((g) => (
              <Command.Item key={g.slug} value={g.title} onSelect={() => go(g.slug === "introduction" ? "/docs" : `/docs/${g.slug}`)}>
                {g.title}
              </Command.Item>
            ))}
          </Command.Group>
          {nav.groups.map((g) => (
            <Command.Group key={g.name} heading={g.name}>
              {g.items.map((d) => (
                <Command.Item key={d.slug} value={d.name} keywords={[d.slug, g.name, ...(d.description ? [d.description] : [])]} onSelect={() => go(`/docs/${d.slug}`)}>
                  {d.name}
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>
      </Command.Dialog>
    </>
  )
}

/** "On this page": anchors for the current page, with the section in view highlighted. */
function Toc({ items }: { items: TocItem[] }) {
  const key = items.map((i) => i.id).join("|")
  const [active, setActive] = useState(items[0]?.id)
  useEffect(() => {
    const els = key.split("|").map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e)
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (seen[0]) setActive(seen[0].target.id)
      },
      { rootMargin: "-72px 0px -70% 0px" },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key])
  return (
    <Box as="aside" display={{ base: "none", xl: "block" }} w="52" flexShrink="0" alignSelf="stretch">
      <Box position="sticky" top="20" maxH="calc(100vh - 6rem)" overflowY="auto">
        <Text fontSize="sm" fontWeight="medium" mb="3">On this page</Text>
        <Box as="nav" aria-label="On this page" display="flex" flexDirection="column" borderStartWidth="1px">
          {items.map((i) => (
            <Link variant="plain"
              key={i.id}
              href={`#${i.id}`}
              fontSize="sm"
              py="1"
              ps={i.depth === 3 ? "6" : "3"}
              ms="-1px"
              borderStartWidth="2px"
              borderColor={active === i.id ? "fg" : "transparent"}
              color={active === i.id ? "fg" : "fg.muted"}
              fontWeight={active === i.id ? "medium" : "normal"}
              _hover={{ color: "fg" }}
            >
              {i.label}
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

const SECTIONS = [
  { id: "start", label: "Get Started" },
  { id: "components", label: "Components" },
  { id: "styling", label: "Styling" },
  { id: "theming", label: "Theming" },
  { id: "science", label: "Math & Science" },
] as const
type SectionId = (typeof SECTIONS)[number]["id"]
const sectionOf = (group: string): SectionId => (group === "Charts" || group === "Science" ? "science" : "components")

export function Shell({ nav, active, children, toc }: { nav: Nav; active: string; children: ReactNode; toc?: TocItem[] }) {
  const item = (href: string, label: string) => (
    <Sidebar.MenuItem key={href}>
      <Sidebar.MenuButton asChild isActive={active === href}>
        <a href={href}>{label}</a>
      </Sidebar.MenuButton>
    </Sidebar.MenuItem>
  )
  const slug = active === "/docs" ? "introduction" : active.replace("/docs/", "")
  const guide = nav.guides.find((g) => g.slug === slug)
  const section: SectionId = guide ? (guide.section as SectionId) : sectionOf(nav.groups.find((g) => g.items.some((i) => i.slug === slug))?.name ?? "")
  const groups = nav.groups.filter((g) => g.items.length && sectionOf(g.name) === section)
  const guideHref = (g: { slug: string }) => (g.slug === "introduction" ? "/docs" : `/docs/${g.slug}`)
  const sectionGuides = nav.guides.filter((g) => g.section === section)
  const sectionLabel = SECTIONS.find((t) => t.id === section)?.label ?? ""
  const guideGroups: { label: string; items: typeof sectionGuides }[] = []
  for (const g of sectionGuides) {
    const label = g.group || sectionLabel
    const bucket = guideGroups.find((x) => x.label === label) ?? (guideGroups.push({ label, items: [] }), guideGroups[guideGroups.length - 1])
    bucket.items.push(g)
  }
  const firstHref = (id: SectionId) => {
    const g = nav.guides.find((x) => x.section === id)
    return g ? guideHref(g) : `/docs/${nav.groups.find((x) => x.items.length && sectionOf(x.name) === id)?.items[0]?.slug ?? ""}`
  }
  return (
    <Sidebar.Provider>
      <Sidebar.Root>
        <Sidebar.Header>
          <a href="/">
            <Heading size="sm">IndokuUI</Heading>
          </a>
          <Text fontSize="xs" color="fg.muted">v{version} · by @indokudev</Text>
        </Sidebar.Header>
        <Sidebar.Content>
          {guideGroups.map((gg) => (
            <Sidebar.Group key={gg.label}>
              <Sidebar.GroupLabel>{gg.label}</Sidebar.GroupLabel>
              <Sidebar.Menu>{gg.items.map((g) => item(guideHref(g), g.title))}</Sidebar.Menu>
            </Sidebar.Group>
          ))}
          {groups.map((g) => (
            <Sidebar.Group key={g.name}>
              <Sidebar.GroupLabel>{g.name}</Sidebar.GroupLabel>
              <Sidebar.Menu>{g.items.map((d) => item(`/docs/${d.slug}`, d.name))}</Sidebar.Menu>
            </Sidebar.Group>
          ))}
        </Sidebar.Content>
      </Sidebar.Root>
      <Sidebar.Inset>
        <Flex as="header" position="sticky" top="0" zIndex="5" h="14" px="4" gap="3" align="center" justify="space-between" bg="bg/80" backdropFilter="blur(8px)" borderBottomWidth="1px">
          <HStack gap="1" minW="0" overflowX="auto">
            <Sidebar.Trigger />
            {SECTIONS.map((t) => (
              <Link key={t.id} variant="plain" href={firstHref(t.id)} px="3" py="1" fontSize="sm" whiteSpace="nowrap" rounded="l2" color={section === t.id ? "fg" : "fg.muted"} fontWeight={section === t.id ? "medium" : "normal"} bg={section === t.id ? "bg.muted" : undefined} _hover={{ color: "fg" }}>
                {t.label}
              </Link>
            ))}
          </HStack>
          <HStack gap="2">
            <Search nav={nav} />
            <Button asChild variant="ghost" size="sm" display={{ base: "none", md: "inline-flex" }}><a href="/docs/mcp">MCP</a></Button>
            <ColorModeButton />
          </HStack>
        </Flex>
        <Flex maxW={toc ? "7xl" : "4xl"} mx="auto" px={{ base: "4", md: "8" }} py="8" gap="12" align="flex-start">
          <Box flex="1" minW="0" maxW="4xl">{children}</Box>
          {toc && <Toc items={toc} />}
        </Flex>
        <Box borderTopWidth="1px" py="6">
          <Container maxW="4xl"><Text fontSize="sm" color="fg.muted">Created by @indokudev</Text></Container>
        </Box>
      </Sidebar.Inset>
    </Sidebar.Provider>
  )
}

/** Guide pages: markdown arrives as server-rendered children. */
export function GuideApp({ nav, active, children }: { nav: Nav; active: string; children: ReactNode }) {
  return (
    <Provider>
      <Shell nav={nav} active={active}>
        <Prose maxW="none">{children}</Prose>
      </Shell>
    </Provider>
  )
}

function Props({ page }: { page: DocPage }) {
  if (!page.props.length) {
    return null
  }
  return (
    <Stack gap="6">
      {page.props.map((t) => (
        <Box key={t.part}>
          <Heading as="h3" id={`props-${slugify(t.part)}`} size="md" mb="2" scrollMarginTop="20">{t.part}</Heading>
          <Box overflowX="auto" borderWidth="1px" rounded="l2">
            <Table.Root size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Prop</Table.ColumnHeader>
                  <Table.ColumnHeader>Type</Table.ColumnHeader>
                  <Table.ColumnHeader>Default</Table.ColumnHeader>
                  <Table.ColumnHeader>Description</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {t.rows.map((r) => (
                  <Table.Row key={r.name}>
                    <Table.Cell><Code fontSize="xs">{r.name}{r.required ? "*" : ""}</Code></Table.Cell>
                    <Table.Cell><Code fontSize="xs" color="fg.muted" whiteSpace="pre-wrap">{r.type}</Code></Table.Cell>
                    <Table.Cell>{r.default ? <Code fontSize="xs">{r.default}</Code> : "–"}</Table.Cell>
                    <Table.Cell fontSize="sm"><Inline text={r.description} /></Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Box>
      ))}
      <Text fontSize="xs" color="fg.muted">* required. Style props and HTML attributes are accepted as well.</Text>
    </Stack>
  )
}

const H2 = ({ id, children }: { id: string; children: ReactNode }) => (
  <Heading as="h2" id={id} size="xl" mt="2" scrollMarginTop="20">{children}</Heading>
)

function CopyPage({ slug }: { slug: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle")
  const copy = async () => {
    try {
      const res = await fetch(`/docs/${slug}.md`)
      await navigator.clipboard.writeText(await res.text())
      setState("copied")
    } catch {
      setState("error")
    }
    setTimeout(() => setState("idle"), 1500)
  }
  return (
    <Button variant="outline" size="sm" onClick={copy}>
      {state === "copied" ? <LuCheck /> : <LuCopy />}
      {state === "copied" ? "Copied" : state === "error" ? "Failed" : "Copy page"}
    </Button>
  )
}

function tocFor(page: DocPage): TocItem[] {
  const t: TocItem[] = [{ id: "import", label: "Import", depth: 2 }]
  if (page.anatomy) t.push({ id: "anatomy", label: "Anatomy", depth: 2 })
  t.push({ id: "examples", label: "Examples", depth: 2 })
  if (page.examples.length > 1) for (const e of page.examples) t.push({ id: e.id, label: e.title, depth: 3 })
  if (page.variants.length) t.push({ id: "variants", label: "Variants", depth: 2 })
  if (page.props.length > 0) {
    t.push({ id: "props", label: "Props", depth: 2 })
    if (page.props.length > 1) for (const p of page.props) t.push({ id: `props-${slugify(p.part)}`, label: p.part, depth: 3 })
  }
  if (page.a11y.length) t.push({ id: "accessibility", label: "Accessibility", depth: 2 })
  if (page.notes.length) t.push({ id: "notes", label: "Notes", depth: 2 })
  return t
}

export function ComponentApp({ nav, page, prev, next }: { nav: Nav; page: DocPage; prev?: { slug: string; name: string }; next?: { slug: string; name: string } }) {
  const demos = demoMap[page.slug] ?? {}
  const toc = useMemo(() => tocFor(page), [page])
  return (
    <Provider>
      <Toaster />
      <Shell nav={nav} active={`/docs/${page.slug}`} toc={toc}>
        <Stack gap="10">
          <Box>
            <Text fontSize="xs" color="fg.muted" textTransform="uppercase" letterSpacing="wider">{page.group}</Text>
            <Flex mt="1" gap="3" wrap="wrap" align="center" justify="space-between">
              <Heading as="h1" size="3xl">{page.name}</Heading>
              <CopyPage slug={page.slug} />
            </Flex>
            <Stack mt="3" gap="2" color="fg.muted">
              {page.intro.map((t, i) => <Text key={i}><Inline text={t} /></Text>)}
            </Stack>
            <HStack mt="4" gap="2" wrap="wrap">
              <Button asChild variant="outline" size="xs">
                <a href={`/docs/${page.slug}.md`}><LuFileText /> Markdown</a>
              </Button>
            </HStack>
          </Box>

          <Stack gap="3">
            <H2 id="import">Import</H2>
            <CodeBlock.Root code={page.importCode} language="tsx" copyable />
          </Stack>

          {page.anatomy && (
            <Stack gap="3">
              <H2 id="anatomy">Anatomy</H2>
              <CodeBlock.Root code={page.anatomy} language="text" copyable={false} />
            </Stack>
          )}

          <Stack gap="8">
            <H2 id="examples">Examples</H2>
            {page.examples.map((e) => {
              const Demo = demos[e.id]
              return (
                <Stack key={e.id} gap="3">
                  <Heading as="h3" id={e.id} size="md" scrollMarginTop="20">{e.title}</Heading>
                  {e.description && <Text color="fg.muted"><Inline text={e.description} /></Text>}
                  {Demo ? (
                    <Tabs.Root defaultValue="preview" size="sm">
                      <Tabs.List>
                        <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
                        <Tabs.Trigger value="code">Code</Tabs.Trigger>
                      </Tabs.List>
                      <Tabs.Content value="preview" px="0">
                        <Box borderWidth="1px" rounded="l3" p={{ base: "4", md: "8" }} overflowX="auto">
                          <Demo />
                        </Box>
                      </Tabs.Content>
                      <Tabs.Content value="code" px="0">
                        <CodeBlock.Root code={e.code} language="tsx" maxLines={20} />
                      </Tabs.Content>
                    </Tabs.Root>
                  ) : (
                    <CodeBlock.Root code={e.code} language="tsx" maxLines={20} />
                  )}
                </Stack>
              )
            })}
          </Stack>

          {page.variants.length > 0 && (
            <Stack gap="4">
              <H2 id="variants">Variants</H2>
              <Text color="fg.muted">Pass these as props. The values are read from the live IndokuUI theme, so they always match what ships.</Text>
              <Variants groups={page.variants} />
            </Stack>
          )}

          {page.props.length > 0 ? (
            <Stack gap="3">
              <H2 id="props">Props</H2>
              <Props page={page} />
            </Stack>
          ) : null}

          {page.a11y.length > 0 && (
            <Stack gap="3">
              <H2 id="accessibility">Accessibility</H2>
              <Prose maxW="none"><ul>{page.a11y.map((a, i) => <li key={i}><Inline text={a} /></li>)}</ul></Prose>
            </Stack>
          )}

          {page.notes.length > 0 && (
            <Stack gap="3">
              <H2 id="notes">Notes</H2>
              <Prose maxW="none"><ul>{page.notes.map((a, i) => <li key={i}><Inline text={a} /></li>)}</ul></Prose>
            </Stack>
          )}

          <Flex justify="space-between" gap="2" pt="4" borderTopWidth="1px">
            {prev ? <Button asChild variant="outline" size="sm"><a href={`/docs/${prev.slug}`}>← {prev.name}</a></Button> : <span />}
            {next && <Button asChild variant="outline" size="sm"><a href={`/docs/${next.slug}`}>{next.name} →</a></Button>}
          </Flex>
        </Stack>
      </Shell>
    </Provider>
  )
}
