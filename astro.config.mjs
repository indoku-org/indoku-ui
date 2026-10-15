import react from "@astrojs/react"
import vercel from "@astrojs/vercel"
import { defineConfig } from "astro/config"

export default defineConfig({
  site: process.env.SITE_URL ?? "https://ui.indoku.org",
  output: "server",
  adapter: vercel(),
  integrations: [react()],
  vite: {
    resolve: {
      dedupe: ["react", "react-dom", "@emotion/react"],
    },
    ssr: {
      noExternal: ["@indoku/ui", "@indoku/science"],
      resolve: { conditions: ["node", "import", "module", "default"], externalConditions: ["node", "import"] },
    },
  },
})
