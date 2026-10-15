import { Box, Button, FloatingPanel, HStack, Portal, Text, useFloatingPanel } from "@indoku/ui"
import { useRef, useState } from "react"
import { LuMaximize2, LuMinimize2, LuMinus, LuX } from "react-icons/lu"
import type { RichDoc } from "../types"

export function FloatingPanelBasic() {
  return (
    <FloatingPanel.Root defaultSize={{ width: 320, height: 200 }} minSize={{ width: 240, height: 140 }}>
      <FloatingPanel.Trigger asChild>
        <Button variant="outline">Open panel</Button>
      </FloatingPanel.Trigger>
      <Portal>
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.Header>
              <FloatingPanel.DragTrigger>
                <FloatingPanel.Title>Floating panel</FloatingPanel.Title>
              </FloatingPanel.DragTrigger>
              <FloatingPanel.Control>
                <FloatingPanel.CloseTrigger>
                  <LuX />
                </FloatingPanel.CloseTrigger>
              </FloatingPanel.Control>
            </FloatingPanel.Header>
            <FloatingPanel.Body>
              <Text>Drag the header to move it, pull an edge to resize.</Text>
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggers />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  )
}

export function FloatingPanelControlled() {
  const [open, setOpen] = useState(false)
  return (
    <HStack>
      <Button variant="outline" onClick={() => setOpen((o) => !o)}>
        {open ? "Close" : "Open"} (controlled)
      </Button>
      <FloatingPanel.Root open={open} onOpenChange={(e) => setOpen(e.open)} defaultSize={{ width: 300, height: 160 }}>
        <Portal>
          <FloatingPanel.Positioner>
            <FloatingPanel.Content>
              <FloatingPanel.Header>
                <FloatingPanel.DragTrigger>
                  <FloatingPanel.Title>Controlled</FloatingPanel.Title>
                </FloatingPanel.DragTrigger>
                <FloatingPanel.Control>
                  <FloatingPanel.CloseTrigger>
                    <LuX />
                  </FloatingPanel.CloseTrigger>
                </FloatingPanel.Control>
              </FloatingPanel.Header>
              <FloatingPanel.Body>
                <Text>open = {String(open)}</Text>
              </FloatingPanel.Body>
            </FloatingPanel.Content>
          </FloatingPanel.Positioner>
        </Portal>
      </FloatingPanel.Root>
    </HStack>
  )
}

export function FloatingPanelStages() {
  return (
    <FloatingPanel.Root defaultSize={{ width: 340, height: 200 }}>
      <FloatingPanel.Trigger asChild>
        <Button variant="outline">Open with stage triggers</Button>
      </FloatingPanel.Trigger>
      <Portal>
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.Header>
              <FloatingPanel.DragTrigger>
                <FloatingPanel.Title>Stages</FloatingPanel.Title>
              </FloatingPanel.DragTrigger>
              <FloatingPanel.Control>
                <FloatingPanel.StageTrigger stage="minimized">
                  <LuMinus />
                </FloatingPanel.StageTrigger>
                <FloatingPanel.StageTrigger stage="maximized">
                  <LuMaximize2 />
                </FloatingPanel.StageTrigger>
                <FloatingPanel.StageTrigger stage="default">
                  <LuMinimize2 />
                </FloatingPanel.StageTrigger>
                <FloatingPanel.CloseTrigger>
                  <LuX />
                </FloatingPanel.CloseTrigger>
              </FloatingPanel.Control>
            </FloatingPanel.Header>
            <FloatingPanel.Body>
              <Text>Minimize, maximize or restore the panel.</Text>
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggers />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  )
}

export function FloatingPanelStore() {
  const panel = useFloatingPanel({ defaultSize: { width: 300, height: 170 } })
  return (
    <>
      <HStack wrap="wrap">
        <Button variant="outline" onClick={() => panel.setOpen(true)}>
          Open
        </Button>
        <Button variant="outline" onClick={() => panel.maximize()}>
          Maximize
        </Button>
        <Button variant="outline" onClick={() => panel.minimize()}>
          Minimize
        </Button>
        <Button variant="outline" onClick={() => panel.restore()}>
          Restore
        </Button>
        <Text fontSize="sm" color="fg.muted">
          open: {String(panel.open)}
        </Text>
      </HStack>
      <FloatingPanel.RootProvider value={panel}>
        <Portal>
          <FloatingPanel.Positioner>
            <FloatingPanel.Content>
              <FloatingPanel.Header>
                <FloatingPanel.DragTrigger>
                  <FloatingPanel.Title>Store provider</FloatingPanel.Title>
                </FloatingPanel.DragTrigger>
                <FloatingPanel.Control>
                  <FloatingPanel.CloseTrigger>
                    <LuX />
                  </FloatingPanel.CloseTrigger>
                </FloatingPanel.Control>
              </FloatingPanel.Header>
              <FloatingPanel.Body>
                <Text>Driven from outside via useFloatingPanel.</Text>
              </FloatingPanel.Body>
            </FloatingPanel.Content>
          </FloatingPanel.Positioner>
        </Portal>
      </FloatingPanel.RootProvider>
    </>
  )
}

