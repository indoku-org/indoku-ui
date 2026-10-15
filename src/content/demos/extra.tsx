import {
  Box,
  Button,
  CodeBlock,
  ColorPicker,
  ColorSwatch,
  ColorSwatchMix,
  Combobox,
  DateInputField,
  DatePickerField,
  Dialog,
  FloatingPanel,
  HStack,
  Listbox,
  NumberInput,
  PasswordInput,
  PasswordStrengthMeter,
  PinInput,
  Portal,
  Prose,
  RatingGroup,
  RichTextEditor,
  Stack,
  TagsInput,
  Text,
  TreeView,
  createListCollection,
  createTreeCollection,
  parseColor,
  passwordStrength,
  useFilter,
  useListCollection,
} from "@indoku/ui"
import { useState } from "react"

export function ProseDemo() {
  return (
    <Prose>
      <h2>Judul bagian</h2>
      <p>
        Paragraf dengan <strong>tebal</strong>, <em>miring</em>, <a href="#prose">tautan</a>, dan <code>kode</code>. Tekan <kbd>Ctrl</kbd> + <kbd>C</kbd> untuk menyalin.
      </p>
      <ul>
        <li>Item pertama</li>
        <li>Item kedua</li>
      </ul>
      <blockquote>Kutipan yang enak dibaca.</blockquote>
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Peran</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sage</td>
            <td>Pencipta</td>
          </tr>
        </tbody>
      </table>
    </Prose>
  )
}

export function PasswordInputDemo() {
  const [pw, setPw] = useState("")
  return (
    <Stack maxW="xs" gap="3">
      <PasswordInput placeholder="Kata sandi" value={pw} onChange={(e) => setPw(e.target.value)} />
      <PasswordStrengthMeter value={passwordStrength(pw)} />
    </Stack>
  )
}

export function CodeBlockDemo() {
  const code = `import { Button } from "@indoku/ui"

// Komponen sederhana
export function App() {
  const count = 3
  return <Button variant="outline">Klik {count}</Button>
}`
  return (
    <Stack gap="4">
      <CodeBlock.Root code={code} language="tsx" title="app.tsx" showLineNumbers highlightLines={[5]} />
      <CodeBlock.Root code={`{ "name": "@indoku/ui", "private": false, "version": "0.1.0" }`} language="json" copyable={false} />
    </Stack>
  )
}

export function RichTextEditorDemo() {
  const [html, setHtml] = useState("")
  return (
    <Stack gap="3">
      <RichTextEditor.Basic defaultValue="<h2>Halo</h2><p>Coba <b>tebalkan</b> teks ini.</p>" onChange={setHtml} placeholder="Tulis sesuatu…" />
      <Text fontSize="xs" color="fg.muted" fontFamily="mono" truncate>
        {html || "(HTML keluaran muncul di sini)"}
      </Text>
    </Stack>
  )
}

export function DatePickerDemo() {
  const [d, setD] = useState<string[]>([])
  return (
    <Stack gap="4">
      <DatePickerField label="Tanggal lahir" value={d} onValueChange={setD} />
      <DatePickerField label="Menginap" mode="range" />
      <Text fontSize="xs" color="fg.muted">
        Nilai: {d.join(", ") || "-"}
      </Text>
    </Stack>
  )
}

export function DateInputDemo() {
  return (
    <Stack gap="4">
      <DateInputField label="Tanggal lahir" />
      <DateInputField label="Periode" range />
    </Stack>
  )
}

export function ColorPickerDemo() {
  return (
    <ColorPicker.Root defaultValue={parseColor("#eb5e41")} maxW="200px">
      <ColorPicker.HiddenInput />
      <ColorPicker.Label>Warna</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.Input />
        <ColorPicker.Trigger />
      </ColorPicker.Control>
      <Portal>
        <ColorPicker.Positioner>
          <ColorPicker.Content>
            <ColorPicker.Area />
            <HStack>
              <ColorPicker.EyeDropper size="xs" variant="outline" />
              <ColorPicker.Sliders />
            </HStack>
          </ColorPicker.Content>
        </ColorPicker.Positioner>
      </Portal>
    </ColorPicker.Root>
  )
}

export function ColorSwatchDemo() {
  return (
    <HStack gap="4">
      <ColorSwatch value="#bada55" size="lg" />
      <ColorSwatch value="rgba(255,0,0,0.5)" size="lg" />
      <ColorSwatchMix size="lg" items={["red", "pink", "green"]} />
    </HStack>
  )
}

