---
title: MCP Server
description: Let your AI assistant look up IndokuUI components, props, examples and theme tokens through the Model Context Protocol.
section: start
group: AI for Agents
---

# MCP Server

MCP (Model Context Protocol) gives an assistant **tools it can call**: instead of guessing a prop name, it asks the server. The IndokuUI server answers from the real docs data.

## Tools

| Tool | What it does |
| --- | --- |
| `list_components` | Every component with slug, group and one-line description. Optional `group` filter. |
| `get_component_props` | Props tables per part, import line, anatomy and theme variants. Optional `part`. |
| `get_component_example` | Copy-pasteable TSX examples. Optional `id`. |
| `get_theme` | Design tokens: color palettes, semantic tokens, spacing, radii, typography, breakpoints, recipes. |
| `theme_customization` | Working snippets to change colors, radius, fonts, dark mode or one component. |
| `search_components` | Search names, descriptions and example titles. |
| `get_installation` | Setup steps for `vite` or `astro`. |

The hosted endpoint also has `get_component_docs` (a full page as Markdown).

## Run it (stdio)

```bash
npx -y @indoku/ui-mcp
```

Zero dependencies, Node 18+. It ships a snapshot of the docs; set `INDOKU_DOCS_URL` to always read the live data from your docs site (`/mcp-data.json`).

## Client configs

### Claude Code

```bash
claude mcp add indoku-ui -- npx -y @indoku/ui-mcp
```

Or commit a `.mcp.json` in your project:

```json
{
  "mcpServers": {
    "indoku-ui": { "command": "npx", "args": ["-y", "@indoku/ui-mcp"] }
  }
}
```

### Cursor

`.cursor/mcp.json` (project) or `~/.cursor/mcp.json` (global):

```json
{
  "mcpServers": {
    "indoku-ui": { "command": "npx", "args": ["-y", "@indoku/ui-mcp"] }
  }
}
```

### VS Code

`.vscode/mcp.json`. Note the key is `servers`, not `mcpServers`:

```json
{
  "servers": {
    "indoku-ui": { "type": "stdio", "command": "npx", "args": ["-y", "@indoku/ui-mcp"] }
  }
}
```

### Windsurf

`~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "indoku-ui": { "command": "npx", "args": ["-y", "@indoku/ui-mcp"] }
  }
}
```

### Remote (no install)

Clients that support Streamable HTTP can connect to the docs site directly:

```json
{
  "mcpServers": {
    "indoku-ui": { "url": "https://YOUR-DOCS-HOST/mcp" }
  }
}
```

## Try it

Ask your assistant: *"Using the indoku-ui MCP server, build a settings form with Field, Input and Switch, and use semantic tokens."*
