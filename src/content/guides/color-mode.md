---
title: Color mode
description: Light, dark and system color mode with Provider, ColorModeButton and useColorMode.
section: theming
---

# Color mode

`Provider` handles light, dark and system.

| Prop | Meaning |
| --- | --- |
| `defaultColorMode` | `"light"`, `"dark"` or `"system"` (default). |
| `forcedColorMode` | Lock one mode and ignore the user. |
| `storageKey` | localStorage key. Default `indoku-color-mode`. |

```tsx
import { ColorModeButton, useColorMode } from "@indoku/ui"

const { colorMode, toggleColorMode } = useColorMode()
```

## No flash on first load

Put `colorModeScript` in the document head before the page renders. In Astro:

```astro
<script is:inline set:html={colorModeScript} />
```

With a custom `storageKey`, build the script with `createColorModeScript(key)`.
