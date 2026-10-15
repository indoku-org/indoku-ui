---
title: Science
description: Use @indoku/science (engine) with the science components of @indoku/ui.
group: Get Started
section: start
---

# Science

Two layers, so you only pay for what you use:

- **`@indoku/science`**: a pure TypeScript engine. No dependencies, no framework, runs in Node, the browser, a worker or a server route.
- **`@indoku/ui`**: React components that draw what the engine computes: `Graph2D`, `Plot2D`, `Plot3D`, `PeriodicTable`, `MathRenderer`, `FormulaBlock`.

## Install

```bash
npm i @indoku/science
# optional, for LaTeX
npm i katex
```

```tsx
import "katex/dist/katex.min.css"
```

## Engine modules

Import from the root, or from a subpath for smaller bundles.

| Module | Subpath | What is inside |
| --- | --- | --- |
| Expressions | `@indoku/science/expr` | `compile`, `evaluate`, `compileFn`: safe text-to-function parser (no `eval`) |
| Math | `@indoku/science/math` | derivative, integral, roots, quadratic, linear systems, statistics, regression |
| Physics | `@indoku/science/physics` | waves, Doppler, fluids (continuity, Bernoulli, Reynolds), projectile, SHM |
| Chemistry | `@indoku/science/chemistry` | 118 elements, molar mass, equation balancer, limiting reagent, pH, ideal gas |
| Cartesian | `@indoku/science/cartesian` | viewport transforms, nice ticks, function sampling, geometry |

## Plain JavaScript

No React needed:

```js
import { molarMass, balanceEquation } from "@indoku/science/chemistry"

molarMass("Ca(OH)2") // 74.092
balanceEquation("C3H8 + O2 -> CO2 + H2O").equation // "C3H8 + 5 O2 → 3 CO2 + 4 H2O"
```

A prebuilt browser bundle is also available for plain HTML pages: load `science.iife.js` and use the global `Science`.

## With React

```tsx
import { Graph2D, FormulaBlock, PeriodicTable } from "@indoku/ui"
import { compileFn, ELEMENTS } from "@indoku/science"

export function Demo() {
  return (
    <>
      <FormulaBlock title="Wave speed" latex="v = f\lambda" />
      <Graph2D functions={[{ fn: compileFn("sin(x) / x"), label: "sinc" }]} />
      <PeriodicTable elements={ELEMENTS} />
    </>
  )
}
```

## Scenes

Engine functions such as `moleculeScene`, `pipeFlowScene`, `dnaScene`, `waveScene` and `projectileScene` return plain scene objects. Hand them to `Plot2D`, `Plot3D` or `Scene3DView` (from `@indoku/ui/three`). They are just data, so you can also build your own.

## Conventions

- SI units unless the function name says otherwise.
- Invalid input throws a plain `Error` with a readable message.
- Everything is tree-shakeable (`sideEffects: false`).
