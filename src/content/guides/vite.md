---
title: Vite
description: Use @indoku/ui in a Vite + React app.
group: Frameworks
---

# Vite

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm i @indoku/ui @emotion/react
```

Wrap the app once in `src/main.tsx`:

```tsx
import { Provider } from "@indoku/ui"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>,
)
```

Then use any component:

```tsx
import { Button, Toggle } from "@indoku/ui"

export default function App() {
  return (
    <>
      <Button>Save</Button>
      <Toggle aria-label="Bold">B</Toggle>
    </>
  )
}
```

## Routing

Use `react-router` (v7+, the `react-router-dom` package is no longer needed) with `asChild`:

```tsx
import { Button } from "@indoku/ui"
import { Link } from "react-router"

<Button asChild><Link to="/settings">Settings</Link></Button>
```

## Linked / monorepo installs

If React is installed twice (linked packages, monorepos), dedupe it in `vite.config.ts`:

```ts
export default defineConfig({
  resolve: { dedupe: ["react", "react-dom", "@emotion/react"] },
})
```
