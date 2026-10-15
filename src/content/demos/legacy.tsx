// GENERATED sekali dari main.tsx lama, sekarang diedit manual. Tiap komponen = satu entri di `demos`.
import { useState } from "react"
import {
  Alert,
  Attachment,
  Avatar,
  Badge,
  Box,
  BarChart,
  Bubble,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Checkbox,
  ColorModeButton,
  Command,
  DataTable,
  Direction,
  Flex,
  Form,
  Heading,
  HStack,
  Input,
  Item,
  Accordion,
  AspectRatio,
  Breadcrumb,
  LineChart,
  Marker,
  Menubar,
  Message,
  MessageScroller,
  NavigationMenu,
  PieChart,
  Provider,
  RadioGroup,
  Sidebar,
  Stack,
  Switch,
  Text,
  Textarea,
  toast,
  toaster,
  Toaster,
  createToaster,
  ToggleGroup,
  Combobox,
  createListCollection,
  Flash,
  HoverCard,
  Kbd,
  Menu,
  Pagination,
  Popover,
  Portal,
  Progress,
  Select,
  Clipboard,
  DataList,
  Skeleton,
  Stat,
  Status,
  Steps,
  Tabs,
} from "@indoku/ui"
import * as N from "./new"
import type { ComponentType } from "react"

/* eslint-disable */
/* -------------------------------------------------------------------------- */
/* Demo: Command palette (dialog + hotkey Cmd/Ctrl+K)                         */
/* -------------------------------------------------------------------------- */

function CommandDemo() {
  const [open, setOpen] = useState(false)
  const [picked, setPicked] = useState<string | null>(null)

  return (
    <Stack gap="2">
      <HStack gap="3">
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
          Open command palette
          <Command.Shortcut position="static" ms="2">
            ⌘K
          </Command.Shortcut>
        </Button>
        {picked && <Text fontSize="sm" color="fg.muted">Picked: {picked}</Text>}
      </HStack>

      <Command.Dialog open={open} onOpenChange={setOpen} hotkey="k" title="Command palette">
        <Command.Input placeholder="Type a command or search..." />
        <Command.List>
          <Command.Empty />
          <Command.Group heading="Suggestions">
            <Command.Item value="Calendar" onSelect={(v) => { setPicked(v); setOpen(false) }}>
              Calendar
            </Command.Item>
            <Command.Item value="Search Emoji" onSelect={(v) => { setPicked(v); setOpen(false) }}>
              Search Emoji
            </Command.Item>
            <Command.Item value="Calculator" keywords={["math"]} onSelect={(v) => { setPicked(v); setOpen(false) }}>
              Calculator
            </Command.Item>
          </Command.Group>
          <Command.Separator />
          <Command.Group heading="Settings">
            <Command.Item value="Profile" onSelect={(v) => { setPicked(v); setOpen(false) }}>
              Profile
              <Command.Shortcut>⌘P</Command.Shortcut>
            </Command.Item>
            <Command.Item value="Billing" onSelect={(v) => { setPicked(v); setOpen(false) }}>
              Billing
              <Command.Shortcut>⌘B</Command.Shortcut>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </Stack>
  )
}

/* -------------------------------------------------------------------------- */
/* Demo: DataTable                                                            */
/* -------------------------------------------------------------------------- */

interface Invoice {
  id: string
  status: "paid" | "pending" | "failed"
  amount: number
  email: string
}

const invoices: Invoice[] = [
  { id: "INV001", status: "paid", amount: 250, email: "ken99@example.com" },
  { id: "INV002", status: "pending", amount: 150, email: "abe45@example.com" },
  { id: "INV003", status: "failed", amount: 350, email: "monserrat44@example.com" },
  { id: "INV004", status: "paid", amount: 450, email: "silas22@example.com" },
  { id: "INV005", status: "paid", amount: 550, email: "carmella@example.com" },
  { id: "INV006", status: "pending", amount: 200, email: "jason78@example.com" },
  { id: "INV007", status: "failed", amount: 300, email: "edna11@example.com" },
]

const statusColor: Record<Invoice["status"], string> = {
  paid: "green",
  pending: "yellow",
  failed: "red",
}

const invoiceColumns: DataTableColumnDefs = [
  { id: "id", header: "Invoice", sortable: true, hideable: false },
  {
    id: "status",
    header: "Status",
    sortable: true,
    cell: ({ value }) => (
      <Badge variant="subtle" colorPalette={statusColor[value as Invoice["status"]]} textTransform="capitalize">
        {String(value)}
      </Badge>
    ),
  },
  { id: "email", header: "Email", sortable: true },
  {
    id: "amount",
    header: "Amount",
    sortable: true,
    align: "end",
    cell: ({ value }) => `$${(value as number).toFixed(2)}`,
  },
]

// alias biar TS nggak protes soal generic di literal array di atas
type DataTableColumnDefs = import("@indoku/ui").DataTableColumn<Invoice>[]

function DataTableDemo() {
  return (
    <DataTable.Root data={invoices} columns={invoiceColumns} getRowId={(row) => row.id} pageSize={5} selectable>
      <DataTable.Toolbar>
        <DataTable.Search />
        <DataTable.ColumnToggle />
      </DataTable.Toolbar>
      <DataTable.Table />
      <DataTable.Pagination />
    </DataTable.Root>
  )
}

/* -------------------------------------------------------------------------- */
/* Demo: Navigation Menu                                                     */
/* -------------------------------------------------------------------------- */

function NavigationMenuDemo() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.ContentGrid columns={2}>
              <NavigationMenu.ContentLink href="#" title="Analytics" description="Pantau metrik produk lo secara real-time." />
              <NavigationMenu.ContentLink href="#" title="Automation" description="Otomatisin workflow tanpa kode." />
              <NavigationMenu.ContentLink href="#" title="Integrations" description="Sambungin ke tools yang udah lo pake." />
              <NavigationMenu.ContentLink href="#" title="Security" description="Kontrol akses & audit log." />
            </NavigationMenu.ContentGrid>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <Stack gap="1" minW="48">
              <NavigationMenu.ContentLink href="#" title="Docs" />
              <NavigationMenu.ContentLink href="#" title="Blog" />
              <NavigationMenu.ContentLink href="#" title="Changelog" />
            </Stack>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#">Pricing</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )
}

/* -------------------------------------------------------------------------- */
/* Demo: Chart (SVG murni, line/bar/pie)                                     */
/* -------------------------------------------------------------------------- */

function ChartDemo() {
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"]

  return (
    <Stack gap="6">
      <HStack gap="8" wrap="wrap" align="flex-start">
        <Stack gap="2" flex="1" minW="260px">
          <Text fontSize="xs" color="fg.muted">Line (area) - Revenue vs Cost</Text>
          <LineChart
            categories={months}
            area
            series={[
              { name: "Revenue", values: [120, 180, 150, 220, 260, 240] },
              { name: "Cost", color: "red.500", values: [80, 90, 100, 110, 120, 130] },
            ]}
          />
        </Stack>
        <Stack gap="2" flex="1" minW="260px">
          <Text fontSize="xs" color="fg.muted">Bar - New users per bulan</Text>
          <BarChart categories={months} series={[{ name: "Users", values: [40, 65, 52, 90, 78, 100] }]} />
        </Stack>
      </HStack>

      <Stack gap="2">
        <Text fontSize="xs" color="fg.muted">Pie/Donut - Traffic source</Text>
        <PieChart
          innerRadiusRatio={0.6}
          size={160}
          data={[
            { name: "Organic", value: 45 },
            { name: "Direct", value: 25 },
            { name: "Referral", value: 18 },
            { name: "Social", value: 12 },
          ]}
        />
      </Stack>
    </Stack>
  )
}

/* -------------------------------------------------------------------------- */
/* Demo: Form (useForm + Form.Field, tanpa react-hook-form)                  */
/* -------------------------------------------------------------------------- */

interface LoginValues {
  email: string
  password: string
}

function FormDemo() {
  const [submitted, setSubmitted] = useState<LoginValues | null>(null)

  const form = Form.useForm<LoginValues>({
    defaultValues: { email: "", password: "" },
    validators: {
      email: (v) => (!v.includes("@") ? "Email nggak valid" : undefined),
      password: (v) => (v.length < 8 ? "Minimal 8 karakter" : undefined),
    },
    onSubmit: async (values) => {
      setSubmitted(values)
    },
  })

  return (
    <Stack as="form" gap="4" maxW="sm" onSubmit={form.handleSubmit}>
      <Form.Field meta={form.getFieldMeta("email")} label="Email" required>
        <Input type="email" placeholder="kamu@contoh.com" {...form.getInputProps("email")} />
      </Form.Field>

      <Form.Field
        meta={form.getFieldMeta("password")}
        label="Password"
        required
        helperText="Minimal 8 karakter."
      >
        <Input type="password" {...form.getInputProps("password")} />
      </Form.Field>

      <HStack gap="3">
        <Button type="submit" loading={form.isSubmitting}>
          Masuk
        </Button>
        <Button type="button" variant="outline" onClick={() => { form.reset(); setSubmitted(null) }}>
          Reset
        </Button>
      </HStack>

      {submitted && (
        <Text fontSize="sm" color="fg.muted">
          Submitted: {submitted.email}
        </Text>
      )}
    </Stack>
  )
}

/* -------------------------------------------------------------------------- */
/* Demo: Calendar                                                            */
/* -------------------------------------------------------------------------- */

function CalendarDemo() {
  return (
    <HStack gap="6" wrap="wrap" align="flex-start">
      <Stack gap="2">
        <Text fontSize="xs" color="fg.muted">Single</Text>
        <Calendar.Root />
      </Stack>
      <Stack gap="2">
        <Text fontSize="xs" color="fg.muted">Range, 2 bulan</Text>
        <Calendar.Root selectionMode="range" numOfMonths={2} />
      </Stack>
    </HStack>
  )
}

/* -------------------------------------------------------------------------- */
/* Demo: Menubar                                                             */
/* -------------------------------------------------------------------------- */

function MenubarDemo() {
  const [bookmarksBar, setBookmarksBar] = useState(true)
  const [fullUrls, setFullUrls] = useState(false)

  return (
    <Menubar.Root>
      <Menubar.MenuItem label="File">
        <Menubar.Item value="new-tab">
          New Tab <Menubar.ItemCommand>⌘T</Menubar.ItemCommand>
        </Menubar.Item>
        <Menubar.Item value="new-window">
          New Window <Menubar.ItemCommand>⌘N</Menubar.ItemCommand>
        </Menubar.Item>
        <Menubar.Separator />
        <Menubar.Item value="share">Share</Menubar.Item>
        <Menubar.Separator />
        <Menubar.Item value="print">
          Print... <Menubar.ItemCommand>⌘P</Menubar.ItemCommand>
        </Menubar.Item>
      </Menubar.MenuItem>

      <Menubar.MenuItem label="Edit">
        <Menubar.Item value="undo">
          Undo <Menubar.ItemCommand>⌘Z</Menubar.ItemCommand>
        </Menubar.Item>
        <Menubar.Item value="redo">
          Redo <Menubar.ItemCommand>⇧⌘Z</Menubar.ItemCommand>
        </Menubar.Item>
        <Menubar.Separator />
        <Menubar.Item value="cut">Cut</Menubar.Item>
        <Menubar.Item value="copy">Copy</Menubar.Item>
        <Menubar.Item value="paste">Paste</Menubar.Item>
      </Menubar.MenuItem>

      <Menubar.MenuItem label="View">
        <Menubar.CheckboxItem
          value="bookmarks-bar"
          checked={bookmarksBar}
          onCheckedChange={(checked) => setBookmarksBar(checked)}
        >
          <Menubar.ItemIndicator>✓</Menubar.ItemIndicator>
          Show Bookmarks Bar
        </Menubar.CheckboxItem>
        <Menubar.CheckboxItem
          value="full-urls"
          checked={fullUrls}
          onCheckedChange={(checked) => setFullUrls(checked)}
        >
          <Menubar.ItemIndicator>✓</Menubar.ItemIndicator>
          Show Full URLs
        </Menubar.CheckboxItem>
      </Menubar.MenuItem>

      <Menubar.MenuItem label="Help" disabled>
        <Menubar.Item value="about">About</Menubar.Item>
      </Menubar.MenuItem>
    </Menubar.Root>
  )
}

