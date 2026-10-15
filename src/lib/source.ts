/** Pull the source of a top-level `function Name(...) {...}` or `const name = ...` out of a raw file. */
export function pick(raw: string, name: string): string | undefined {
  return (
    raw.match(new RegExp(`(?:export )?function ${name}\\([^)]*\\)[\\s\\S]*?\\n}\\n`))?.[0] ??
    raw.match(new RegExp(`(?:export )?const ${name} =[\\s\\S]*?\\n(?:\\)|\\]|})?\\n`))?.[0] ??
    raw.match(new RegExp(`(?:export )?interface ${name} [\\s\\S]*?\\n}\\n`))?.[0]
  )
}

export function extractSource(raw: string, fn: string, helpers: string[] = []): string {
  return [...helpers.map((h) => pick(raw, h)), pick(raw, fn)]
    .filter(Boolean)
    .join("\n")
    .replace(/export /g, "")
    .trim()
}
