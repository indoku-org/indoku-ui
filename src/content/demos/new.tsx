import { useState } from "react"
import {
  Attachment,
  Button,
  Command,
  Empty,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputOTP,
  Kbd,
  KbdGroup,
  QrCode,
  Questionnaire,
  Resizable,
  ScrollArea,
  Stack,
  Text,
  Toggle,
  ToggleGroup,
} from "@indoku/ui"

const FolderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </svg>
)

export function QrCodeDemo() {
  return (
    <HStack gap="4" align="start">
      <QrCode.Root value="https://indoku.id" boxSize="36" />
      <QrCode.Root value="https://indoku.id/u/demo" level="H" boxSize="36">
        <QrCode.Frame />
        <QrCode.Overlay>
          <Text fontWeight="bold">I</Text>
        </QrCode.Overlay>
      </QrCode.Root>
    </HStack>
  )
}

export function AttachmentCardsDemo() {
  return (
    <Stack gap="2">
      <Attachment.Group>
        {["workspace.png", "desk-reference.jpg", "office-reference.jpg"].map((n) => (
          <Attachment.Root key={n} orientation="vertical">
            <Attachment.Media src={`https://picsum.photos/seed/${n}/320/240`} />
            <Attachment.Content>
              <Attachment.Name>{n}</Attachment.Name>
              <Attachment.Meta format={n.split(".")[1].toUpperCase()} size={840000} />
            </Attachment.Content>
          </Attachment.Root>
        ))}
      </Attachment.Group>
      <Attachment.Root>
        <Attachment.Media loading />
        <Attachment.Content>
          <Attachment.Name>sales-dashboard.pdf</Attachment.Name>
          <Attachment.Status status="uploading" progress={64} variant="text" />
        </Attachment.Content>
        <Attachment.Actions>
          <Attachment.Remove />
        </Attachment.Actions>
      </Attachment.Root>
      <Attachment.Root>
        <Attachment.Media />
        <Attachment.Content>
          <Attachment.Name>rekap-penjualan.xlsx</Attachment.Name>
          <Attachment.Status status="uploading" progress={65} />
        </Attachment.Content>
        <Attachment.Actions>
          <Attachment.Remove />
        </Attachment.Actions>
      </Attachment.Root>
    </Stack>
  )
}

export function KbdDemo() {
  const [open, setOpen] = useState(false)
  return (
    <HStack gap="4" wrap="wrap">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
      <KbdGroup separator="+">
        <Kbd>Ctrl</Kbd>
        <Kbd>B</Kbd>
      </KbdGroup>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open Menu
      </Button>
      <Command.Dialog open={open} onOpenChange={setOpen}>
        <Command.Input placeholder="Type a command or search…" />
        <Command.List>
          <Command.Group heading="Navigation">
            <Command.Item>
              <FolderIcon />
              Folders
              <Command.Shortcut>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                  <Kbd>F</Kbd>
                </KbdGroup>
              </Command.Shortcut>
            </Command.Item>
          </Command.Group>
          <Command.Empty />
        </Command.List>
      </Command.Dialog>
    </HStack>
  )
}

export function EmptyDemo() {
  return (
    <Empty.Root variant="outline">
      <Empty.Header>
        <Empty.Media variant="icon">
          <FolderIcon />
        </Empty.Media>
        <Empty.Title>No Projects Yet</Empty.Title>
        <Empty.Description>You haven't created any projects yet. Get started by creating your first project.</Empty.Description>
      </Empty.Header>
      <Empty.Content>
        <HStack>
          <Button size="sm">Create Project</Button>
          <Button size="sm" variant="outline">
            Import Project
          </Button>
        </HStack>
      </Empty.Content>
    </Empty.Root>
  )
}