/* -------------------------------------------------------------------------- */
/* Demo: Direction (RTL/LTR)                                                 */
/* -------------------------------------------------------------------------- */

function DirectionDemo() {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr")

  return (
    <Stack gap="3">
      <HStack gap="2">
        <Button size="sm" variant={dir === "ltr" ? "solid" : "outline"} onClick={() => setDir("ltr")}>
          LTR
        </Button>
        <Button size="sm" variant={dir === "rtl" ? "solid" : "outline"} onClick={() => setDir("rtl")}>
          RTL
        </Button>
      </HStack>
      <Direction.Root dir={dir}>
        <Card.Root p="4" maxW="sm">
          <Text fontSize="sm" fontWeight="medium">
            {dir === "rtl" ? "مرحبا بكم في التطبيق" : "Welcome to the app"}
          </Text>
          <HStack gap="2" mt="3">
            <Button size="sm" variant="outline">Cancel</Button>
            <Button size="sm">Continue</Button>
          </HStack>
        </Card.Root>
      </Direction.Root>
    </Stack>
  )
}

/* -------------------------------------------------------------------------- */
/* Demo: Select, Combobox, Pagination                                        */
/* -------------------------------------------------------------------------- */

const frameworks = createListCollection({
  items: [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
    { label: "Solid", value: "solid" },
  ],
})

const fruits = ["Apple", "Banana", "Cherry", "Durian", "Grape", "Mango", "Orange"]

