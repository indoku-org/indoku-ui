import { Button, FileTree, HStack, Stack, Text } from "@indoku/ui"
import type { FileTreeNode } from "@indoku/ui"
import { useState } from "react"
import { LuBookOpen, LuFile, LuFileCode, LuFileJson, LuFileText, LuFolder, LuFolderOpen, LuImage } from "react-icons/lu"
import type { RichDoc } from "../types"

const files: FileTreeNode[] = [
  {
    id: "src",
    name: "src",
    children: [
      { id: "src/components", name: "components", children: [{ id: "src/components/button.tsx", name: "button.tsx" }, { id: "src/components/card.tsx", name: "card.tsx" }] },
      { id: "src/index.ts", name: "index.ts" },
    ],
  },
  { id: "public", name: "public", children: [{ id: "public/logo.png", name: "logo.png" }, { id: "public/favicon.svg", name: "favicon.svg" }] },
  { id: "empty", name: "empty-folder", children: [] },
  { id: "package.json", name: "package.json" },
  { id: "readme", name: "README.md" },
]

export function FileTreeBasic() {
  return <FileTree items={files} label="Project" defaultExpandedValue={["src"]} maxW="xs" />
}

export function FileTreeByExtension() {
  const iconFor = (node: FileTreeNode) => {
    const ext = node.name.split(".").pop()
    if (ext === "ts" || ext === "tsx") return <LuFileCode />
    if (ext === "json") return <LuFileJson />
    if (ext === "md") return <LuFileText />
    if (ext === "png" || ext === "svg") return <LuImage />
    return <LuFile />
  }
  return (
    <FileTree
      items={files}
      defaultExpandedValue={["src", "src/components"]}
      folderIcon={<LuFolder />}
      folderOpenIcon={<LuFolderOpen />}
      fileIcon={iconFor}
      maxW="xs"
    />
  )
}

export function FileTreeNodeIcon() {
  const items: FileTreeNode[] = [
    { id: "docs", name: "docs", icon: <LuBookOpen />, children: [{ id: "docs/intro.md", name: "intro.md" }] },
    { id: "src", name: "src", children: [{ id: "src/index.ts", name: "index.ts" }] },
  ]
  return <FileTree items={items} defaultExpandedValue={["docs", "src"]} maxW="xs" />
}

export function FileTreeControlled() {
  const [expanded, setExpanded] = useState<string[]>(["src"])
  const [selected, setSelected] = useState<string[]>([])
  const folders = ["src", "src/components", "public", "empty"]
  return (
    <Stack gap="4" maxW="xs">
      <HStack>
        <Button size="xs" variant="outline" onClick={() => setExpanded(folders)}>
          Expand all
        </Button>
        <Button size="xs" variant="outline" onClick={() => setExpanded([])}>
          Collapse all
        </Button>
      </HStack>
      <FileTree
        items={files}
        expandedValue={expanded}
        onExpandedChange={(d) => setExpanded(d.expandedValue)}
        selectedValue={selected}
        onSelectionChange={(d) => setSelected(d.selectedValue)}
      />
      <Text fontSize="sm" color="fg.muted">
        Selected: {selected.join(", ") || "none"}
      </Text>
    </Stack>
  )
}

export function FileTreeMinimal() {
  return <FileTree items={files} showChevron={false} indentGuides={false} selectionMode="multiple" defaultExpandedValue={["src"]} maxW="xs" />
}

export const doc: RichDoc = {
  intro: [
    "A tree of folders and files with the icons already wired up: the folder icon switches between closed and open, files get a document icon, and folders get a chevron. Built on [Tree View](/docs/tree-view), so every Tree View prop works here too.",
    "Pass plain data (`id`, `name`, `children`) instead of writing a render function. Use `TreeView` directly when you need checkboxes, renaming or a fully custom row.",
  ],
  importCode: 'import { FileTree } from "@indoku/ui"',
  anatomy: `<FileTree items={[{ id, name, children?, icon? }]} />

node with children (even [])  ->  folder: chevron + folder icon (closed or open) + name
node without children         ->  file:   file icon + name`,
  examples: [
    { id: "basic", title: "Default icons", description: "Folders open and close, and the icon follows. Folders with an empty `children` array still count as folders.", fn: "FileTreeBasic", helpers: ["files"] },
    {
      id: "by-extension",
      title: "Icons by file type",
      description: "`fileIcon` accepts a function that receives the node, so you can choose an icon from the name or extension. `folderIcon` and `folderOpenIcon` take plain elements.",
      fn: "FileTreeByExtension",
    },
    {
      id: "node-icon",
      title: "Icon on a single node",
      description: "Set `icon` on a node to override the icon for that node, in both the open and closed state.",
      fn: "FileTreeNodeIcon",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Use `expandedValue` and `selectedValue` to drive the tree from your own state. Values are node ids.",
      fn: "FileTreeControlled",
    },
    {
      id: "minimal",
      title: "No chevron, no guides, multiple selection",
      description: "Turn off the chevron with `showChevron={false}` and the guide lines with `indentGuides={false}`. `selectionMode` comes straight from Tree View.",
      fn: "FileTreeMinimal",
    },
  ],
  a11y: [
    "Same behavior as Tree View: WAI-ARIA tree pattern, arrow keys to move and expand or collapse, Home and End, Enter or Space to select.",
    "Default icons are decorative (`aria-hidden`). When you pass your own icons, keep them decorative too; the node name carries the meaning.",
  ],
  notes: [
    "`items` should be a stable reference (module constant or `useMemo`). A new array on every render rebuilds the tree.",
    "Node `id` must be unique across the whole tree, not just among siblings. Paths such as `src/components/button.tsx` work well.",
    "Default icons are inline SVG, so the component adds no icon dependency. Any React element works as a custom icon.",
  ],
  seeAlso: ["tree-view", "accordion"],
}
