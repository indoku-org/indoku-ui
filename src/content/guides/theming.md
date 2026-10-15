---
title: Theming
description: What the default IndokuUI theme defines.
section: theming
---

# Theming

`defaultSystem` is the IndokuUI theme. `Provider` already applies it, so most apps never touch it. Use `createSystem` to build your own.

```tsx
import { Provider } from "@indoku/ui"

<Provider>{children}</Provider>
```

## What the theme defines

- **Neutral palette**: `gray` is zinc, matching shadcn/ui.
- **Fonts**: Inter, with a system fallback stack.
- **Radii**: `l1`, `l2`, `l3` (see [Styling](/docs/styling)).
- **Backgrounds**: dark mode uses `gray.950` for the page and `gray.900` for panels.
- **Recipes**: Button, Input, Card, Tabs, Steps and others are restyled to be minimal.

Every component page has a Variants section that reads the live theme.