function ComboboxDemo() {
  const [items, setItems] = useState(fruits)

  return (
    <Combobox.Root
      width="64"
      collection={createListCollection({ items })}
      onInputValueChange={(details) =>
        setItems(fruits.filter((f) => f.toLowerCase().includes(details.inputValue.toLowerCase())))
      }
    >
      <Combobox.Control>
        <Combobox.Input placeholder="Cari buah..." />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>Nggak ketemu.</Combobox.Empty>
            {items.map((item) => (
              <Combobox.Item key={item} item={item}>
                <Combobox.ItemText>{item}</Combobox.ItemText>
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

function PaginationDemo() {
  const [page, setPage] = useState(1)
  return (
    <Pagination.Root count={50} pageSize={10} page={page} onPageChange={(d) => setPage(d.page)}>
      <Pagination.Content>
        <Pagination.Previous />
        <Pagination.Pages />
        <Pagination.Next />
      </Pagination.Content>
    </Pagination.Root>
  )
}


/* -------------------------------------------------------------------------- */
/* App                                                                        */
/* -------------------------------------------------------------------------- */



/* -------------------------------------------------------------------------- */
/* Demo: MessageScroller (auto-scroll + scroll-to-bottom button)              */
/* -------------------------------------------------------------------------- */

function MessageScrollerDemo() {
  const rows = Array.from({ length: 20 }, (_, i) => i + 1)
  return (
    <Card.Root h="64" overflow="hidden" position="relative">
      <MessageScroller.Root p="4" watch={[]}>
        <Stack gap="2">
          {rows.map((n) => (
            <Text key={n} fontSize="sm" color="fg.muted">
              Pesan #{n} - scroll turun buat liat tombol "ke bawah" muncul.
            </Text>
          ))}
        </Stack>
      </MessageScroller.Root>
    </Card.Root>
  )
}

/* -------------------------------------------------------------------------- */
/* Demo: Message (baris pesan + avatar + header/footer, berdiri sendiri)      */
/* -------------------------------------------------------------------------- */

function MessageDemo() {
  return (
    <Card.Root p="4">
      <Stack gap="4">
        <Message.Root align="start">
          <Message.Avatar>
            <Avatar.Root size="xs">
              <Avatar.Fallback name="Indoku Bot" />
            </Avatar.Root>
          </Message.Avatar>
          <Message.Content>
            <Message.Header>Indoku Bot · 09:41</Message.Header>
            <Text fontSize="sm">Halo! Ada yang bisa dibantu hari ini?</Text>
          </Message.Content>
        </Message.Root>

        <Message.Root align="end">
          <Message.Avatar />
          <Message.Content>
            <Text fontSize="sm">Tolong cek invoice bulan ini dong</Text>
            <Message.Footer>Sent</Message.Footer>
          </Message.Content>
        </Message.Root>
      </Stack>
    </Card.Root>
  )
}

/* -------------------------------------------------------------------------- */
/* Demo: Attachment (kartu file, berdiri sendiri)                             */
/* -------------------------------------------------------------------------- */

function AttachmentDemo() {
  return (
    <Stack gap="3" maxW="sm">
      <Attachment.Root>
        <Attachment.Media />
        <Attachment.Content>
          <Attachment.Name>invoice-september.pdf</Attachment.Name>
          <Attachment.Meta size={482000} />
        </Attachment.Content>
      </Attachment.Root>

      <Attachment.Root>
        <Attachment.Media />
        <Attachment.Content>
          <Attachment.Name>rekap-penjualan.xlsx</Attachment.Name>
          <Attachment.Status status="uploading" progress={64} />
        </Attachment.Content>
        <Attachment.Actions>
          <Attachment.Action aria-label="Batalkan">✕</Attachment.Action>
        </Attachment.Actions>
      </Attachment.Root>
    </Stack>
  )
}

/* -------------------------------------------------------------------------- */
/* Demo: Marker (separator tanggal, status/tone, typing indicator)            */
/* -------------------------------------------------------------------------- */

function MarkerDemo() {
  return (
    <Stack gap="4">
      <Marker.Separator>Today</Marker.Separator>
      <Marker.Status tone="info">
        <Marker.TypingIndicator />
        Indoku Bot is typing...
      </Marker.Status>
      <Marker.Status tone="success">Pesan terkirim</Marker.Status>
      <Marker.Status tone="error">Gagal ngirim, coba lagi</Marker.Status>
    </Stack>
  )
}

/* -------------------------------------------------------------------------- */
/* Demo: Chat gabungan - semua komponen chat kepake bareng dalam satu layar   */
/* (MessageScroller + Message.Group + Bubble variants/reactions/reasoning +  */
/* Attachment + Marker), biar keliatan gimana hasilnya kalo dicombine.        */
/* -------------------------------------------------------------------------- */

function ChatComposedDemo() {
  const [reasoningOpen, setReasoningOpen] = useState(false)
  const botAvatar = (
    <Avatar.Root size="xs">
      <Avatar.Fallback name="Indoku Bot" />
    </Avatar.Root>
  )

  return (
    <Card.Root h="96" overflow="hidden">
      <MessageScroller.Root p="4" watch={[reasoningOpen]}>
        <Stack gap="5">
          <Marker.Separator>Today</Marker.Separator>

          {/* Message.Group: 2 balasan bot berurutan numpuk rapet, satu avatar di bawah grup */}
          <Message.Group avatar={botAvatar} avatarPosition="bottom" header="Indoku Bot · 09:41">
            <Bubble.Root align="start">
              <Bubble.Content>Hey! Mau liat chat bubble?</Bubble.Content>
            </Bubble.Root>
            <Bubble.Root align="start">
              <Bubble.Content>
                Gue bisa ngegrupin pesan, gonta-ganti sisi, dan bikin satu thread gampang dipindai.
              </Bubble.Content>
              <Bubble.Footer>
                <Bubble.Action aria-label="Like">👍</Bubble.Action>
                <Bubble.Action aria-label="Fire">🔥</Bubble.Action>
              </Bubble.Footer>
            </Bubble.Root>
          </Message.Group>

          <Message.Root align="end">
            <Message.Avatar />
            <Message.Content>
              <Bubble.Root align="end" variant="solid">
                <Bubble.Content>Mantap. Coba kirim lampiran juga dong.</Bubble.Content>
              </Bubble.Root>
            </Message.Content>
          </Message.Root>

          <Message.Group avatar={botAvatar} avatarPosition="bottom">
            <Bubble.Root align="start">
              <Bubble.Content>
                Nih rekapnya.
                <Attachment.Root mt="2">
                  <Attachment.Media />
                  <Attachment.Content>
                    <Attachment.Name>invoice-september.pdf</Attachment.Name>
                    <Attachment.Meta size={482000} />
                  </Attachment.Content>
                </Attachment.Root>
                <Bubble.Collapsible
                  open={reasoningOpen}
                  onOpenChange={setReasoningOpen}
                  label="Show reasoning"
                  mt="2"
                >
                  Ngambil data invoice bulan ini, ngitung total, terus dirender jadi kartu attachment.
                </Bubble.Collapsible>
              </Bubble.Content>
            </Bubble.Root>
          </Message.Group>

          <Marker.Status tone="info">
            <Marker.TypingIndicator />
            Indoku Bot is typing...
          </Marker.Status>
        </Stack>
      </MessageScroller.Root>
    </Card.Root>
  )
}

/* -------------------------------------------------------------------------- */
/* Demo: Message.Group avatarPosition - "top" vs "bottom" vs "none"          */
/* -------------------------------------------------------------------------- */

function AvatarPositionDemo() {
  const botAvatar = (
    <Avatar.Root size="xs">
      <Avatar.Fallback name="Indoku Bot" />
    </Avatar.Root>
  )

  const bubbles = (
    <>
      <Bubble.Root align="start">
        <Bubble.Content>Baris pertama grup ini.</Bubble.Content>
      </Bubble.Root>
      <Bubble.Root align="start">
        <Bubble.Content>Baris kedua, numpuk rapet di bawahnya.</Bubble.Content>
      </Bubble.Root>
    </>
  )

  return (
    <Stack gap="6">
      <Stack gap="2">
        <Text fontSize="xs" fontWeight="medium" color="fg.subtle">
          avatarPosition=&quot;top&quot; (ala Slack - avatar+nama sejajar bubble pertama)
        </Text>
        <Message.Group avatar={botAvatar} avatarPosition="top" header="Indoku Bot · 09:41">
          {bubbles}
        </Message.Group>
      </Stack>

      <Stack gap="2">
        <Text fontSize="xs" fontWeight="medium" color="fg.subtle">
          avatarPosition=&quot;bottom&quot; (default, ala iMessage/WhatsApp - avatar sejajar bubble terakhir)
        </Text>
        <Message.Group avatar={botAvatar} avatarPosition="bottom">
          {bubbles}
        </Message.Group>
      </Stack>

      <Stack gap="2">
        <Text fontSize="xs" fontWeight="medium" color="fg.subtle">
          avatarPosition=&quot;none&quot; (nggak ada avatar, grup ngepas ke tepi)
        </Text>
        <Message.Group avatarPosition="none">{bubbles}</Message.Group>
      </Stack>
    </Stack>
  )
}


/* -------------------------------------------------------------------------- */
/* Demo: ButtonGroup, Avatar, AspectRatio, Accordion, Breadcrumb              */
/* -------------------------------------------------------------------------- */

function ButtonGroupDemo() {
  return (
    <ButtonGroup.Root>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup.Root>
  )
}

function AvatarDemo() {
  return (
    <HStack gap="3">
      <Avatar.Root size="sm">
        <Avatar.Fallback name="Indoku Bot" />
      </Avatar.Root>
      <Avatar.Root size="md">
        <Avatar.Image src="https://i.pravatar.cc/100?img=12" alt="User" />
        <Avatar.Fallback name="User" />
      </Avatar.Root>
      <Avatar.Root size="lg">
        <Avatar.Fallback name="Ken99" />
      </Avatar.Root>
    </HStack>
  )
}

function AspectRatioDemo() {
  return (
    <AspectRatio ratio={16 / 9} maxW="sm" p={1}>
      <Box bg="bg.muted" rounded="l2" display="flex" alignItems="center" justifyContent="center">
        <Text fontSize="sm" color="fg.muted">16:9</Text>
      </Box>
    </AspectRatio>
  )
}

function AccordionDemo() {
  return (
    <Accordion.Root maxW="lg" collapsible defaultValue={["a1"]}>
      <Accordion.Item value="a1">
        <Accordion.ItemTrigger>
          Is it accessible?
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>Yes, it follows the WAI-ARIA design pattern.</Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
      <Accordion.Item value="a2">
        <Accordion.ItemTrigger>
          Is it styled?
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <Accordion.ItemBody>Yes, it's themed ala shadcn di @indoku/ui.</Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  )
}

function BreadcrumbDemo() {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.CurrentLink>Breadcrumb</Breadcrumb.CurrentLink>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}


/* -------------------------------------------------------------------------- */
/* Demo: Bubble (berdiri sendiri, di luar Message/MessageScroller)            */
/* -------------------------------------------------------------------------- */

function BubbleDemo() {
  const [open, setOpen] = useState(false)
  return (
    <Stack gap="4">
      <HStack gap="2" align="flex-end">
        <Bubble.Root align="start" variant="subtle">
          <Bubble.Content>subtle · start</Bubble.Content>
        </Bubble.Root>
        <Bubble.Root align="end" variant="subtle">
          <Bubble.Content>subtle · end</Bubble.Content>
        </Bubble.Root>
      </HStack>

      <HStack gap="2" align="flex-end">
        <Bubble.Root align="start" variant="solid">
          <Bubble.Content>solid · start</Bubble.Content>
        </Bubble.Root>
        <Bubble.Root align="end" variant="solid">
          <Bubble.Content>solid · end</Bubble.Content>
        </Bubble.Root>
      </HStack>

      <HStack gap="2" align="flex-end">
        <Bubble.Root align="start" variant="outline">
          <Bubble.Content>outline · start</Bubble.Content>
        </Bubble.Root>
        <Bubble.Root align="end" variant="outline">
          <Bubble.Content>outline · end</Bubble.Content>
        </Bubble.Root>
      </HStack>

      <Bubble.Root align="start">
        <Bubble.Content>Bisa gue bantu apa lagi?</Bubble.Content>
        <Bubble.Footer>
          <Bubble.Action aria-label="Like">👍</Bubble.Action>
          <Bubble.Action aria-label="Dislike">👎</Bubble.Action>
          <Bubble.Action aria-label="Copy">📋</Bubble.Action>
        </Bubble.Footer>
      </Bubble.Root>

      <Bubble.Root align="start">
        <Bubble.Content>
          Jawabannya adalah 42.
          <Bubble.Collapsible open={open} onOpenChange={setOpen} label="Show reasoning" mt="2">
            Menghitung dari pertanyaan tentang hidup, semesta, dan segalanya...
          </Bubble.Collapsible>
        </Bubble.Content>
      </Bubble.Root>
    </Stack>
  )
}


/* -------------------------------------------------------------------------- */
/* Demo: Tabs, Skeleton, Steps, Status, Clipboard, Stat, DataList             */
/* -------------------------------------------------------------------------- */

function TabsDemo() {
  return (
    <Tabs.Root defaultValue="account" maxW="md">
      <Tabs.List>
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="password">Password</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="account">Kelola info akun lo di sini.</Tabs.Content>
      <Tabs.Content value="password">Ganti password lo di sini.</Tabs.Content>
    </Tabs.Root>
  )
}

function SkeletonDemo() {
  return (
    <HStack gap="3">
      <Skeleton boxSize="10" rounded="full" />
      <Stack gap="2">
        <Skeleton h="4" w="52" />
        <Skeleton h="4" w="40" />
      </Stack>
    </HStack>
  )
}

function StepsDemo() {
  return (
    <Steps.Root defaultStep={1} count={3} maxW="md">
      <Steps.List>
        {["Akun", "Profil", "Selesai"].map((title, index) => (
          <Steps.Item key={index} index={index}>
            <Steps.Indicator />
            <Steps.Title>{title}</Steps.Title>
            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>
    </Steps.Root>
  )
}

function StatusDemo() {
  return (
    <HStack gap="4">
      <Status.Root colorPalette="green">
        <Status.Indicator />
        Online
      </Status.Root>
      <Status.Root colorPalette="red">
        <Status.Indicator />
        Offline
      </Status.Root>
      <Status.Root colorPalette="yellow">
        <Status.Indicator />
        Away
      </Status.Root>
    </HStack>
  )
}

function ClipboardDemo() {
  return (
    <Clipboard.Root value="npm i @indoku/ui">
      <HStack gap="2">
        <Clipboard.Input asChild>
          <Input readOnly maxW="xs" />
        </Clipboard.Input>
        <Clipboard.Trigger asChild>
          <Button size="sm" variant="outline">
            <Clipboard.Indicator />
          </Button>
        </Clipboard.Trigger>
      </HStack>
    </Clipboard.Root>
  )
}

function StatDemo() {
  return (
    <HStack gap="8">
      <Stat.Root>
        <Stat.Label>Total Revenue</Stat.Label>
        <Stat.ValueText>$45,231.89</Stat.ValueText>
        <Stat.HelpText>+20.1% dari bulan lalu</Stat.HelpText>
      </Stat.Root>
      <Stat.Root>
        <Stat.Label>Subscriptions</Stat.Label>
        <Stat.ValueText>+2,350</Stat.ValueText>
        <Stat.HelpText>+180.1% dari bulan lalu</Stat.HelpText>
      </Stat.Root>
    </HStack>
  )
}

function DataListDemo() {
  return (
    <DataList.Root maxW="sm">
      {[
        ["Nama", "Indoku Bot"],
        ["Status", "Aktif"],
        ["Versi", "0.0.1"],
      ].map(([label, value]) => (
        <DataList.Item key={label}>
          <DataList.ItemLabel>{label}</DataList.ItemLabel>
          <DataList.ItemValue>{value}</DataList.ItemValue>
        </DataList.Item>
      ))}
    </DataList.Root>
  )
}

function S0() {
  return (
    <>
      <HStack wrap="wrap" gap="3">
        <Button>Default</Button>
        <Button variant="subtle">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="plain">Link</Button>
        <Button colorPalette="red">Destructive</Button>
      </HStack>
    </>
  )
}

function S1() {
  return (
    <>
      <HStack wrap="wrap" gap="3">
        <Button rounded="full" variant="subtle">Get Started</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </HStack>
    </>
  )
}

function S2() {
  return (
    <>
      <HStack gap="3" maxW="lg">
        <Input placeholder="Email" />
        <Button onClick={() =>
              toaster.success({
              title: "Subscribed",
              description: "You are subscribed to this channel",
              closable: false
            })
          }
        >Subscribe</Button>
      </HStack>
    </>
  )
}

function S3() {
  return (
    <>
      <Textarea placeholder="Tulis pesan lo di sini..." maxW="lg" rows={3} />
    </>
  )
}

function S4() {
  return (
    <>
      <HStack gap="2">
        <Badge>Default</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="subtle" colorPalette="red">Error</Badge>
      </HStack>
    </>
  )
}

function S5() {
  return (
    <>
      <Card.Root maxW="sm">
        <Card.Header>
          <Card.Title>Hello</Card.Title>
          <Card.Description>Card minimalis ala shadcn.</Card.Description>
        </Card.Header>
        <Card.Body>
          <Text fontSize="sm">Konten card ada di sini.</Text>
        </Card.Body>
        <Card.Footer>
          <Button size="sm">Simpan</Button>
          <Button size="sm" variant="outline">Batal</Button>
        </Card.Footer>
      </Card.Root>
    </>
  )
}

function S6() {
  return (
    <>
      <ToggleGroup.Root type="single" defaultValue={["center"]}>
        <ToggleGroup.Item value="left" aria-label="Align left">Left</ToggleGroup.Item>
        <ToggleGroup.Item value="center" aria-label="Align center">Center</ToggleGroup.Item>
        <ToggleGroup.Item value="right" aria-label="Align right">Right</ToggleGroup.Item>
      </ToggleGroup.Root>
    </>
  )
}

function S7() {
  return (
    <>
      <Stack gap="4">
        <Checkbox.Root defaultChecked>
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>Terima syarat & ketentuan</Checkbox.Label>
        </Checkbox.Root>

        <RadioGroup.Root defaultValue="comfortable">
          <HStack gap="5">
            <RadioGroup.Item value="default">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText>Default</RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value="comfortable">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText>Comfortable</RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value="compact">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText>Compact</RadioGroup.ItemText>
            </RadioGroup.Item>
          </HStack>
        </RadioGroup.Root>

        <Switch.Root defaultChecked>
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label>Notifikasi email</Switch.Label>
        </Switch.Root>
      </Stack>
    </>
  )
}

function S8() {
  return (
    <>
      <Stack gap="3" maxW="lg">
        <Alert.Root>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Heads up!</Alert.Title>
            <Alert.Description>Lo bisa nambahin komponen baru ke app lo pake CLI.</Alert.Description>
          </Alert.Content>
        </Alert.Root>
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Sesi berakhir</Alert.Title>
            <Alert.Description>Login lagi buat lanjutin.</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </Stack>
    </>
  )
}

function S9() {
  return (
    <>
      <Card.Root>
        <Stack gap="0" divideY="1px">
          <Item.Root interactive>
            <Item.Media>🔔</Item.Media>
            <Item.Content>
              <Item.Title>New comment on your post</Item.Title>
              <Item.Description>2 minutes ago</Item.Description>
            </Item.Content>
            <Item.Actions><Badge variant="subtle">New</Badge></Item.Actions>
          </Item.Root>
          <Item.Root interactive>
            <Item.Media>👤</Item.Media>
            <Item.Content>
              <Item.Title>Ken99 followed you</Item.Title>
              <Item.Description>1 hour ago</Item.Description>
            </Item.Content>
          </Item.Root>
        </Stack>
      </Card.Root>
    </>
  )
}

const limitedToaster = createToaster({ placement: "top-end", max: 3 })

function S10() {
  return (
    <>
      <HStack wrap="wrap" gap="3">
        <Button
          size="sm"
          variant="outline"
          onClick={() => toast.success("Tersimpan", { description: "Perubahan lo udah kesave." })}
        >
          Success
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => toast.error("Gagal nyimpen", { description: "Coba lagi beberapa saat lagi." })}
        >
          Error
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => toast.warning("Kuota hampir habis", { description: "Sisa 10% lagi." })}
        >
          Warning
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => toast.info("Ada update baru", { description: "v0.2.0 udah bisa dipakai." })}
        >
          Info
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            toast.promise(new Promise((resolve) => setTimeout(resolve, 2500)), {
              loading: { title: "Ngirim file...", description: "Jangan tutup tab ini." },
              success: { title: "Terkirim", description: "File lu udah masuk." },
              error: { title: "Gagal ngirim" },
            })
          }
        >
          Loading (promise)
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            const id = toast.loading("Menyimpan...")
            setTimeout(() => toast.update(id, { type: "success", title: "Tersimpan", description: "Semua perubahan aman.", duration: 3000 }), 2000)
          }}
        >
          Loading → update
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => toast.success("Custom warna + ikon", { description: "Ikon diganti emoji.", icon: "✨" })}
        >
          Custom icon
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => toast("Notifikasi polos", { description: "Nggak ada warna/ikon sama sekali." })}
        >
          Plain
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => ["Satu", "Dua", "Tiga", "Empat", "Lima"].forEach((label, i) => setTimeout(() => toast.info(label), i * 150))}
        >
          Stack 5x
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => ["A", "B", "C", "D", "E", "F"].forEach((label) => limitedToaster.create({ title: "Max 3: " + label, type: "info", duration: 6000 }))}
        >
          Max 3 (spam 6)
        </Button>
      </HStack>
      <Toaster toaster={limitedToaster} />
    </>
  )
}

function S11() {
  return (
    <>
      <Select.Root collection={frameworks} width="64">
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Pilih framework" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {frameworks.items.map((item) => (
                <Select.Item key={item.value} item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </>
  )
}

function S12() {
  return (
    <>
      <ComboboxDemo />
    </>
  )
}

