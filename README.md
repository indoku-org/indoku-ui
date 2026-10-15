# indoku-ui

Documentation and live playground for [`@indoku/ui`](https://github.com/indoku-org/ui), deployed at **https://ui.indoku.org**.

Current library version: `0.0.1-beta`.

## Stack

- [Astro](https://astro.build) (server output) with React islands
- Vercel via `@astrojs/vercel`
- [`@indoku/ui`](https://www.npmjs.com/package/@indoku/ui): the component library this site renders
- [`@indoku/science`](https://www.npmjs.com/package/@indoku/science): math, physics and chemistry engines used by the science demos
- [`@indoku/ui-mcp`](https://www.npmjs.com/package/@indoku/ui-mcp): shared tools behind the `/mcp` endpoint
- `src/science-ui`: local React wrappers for the science demos (not part of the published `@indoku/ui` yet)

## Develop

```bash
npm install
npm run dev
```

The dev server runs on http://localhost:5173.

```bash
npm run build
npm run preview
```

## Indexing policy

This deployment is intentionally **not indexable** while the library is in beta:

- `public/robots.txt` disallows every crawler, including search, AI and archive bots.
- Every page carries `<meta name="robots" content="noindex, nofollow, ...">`.
- Every response (static files, pages, endpoints) carries an `X-Robots-Tag: noindex, nofollow, ...` header, set in `vercel.json` and in `src/middleware.ts`.
- There is no sitemap, no canonical links and no `llms.txt`.

To open the site up later, remove those layers together.

## License

MIT
