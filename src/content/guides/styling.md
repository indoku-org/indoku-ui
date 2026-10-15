---
title: Styling
description: Style props, tokens and responsive values in IndokuUI.
section: styling
---

# Styling

Every component accepts style props. Use `Box`, `Flex`, `Stack` and `Span` for layout; use `as` to change the tag.

```tsx
import { Box, Button } from "@indoku/ui"

<Box as="section" p="4" bg="bg.muted" rounded="l2" _hover={{ bg: "bg.subtle" }}>
  <Button size={{ base: "sm", md: "md" }}>Save</Button>
</Box>
```

## Tokens

Prefer semantic tokens so light and dark mode work for free: `bg`, `bg.muted`, `fg`, `fg.muted`, `border`.

## Radii

IndokuUI adds three radii: `l1` (small), `l2` (medium, the default for controls) and `l3` (large, cards and dialogs).

## Responsive values

Pass an object: `{ base: "2", md: "4" }`. Breakpoints are `base`, `sm`, `md`, `lg`, `xl` and `2xl`.