function S13() {
  return (
    <>
      <HStack gap="4">
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="outline" size="sm">Dropdown ▾</Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="profile">Profile</Menu.Item>
                <Menu.Item value="billing">Billing</Menu.Item>
                <Menu.Separator />
                <Menu.Item value="logout" color="fg.error">Log out</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>

        <Menu.Root>
          <Menu.ContextTrigger asChild>
            <Card.Root px="4" py="6" fontSize="sm" color="fg.muted" userSelect="none">
              Klik kanan di sini
            </Card.Root>
          </Menu.ContextTrigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="copy">Copy</Menu.Item>
                <Menu.Item value="paste">Paste</Menu.Item>
                <Menu.Item value="delete" color="fg.error">Delete</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </HStack>
    </>
  )
}

function S14() {
  return (
    <>
      <HStack gap="4">
        <Popover.Root>
          <Popover.Trigger asChild>
            <Button variant="outline" size="sm">Open popover</Button>
          </Popover.Trigger>
          <Portal>
            <Popover.Positioner>
              <Popover.Content>
                <Popover.Arrow />
                <Popover.Body>
                  <Text fontSize="sm" fontWeight="medium" mb="1">Dimensions</Text>
                  <Text fontSize="sm" color="fg.muted">Atur ukuran layer di sini.</Text>
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>

        <HoverCard.Root>
          <HoverCard.Trigger asChild>
            <Text as="span" fontSize="sm" textDecoration="underline" cursor="default">
              @indoku
            </Text>
          </HoverCard.Trigger>
          <Portal>
            <HoverCard.Positioner>
              <HoverCard.Content>
                <Text fontSize="sm" fontWeight="medium">IndokuUI</Text>
                <Text fontSize="sm" color="fg.muted">Library UI ala shadcn/ui.</Text>
              </HoverCard.Content>
            </HoverCard.Positioner>
          </Portal>
        </HoverCard.Root>
      </HStack>
    </>
  )
}

function S15() {
  return (
    <>
      <Stack gap="4">
        <Progress.Root value={62} maxW="sm">
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>
      </Stack>
    </>
  )
}

function S16() {
  return (
    <>
      <PaginationDemo />
    </>
  )
}

function S17() {
  return (
    <>
      <Stack gap="2">
        <Flash type="success">Perubahan tersimpan.</Flash>
        <Flash type="error">Gagal upload file.</Flash>
        <Flash type="info" colorPalette="purple">Update tersedia (warna dioverride ke ungu).</Flash>
      </Stack>
    </>
  )
}

function S18() {
  return (
    <>
      <CommandDemo />
    </>
  )
}

function S19() {
  return (
    <>
      <DataTableDemo />
    </>
  )
}

function S20() {
  return (
    <>
      <ChartDemo />
    </>
  )
}

function S21() {
  return (
    <>
      <FormDemo />
    </>
  )
}

function S22() {
  return (
    <>
      <CalendarDemo />
    </>
  )
}

function S23() {
  return (
    <>
      <NavigationMenuDemo />
    </>
  )
}

function S24() {
  return (
    <>
      <MenubarDemo />
    </>
  )
}

function S25() {
  return (
    <>
      <DirectionDemo />
    </>
  )
}

function S26() {
  return (
    <>
      <MessageScrollerDemo />
    </>
  )
}

function S27() {
  return (
    <>
      <MessageDemo />
    </>
  )
}

function S32() {
  return (
    <>
      <AvatarPositionDemo />
    </>
  )
}

function S28() {
  return (
    <>
      <BubbleDemo />
    </>
  )
}

function S29() {
  return (
    <>
      <AttachmentDemo />
    </>
  )
}

function S30() {
  return (
    <>
      <MarkerDemo />
    </>
  )
}

function S31() {
  return (
    <>
      <ChatComposedDemo />
    </>
  )
}

function S33() {
  return (
    <>
      <ButtonGroupDemo />
    </>
  )
}

function S34() {
  return (
    <>
      <AvatarDemo />
    </>
  )
}

function S35() {
  return (
    <>
      <AspectRatioDemo />
    </>
  )
}

function S36() {
  return (
    <>
      <AccordionDemo />
    </>
  )
}

function S37() {
  return (
    <>
      <BreadcrumbDemo />
    </>
  )
}

function S38() {
  return (
    <>
      <TabsDemo />
    </>
  )
}

function S39() {
  return (
    <>
      <SkeletonDemo />
    </>
  )
}

function S40() {
  return (
    <>
      <StepsDemo />
    </>
  )
}

function S41() {
  return (
    <>
      <StatusDemo />
    </>
  )
}

function S42() {
  return (
    <>
      <ClipboardDemo />
    </>
  )
}

function S43() {
  return (
    <>
      <StatDemo />
    </>
  )
}

function S44() {
  return (
    <>
      <DataListDemo />
    </>
  )
}

