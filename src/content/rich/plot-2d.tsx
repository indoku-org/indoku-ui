import { Plot2D } from "../../science-ui"
import { renderLatex } from "../../lib/latex"
import type { Scene2DLike } from "../../science-ui"
import { useState } from "react"
import type { RichDoc } from "../types"

const wave: Scene2DLike = {
  kind: "2d",
  title: "Sine wave",
  bounds: { xMin: 0, xMax: 10, yMin: -1.5, yMax: 1.5 },
  duration: 2,
  loop: true,
  latex: ["y = \\sin(kx - \\omega t)"],
  frame(t) {
    const pts: [number, number][] = []
    for (let i = 0; i <= 200; i++) {
      const x = i / 20
      pts.push([x, Math.sin(x * 1.2 - t * Math.PI)])
    }
    return [
      { t: "line", pts: [[0, 0], [10, 0]], color: "muted" },
      { t: "line", pts, color: "accent", width: 2 },
      { t: "point", x: 2.5, y: Math.sin(2.5 * 1.2 - t * Math.PI), r: 6, label: "P" },
    ]
  },
}

export function Plot2DBasic() {
  return <Plot2D scene={wave} />
}

export function Plot2DControlled() {
  const [t, setT] = useState(0.5)
  return (
    <div>
      <input type="range" min={0} max={2} step={0.01} value={t} onChange={(e) => setT(parseFloat(e.target.value))} style={{ width: "100%", marginBottom: 8 }} />
      <Plot2D scene={wave} t={t} />
    </div>
  )
}

const projectile: Scene2DLike = {
  kind: "2d",
  title: "Projectile",
  bounds: { xMin: -2, xMax: 42, yMin: -2, yMax: 14 },
  duration: 2.5,
  loop: true,
  latex: ["R = 40\\,\\mathrm{m}", "H_{max} = 12.3\\,\\mathrm{m}"],
  frame(t) {
    const v = 20, g = 9.81, a = Math.PI / 4
    const pos = (s: number): [number, number] => [v * Math.cos(a) * s, v * Math.sin(a) * s - 0.5 * g * s * s]
    const full: [number, number][] = Array.from({ length: 61 }, (_, i) => pos((i / 60) * 2.89))
    const [x, y] = pos(Math.min(t, 2.89))
    return [
      { t: "line", pts: [[-2, 0], [42, 0]], color: "muted" },
      { t: "line", pts: full, color: "muted", dash: true },
      { t: "vector", x, y, dx: v * Math.cos(a) * 0.15, dy: (v * Math.sin(a) - g * t) * 0.15, color: "warn", label: "v" },
      { t: "point", x, y, r: 6 },
    ]
  },
}

export function Plot2DVectors() {
  return <Plot2D scene={projectile} aspect={2.2} renderLatex={renderLatex} />
}

export function Plot2DStatic() {
  const parabola: Scene2DLike = {
    kind: "2d",
    bounds: { xMin: -1, xMax: 4, yMin: -1, yMax: 3 },
    duration: 0,
    frame: () => [
      { t: "line", pts: Array.from({ length: 101 }, (_, i) => [-1 + i * 0.05, (-1 + i * 0.05) ** 2 - 3 * (-1 + i * 0.05) + 2] as [number, number]), color: "accent", width: 2 },
      { t: "point", x: 1, y: 0, color: "ok", label: "x₁" },
      { t: "point", x: 2, y: 0, color: "ok", label: "x₂" },
      { t: "point", x: 1.5, y: -0.25, color: "warn", label: "vertex" },
    ],
  }
  return <Plot2D scene={parabola} grid={false} />
}

export const doc: RichDoc = {
  intro: [
    "Draws a 2D scene with plain SVG: lines, points, vectors and text, with an optional play bar. It does no math and has no dependencies; it only draws the data it is given.",
    "A scene is a plain object: `bounds` (the visible math window), `duration` in seconds (0 for a static plot) and a pure `frame(t)` function that returns the items to draw. Hand-write one, or take it from `@indoku/science` (for example `projectileScene()` or `waveScene()`); the shape is the same.",
  ],
  importCode: 'import { MathRenderer, Plot2D } from "@indoku/ui"\nimport type { Scene2DLike } from "@indoku/ui"\n\nconst renderLatex = (latex: string) => <MathRenderer latex={latex} />',
  anatomy: `<Plot2D scene={{ kind: "2d", bounds, duration, loop?, latex?, frame(t) }} />

frame(t) returns Item2D[]:
  { t: "line",   pts: [x, y][], color?, width?, dash? }
  { t: "point",  x, y, r?, color?, label? }
  { t: "vector", x, y, dx, dy, color?, label? }
  { t: "text",   x, y, text, color? }

colors: "accent" | "muted" | "ok" | "warn" | "danger" | any CSS color`,
  examples: [
    { id: "basic", title: "Animated scene", description: "An animated scene plays on its own and shows a play bar with a scrubber and speed buttons. Animation starts paused when the user prefers reduced motion.", fn: "Plot2DBasic", helpers: ["wave"] },
    { id: "controlled", title: "Controlled time", description: "Pass `t` to drive the plot from your own state (a slider, a lesson step, scroll position). The play bar is hidden.", fn: "Plot2DControlled", helpers: ["wave"] },
    { id: "vectors", title: "Vectors, dashes and formulas", description: "Vectors point in data coordinates. `renderLatex` receives each string in `scene.latex`. Pass a `renderLatex` built on `MathRenderer` to typeset them with KaTeX.", fn: "Plot2DVectors", helpers: ["projectile"] },
    { id: "static", title: "Static scene", description: "`duration: 0` makes a static plot with no play bar. Turn the grid off with `grid={false}`.", fn: "Plot2DStatic" },
  ],
  props: [
    {
      part: "Plot2D",
      rows: [
        { name: "scene", type: "Scene2DLike", required: true, description: "The scene to draw: bounds, duration and a pure frame(t) function." },
        { name: "t", type: "number", required: false, description: "Controlled time in seconds. Omit to let the component animate itself." },
        { name: "controls", type: "boolean", required: false, default: "true", description: "Show the play bar for animated scenes (only when `t` is not set)." },
        { name: "aspect", type: "number", required: false, default: "16 / 9", description: "Width divided by height of the plot area." },
        { name: "grid", type: "boolean", required: false, default: "true", description: "Draw the background grid." },
        { name: "renderLatex", type: "(latex: string) => ReactNode", required: false, description: "Renders each string of `scene.latex` below the plot. Use `(latex) => <MathRenderer latex={latex} />`, or your own renderer. Omit to hide them." },
      ],
    },
  ],
  a11y: [
    "The SVG has `role=\"img\"` and uses `scene.title` as its label.",
    "The play bar buttons and the time slider are real form controls with labels, so they work with the keyboard.",
    "Autoplay is off when `prefers-reduced-motion` is set; the user can still press Play or drag the scrubber.",
  ],
  notes: [
    "Keep `frame(t)` pure and cheap: it runs on every animation frame. Build large constant data (like a full trajectory) outside `frame`, or once per scene.",
    "Keep the `scene` object stable (module constant or `useMemo`). A new object resets the animation clock.",
    "Axes are not equal-scaled. Set `aspect` to match your `bounds` when angles matter (a projectile, a circle).",
  ],
  seeAlso: ["player", "chart"],
}
