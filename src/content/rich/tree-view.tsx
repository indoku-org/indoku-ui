import { Button, createTreeCollection, HStack, Stack, Text, TreeView } from "@indoku/ui"
import { useState } from "react"
import { LuChevronRight, LuFile, LuFolder, LuFolderOpen } from "react-icons/lu"
import type { RichDoc } from "../types"

interface Node {
  id: string
  name: string
  children?: Node[]
}

const tree = createTreeCollection<Node>({
  nodeToValue: (n) => n.id,
  nodeToString: (n) => n.name,
  nodeToChildren: (n) => n.children ?? [],
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "src",
        name: "src",
        children: [
          { id: "src/components", name: "components", children: [{ id: "src/components/button.tsx", name: "button.tsx" }, { id: "src/components/card.tsx", name: "card.tsx" }] },
          { id: "src/index.ts", name: "index.ts" },
        ],
      },
      { id: "public", name: "public", children: [{ id: "public/favicon.svg", name: "favicon.svg" }] },
      { id: "package.json", name: "package.json" },
      { id: "readme", name: "README.md" },
    ],
  },
})

export function TreeViewBasic() {
  return (
    <TreeView.Root collection={tree} maxW="xs" defaultExpandedValue={["src"]}>
      <TreeView.Label>Files</TreeView.Label>
      <TreeView.Tree>
        <TreeView.Node<Node>
          indentGuide={<TreeView.BranchIndentGuide />}
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <TreeView.BranchControl>
                <TreeView.BranchText>{node.name}</TreeView.BranchText>
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item>
                <TreeView.ItemText>{node.name}</TreeView.ItemText>
              </TreeView.Item>
            )
          }
        />
      </TreeView.Tree>
    </TreeView.Root>
  )
}

export function TreeViewIcons() {
  return (
    <TreeView.Root collection={tree} maxW="xs" defaultExpandedValue={["src"]}>
      <TreeView.Tree>
        <TreeView.Node<Node>
          indentGuide={<TreeView.BranchIndentGuide />}
          render={({ node, nodeState }) =>
            nodeState.isBranch ? (
              <TreeView.BranchControl>
                <TreeView.BranchIndicator>
                  <LuChevronRight />
                </TreeView.BranchIndicator>
                {nodeState.expanded ? <LuFolderOpen /> : <LuFolder />}
                <TreeView.BranchText>{node.name}</TreeView.BranchText>
              </TreeView.BranchControl>
            ) : (
              <TreeView.Item>
                <LuFile />
                <TreeView.ItemText>{node.name}</TreeView.ItemText>
              </TreeView.Item>
            )
          }
        />
      </TreeView.Tree>
    </TreeView.Root>
  )
}

export function TreeViewControlled() {
  const [expanded, setExpanded] = useState<string[]>(["src"])
  const [selected, setSelected] = useState<string[]>([])
  return (
    <Stack gap="4" maxW="xs">
      <HStack>
        <Button size="xs" variant="outline" onClick={() => setExpanded(tree.getBranchValues())}>
          Expand all
        </Button>
        <Button size="xs" variant="outline" onClick={() => setExpanded([])}>
          Collapse all
        </Button>
      </HStack>
      <TreeView.Root
        collection={tree}
        expandedValue={expanded}
        onExpandedChange={(d) => setExpanded(d.expandedValue)}
        selectedValue={selected}
        onSelectionChange={(d) => setSelected(d.selectedValue)}
      >
        <TreeView.Tree>
          <TreeView.Node<Node>
            indentGuide={<TreeView.BranchIndentGuide />}
            render={({ node, nodeState }) =>
              nodeState.isBranch ? (
                <TreeView.BranchControl>
                  {nodeState.expanded ? <LuFolderOpen /> : <LuFolder />}
                  <TreeView.BranchText>{node.name}</TreeView.BranchText>
                </TreeView.BranchControl>
              ) : (
                <TreeView.Item>
                  <LuFile />
                  <TreeView.ItemText>{node.name}</TreeView.ItemText>
                </TreeView.Item>
              )
            }
          />
        </TreeView.Tree>
      </TreeView.Root>
      <Text fontSize="sm" color="fg.muted">
        Selected: {selected.join(", ") || "none"}
      </Text>
    </Stack>
  )
}

export const doc: RichDoc = {
  intro: [
    "A hierarchical list that can be expanded and collapsed. It ships unstyled on purpose: you decide what a folder and a file look like inside `TreeView.Node render`.",
    "Want folder and file icons without writing the render function? Use [File Tree](/docs/file-tree), a ready-made layer on top of this component.",
  ],
  importCode: 'import { TreeView, createTreeCollection } from "@indoku/ui"',
  anatomy: `TreeView.Root (collection)
├─ TreeView.Label
└─ TreeView.Tree
   └─ TreeView.Node (render)
      ├─ TreeView.BranchControl      folders
      │  ├─ TreeView.BranchIndicator  chevron, rotates when open
      │  └─ TreeView.BranchText
      └─ TreeView.Item               files
         └─ TreeView.ItemText`,
  examples: [
    { id: "basic", title: "Without icons", description: "The minimal version: text only. Folders show no indicator at all unless you add one.", fn: "TreeViewBasic", helpers: ["Node", "tree"] },
    {
      id: "icons",
      title: "With icons",
      description: "`nodeState.expanded` tells you whether a folder is open, so you can swap the closed and open folder icons. The chevron goes inside `TreeView.BranchIndicator`, which rotates it for you.",
      fn: "TreeViewIcons",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Drive expansion and selection from your own state, for example to add expand-all and collapse-all buttons. `tree.getBranchValues()` returns every folder id.",
      fn: "TreeViewControlled",
    },
  ],
  a11y: [
    "Follows the WAI-ARIA tree view pattern: `role=\"tree\"` and `treeitem`, with `aria-expanded` on folders.",
    "Arrow keys move between nodes and expand or collapse folders, Home and End jump to the first and last node, Enter or Space selects.",
    "Icons are decorative. Keep the text in `BranchText` and `ItemText` so screen readers can announce each node.",
  ],
  notes: [
    "Every node needs a unique `id`. It is the value used by `expandedValue` and `selectedValue`.",
    "Icons you add are plain children, so they are not part of the theme: size them yourself (the `Icon` component or the `boxSize` prop on SVGs).",
  ],
  seeAlso: ["file-tree", "accordion", "menu"],
}
