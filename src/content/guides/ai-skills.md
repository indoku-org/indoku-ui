---
title: AI Skills
description: Install ready-made skills that teach your AI agent how to build and refactor UI with IndokuUI.
section: start
group: AI for Agents
---

# AI Skills

A skill is a folder with a `SKILL.md` file: a short description plus instructions. The agent reads only the description at first and loads the full instructions **when your task matches**. A skill teaches *how to work*, not *what exists*.

| | Is | Best for |
| --- | --- | --- |
| [MCP Server](/docs/mcp) | Tools the agent calls | Exact facts: props, examples, tokens |
| **AI Skills** | Instructions the agent follows | Conventions: which primitives, which tokens, what to audit |

## Available skills

### `indoku-ui-builder`

Generates screens and components the IndokuUI way.

- Boilerplate for pages, forms, dashboards and dialogs.
- Layout with primitives (`Stack`, `HStack`, `Grid`, `Flex`, `Box`) instead of raw `div` and custom CSS.
- Semantic tokens only (`bg.muted`, `fg.muted`, `border`), never hard-coded hex colors, so dark mode works.
- Looks components up through the [MCP server](/docs/mcp) when available.

### `indoku-ui-refactor`

Audits and cleans up existing UI.

- **Accessibility**: labels on inputs and icon buttons, focus states, heading order, contrast through tokens.
- **Token usage**: hard-coded colors, sizes and radii replaced by tokens and `l1`/`l2`/`l3`.
- **Layout cleanup**: nested wrappers and inline styles replaced by primitives and style props.
- Reports findings first, then applies changes.

## Install

All skills live in one folder of the repo (`skills/`), so one command installs them:

```bash
npx skills add <owner>/<repo>
```

Pick a single one:

```bash
npx skills add <owner>/<repo> --skill indoku-ui-builder
```

Manual install: copy the folder into your agent's skills directory, for example `.claude/skills/indoku-ui-builder/` for Claude Code.

## Use

Just ask. The agent picks the skill from its description:

- *"Build a settings page with a profile form and a danger zone."* (builder)
- *"Audit this component for accessibility and token usage."* (refactor)
