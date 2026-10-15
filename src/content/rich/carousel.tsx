import { Button, Carousel, Center, CloseButton, Dialog, HStack, IconButton, Portal, Stack, Text, useCarousel } from "@indoku/ui"
import { useState } from "react"
import { LuArrowLeft, LuArrowRight, LuChevronDown, LuChevronLeft, LuChevronRight, LuChevronUp, LuPause, LuPlay } from "react-icons/lu"
import type { PropRow, RichDoc } from "../types"

const items = Array.from({ length: 5 })

function Slide({ n, h = "48" }: { n: number; h?: string }) {
  return (
    <Center h={h} rounded="l3" bg="bg.muted" borderWidth="1px" fontSize="3xl" fontWeight="semibold">
      {n}
    </Center>
  )
}

export function CarouselBasic() {
  return (
    <Carousel.Root slideCount={items.length} maxW="md" mx="auto">
      <Carousel.ItemGroup>
        {items.map((_, index) => (
          <Carousel.Item key={index} index={index}>
            <Slide n={index + 1} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control justifyContent="center" gap="4">
        <Carousel.PrevTrigger asChild>
          <IconButton size="xs" variant="ghost" aria-label="Previous slide">
            <LuChevronLeft />
          </IconButton>
        </Carousel.PrevTrigger>
        <Carousel.Indicators />
        <Carousel.NextTrigger asChild>
          <IconButton size="xs" variant="ghost" aria-label="Next slide">
            <LuChevronRight />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}

export function CarouselArrows() {
  return (
    <Carousel.Root slideCount={items.length} maxW="md" mx="auto" gap="4">
      <Carousel.Control position="relative" width="full">
        <Carousel.PrevTrigger asChild>
          <IconButton size="xs" variant="outline" rounded="full" bg="bg" position="absolute" zIndex="1" insetStart="2" aria-label="Previous slide">
            <LuArrowLeft />
          </IconButton>
        </Carousel.PrevTrigger>
        <Carousel.ItemGroup width="full">
          {items.map((_, index) => (
            <Carousel.Item key={index} index={index}>
              <Slide n={index + 1} />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>
        <Carousel.NextTrigger asChild>
          <IconButton size="xs" variant="outline" rounded="full" bg="bg" position="absolute" zIndex="1" insetEnd="2" aria-label="Next slide">
            <LuArrowRight />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.Indicators />
    </Carousel.Root>
  )
}

export function CarouselControlled() {
  const [page, setPage] = useState(0)
  return (
    <Stack maxW="md" mx="auto" gap="4">
      <HStack justify="space-between">
        <Text textStyle="sm" color="fg.muted">
          Slide {page + 1} of {items.length}
        </Text>
        <Button size="xs" variant="outline" onClick={() => setPage(2)}>
          Go to slide 3
        </Button>
      </HStack>
      <Carousel.Root slideCount={items.length} page={page} onPageChange={(e) => setPage(e.page)}>
        <Carousel.ItemGroup>
          {items.map((_, index) => (
            <Carousel.Item key={index} index={index}>
              <Slide n={index + 1} />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>
        <Carousel.Control justifyContent="center">
          <Carousel.Indicators />
        </Carousel.Control>
      </Carousel.Root>
    </Stack>
  )
}

export function CarouselStore() {
  const carousel = useCarousel({ slideCount: items.length })
  return (
    <Carousel.RootProvider value={carousel} maxW="md" mx="auto">
      <HStack>
        <Button size="xs" variant="outline" onClick={() => carousel.scrollTo(0)}>
          First
        </Button>
        <Button size="xs" variant="outline" onClick={() => carousel.scrollTo(items.length - 1)}>
          Last
        </Button>
      </HStack>
      <Carousel.ItemGroup>
        {items.map((_, index) => (
          <Carousel.Item key={index} index={index}>
            <Slide n={index + 1} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control justifyContent="center">
        <Carousel.Indicators />
      </Carousel.Control>
    </Carousel.RootProvider>
  )
}

export function CarouselThumbnails() {
  return (
    <Carousel.Root slideCount={items.length} maxW="md" mx="auto" gap="4">
      <Carousel.ItemGroup>
        {items.map((_, index) => (
          <Carousel.Item key={index} index={index}>
            <Slide n={index + 1} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.IndicatorGroup>
        {items.map((_, index) => (
          <Carousel.Indicator key={index} index={index} unstyled _current={{ outline: "2px solid currentColor", outlineOffset: "2px" }}>
            <Center w="12" h="8" rounded="l1" bg="bg.muted" textStyle="xs">
              {index + 1}
            </Center>
          </Carousel.Indicator>
        ))}
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  )
}

export function CarouselMultiple() {
  return (
    <Carousel.Root slideCount={items.length} slidesPerPage={2} spacing="16px" maxW="xl" mx="auto">
      <Carousel.ItemGroup>
        {items.map((_, index) => (
          <Carousel.Item key={index} index={index}>
            <Slide n={index + 1} h="32" />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control justifyContent="center" gap="4">
        <Carousel.PrevTrigger asChild>
          <IconButton size="xs" variant="ghost" aria-label="Previous page">
            <LuChevronLeft />
          </IconButton>
        </Carousel.PrevTrigger>
        <Carousel.Indicators />
        <Carousel.NextTrigger asChild>
          <IconButton size="xs" variant="ghost" aria-label="Next page">
            <LuChevronRight />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}

const sizes = [120, 200, 80, 250, 150]

export function CarouselVariableSize() {
  return (
    <Carousel.Root slideCount={sizes.length} autoSize spacing="8px" maxW="xl" mx="auto">
      <Carousel.ItemGroup>
        {sizes.map((width, index) => (
          <Carousel.Item key={index} index={index} snapAlign="center" width="auto">
            <Center style={{ width }} h="24" rounded="l2" bg="bg.muted" borderWidth="1px">
              {width}px
            </Center>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
    </Carousel.Root>
  )
}

export function CarouselVertical() {
  return (
    <Carousel.Root orientation="vertical" slideCount={items.length} height="72" maxW="md" mx="auto">
      <Carousel.ItemGroup flex="1">
        {items.map((_, index) => (
          <Carousel.Item key={index} index={index}>
            <Slide n={index + 1} h="full" />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control justifyContent="space-between" h="full">
        <Carousel.PrevTrigger asChild>
          <IconButton size="xs" variant="ghost" aria-label="Previous slide">
            <LuChevronUp />
          </IconButton>
        </Carousel.PrevTrigger>
        <Carousel.Indicators />
        <Carousel.NextTrigger asChild>
          <IconButton size="xs" variant="ghost" aria-label="Next slide">
            <LuChevronDown />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}

export function CarouselLoop() {
  return (
    <Carousel.Root slideCount={items.length} loop allowMouseDrag maxW="md" mx="auto">
      <Text textStyle="sm" color="fg.muted" mb="3">
        Drag with the mouse, or keep pressing next: it wraps around.
      </Text>
      <Carousel.ItemGroup>
        {items.map((_, index) => (
          <Carousel.Item key={index} index={index}>
            <Slide n={index + 1} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control justifyContent="center" gap="4">
        <Carousel.PrevTrigger asChild>
          <IconButton size="xs" variant="ghost" aria-label="Previous slide">
            <LuChevronLeft />
          </IconButton>
        </Carousel.PrevTrigger>
        <Carousel.Indicators />
        <Carousel.NextTrigger asChild>
          <IconButton size="xs" variant="ghost" aria-label="Next slide">
            <LuChevronRight />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}

export function CarouselAutoplay() {
  return (
    <Carousel.Root slideCount={items.length} autoplay={{ delay: 2000 }} maxW="md" mx="auto">
      <Carousel.ItemGroup>
        {items.map((_, index) => (
          <Carousel.Item key={index} index={index}>
            <Slide n={index + 1} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control justifyContent="center" gap="4">
        <Carousel.AutoplayTrigger asChild>
          <IconButton size="xs" variant="ghost" aria-label="Toggle autoplay">
            <Carousel.AutoplayIndicator paused={<LuPause />} play={<LuPlay />} />
          </IconButton>
        </Carousel.AutoplayTrigger>
        <Carousel.Indicators />
        <Carousel.ProgressText />
      </Carousel.Control>
    </Carousel.Root>
  )
}

export function CarouselLightbox() {
  return (
    <Dialog.Root size="lg">
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Open gallery
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
            <Dialog.Body pt="12">
              <Carousel.Root slideCount={items.length} gap="4">
                <Carousel.ItemGroup>
                  {items.map((_, index) => (
                    <Carousel.Item key={index} index={index}>
                      <Slide n={index + 1} h="64" />
                    </Carousel.Item>
                  ))}
                </Carousel.ItemGroup>
                <Carousel.Control justifyContent="center" gap="4">
                  <Carousel.PrevTrigger asChild>
                    <IconButton size="xs" variant="ghost" aria-label="Previous slide">
                      <LuChevronLeft />
                    </IconButton>
                  </Carousel.PrevTrigger>
                  <Carousel.ProgressText />
                  <Carousel.NextTrigger asChild>
                    <IconButton size="xs" variant="ghost" aria-label="Next slide">
                      <LuChevronRight />
                    </IconButton>
                  </Carousel.NextTrigger>
                </Carousel.Control>
              </Carousel.Root>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

const p = (name: string, type: string, def: string | undefined, description: string, required = false): PropRow => ({ name, type, required, default: def, description })

const shared = ["items", "Slide"]

export const doc: RichDoc = {
  intro: [
    "Cycles through a series of slides inside a container. The indicators are small neutral dots and the active one uses the solid color of the palette.",
    "Slides scroll and snap with native CSS scroll snapping, so touch swiping works out of the box. Every part is optional: compose only the arrows, indicators, autoplay button or progress text you need.",
  ],
  importCode: 'import { Carousel } from "@indoku/ui"',
  anatomy: `Carousel.Root (slideCount)
├─ Carousel.ItemGroup
│  └─ Carousel.Item (index)
└─ Carousel.Control
   ├─ Carousel.PrevTrigger / Carousel.NextTrigger
   ├─ Carousel.Indicators            shortcut for the group below
   │  = Carousel.IndicatorGroup > Carousel.Indicator (index)
   ├─ Carousel.AutoplayTrigger > Carousel.AutoplayIndicator
   └─ Carousel.ProgressText`,
  examples: [
    { id: "basic", title: "Basic", description: "`slideCount` is required: the carousel needs it to compute snap points during server rendering. Give every `Carousel.Item` its `index`.", fn: "CarouselBasic", helpers: shared },
    { id: "arrows", title: "Floating arrows", description: "Put the triggers inside `Carousel.Control` next to the item group. Here they sit on top of the slide with absolute positioning.", fn: "CarouselArrows", helpers: shared },
    { id: "controlled", title: "Controlled", description: "Use `page` and `onPageChange` to read and set the active slide from your own state.", fn: "CarouselControlled", helpers: shared },
    { id: "store", title: "Store", description: "`useCarousel` returns a store you pass to `Carousel.RootProvider`. Call `scrollTo`, `scrollNext` and friends from anywhere, even outside the carousel.", fn: "CarouselStore", helpers: shared },
    { id: "thumbnails", title: "Thumbnail indicators", description: "Render `Carousel.IndicatorGroup` yourself and pass children to each `Carousel.Indicator`. Add `unstyled` to drop the dot styling, and style the active one with `_current`.", fn: "CarouselThumbnails", helpers: shared },
    { id: "multiple", title: "Multiple slides per page", description: "`slidesPerPage` shows several slides at once and `spacing` sets the gap between them. Next and previous move one page at a time unless you set `slidesPerMove`.", fn: "CarouselMultiple", helpers: shared },
    { id: "variable", title: "Variable size", description: "Add `autoSize` so each slide keeps its own width, and set `width=\"auto\"` on the item. `snapAlign` controls where a slide stops.", fn: "CarouselVariableSize", helpers: ["sizes"] },
    { id: "vertical", title: "Vertical", description: "Set `orientation=\"vertical\"` and give the root a height. The arrows and indicators stack vertically too.", fn: "CarouselVertical", helpers: shared },
    { id: "loop", title: "Loop and mouse drag", description: "`loop` wraps from the last slide to the first. `allowMouseDrag` lets desktop users drag, touch devices always can.", fn: "CarouselLoop", helpers: shared },
    { id: "autoplay", title: "Autoplay", description: "Pass `autoplay` (4 seconds by default) or `{ delay }` in milliseconds. `Carousel.AutoplayTrigger` pauses and resumes it, and `Carousel.ProgressText` shows `1 / 5`.", fn: "CarouselAutoplay", helpers: shared },
    { id: "lightbox", title: "Lightbox", description: "Compose the carousel with a `Dialog` for a gallery that opens on click.", fn: "CarouselLightbox", helpers: shared },
  ],
  props: [
    {
      part: "Root",
      rows: [
        p("slideCount", "number", undefined, "Total number of slides. Needed for SSR so snap points exist on the first render.", true),
        p("page", "number", undefined, "The active page, for controlled usage."),
        p("defaultPage", "number", "0", "The initial page when uncontrolled."),
        p("onPageChange", "(details: { page: number }) => void", undefined, "Called when the page changes."),
        p("slidesPerPage", "number", "1", "How many slides are visible at once. Decimals such as 1.5 show a peek of the next slide."),
        p("slidesPerMove", "number | 'auto'", "'auto'", "How many slides one move scrolls. `auto` follows `slidesPerPage`."),
        p("spacing", "string", "'1rem'", "Space between slides."),
        p("orientation", "'horizontal' | 'vertical'", "'horizontal'", "Scroll direction."),
        p("loop", "boolean", "false", "Wrap around at both ends."),
        p("autoplay", "boolean | { delay: number }", "false", "Scroll automatically. The default delay is 4000 ms."),
        p("autoSize", "boolean", "false", "Allow slides with different widths or heights."),
        p("allowMouseDrag", "boolean", "false", "Allow scrolling by dragging with the mouse."),
        p("snapType", "'proximity' | 'mandatory'", "'mandatory'", "How strictly scrolling snaps to slides."),
        p("inViewThreshold", "number | number[]", "0.6", "How much of a slide must be visible to count as in view."),
        p("padding", "string", undefined, "Extra space around the scroll area, so neighbouring slides stay partly visible."),
        p("onAutoplayStatusChange", "(details) => void", undefined, "Called when autoplay starts or stops."),
        p("onDragStatusChange", "(details) => void", undefined, "Called when dragging starts or stops."),
        p("translations", "IntlTranslations", undefined, "Localized labels used for accessibility."),
        p("ids", "Partial<{ root, item, itemGroup, ... }>", undefined, "Custom element ids, useful for composition."),
        p("asChild", "boolean", undefined, "Render the child element instead of the default one."),
        p("unstyled", "boolean", undefined, "Remove the component's styles."),
      ],
    },
    {
      part: "Item",
      rows: [
        p("index", "number", undefined, "The position of this slide.", true),
        p("snapAlign", "'start' | 'center' | 'end'", "'start'", "Where the slide stops when snapping."),
      ],
    },
    {
      part: "Indicator",
      rows: [p("index", "number", undefined, "The slide this indicator jumps to.", true), p("unstyled", "boolean", undefined, "Remove the dot styling, to render your own content such as a thumbnail.")],
    },
  ],
  a11y: [
    "The root is exposed as a carousel region and each slide as a slide group, so screen readers announce the position (for example 1 of 5).",
    "Icon-only triggers have no text. Always give `Carousel.PrevTrigger` and `Carousel.NextTrigger` buttons an `aria-label`.",
    "Autoplay moves content on its own. Offer `Carousel.AutoplayTrigger` so people can pause it, and avoid autoplay for anything important.",
  ],
  notes: [
    "In `Carousel.AutoplayIndicator`, `paused` is what shows while the carousel is playing (the button will pause it) and `play` shows while it is paused.",
    "Slides use CSS scroll snapping, not transforms. Anything that scrolls natively (trackpad, touch, keyboard) works with it.",
    "`Carousel.Indicators` is a shortcut. Use `Carousel.IndicatorGroup` plus `Carousel.Indicator` when each indicator needs custom content.",
    "Images inside slides should set `draggable={false}` when `allowMouseDrag` is on, otherwise the browser starts an image drag.",
  ],
  seeAlso: ["dialog", "tabs", "aspect-ratio"],
}
