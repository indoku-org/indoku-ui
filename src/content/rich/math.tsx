import { FormulaBlock, MathRenderer } from "../../science-ui"
import type { RichDoc } from "../types"

export function MathInline() {
  return (
    <p>
      The quadratic formula is <MathRenderer latex="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" /> for any equation of the form <MathRenderer latex="ax^2 + bx + c = 0" />.
    </p>
  )
}

export function MathDisplay() {
  return <MathRenderer display latex="\int_0^{\infty} e^{-x^2}\,dx = \frac{\sqrt{\pi}}{2}" />
}

export function FormulaBlockDemo() {
  return (
    <FormulaBlock
      title="Wave speed"
      description="The speed of a wave equals its frequency times its wavelength."
      latex="v = f\lambda"
      variables={[
        { symbol: "v", meaning: "speed (m/s)" },
        { symbol: "f", meaning: "frequency (Hz)" },
        { symbol: "\\lambda", meaning: "wavelength (m)" },
      ]}
    />
  )
}

export function MathFallback() {
  // Until KaTeX has loaded (or when it is missing), the raw LaTeX is shown in monospace.
  return <MathRenderer latex="E = mc^2" />
}

export const doc: RichDoc = {
  intro: [
    "LaTeX rendering with KaTeX, themed to the surrounding text color. `MathRenderer` is the inline or display equation; `FormulaBlock` wraps one in a card with a title and a symbol legend.",
    "KaTeX is an optional peer dependency. Install it and import its stylesheet once: `npm i katex` and `import \"katex/dist/katex.min.css\"`. Without it the raw LaTeX is shown.",
  ],
  importCode: `import { MathRenderer, FormulaBlock } from "@indoku/ui"\nimport "katex/dist/katex.min.css"`,
  examples: [
    { id: "inline", title: "Inline", fn: "MathInline" },
    { id: "display", title: "Display", description: "Centered display style with `display`.", fn: "MathDisplay" },
    { id: "formula-block", title: "FormulaBlock", description: "Title, equation and a symbol legend.", fn: "FormulaBlockDemo" },
    { id: "fallback", title: "Fallback", description: "Shown as monospace text while KaTeX loads.", fn: "MathFallback" },
  ],
  a11y: ["KaTeX output includes MathML for assistive technology."],
  notes: ["Pass your own instance with the `katex` prop to skip the dynamic import."],
  seeAlso: ["graph-2d", "plot-2d"],
}
