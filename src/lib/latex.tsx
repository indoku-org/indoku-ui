import { MathRenderer } from "../science-ui"

/** Drop-in `renderLatex` for Plot2D / Plot3D / ModelLab, built on the bundled-KaTeX MathRenderer. */
export const renderLatex = (latex: string) => <MathRenderer latex={latex} />