export const demos: Record<string, { Demo: ComponentType; source: string }> = {
  "button": {
    Demo: function Demo_button() {
    return (
      <Stack gap="6">
        <S0 />
        <S1 />
      </Stack>
    )
  },
    source: "<HStack wrap=\"wrap\" gap=\"3\">\n  <Button>Default</Button>\n  <Button variant=\"subtle\">Secondary</Button>\n  <Button variant=\"outline\">Outline</Button>\n  <Button variant=\"ghost\">Ghost</Button>\n  <Button variant=\"plain\">Link</Button>\n  <Button colorPalette=\"red\">Destructive</Button>\n</HStack>\n\n<HStack wrap=\"wrap\" gap=\"3\">\n  <Button rounded=\"full\" variant=\"subtle\">Get Started</Button>\n  <Button size=\"sm\">Small</Button>\n  <Button size=\"md\">Medium</Button>\n  <Button size=\"lg\">Large</Button>\n</HStack>",
  },
  "input": {
    Demo: S2,
    source: "<HStack gap=\"3\" maxW=\"lg\">\n  <Input placeholder=\"Email\" />\n  <Button onClick={() => \n        toaster.success({\n        title: \"Subscribed\",\n        description: \"You are subscribed to this channel\",\n        closable: false\n      })\n    }\n  >Subscribe</Button>\n</HStack>",
  },
  "textarea": {
    Demo: S3,
    source: "<Textarea placeholder=\"Tulis pesan lo di sini...\" maxW=\"lg\" rows={3} />",
  },
  "badge": {
    Demo: S4,
    source: "<HStack gap=\"2\">\n  <Badge>Default</Badge>\n  <Badge variant=\"outline\">Outline</Badge>\n  <Badge variant=\"subtle\" colorPalette=\"red\">Error</Badge>\n</HStack>",
  },
  "card": {
    Demo: S5,
    source: "<Card.Root maxW=\"sm\">\n  <Card.Header>\n    <Card.Title>Hello</Card.Title>\n    <Card.Description>Card minimalis ala shadcn.</Card.Description>\n  </Card.Header>\n  <Card.Body>\n    <Text fontSize=\"sm\">Konten card ada di sini.</Text>\n  </Card.Body>\n  <Card.Footer>\n    <Button size=\"sm\">Simpan</Button>\n    <Button size=\"sm\" variant=\"outline\">Batal</Button>\n  </Card.Footer>\n</Card.Root>",
  },
  "toggle-group": {
    Demo: S6,
    source: "<ToggleGroup.Root type=\"single\" defaultValue={[\"center\"]}>\n  <ToggleGroup.Item value=\"left\" aria-label=\"Align left\">Left</ToggleGroup.Item>\n  <ToggleGroup.Item value=\"center\" aria-label=\"Align center\">Center</ToggleGroup.Item>\n  <ToggleGroup.Item value=\"right\" aria-label=\"Align right\">Right</ToggleGroup.Item>\n</ToggleGroup.Root>",
  },
  "checkbox-radio-and-switch": {
    Demo: S7,
    source: "<Stack gap=\"4\">\n  <Checkbox.Root defaultChecked>\n    <Checkbox.HiddenInput />\n    <Checkbox.Control />\n    <Checkbox.Label>Terima syarat & ketentuan</Checkbox.Label>\n  </Checkbox.Root>\n\n  <RadioGroup.Root defaultValue=\"comfortable\">\n    <HStack gap=\"5\">\n      <RadioGroup.Item value=\"default\">\n        <RadioGroup.ItemHiddenInput />\n        <RadioGroup.ItemControl />\n        <RadioGroup.ItemText>Default</RadioGroup.ItemText>\n      </RadioGroup.Item>\n      <RadioGroup.Item value=\"comfortable\">\n        <RadioGroup.ItemHiddenInput />\n        <RadioGroup.ItemControl />\n        <RadioGroup.ItemText>Comfortable</RadioGroup.ItemText>\n      </RadioGroup.Item>\n      <RadioGroup.Item value=\"compact\">\n        <RadioGroup.ItemHiddenInput />\n        <RadioGroup.ItemControl />\n        <RadioGroup.ItemText>Compact</RadioGroup.ItemText>\n      </RadioGroup.Item>\n    </HStack>\n  </RadioGroup.Root>\n\n  <Switch.Root defaultChecked>\n    <Switch.HiddenInput />\n    <Switch.Control>\n      <Switch.Thumb />\n    </Switch.Control>\n    <Switch.Label>Notifikasi email</Switch.Label>\n  </Switch.Root>\n</Stack>",
  },
  "alert": {
    Demo: S8,
    source: "<Stack gap=\"3\" maxW=\"lg\">\n  <Alert.Root>\n    <Alert.Indicator />\n    <Alert.Content>\n      <Alert.Title>Heads up!</Alert.Title>\n      <Alert.Description>Lo bisa nambahin komponen baru ke app lo pake CLI.</Alert.Description>\n    </Alert.Content>\n  </Alert.Root>\n  <Alert.Root status=\"error\">\n    <Alert.Indicator />\n    <Alert.Content>\n      <Alert.Title>Sesi berakhir</Alert.Title>\n      <Alert.Description>Login lagi buat lanjutin.</Alert.Description>\n    </Alert.Content>\n  </Alert.Root>\n</Stack>",
  },
  "item": {
    Demo: S9,
    source: "<Card.Root>\n  <Stack gap=\"0\" divideY=\"1px\">\n    <Item.Root interactive>\n      <Item.Media>🔔</Item.Media>\n      <Item.Content>\n        <Item.Title>New comment on your post</Item.Title>\n        <Item.Description>2 minutes ago</Item.Description>\n      </Item.Content>\n      <Item.Actions><Badge variant=\"subtle\">New</Badge></Item.Actions>\n    </Item.Root>\n    <Item.Root interactive>\n      <Item.Media>👤</Item.Media>\n      <Item.Content>\n        <Item.Title>Ken99 followed you</Item.Title>\n        <Item.Description>1 hour ago</Item.Description>\n      </Item.Content>\n    </Item.Root>\n  </Stack>\n</Card.Root>",
  },
  "toast": {
    Demo: S10,
    source: "<HStack wrap=\"wrap\" gap=\"3\">\n  <Button\n    size=\"sm\"\n    variant=\"outline\"\n    onClick={() => toast.success(\"Tersimpan\", { description: \"Perubahan lo udah kesave.\" })}\n  >\n    Success\n  </Button>\n  <Button\n    size=\"sm\"\n    variant=\"outline\"\n    onClick={() => toast.error(\"Gagal nyimpen\", { description: \"Coba lagi beberapa saat lagi.\" })}\n  >\n    Error\n  </Button>\n  <Button\n    size=\"sm\"\n    variant=\"outline\"\n    onClick={() => toast.warning(\"Kuota hampir habis\", { description: \"Sisa 10% lagi.\" })}\n  >\n    Warning\n  </Button>\n  <Button\n    size=\"sm\"\n    variant=\"outline\"\n    onClick={() => toast.info(\"Ada update baru\", { description: \"v0.2.0 udah bisa dipakai.\" })}\n  >\n    Info\n  </Button>\n  <Button\n    size=\"sm\"\n    variant=\"outline\"\n    onClick={() =>\n      toast.promise(new Promise((resolve) => setTimeout(resolve, 2500)), {\n        loading: { title: \"Ngirim file...\", description: \"Jangan tutup tab ini.\" },\n        success: { title: \"Terkirim\", description: \"File lu udah masuk.\" },\n        error: { title: \"Gagal ngirim\" },\n      })\n    }\n  >\n    Loading (promise)\n  </Button>\n  <Button\n    size=\"sm\"\n    variant=\"outline\"\n    onClick={() => {\n      const id = toast.loading(\"Menyimpan...\")\n      setTimeout(() => toast.update(id, { type: \"success\", title: \"Tersimpan\", description: \"Semua perubahan aman.\", duration: 3000 }), 2000)\n    }}\n  >\n    Loading → update\n  </Button>\n  <Button\n    size=\"sm\"\n    variant=\"outline\"\n    onClick={() => toast.success(\"Custom warna + ikon\", { description: \"Ikon diganti emoji.\", icon: \"✨\" })}\n  >\n    Custom icon\n  </Button>\n  <Button\n    size=\"sm\"\n    variant=\"outline\"\n    onClick={() => toast(\"Notifikasi polos\", { description: \"Nggak ada warna/ikon sama sekali.\" })}\n  >\n    Plain\n  </Button>\n  <Button\n    size=\"sm\"\n    variant=\"outline\"\n    onClick={() => [\"Satu\", \"Dua\", \"Tiga\", \"Empat\", \"Lima\"].forEach((label, i) => setTimeout(() => toast.info(label), i * 150))}\n  >\n    Stack 5x\n  </Button>\n  <Button\n    size=\"sm\"\n    variant=\"outline\"\n    onClick={() => [\"A\", \"B\", \"C\", \"D\", \"E\", \"F\"].forEach((label) => limitedToaster.create({ title: \"Max 3: \" + label, type: \"info\", duration: 6000 }))}\n  >\n    Max 3 (spam 6)\n  </Button>\n</HStack>\n// const limitedToaster = createToaster({ placement: \"top-end\", max: 3 })\n// render <Toaster toaster={limitedToaster} /> once, extra toasts queue until a slot frees up",
  },
  "select": {
    Demo: S11,
    source: "<Select.Root collection={frameworks} width=\"64\">\n  <Select.Control>\n    <Select.Trigger>\n      <Select.ValueText placeholder=\"Pilih framework\" />\n    </Select.Trigger>\n    <Select.IndicatorGroup>\n      <Select.Indicator />\n    </Select.IndicatorGroup>\n  </Select.Control>\n  <Portal>\n    <Select.Positioner>\n      <Select.Content>\n        {frameworks.items.map((item) => (\n          <Select.Item key={item.value} item={item}>\n            <Select.ItemText>{item.label}</Select.ItemText>\n            <Select.ItemIndicator />\n          </Select.Item>\n        ))}\n      </Select.Content>\n    </Select.Positioner>\n  </Portal>\n</Select.Root>",
  },
  "combobox": {
    Demo: S12,
    source: "function ComboboxDemo() {\n  const [items, setItems] = useState(fruits)\n\n  return (\n    <Combobox.Root\n      width=\"64\"\n      collection={createListCollection({ items })}\n      onInputValueChange={(details) =>\n        setItems(fruits.filter((f) => f.toLowerCase().includes(details.inputValue.toLowerCase())))\n      }\n    >\n      <Combobox.Control>\n        <Combobox.Input placeholder=\"Cari buah...\" />\n        <Combobox.IndicatorGroup>\n          <Combobox.ClearTrigger />\n          <Combobox.Trigger />\n        </Combobox.IndicatorGroup>\n      </Combobox.Control>\n      <Portal>\n        <Combobox.Positioner>\n          <Combobox.Content>\n            <Combobox.Empty>Nggak ketemu.</Combobox.Empty>\n            {items.map((item) => (\n              <Combobox.Item key={item} item={item}>\n                <Combobox.ItemText>{item}</Combobox.ItemText>\n                <Combobox.ItemIndicator />\n              </Combobox.Item>\n            ))}\n          </Combobox.Content>\n        </Combobox.Positioner>\n      </Portal>\n    </Combobox.Root>\n  )\n}",
  },
  "menu": {
    Demo: S13,
    source: "<HStack gap=\"4\">\n  <Menu.Root>\n    <Menu.Trigger asChild>\n      <Button variant=\"outline\" size=\"sm\">Dropdown ▾</Button>\n    </Menu.Trigger>\n    <Portal>\n      <Menu.Positioner>\n        <Menu.Content>\n          <Menu.Item value=\"profile\">Profile</Menu.Item>\n          <Menu.Item value=\"billing\">Billing</Menu.Item>\n          <Menu.Separator />\n          <Menu.Item value=\"logout\" color=\"fg.error\">Log out</Menu.Item>\n        </Menu.Content>\n      </Menu.Positioner>\n    </Portal>\n  </Menu.Root>\n\n  <Menu.Root>\n    <Menu.ContextTrigger asChild>\n      <Card.Root px=\"4\" py=\"6\" fontSize=\"sm\" color=\"fg.muted\" userSelect=\"none\">\n        Klik kanan di sini\n      </Card.Root>\n    </Menu.ContextTrigger>\n    <Portal>\n      <Menu.Positioner>\n        <Menu.Content>\n          <Menu.Item value=\"copy\">Copy</Menu.Item>\n          <Menu.Item value=\"paste\">Paste</Menu.Item>\n          <Menu.Item value=\"delete\" color=\"fg.error\">Delete</Menu.Item>\n        </Menu.Content>\n      </Menu.Positioner>\n    </Portal>\n  </Menu.Root>\n</HStack>",
  },
  "popover": {
    Demo: S14,
    source: "<HStack gap=\"4\">\n  <Popover.Root>\n    <Popover.Trigger asChild>\n      <Button variant=\"outline\" size=\"sm\">Open popover</Button>\n    </Popover.Trigger>\n    <Portal>\n      <Popover.Positioner>\n        <Popover.Content>\n          <Popover.Arrow />\n          <Popover.Body>\n            <Text fontSize=\"sm\" fontWeight=\"medium\" mb=\"1\">Dimensions</Text>\n            <Text fontSize=\"sm\" color=\"fg.muted\">Atur ukuran layer di sini.</Text>\n          </Popover.Body>\n        </Popover.Content>\n      </Popover.Positioner>\n    </Portal>\n  </Popover.Root>\n\n  <HoverCard.Root>\n    <HoverCard.Trigger asChild>\n      <Text as=\"span\" fontSize=\"sm\" textDecoration=\"underline\" cursor=\"default\">\n        @indoku\n      </Text>\n    </HoverCard.Trigger>\n    <Portal>\n      <HoverCard.Positioner>\n        <HoverCard.Content>\n          <Text fontSize=\"sm\" fontWeight=\"medium\">IndokuUI</Text>\n          <Text fontSize=\"sm\" color=\"fg.muted\">Library UI ala shadcn/ui.</Text>\n        </HoverCard.Content>\n      </HoverCard.Positioner>\n    </Portal>\n  </HoverCard.Root>\n</HStack>",
  },
  "progress": {
    Demo: S15,
    source: "<Stack gap=\"4\">\n  <HStack gap=\"1.5\">\n    <Kbd>⌘</Kbd>\n    <Kbd>K</Kbd>\n    <Text fontSize=\"sm\" color=\"fg.muted\">buat buka command palette</Text>\n  </HStack>\n  <Progress.Root value={62} maxW=\"sm\">\n    <Progress.Track>\n      <Progress.Range />\n    </Progress.Track>\n  </Progress.Root>\n</Stack>",
  },
  "pagination": {
    Demo: S16,
    source: "function PaginationDemo() {\n  const [page, setPage] = useState(1)\n  return (\n    <Pagination.Root count={50} pageSize={10} page={page} onPageChange={(d) => setPage(d.page)}>\n      <Pagination.Content>\n        <Pagination.Previous />\n        <Pagination.Pages />\n        <Pagination.Next />\n      </Pagination.Content>\n    </Pagination.Root>\n  )\n}",
  },
  "flash": {
    Demo: S17,
    source: "<Stack gap=\"2\">\n  <Flash type=\"success\">Perubahan tersimpan.</Flash>\n  <Flash type=\"error\">Gagal upload file.</Flash>\n  <Flash type=\"info\" colorPalette=\"purple\">Update tersedia (warna dioverride ke ungu).</Flash>\n</Stack>",
  },
  "command": {
    Demo: S18,
    source: "function CommandDemo() {\n  const [open, setOpen] = useState(false)\n  const [picked, setPicked] = useState<string | null>(null)\n\n  return (\n    <Stack gap=\"2\">\n      <HStack gap=\"3\">\n        <Button variant=\"outline\" size=\"sm\" onClick={() => setOpen(true)}>\n          Open command palette\n          <Command.Shortcut position=\"static\" ms=\"2\">\n            ⌘K\n          </Command.Shortcut>\n        </Button>\n        {picked && <Text fontSize=\"sm\" color=\"fg.muted\">Picked: {picked}</Text>}\n      </HStack>\n\n      <Command.Dialog open={open} onOpenChange={setOpen} hotkey=\"k\" title=\"Command palette\">\n        <Command.Input placeholder=\"Type a command or search...\" />\n        <Command.List>\n          <Command.Empty />\n          <Command.Group heading=\"Suggestions\">\n            <Command.Item value=\"Calendar\" onSelect={(v) => { setPicked(v); setOpen(false) }}>\n              Calendar\n            </Command.Item>\n            <Command.Item value=\"Search Emoji\" onSelect={(v) => { setPicked(v); setOpen(false) }}>\n              Search Emoji\n            </Command.Item>\n            <Command.Item value=\"Calculator\" keywords={[\"math\"]} onSelect={(v) => { setPicked(v); setOpen(false) }}>\n              Calculator\n            </Command.Item>\n          </Command.Group>\n          <Command.Separator />\n          <Command.Group heading=\"Settings\">\n            <Command.Item value=\"Profile\" onSelect={(v) => { setPicked(v); setOpen(false) }}>\n              Profile\n              <Command.Shortcut>⌘P</Command.Shortcut>\n            </Command.Item>\n            <Command.Item value=\"Billing\" onSelect={(v) => { setPicked(v); setOpen(false) }}>\n              Billing\n              <Command.Shortcut>⌘B</Command.Shortcut>\n            </Command.Item>\n          </Command.Group>\n        </Command.List>\n      </Command.Dialog>\n    </Stack>\n  )\n}",
  },
  "data-table": {
    Demo: S19,
    source: "function DataTableDemo() {\n  return (\n    <DataTable.Root data={invoices} columns={invoiceColumns} getRowId={(row) => row.id} pageSize={5} selectable>\n      <DataTable.Toolbar>\n        <DataTable.Search />\n        <DataTable.ColumnToggle />\n      </DataTable.Toolbar>\n      <DataTable.Table />\n      <DataTable.Pagination />\n    </DataTable.Root>\n  )\n}",
  },
  "chart": {
    Demo: S20,
    source: "function ChartDemo() {\n  const months = [\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"Mei\", \"Jun\"]\n\n  return (\n    <Stack gap=\"6\">\n      <HStack gap=\"8\" wrap=\"wrap\" align=\"flex-start\">\n        <Stack gap=\"2\" flex=\"1\" minW=\"260px\">\n          <Text fontSize=\"xs\" color=\"fg.muted\">Line (area) - Revenue vs Cost</Text>\n          <LineChart\n            categories={months}\n            area\n            series={[\n              { name: \"Revenue\", values: [120, 180, 150, 220, 260, 240] },\n              { name: \"Cost\", color: \"red.500\", values: [80, 90, 100, 110, 120, 130] },\n            ]}\n          />\n        </Stack>\n        <Stack gap=\"2\" flex=\"1\" minW=\"260px\">\n          <Text fontSize=\"xs\" color=\"fg.muted\">Bar - New users per bulan</Text>\n          <BarChart categories={months} series={[{ name: \"Users\", values: [40, 65, 52, 90, 78, 100] }]} />\n        </Stack>\n      </HStack>\n\n      <Stack gap=\"2\">\n        <Text fontSize=\"xs\" color=\"fg.muted\">Pie/Donut - Traffic source</Text>\n        <PieChart\n          innerRadiusRatio={0.6}\n          size={160}\n          data={[\n            { name: \"Organic\", value: 45 },\n            { name: \"Direct\", value: 25 },\n            { name: \"Referral\", value: 18 },\n            { name: \"Social\", value: 12 },\n          ]}\n        />\n      </Stack>\n    </Stack>\n  )\n}",
  },
  "form": {
    Demo: S21,
    source: "function FormDemo() {\n  const [submitted, setSubmitted] = useState<LoginValues | null>(null)\n\n  const form = Form.useForm<LoginValues>({\n    defaultValues: { email: \"\", password: \"\" },\n    validators: {\n      email: (v) => (!v.includes(\"@\") ? \"Email nggak valid\" : undefined),\n      password: (v) => (v.length < 8 ? \"Minimal 8 karakter\" : undefined),\n    },\n    onSubmit: async (values) => {\n      setSubmitted(values)\n    },\n  })\n\n  return (\n    <Stack as=\"form\" gap=\"4\" maxW=\"sm\" onSubmit={form.handleSubmit}>\n      <Form.Field meta={form.getFieldMeta(\"email\")} label=\"Email\" required>\n        <Input type=\"email\" placeholder=\"kamu@contoh.com\" {...form.getInputProps(\"email\")} />\n      </Form.Field>\n\n      <Form.Field\n        meta={form.getFieldMeta(\"password\")}\n        label=\"Password\"\n        required\n        helperText=\"Minimal 8 karakter.\"\n      >\n        <Input type=\"password\" {...form.getInputProps(\"password\")} />\n      </Form.Field>\n\n      <HStack gap=\"3\">\n        <Button type=\"submit\" loading={form.isSubmitting}>\n          Masuk\n        </Button>\n        <Button type=\"button\" variant=\"outline\" onClick={() => { form.reset(); setSubmitted(null) }}>\n          Reset\n        </Button>\n      </HStack>\n\n      {submitted && (\n        <Text fontSize=\"sm\" color=\"fg.muted\">\n          Submitted: {submitted.email}\n        </Text>\n      )}\n    </Stack>\n  )\n}",
  },
  "calendar": {
    Demo: S22,
    source: "function CalendarDemo() {\n  return (\n    <HStack gap=\"6\" wrap=\"wrap\" align=\"flex-start\">\n      <Stack gap=\"2\">\n        <Text fontSize=\"xs\" color=\"fg.muted\">Single</Text>\n        <Calendar.Root />\n      </Stack>\n      <Stack gap=\"2\">\n        <Text fontSize=\"xs\" color=\"fg.muted\">Range, 2 bulan</Text>\n        <Calendar.Root selectionMode=\"range\" numOfMonths={2} />\n      </Stack>\n    </HStack>\n  )\n}",
  },
  "navigation-menu": {
    Demo: S23,
    source: "function NavigationMenuDemo() {\n  return (\n    <NavigationMenu.Root>\n      <NavigationMenu.List>\n        <NavigationMenu.Item>\n          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>\n          <NavigationMenu.Content>\n            <NavigationMenu.ContentGrid columns={2}>\n              <NavigationMenu.ContentLink href=\"#\" title=\"Analytics\" description=\"Pantau metrik produk lo secara real-time.\" />\n              <NavigationMenu.ContentLink href=\"#\" title=\"Automation\" description=\"Otomatisin workflow tanpa kode.\" />\n              <NavigationMenu.ContentLink href=\"#\" title=\"Integrations\" description=\"Sambungin ke tools yang udah lo pake.\" />\n              <NavigationMenu.ContentLink href=\"#\" title=\"Security\" description=\"Kontrol akses & audit log.\" />\n            </NavigationMenu.ContentGrid>\n          </NavigationMenu.Content>\n        </NavigationMenu.Item>\n        <NavigationMenu.Item>\n          <NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>\n          <NavigationMenu.Content>\n            <Stack gap=\"1\" minW=\"48\">\n              <NavigationMenu.ContentLink href=\"#\" title=\"Docs\" />\n              <NavigationMenu.ContentLink href=\"#\" title=\"Blog\" />\n              <NavigationMenu.ContentLink href=\"#\" title=\"Changelog\" />\n            </Stack>\n          </NavigationMenu.Content>\n        </NavigationMenu.Item>\n        <NavigationMenu.Item>\n          <NavigationMenu.Link href=\"#\">Pricing</NavigationMenu.Link>\n        </NavigationMenu.Item>\n      </NavigationMenu.List>\n    </NavigationMenu.Root>\n  )\n}",
  },
  "menubar": {
    Demo: S24,
    source: "function MenubarDemo() {\n  const [bookmarksBar, setBookmarksBar] = useState(true)\n  const [fullUrls, setFullUrls] = useState(false)\n\n  return (\n    <Menubar.Root>\n      <Menubar.MenuItem label=\"File\">\n        <Menubar.Item value=\"new-tab\">\n          New Tab <Menubar.ItemCommand>⌘T</Menubar.ItemCommand>\n        </Menubar.Item>\n        <Menubar.Item value=\"new-window\">\n          New Window <Menubar.ItemCommand>⌘N</Menubar.ItemCommand>\n        </Menubar.Item>\n        <Menubar.Separator />\n        <Menubar.Item value=\"share\">Share</Menubar.Item>\n        <Menubar.Separator />\n        <Menubar.Item value=\"print\">\n          Print... <Menubar.ItemCommand>⌘P</Menubar.ItemCommand>\n        </Menubar.Item>\n      </Menubar.MenuItem>\n\n      <Menubar.MenuItem label=\"Edit\">\n        <Menubar.Item value=\"undo\">\n          Undo <Menubar.ItemCommand>⌘Z</Menubar.ItemCommand>\n        </Menubar.Item>\n        <Menubar.Item value=\"redo\">\n          Redo <Menubar.ItemCommand>⇧⌘Z</Menubar.ItemCommand>\n        </Menubar.Item>\n        <Menubar.Separator />\n        <Menubar.Item value=\"cut\">Cut</Menubar.Item>\n        <Menubar.Item value=\"copy\">Copy</Menubar.Item>\n        <Menubar.Item value=\"paste\">Paste</Menubar.Item>\n      </Menubar.MenuItem>\n\n      <Menubar.MenuItem label=\"View\">\n        <Menubar.CheckboxItem\n          value=\"bookmarks-bar\"\n          checked={bookmarksBar}\n          onCheckedChange={(checked) => setBookmarksBar(checked)}\n        >\n          <Menubar.ItemIndicator>✓</Menubar.ItemIndicator>\n          Show Bookmarks Bar\n        </Menubar.CheckboxItem>\n        <Menubar.CheckboxItem\n          value=\"full-urls\"\n          checked={fullUrls}\n          onCheckedChange={(checked) => setFullUrls(checked)}\n        >\n          <Menubar.ItemIndicator>✓</Menubar.ItemIndicator>\n          Show Full URLs\n        </Menubar.CheckboxItem>\n      </Menubar.MenuItem>\n\n      <Menubar.MenuItem label=\"Help\" disabled>\n        <Menubar.Item value=\"about\">About</Menubar.Item>\n      </Menubar.MenuItem>\n    </Menubar.Root>\n  )\n}",
  },
  "direction": {
    Demo: S25,
    source: "function DirectionDemo() {\n  const [dir, setDir] = useState<\"ltr\" | \"rtl\">(\"ltr\")\n\n  return (\n    <Stack gap=\"3\">\n      <HStack gap=\"2\">\n        <Button size=\"sm\" variant={dir === \"ltr\" ? \"solid\" : \"outline\"} onClick={() => setDir(\"ltr\")}>\n          LTR\n        </Button>\n        <Button size=\"sm\" variant={dir === \"rtl\" ? \"solid\" : \"outline\"} onClick={() => setDir(\"rtl\")}>\n          RTL\n        </Button>\n      </HStack>\n      <Direction.Root dir={dir}>\n        <Card.Root p=\"4\" maxW=\"sm\">\n          <Text fontSize=\"sm\" fontWeight=\"medium\">\n            {dir === \"rtl\" ? \"مرحبا بكم في التطبيق\" : \"Welcome to the app\"}\n          </Text>\n          <HStack gap=\"2\" mt=\"3\">\n            <Button size=\"sm\" variant=\"outline\">Cancel</Button>\n            <Button size=\"sm\">Continue</Button>\n          </HStack>\n        </Card.Root>\n      </Direction.Root>\n    </Stack>\n  )\n}",
  },
  "message-scroller": {
    Demo: S26,
    source: "function MessageScrollerDemo() {\n  const rows = Array.from({ length: 20 }, (_, i) => i + 1)\n  return (\n    <Card.Root h=\"64\" overflow=\"hidden\" position=\"relative\">\n      <MessageScroller.Root p=\"4\" watch={[]}>\n        <Stack gap=\"2\">\n          {rows.map((n) => (\n            <Text key={n} fontSize=\"sm\" color=\"fg.muted\">\n              Pesan #{n} - scroll turun buat liat tombol \"ke bawah\" muncul.\n            </Text>\n          ))}\n        </Stack>\n      </MessageScroller.Root>\n    </Card.Root>\n  )\n}",
  },
  "message": {
    Demo: function Demo_message() {
    return (
      <Stack gap="6">
        <S27 />
        <S32 />
      </Stack>
    )
  },
    source: "function MessageDemo() {\n  return (\n    <Card.Root p=\"4\">\n      <Stack gap=\"4\">\n        <Message.Root align=\"start\">\n          <Message.Avatar>\n            <Avatar.Root size=\"xs\">\n              <Avatar.Fallback name=\"Indoku Bot\" />\n            </Avatar.Root>\n          </Message.Avatar>\n          <Message.Content>\n            <Message.Header>Indoku Bot · 09:41</Message.Header>\n            <Text fontSize=\"sm\">Halo! Ada yang bisa dibantu hari ini?</Text>\n          </Message.Content>\n        </Message.Root>\n\n        <Message.Root align=\"end\">\n          <Message.Avatar />\n          <Message.Content>\n            <Text fontSize=\"sm\">Tolong cek invoice bulan ini dong</Text>\n            <Message.Footer>Sent</Message.Footer>\n          </Message.Content>\n        </Message.Root>\n      </Stack>\n    </Card.Root>\n  )\n}\n\nfunction AvatarPositionDemo() {\n  const botAvatar = (\n    <Avatar.Root size=\"xs\">\n      <Avatar.Fallback name=\"Indoku Bot\" />\n    </Avatar.Root>\n  )\n\n  const bubbles = (\n    <>\n      <Bubble.Root align=\"start\">\n        <Bubble.Content>Baris pertama grup ini.</Bubble.Content>\n      </Bubble.Root>\n      <Bubble.Root align=\"start\">\n        <Bubble.Content>Baris kedua, numpuk rapet di bawahnya.</Bubble.Content>\n      </Bubble.Root>\n    </>\n  )\n\n  return (\n    <Stack gap=\"6\">\n      <Stack gap=\"2\">\n        <Text fontSize=\"xs\" fontWeight=\"medium\" color=\"fg.subtle\">\n          avatarPosition=&quot;top&quot; (ala Slack - avatar+nama sejajar bubble pertama)\n        </Text>\n        <Message.Group avatar={botAvatar} avatarPosition=\"top\" header=\"Indoku Bot · 09:41\">\n          {bubbles}\n        </Message.Group>\n      </Stack>\n\n      <Stack gap=\"2\">\n        <Text fontSize=\"xs\" fontWeight=\"medium\" color=\"fg.subtle\">\n          avatarPosition=&quot;bottom&quot; (default, ala iMessage/WhatsApp - avatar sejajar bubble terakhir)\n        </Text>\n        <Message.Group avatar={botAvatar} avatarPosition=\"bottom\">\n          {bubbles}\n        </Message.Group>\n      </Stack>\n\n      <Stack gap=\"2\">\n        <Text fontSize=\"xs\" fontWeight=\"medium\" color=\"fg.subtle\">\n          avatarPosition=&quot;none&quot; (nggak ada avatar, grup ngepas ke tepi)\n        </Text>\n        <Message.Group avatarPosition=\"none\">{bubbles}</Message.Group>\n      </Stack>\n    </Stack>\n  )\n}",
  },
  "bubble": {
    Demo: S28,
    source: "function BubbleDemo() {\n  const [open, setOpen] = useState(false)\n  return (\n    <Stack gap=\"4\">\n      <HStack gap=\"2\" align=\"flex-end\">\n        <Bubble.Root align=\"start\" variant=\"subtle\">\n          <Bubble.Content>subtle · start</Bubble.Content>\n        </Bubble.Root>\n        <Bubble.Root align=\"end\" variant=\"subtle\">\n          <Bubble.Content>subtle · end</Bubble.Content>\n        </Bubble.Root>\n      </HStack>\n\n      <HStack gap=\"2\" align=\"flex-end\">\n        <Bubble.Root align=\"start\" variant=\"solid\">\n          <Bubble.Content>solid · start</Bubble.Content>\n        </Bubble.Root>\n        <Bubble.Root align=\"end\" variant=\"solid\">\n          <Bubble.Content>solid · end</Bubble.Content>\n        </Bubble.Root>\n      </HStack>\n\n      <HStack gap=\"2\" align=\"flex-end\">\n        <Bubble.Root align=\"start\" variant=\"outline\">\n          <Bubble.Content>outline · start</Bubble.Content>\n        </Bubble.Root>\n        <Bubble.Root align=\"end\" variant=\"outline\">\n          <Bubble.Content>outline · end</Bubble.Content>\n        </Bubble.Root>\n      </HStack>\n\n      <Bubble.Root align=\"start\">\n        <Bubble.Content>Bisa gue bantu apa lagi?</Bubble.Content>\n        <Bubble.Footer>\n          <Bubble.Action aria-label=\"Like\">👍</Bubble.Action>\n          <Bubble.Action aria-label=\"Dislike\">👎</Bubble.Action>\n          <Bubble.Action aria-label=\"Copy\">📋</Bubble.Action>\n        </Bubble.Footer>\n      </Bubble.Root>\n\n      <Bubble.Root align=\"start\">\n        <Bubble.Content>\n          Jawabannya adalah 42.\n          <Bubble.Collapsible open={open} onOpenChange={setOpen} label=\"Show reasoning\" mt=\"2\">\n            Menghitung dari pertanyaan tentang hidup, semesta, dan segalanya...\n          </Bubble.Collapsible>\n        </Bubble.Content>\n      </Bubble.Root>\n    </Stack>\n  )\n}",
  },
  "attachment": {
    Demo: function Demo_attachment() {
    return (
      <Stack gap="6">
        <S29 />
        <N.AttachmentCardsDemo />
      </Stack>
    )
  },
    source: "function AttachmentDemo() {\n  return (\n    <Stack gap=\"3\" maxW=\"sm\">\n      <Attachment.Root>\n        <Attachment.Media />\n        <Attachment.Content>\n          <Attachment.Name>invoice-september.pdf</Attachment.Name>\n          <Attachment.Meta size={482000} />\n        </Attachment.Content>\n      </Attachment.Root>\n\n      <Attachment.Root>\n        <Attachment.Media />\n        <Attachment.Content>\n          <Attachment.Name>rekap-penjualan.xlsx</Attachment.Name>\n          <Attachment.Status status=\"uploading\" progress={64} />\n        </Attachment.Content>\n        <Attachment.Actions>\n          <Attachment.Action aria-label=\"Batalkan\">✕</Attachment.Action>\n        </Attachment.Actions>\n      </Attachment.Root>\n    </Stack>\n  )\n}\n\nfunction AttachmentCardsDemo() {\n  return (\n    <Stack gap=\"2\">\n      <Attachment.Group>\n        {[\"workspace.png\", \"desk-reference.jpg\", \"office-reference.jpg\"].map((n) => (\n          <Attachment.Root key={n} orientation=\"vertical\">\n            <Attachment.Media src={`https://picsum.photos/seed/${n}/320/240`} />\n            <Attachment.Content>\n              <Attachment.Name>{n}</Attachment.Name>\n              <Attachment.Meta format={n.split(\".\")[1].toUpperCase()} size={840000} />\n            </Attachment.Content>\n          </Attachment.Root>\n        ))}\n      </Attachment.Group>\n      <Attachment.Root>\n        <Attachment.Media loading />\n        <Attachment.Content>\n          <Attachment.Name>sales-dashboard.pdf</Attachment.Name>\n          <Attachment.Status status=\"uploading\" progress={64} variant=\"text\" />\n        </Attachment.Content>\n        <Attachment.Actions>\n          <Attachment.Remove />\n        </Attachment.Actions>\n      </Attachment.Root>\n      <Attachment.Root>\n        <Attachment.Media />\n        <Attachment.Content>\n          <Attachment.Name>rekap-penjualan.xlsx</Attachment.Name>\n          <Attachment.Status status=\"uploading\" progress={65} />\n        </Attachment.Content>\n        <Attachment.Actions>\n          <Attachment.Remove />\n        </Attachment.Actions>\n      </Attachment.Root>\n    </Stack>\n  )\n}",
  },
  "marker": {
    Demo: S30,
    source: "function MarkerDemo() {\n  return (\n    <Stack gap=\"4\">\n      <Marker.Separator>Today</Marker.Separator>\n      <Marker.Status tone=\"info\">\n        <Marker.TypingIndicator />\n        Indoku Bot is typing...\n      </Marker.Status>\n      <Marker.Status tone=\"success\">Pesan terkirim</Marker.Status>\n      <Marker.Status tone=\"error\">Gagal ngirim, coba lagi</Marker.Status>\n    </Stack>\n  )\n}",
  },
  "chat": {
    Demo: S31,
    source: "function ChatComposedDemo() {\n  const [reasoningOpen, setReasoningOpen] = useState(false)\n  const botAvatar = (\n    <Avatar.Root size=\"xs\">\n      <Avatar.Fallback name=\"Indoku Bot\" />\n    </Avatar.Root>\n  )\n\n  return (\n    <Card.Root h=\"96\" overflow=\"hidden\">\n      <MessageScroller.Root p=\"4\" watch={[reasoningOpen]}>\n        <Stack gap=\"5\">\n          <Marker.Separator>Today</Marker.Separator>\n\n          {/* Message.Group: 2 balasan bot berurutan numpuk rapet, satu avatar di bawah grup */}\n          <Message.Group avatar={botAvatar} avatarPosition=\"bottom\" header=\"Indoku Bot · 09:41\">\n            <Bubble.Root align=\"start\">\n              <Bubble.Content>Hey! Mau liat chat bubble?</Bubble.Content>\n            </Bubble.Root>\n            <Bubble.Root align=\"start\">\n              <Bubble.Content>\n                Gue bisa ngegrupin pesan, gonta-ganti sisi, dan bikin satu thread gampang dipindai.\n              </Bubble.Content>\n              <Bubble.Footer>\n                <Bubble.Action aria-label=\"Like\">👍</Bubble.Action>\n                <Bubble.Action aria-label=\"Fire\">🔥</Bubble.Action>\n              </Bubble.Footer>\n            </Bubble.Root>\n          </Message.Group>\n\n          <Message.Root align=\"end\">\n            <Message.Avatar />\n            <Message.Content>\n              <Bubble.Root align=\"end\" variant=\"solid\">\n                <Bubble.Content>Mantap. Coba kirim lampiran juga dong.</Bubble.Content>\n              </Bubble.Root>\n            </Message.Content>\n          </Message.Root>\n\n          <Message.Group avatar={botAvatar} avatarPosition=\"bottom\">\n            <Bubble.Root align=\"start\">\n              <Bubble.Content>\n                Nih rekapnya.\n                <Attachment.Root mt=\"2\">\n                  <Attachment.Media />\n                  <Attachment.Content>\n                    <Attachment.Name>invoice-september.pdf</Attachment.Name>\n                    <Attachment.Meta size={482000} />\n                  </Attachment.Content>\n                </Attachment.Root>\n                <Bubble.Collapsible\n                  open={reasoningOpen}\n                  onOpenChange={setReasoningOpen}\n                  label=\"Show reasoning\"\n                  mt=\"2\"\n                >\n                  Ngambil data invoice bulan ini, ngitung total, terus dirender jadi kartu attachment.\n                </Bubble.Collapsible>\n              </Bubble.Content>\n            </Bubble.Root>\n          </Message.Group>\n\n          <Marker.Status tone=\"info\">\n            <Marker.TypingIndicator />\n            Indoku Bot is typing...\n          </Marker.Status>\n        </Stack>\n      </MessageScroller.Root>\n    </Card.Root>\n  )\n}",
  },
  "button-group": {
    Demo: S33,
    source: "function ButtonGroupDemo() {\n  return (\n    <ButtonGroup.Root>\n      <Button variant=\"outline\">Left</Button>\n      <Button variant=\"outline\">Middle</Button>\n      <Button variant=\"outline\">Right</Button>\n    </ButtonGroup.Root>\n  )\n}",
  },
  "avatar": {
    Demo: S34,
    source: "function AvatarDemo() {\n  return (\n    <HStack gap=\"3\">\n      <Avatar.Root size=\"sm\">\n        <Avatar.Fallback name=\"Indoku Bot\" />\n      </Avatar.Root>\n      <Avatar.Root size=\"md\">\n        <Avatar.Image src=\"https://i.pravatar.cc/100?img=12\" alt=\"User\" />\n        <Avatar.Fallback name=\"User\" />\n      </Avatar.Root>\n      <Avatar.Root size=\"lg\">\n        <Avatar.Fallback name=\"Ken99\" />\n      </Avatar.Root>\n    </HStack>\n  )\n}",
  },
  "aspect-ratio": {
    Demo: S35,
    source: "function AspectRatioDemo() {\n  return (\n    <AspectRatio ratio={16 / 9} maxW=\"sm\">\n      <Box bg=\"bg.muted\" rounded=\"l2\" display=\"flex\" alignItems=\"center\" justifyContent=\"center\">\n        <Text fontSize=\"sm\" color=\"fg.muted\">16:9</Text>\n      </Box>\n    </AspectRatio>\n  )\n}",
  },
  "accordion": {
    Demo: S36,
    source: "function AccordionDemo() {\n  return (\n    <Accordion.Root maxW=\"lg\" collapsible defaultValue={[\"a1\"]}>\n      <Accordion.Item value=\"a1\">\n        <Accordion.ItemTrigger>\n          Is it accessible?\n          <Accordion.ItemIndicator />\n        </Accordion.ItemTrigger>\n        <Accordion.ItemContent>\n          <Accordion.ItemBody>Yes, it follows the WAI-ARIA design pattern.</Accordion.ItemBody>\n        </Accordion.ItemContent>\n      </Accordion.Item>\n      <Accordion.Item value=\"a2\">\n        <Accordion.ItemTrigger>\n          Is it styled?\n          <Accordion.ItemIndicator />\n        </Accordion.ItemTrigger>\n        <Accordion.ItemContent>\n          <Accordion.ItemBody>Yes, it's themed ala shadcn di @indoku/ui.</Accordion.ItemBody>\n        </Accordion.ItemContent>\n      </Accordion.Item>\n    </Accordion.Root>\n  )\n}",
  },
  "breadcrumb": {
    Demo: S37,
    source: "function BreadcrumbDemo() {\n  return (\n    <Breadcrumb.Root>\n      <Breadcrumb.List>\n        <Breadcrumb.Item>\n          <Breadcrumb.Link href=\"#\">Home</Breadcrumb.Link>\n        </Breadcrumb.Item>\n        <Breadcrumb.Separator />\n        <Breadcrumb.Item>\n          <Breadcrumb.Link href=\"#\">Components</Breadcrumb.Link>\n        </Breadcrumb.Item>\n        <Breadcrumb.Separator />\n        <Breadcrumb.Item>\n          <Breadcrumb.CurrentLink>Breadcrumb</Breadcrumb.CurrentLink>\n        </Breadcrumb.Item>\n      </Breadcrumb.List>\n    </Breadcrumb.Root>\n  )\n}",
  },
  "tabs": {
    Demo: S38,
    source: "function TabsDemo() {\n  return (\n    <Tabs.Root defaultValue=\"account\" maxW=\"md\">\n      <Tabs.List>\n        <Tabs.Trigger value=\"account\">Account</Tabs.Trigger>\n        <Tabs.Trigger value=\"password\">Password</Tabs.Trigger>\n      </Tabs.List>\n      <Tabs.Content value=\"account\">Kelola info akun lo di sini.</Tabs.Content>\n      <Tabs.Content value=\"password\">Ganti password lo di sini.</Tabs.Content>\n    </Tabs.Root>\n  )\n}",
  },
  "skeleton": {
    Demo: S39,
    source: "function SkeletonDemo() {\n  return (\n    <HStack gap=\"3\">\n      <Skeleton boxSize=\"10\" rounded=\"full\" />\n      <Stack gap=\"2\">\n        <Skeleton h=\"4\" w=\"52\" />\n        <Skeleton h=\"4\" w=\"40\" />\n      </Stack>\n    </HStack>\n  )\n}",
  },
  "steps": {
    Demo: S40,
    source: "function StepsDemo() {\n  return (\n    <Steps.Root defaultStep={1} count={3} maxW=\"md\">\n      <Steps.List>\n        {[\"Akun\", \"Profil\", \"Selesai\"].map((title, index) => (\n          <Steps.Item key={index} index={index}>\n            <Steps.Indicator />\n            <Steps.Title>{title}</Steps.Title>\n            <Steps.Separator />\n          </Steps.Item>\n        ))}\n      </Steps.List>\n    </Steps.Root>\n  )\n}",
  },
  "status": {
    Demo: S41,
    source: "function StatusDemo() {\n  return (\n    <HStack gap=\"4\">\n      <Status.Root colorPalette=\"green\">\n        <Status.Indicator />\n        Online\n      </Status.Root>\n      <Status.Root colorPalette=\"red\">\n        <Status.Indicator />\n        Offline\n      </Status.Root>\n      <Status.Root colorPalette=\"yellow\">\n        <Status.Indicator />\n        Away\n      </Status.Root>\n    </HStack>\n  )\n}",
  },
  "clipboard": {
    Demo: S42,
    source: "function ClipboardDemo() {\n  return (\n    <Clipboard.Root value=\"npm i @indoku/ui\">\n      <HStack gap=\"2\">\n        <Clipboard.Input asChild>\n          <Input readOnly maxW=\"xs\" />\n        </Clipboard.Input>\n        <Clipboard.Trigger asChild>\n          <Button size=\"sm\" variant=\"outline\">\n            <Clipboard.Indicator />\n          </Button>\n        </Clipboard.Trigger>\n      </HStack>\n    </Clipboard.Root>\n  )\n}",
  },
  "stat": {
    Demo: S43,
    source: "function StatDemo() {\n  return (\n    <HStack gap=\"8\">\n      <Stat.Root>\n        <Stat.Label>Total Revenue</Stat.Label>\n        <Stat.ValueText>$45,231.89</Stat.ValueText>\n        <Stat.HelpText>+20.1% dari bulan lalu</Stat.HelpText>\n      </Stat.Root>\n      <Stat.Root>\n        <Stat.Label>Subscriptions</Stat.Label>\n        <Stat.ValueText>+2,350</Stat.ValueText>\n        <Stat.HelpText>+180.1% dari bulan lalu</Stat.HelpText>\n      </Stat.Root>\n    </HStack>\n  )\n}",
  },
  "data-list": {
    Demo: S44,
    source: "function DataListDemo() {\n  return (\n    <DataList.Root maxW=\"sm\">\n      {[\n        [\"Nama\", \"Indoku Bot\"],\n        [\"Status\", \"Aktif\"],\n        [\"Versi\", \"0.0.1\"],\n      ].map(([label, value]) => (\n        <DataList.Item key={label}>\n          <DataList.ItemLabel>{label}</DataList.ItemLabel>\n          <DataList.ItemValue>{value}</DataList.ItemValue>\n        </DataList.Item>\n      ))}\n    </DataList.Root>\n  )\n}",
  },
  "qr-code": {
    Demo: N.QrCodeDemo,
    source: "function QrCodeDemo() {\n  return (\n    <HStack gap=\"4\" align=\"start\">\n      <QrCode.Root value=\"https://indoku.id\" boxSize=\"36\" />\n      <QrCode.Root value=\"https://indoku.id/u/demo\" level=\"H\" boxSize=\"36\">\n        <QrCode.Frame />\n        <QrCode.Overlay>\n          <Text fontWeight=\"bold\">I</Text>\n        </QrCode.Overlay>\n      </QrCode.Root>\n    </HStack>\n  )\n}",
  },
  "kbd": {
    Demo: N.KbdDemo,
    source: "function KbdDemo() {\n  const [open, setOpen] = useState(false)\n  return (\n    <HStack gap=\"4\" wrap=\"wrap\">\n      <KbdGroup>\n        <Kbd>⌘</Kbd>\n        <Kbd>⇧</Kbd>\n        <Kbd>⌥</Kbd>\n        <Kbd>⌃</Kbd>\n      </KbdGroup>\n      <KbdGroup separator=\"+\">\n        <Kbd>Ctrl</Kbd>\n        <Kbd>B</Kbd>\n      </KbdGroup>\n      <Button variant=\"outline\" onClick={() => setOpen(true)}>\n        Open Menu\n      </Button>\n      <Command.Dialog open={open} onOpenChange={setOpen}>\n        <Command.Input placeholder=\"Type a command or search…\" />\n        <Command.List>\n          <Command.Group heading=\"Navigation\">\n            <Command.Item>\n              <FolderIcon />\n              Folders\n              <Command.Shortcut>\n                <KbdGroup>\n                  <Kbd>⌘</Kbd>\n                  <Kbd>F</Kbd>\n                </KbdGroup>\n              </Command.Shortcut>\n            </Command.Item>\n          </Command.Group>\n          <Command.Empty />\n        </Command.List>\n      </Command.Dialog>\n    </HStack>\n  )\n}",
  },
  "empty": {
    Demo: N.EmptyDemo,
    source: "function EmptyDemo() {\n  return (\n    <Empty.Root variant=\"outline\">\n      <Empty.Header>\n        <Empty.Media variant=\"icon\">\n          <FolderIcon />\n        </Empty.Media>\n        <Empty.Title>No Projects Yet</Empty.Title>\n        <Empty.Description>You haven't created any projects yet. Get started by creating your first project.</Empty.Description>\n      </Empty.Header>\n      <Empty.Content>\n        <HStack>\n          <Button size=\"sm\">Create Project</Button>\n          <Button size=\"sm\" variant=\"outline\">\n            Import Project\n          </Button>\n        </HStack>\n      </Empty.Content>\n    </Empty.Root>\n  )\n}",
  },
  "input-otp": {
    Demo: N.InputOtpDemo,
    source: "function InputOtpDemo() {\n  const [otp, setOtp] = useState(\"\")\n  return (\n    <Stack gap=\"4\">\n      <InputOTP.Root maxLength={6} value={otp} onChange={setOtp}>\n        <InputOTP.Group>\n          {[0, 1, 2].map((i) => (\n            <InputOTP.Slot key={i} index={i} />\n          ))}\n        </InputOTP.Group>\n        <InputOTP.Separator />\n        <InputOTP.Group>\n          {[3, 4, 5].map((i) => (\n            <InputOTP.Slot key={i} index={i} />\n          ))}\n        </InputOTP.Group>\n      </InputOTP.Root>\n      <Text fontSize=\"xs\" color=\"fg.muted\">\n        Value: {otp || \"(kosong)\"}\n      </Text>\n    </Stack>\n  )\n}",
  },
  "input-group": {
    Demo: N.InputGroupDemo,
    source: "function InputGroupDemo() {\n  return (\n    <InputGroup maxW=\"sm\" startElement=\"🔍\" endElement={<Text fontSize=\"xs\">12 results</Text>}>\n      <Input placeholder=\"Search…\" />\n    </InputGroup>\n  )\n}",
  },
  "toggle": {
    Demo: N.ToggleDemo,
    source: "function ToggleDemo() {\n  return (\n    <HStack gap=\"4\" wrap=\"wrap\">\n      <Toggle aria-label=\"Bold\" variant=\"outline\">\n        B\n      </Toggle>\n      <ToggleGroup.Root type=\"multiple\" variant=\"outline\">\n        <ToggleGroup.Item value=\"b\">B</ToggleGroup.Item>\n        <ToggleGroup.Item value=\"i\">I</ToggleGroup.Item>\n        <ToggleGroup.Item value=\"u\">U</ToggleGroup.Item>\n      </ToggleGroup.Root>\n      <ToggleGroup.Root type=\"single\" spacing={0}>\n        <ToggleGroup.Item value=\"l\">L</ToggleGroup.Item>\n        <ToggleGroup.Item value=\"c\">C</ToggleGroup.Item>\n        <ToggleGroup.Item value=\"r\">R</ToggleGroup.Item>\n      </ToggleGroup.Root>\n      <ToggleGroup.Root orientation=\"vertical\" spacing={0}>\n        <ToggleGroup.Item value=\"1\">1</ToggleGroup.Item>\n        <ToggleGroup.Item value=\"2\">2</ToggleGroup.Item>\n      </ToggleGroup.Root>\n    </HStack>\n  )\n}",
  },
  "resizable": {
    Demo: N.ResizableDemo,
    source: "function ResizableDemo() {\n  const cell = (label: string) => (\n    <Flex h=\"full\" align=\"center\" justify=\"center\" fontWeight=\"semibold\">\n      {label}\n    </Flex>\n  )\n  return (\n    <Resizable.PanelGroup h=\"56\" maxW=\"xl\" rounded=\"l3\" borderWidth=\"1px\">\n      <Resizable.Panel defaultSize={40} minSize={20}>\n        {cell(\"One\")}\n      </Resizable.Panel>\n      <Resizable.Handle withHandle />\n      <Resizable.Panel>\n        <Resizable.PanelGroup direction=\"vertical\">\n          <Resizable.Panel defaultSize={50}>{cell(\"Two\")}</Resizable.Panel>\n          <Resizable.Handle withHandle />\n          <Resizable.Panel>{cell(\"Three\")}</Resizable.Panel>\n        </Resizable.PanelGroup>\n      </Resizable.Panel>\n    </Resizable.PanelGroup>\n  )\n}",
  },
  "scroll-area": {
    Demo: N.ScrollAreaDemo,
    source: "function ScrollAreaDemo() {\n  return (\n    <ScrollArea.Root h=\"48\" w=\"48\" rounded=\"l2\" borderWidth=\"1px\">\n      <Stack gap=\"0\" p=\"3\">\n        {Array.from({ length: 30 }, (_, i) => `v1.2.0-beta.${30 - i}`).map((v) => (\n          <Text key={v} fontSize=\"sm\" py=\"2\" borderBottomWidth=\"1px\">\n            {v}\n          </Text>\n        ))}\n      </Stack>\n    </ScrollArea.Root>\n  )\n}",
  },
  "questionnaire": {
    Demo: N.QuestionnaireDemo,
    source: "function QuestionnaireDemo() {\n  return (\n    <Questionnaire.Root\n      onSubmit={(a) => alert(JSON.stringify(a, null, 2))}\n      items={[\n        {\n          name: \"build\",\n          prompt: \"What should the agent build next?\",\n          description: \"Choose a direction or describe another task.\",\n          required: true,\n          choices: [\n            { value: \"timeline\", label: \"Tool call timeline\", description: \"Show what the agent ran and what came back.\" },\n            { value: \"approval\", label: \"Approval checkpoints\", description: \"Ask before sensitive or destructive actions.\" },\n            { value: \"handoff\", label: \"Sub-agent handoffs\", description: \"Make delegated work and results easier to follow.\" },\n          ],\n          input: { placeholder: \"Describe another feature…\" },\n        },\n        {\n          name: \"detail\",\n          prompt: \"How much detail should it include?\",\n          description: \"Skip this if you are not sure yet.\",\n          multiple: true,\n          choices: [\n            { value: \"focused\", label: \"Focused\" },\n            { value: \"full\", label: \"Complete flow\" },\n          ],\n        },\n      ]}\n    />\n  )\n}",
  },
}
