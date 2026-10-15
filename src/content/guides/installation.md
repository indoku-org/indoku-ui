---
title: Installation
description: Install @indoku/ui with npm, pnpm, yarn or bun and wrap your app in the Provider.
group: Get Started
---

# Installation

```bash
npm i @indoku/ui @emotion/react
```

`pnpm add`, `yarn add` and `bun add` work the same way. Requirements: React 18 or 19 and `@emotion/react` 11 (both peer dependencies, so install them yourself; pnpm and yarn do not add peers for you). Everything else, including Ark UI, is installed automatically. Import everything from `@indoku/ui`.

## Wrap your app

```tsx
import { Provider, Button, ColorModeButton } from "@indoku/ui"

export function App() {
  return (
    <Provider>
      <ColorModeButton />
      <Button>Hello</Button>
    </Provider>
  )
}
```

`Provider` sets up the theme and light/dark mode. Every component, hook and token is exported from `@indoku/ui`, so you import from one place.

## Compound components

Multi-part components use namespaces:

```tsx
import { ToggleGroup } from "@indoku/ui"

<ToggleGroup.Root type="multiple">
  <ToggleGroup.Item value="b">B</ToggleGroup.Item>
  <ToggleGroup.Item value="i">I</ToggleGroup.Item>
</ToggleGroup.Root>
```

## Links with a router

Use `asChild` so the component's styles apply to your link element:

```tsx
<Button asChild>
  <Link to="/docs">Docs</Link>
</Button>
```

## Setups

- [Vite](/docs/vite)
- [Astro](/docs/astro)
