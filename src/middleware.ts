import { defineMiddleware } from "astro:middleware"

const ROBOTS = "noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate"

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next()
  response.headers.set("X-Robots-Tag", ROBOTS)
  return response
})