export function NumberInputDemo() {
  return (
    <NumberInput.Root defaultValue="10" min={0} max={50} width="200px">
      <NumberInput.Control />
      <NumberInput.Input />
    </NumberInput.Root>
  )
}

export function TagsInputDemo() {
  return (
    <TagsInput.Root defaultValue={["React", "Emotion"]} maxW="sm">
      <TagsInput.Label>Tag</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Tambah tag…" />
      </TagsInput.Control>
    </TagsInput.Root>
  )
}

export function RatingDemo() {
  return (
    <Stack gap="3">
      <RatingGroup.Root count={5} defaultValue={3} size="md">
        <RatingGroup.HiddenInput />
        <RatingGroup.Control />
      </RatingGroup.Root>
      <RatingGroup.Root allowHalf readOnly count={5} defaultValue={3.5} size="sm">
        <RatingGroup.HiddenInput />
        <RatingGroup.Control />
      </RatingGroup.Root>
    </Stack>
  )
}

export function PinInputDemo() {
  return (
    <PinInput.Root otp>
      <PinInput.HiddenInput />
      <PinInput.Control>
        {[0, 1, 2, 3].map((i) => (
          <PinInput.Input key={i} index={i} />
        ))}
      </PinInput.Control>
    </PinInput.Root>
  )
}

const frameworks = ["React", "Solid", "Vue", "Angular", "Svelte", "Next.js"].map((label) => ({ label, value: label.toLowerCase() }))

export function ComboboxDemo() {
  const { contains } = useFilter({ sensitivity: "base" })
  const { collection, filter } = useListCollection({ initialItems: frameworks, filter: contains })
  return (
    <Combobox.Root collection={collection} onInputValueChange={(e) => filter(e.inputValue)} width="320px">
      <Combobox.Label>Pilih framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Ketik untuk mencari" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>Tidak ada hasil</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value}>
                {item.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

const listFrameworks = createListCollection({ items: frameworks })

export function ListboxDemo() {
  return (
    <Listbox.Root collection={listFrameworks} selectionMode="multiple" width="320px">
      <Listbox.Label>Pilih framework</Listbox.Label>
      <Listbox.Content>
        {listFrameworks.items.map((item) => (
          <Listbox.Item item={item} key={item.value}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  )
}

interface TreeNode {
  id: string
  name: string
  children?: TreeNode[]
}

const tree = createTreeCollection<TreeNode>({
  nodeToValue: (n) => n.id,
  nodeToString: (n) => n.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      { id: "src", name: "src", children: [{ id: "src/app.tsx", name: "app.tsx" }, { id: "src/index.ts", name: "index.ts" }] },
      { id: "package.json", name: "package.json" },
      { id: "readme", name: "README.md" },
    ],
  },
})

export function TreeViewDemo() {
  return (
    <TreeView.Root collection={tree} maxW="xs">
      <TreeView.Label>Berkas</TreeView.Label>
      <TreeView.Tree>
        <TreeView.Node
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

export function DialogDemo() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Buka dialog</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Judul dialog</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>Isi dialog. Tekan Esc atau klik di luar untuk menutup.</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Batal</Button>
              </Dialog.ActionTrigger>
              <Button>Simpan</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export function FloatingPanelDemo() {
  return (
    <FloatingPanel.Root defaultSize={{ width: 320, height: 200 }} minSize={{ width: 240, height: 140 }}>
      <FloatingPanel.Trigger asChild>
        <Button variant="outline">Buka panel</Button>
      </FloatingPanel.Trigger>
      <Portal>
        <FloatingPanel.Positioner>
          <FloatingPanel.Content>
            <FloatingPanel.Header>
              <FloatingPanel.DragTrigger>
                <FloatingPanel.Title>Panel melayang</FloatingPanel.Title>
              </FloatingPanel.DragTrigger>
              <FloatingPanel.Control>
                <FloatingPanel.CloseTrigger />
              </FloatingPanel.Control>
            </FloatingPanel.Header>
            <FloatingPanel.Body>
              <Box>Geser header untuk memindah, tarik tepi untuk mengubah ukuran.</Box>
            </FloatingPanel.Body>
            <FloatingPanel.ResizeTriggers />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  )
}
