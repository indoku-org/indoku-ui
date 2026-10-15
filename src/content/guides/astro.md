---
title: Astro
description: Use @indoku/ui in Astro with React islands and full server-side rendering.
group: Frameworks
---

# Astro

```bash
npm create astro@latest my-site
cd my-site
npx astro add react
npm i @indoku/ui @emotion/react
```

## Config

Render on the server and make sure React and Emotion are not duplicated:

```js
// astro.config.mjs
import react from "@astrojs/react"
import node from "@astrojs/node"
import { defineConfig } from "astro/config"

export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [react()],
  vite: {
    resolve: { dedupe: ["react", "react-dom", "@emotion/react"] },
    ssr: { noExternal: ["@indoku/ui"] },
  },
})
```

## No flash of the wrong theme

Inject the color mode script in `<head>` so the page paints in the right mode before React hydrates:

```astro
---
import { colorModeScript } from "@indoku/ui"
---
<html lang="en">
  <head>
    <script is:inline set:html={colorModeScript} />
  </head>
  <body><slot /></body>
</html>
```

## Islands

Put a `Provider` inside each island:

```tsx
// src/components/Counter.tsx
import { Button, Provider } from "@indoku/ui"
import { useState } from "react"

export default function Counter() {
  const [n, setN] = useState(0)
  return (
    <Provider>
      <Button onClick={() => setN(n + 1)}>Clicked {n}</Button>
    </Provider>
  )
}
```

```astro
---
import Counter from "../components/Counter"
---
<Counter client:load />
```

Because pages render on the server, `curl` and crawlers receive complete HTML, including the island markup.

Astro needs `client:*` components imported statically in the `.astro` file, so group related UI in one island instead of dynamic imports.