export function FloatingPanelBoundary() {
  const boundary = useRef<HTMLDivElement>(null)
  return (
    <Box ref={boundary} position="relative" h="280px" borderWidth="1px" rounded="md" borderStyle="dashed" p="3">
      <Text fontSize="sm" color="fg.muted">
        The panel cannot leave this box.
      </Text>
      <FloatingPanel.Root
        defaultOpen
        defaultSize={{ width: 220, height: 130 }}
        getBoundaryEl={() => boundary.current}
        defaultPosition={{ x: 20, y: 60 }}
      >
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.Header>
              <FloatingPanel.DragTrigger>
                <FloatingPanel.Title>Bounded</FloatingPanel.Title>
              </FloatingPanel.DragTrigger>
            </FloatingPanel.Header>
            <FloatingPanel.Body>
              <Text>Try dragging me out.</Text>
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggers />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </FloatingPanel.Root>
    </Box>
  )
}

export function FloatingPanelAnchor() {
  return (
    <FloatingPanel.Root
      defaultSize={{ width: 260, height: 140 }}
      getAnchorPosition={({ triggerRect }) =>
        triggerRect ? { x: triggerRect.x, y: triggerRect.y + triggerRect.height + 8 } : { x: 100, y: 100 }
      }
    >
      <FloatingPanel.Trigger asChild>
        <Button variant="outline">Opens below me</Button>
      </FloatingPanel.Trigger>
      <Portal>
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.Header>
              <FloatingPanel.DragTrigger>
                <FloatingPanel.Title>Anchored</FloatingPanel.Title>
              </FloatingPanel.DragTrigger>
              <FloatingPanel.Control>
                <FloatingPanel.CloseTrigger>
                  <LuX />
                </FloatingPanel.CloseTrigger>
              </FloatingPanel.Control>
            </FloatingPanel.Header>
            <FloatingPanel.Body>
              <Text>Positioned from the trigger rect.</Text>
            </FloatingPanel.Body>
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  )
}

const row = (name: string, type: string, description: string, def?: string) => ({ name, type, required: false, default: def, description })

export const doc: RichDoc = {
  intro: [
    "A draggable, resizable panel that floats above the page. It ships with the Indoku theme applied.",
    "Always give `CloseTrigger` and `StageTrigger` children (icons or text); they render only what you pass.",
  ],
  importCode: `import { FloatingPanel, useFloatingPanel } from "@indoku/ui"`,
  anatomy: `FloatingPanel.Root (or RootProvider)
├─ FloatingPanel.Trigger
└─ Portal
   └─ FloatingPanel.Positioner
      └─ FloatingPanel.Content
         ├─ FloatingPanel.Header
         │  ├─ FloatingPanel.DragTrigger › FloatingPanel.Title
         │  └─ FloatingPanel.Control › StageTrigger / CloseTrigger
         ├─ FloatingPanel.Body
         └─ FloatingPanel.ResizeTriggers`,
  examples: [
    { id: "basic", title: "Basic", description: "Root, Positioner, Content, Header, Body and ResizeTriggers.", fn: "FloatingPanelBasic" },
    { id: "controlled", title: "Controlled open", description: "Drive `open` and `onOpenChange` yourself.", fn: "FloatingPanelControlled" },
    { id: "stages", title: "Stage triggers", description: "`minimized`, `maximized` and `default`.", fn: "FloatingPanelStages" },
    { id: "store", title: "Store provider", description: "Create the store with `useFloatingPanel` and pass it to `RootProvider`.", fn: "FloatingPanelStore" },
    { id: "boundary", title: "Boundary constraints", description: "Keep the panel inside an element with `getBoundaryEl`.", fn: "FloatingPanelBoundary" },
    { id: "anchor", title: "Anchor positioning", description: "Compute the starting position with `getAnchorPosition`.", fn: "FloatingPanelAnchor" },
  ],
  props: [
    {
      part: "FloatingPanel.Root",
      rows: [
        row("open", "boolean", "Controlled open state."),
        row("defaultOpen", "boolean", "Initial open state.", "false"),
        row("onOpenChange", "(details: { open: boolean }) => void", "Called when the panel opens or closes."),
        row("onStageChange", "(details: { stage: 'minimized' | 'maximized' | 'default' }) => void", "Called when the stage changes."),
        row("defaultSize / size", "{ width: number; height: number }", "Initial or controlled size."),
        row("minSize / maxSize", "{ width: number; height: number }", "Resize limits."),
        row("defaultPosition / position", "{ x: number; y: number }", "Initial or controlled position."),
        row("getBoundaryEl", "() => HTMLElement | null", "Element the panel is constrained to. Defaults to the viewport."),
        row("getAnchorPosition", "(details: { triggerRect, boundaryRect }) => { x: number; y: number }", "Computes the position when the panel opens."),
        row("draggable / resizable", "boolean", "Turn dragging or resizing off.", "true"),
        row("lockAspectRatio", "boolean", "Keep the aspect ratio while resizing.", "false"),
        row("persistRect", "boolean", "Remember size and position between opens.", "false"),
      ],
    },
    {
      part: "FloatingPanel.StageTrigger",
      rows: [{ name: "stage", type: "'minimized' | 'maximized' | 'default'", required: true, description: "Stage this trigger switches to." }],
    },
    {
      part: "useFloatingPanel (store)",
      rows: [
        row("open / setOpen(open)", "boolean / fn", "Read or set the open state."),
        row("minimize() / maximize() / restore()", "() => void", "Change the stage."),
        row("setPosition(pos) / setSize(size)", "fn", "Move or resize programmatically."),
      ],
    },
  ],
  a11y: ["The title is wired to the content with `aria-labelledby`.", "Give icon-only triggers an `aria-label`."],
  notes: ["Render `Positioner` inside a `Portal` so the panel is not clipped by overflow containers.", "With `getBoundaryEl`, the boundary should be `position: relative`."],
  seeAlso: ["dialog", "popover"],
}
