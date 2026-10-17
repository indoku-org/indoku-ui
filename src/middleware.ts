import { defineMiddleware } from "astro:middleware"
import { robotsFor } from "./lib/seo"

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next()
  response.headers.set("X-Robots-Tag", robotsFor(context.url.pathname, response.status))
  return response
})
