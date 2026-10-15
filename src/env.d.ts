/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_URL?: string
}

declare module "*?raw" {
  const content: string
  export default content
}
