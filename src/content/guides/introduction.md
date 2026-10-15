---
title: Introduction
description: IndokuUI is a standalone React UI library with a minimal shadcn-style look and dozens of ready-made components.
group: Get Started
order: 0
---

# Introduction

**IndokuUI** (`@indoku/ui`) is a standalone React UI library with the minimal look of shadcn/ui, its own styling engine and its own theme, in a single package. It includes the basics (Button, Input, Dialog, Tabs and more) and also Command, Data Table, Sidebar, Questionnaire, QR Code, Input OTP, Resizable, Rich Text Editor, Code Block and more.

Created by [@indokudev](https://github.com/indokudev).

## Principles

- **Few dependencies.** Only React and Emotion are required. QR codes, OTP input, resizable panels, the syntax highlighter and the rich text editor are all written from scratch.
- **Semantic HTML.** `nav`, `aside`, `ul`, `table`, `dialog` and `fieldset` instead of piles of `div`s, so components are easier to make accessible and to style.
- **Light and dark out of the box.** A built-in `Provider` and color mode, with no flash on load and no `next-themes`.
- **SSR ready.** Works with Vite, Astro (React islands) and Next.js App Router. Components that need the browser are marked `use client`.

## What is in the box

- Core components, themed and ready to use.
- Extra components, each documented with live examples, props and accessibility notes. Browse them in the sidebar.
- A docs site that is also machine-readable: a Markdown version of every page (`/docs/<slug>.md`) and an [MCP server](/docs/mcp) for your AI tools.

## Next steps

1. [Install the package](/docs/installation).
2. Pick your setup: [Vite](/docs/vite) or [Astro](/docs/astro).
3. Connect your AI assistant: [MCP server](/docs/mcp).