export function InputOtpDemo() {
  const [otp, setOtp] = useState("")
  return (
    <Stack gap="4">
      <InputOTP.Root maxLength={6} value={otp} onChange={setOtp}>
        <InputOTP.Group>
          {[0, 1, 2].map((i) => (
            <InputOTP.Slot key={i} index={i} />
          ))}
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          {[3, 4, 5].map((i) => (
            <InputOTP.Slot key={i} index={i} />
          ))}
        </InputOTP.Group>
      </InputOTP.Root>
      <Text fontSize="xs" color="fg.muted">
        Value: {otp || "(kosong)"}
      </Text>
    </Stack>
  )
}

export function InputGroupDemo() {
  return (
    <InputGroup maxW="sm" startElement="🔍" endElement={<Text fontSize="xs">12 results</Text>}>
      <Input placeholder="Search…" />
    </InputGroup>
  )
}

export function ToggleDemo() {
  return (
    <HStack gap="4" wrap="wrap">
      <Toggle aria-label="Bold" variant="outline">
        B
      </Toggle>
      <ToggleGroup.Root type="multiple" variant="outline">
        <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        <ToggleGroup.Item value="i">I</ToggleGroup.Item>
        <ToggleGroup.Item value="u">U</ToggleGroup.Item>
      </ToggleGroup.Root>
      <ToggleGroup.Root type="single" spacing={0}>
        <ToggleGroup.Item value="l">L</ToggleGroup.Item>
        <ToggleGroup.Item value="c">C</ToggleGroup.Item>
        <ToggleGroup.Item value="r">R</ToggleGroup.Item>
      </ToggleGroup.Root>
      <ToggleGroup.Root orientation="vertical" spacing={0}>
        <ToggleGroup.Item value="1">1</ToggleGroup.Item>
        <ToggleGroup.Item value="2">2</ToggleGroup.Item>
      </ToggleGroup.Root>
    </HStack>
  )
}

export function ResizableDemo() {
  const cell = (label: string) => (
    <Flex h="full" align="center" justify="center" fontWeight="semibold">
      {label}
    </Flex>
  )
  return (
    <Resizable.PanelGroup h="56" maxW="xl" rounded="l3" borderWidth="1px">
      <Resizable.Panel defaultSize={40} minSize={20}>
        {cell("One")}
      </Resizable.Panel>
      <Resizable.Handle withHandle />
      <Resizable.Panel>
        <Resizable.PanelGroup direction="vertical">
          <Resizable.Panel defaultSize={50}>{cell("Two")}</Resizable.Panel>
          <Resizable.Handle withHandle />
          <Resizable.Panel>{cell("Three")}</Resizable.Panel>
        </Resizable.PanelGroup>
      </Resizable.Panel>
    </Resizable.PanelGroup>
  )
}

export function ScrollAreaDemo() {
  return (
    <ScrollArea.Root h="48" w="48" rounded="l2" borderWidth="1px">
      <Stack gap="0" p="3">
        {Array.from({ length: 30 }, (_, i) => `v1.2.0-beta.${30 - i}`).map((v) => (
          <Text key={v} fontSize="sm" py="2" borderBottomWidth="1px">
            {v}
          </Text>
        ))}
      </Stack>
    </ScrollArea.Root>
  )
}

export function QuestionnaireDemo() {
  return (
    <Questionnaire.Root
      onSubmit={(a) => alert(JSON.stringify(a, null, 2))}
      items={[
        {
          name: "build",
          prompt: "What should the agent build next?",
          description: "Choose a direction or describe another task.",
          required: true,
          choices: [
            { value: "timeline", label: "Tool call timeline", description: "Show what the agent ran and what came back." },
            { value: "approval", label: "Approval checkpoints", description: "Ask before sensitive or destructive actions." },
            { value: "handoff", label: "Sub-agent handoffs", description: "Make delegated work and results easier to follow." },
          ],
          input: { placeholder: "Describe another feature…" },
        },
        {
          name: "detail",
          prompt: "How much detail should it include?",
          description: "Skip this if you are not sure yet.",
          multiple: true,
          choices: [
            { value: "focused", label: "Focused" },
            { value: "full", label: "Complete flow" },
          ],
        },
      ]}
    />
  )
}
