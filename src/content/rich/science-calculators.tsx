import { balanceEquation, dopplerFrequency, molarMass, percentComposition, pHStrongAcid, pHWeakAcid, projectile, reynoldsNumber, flowRegime, solveQuadratic, waveSpeed } from "@indoku/science"
import { useState } from "react"
import type { RichDoc } from "../types"

const box = { display: "grid", gap: 8, maxWidth: 420 } as const
const row = { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" } as const
const num = (v: string) => parseFloat(v)

export function CalcWave() {
  const [f, setF] = useState("440")
  const [l, setL] = useState("0.78")
  const [vs, setVs] = useState("20")
  return (
    <div style={box}>
      <div style={row}>
        <label>f (Hz) <input value={f} onChange={(e) => setF(e.target.value)} size={6} /></label>
        <label>λ (m) <input value={l} onChange={(e) => setL(e.target.value)} size={6} /></label>
      </div>
      <div>v = fλ = <b>{waveSpeed(num(f), num(l)).toFixed(2)}</b> m/s</div>
      <label>Source speed toward you (m/s) <input value={vs} onChange={(e) => setVs(e.target.value)} size={4} /></label>
      <div>Doppler: <b>{dopplerFrequency(num(f), 0, num(vs)).toFixed(1)}</b> Hz</div>
    </div>
  )
}

export function CalcFluid() {
  const [v, setV] = useState("1.5")
  const [d, setD] = useState("0.05")
  const re = reynoldsNumber(1000, num(v), num(d), 0.001)
  return (
    <div style={box}>
      <div style={row}>
        <label>v (m/s) <input value={v} onChange={(e) => setV(e.target.value)} size={6} /></label>
        <label>D (m) <input value={d} onChange={(e) => setD(e.target.value)} size={6} /></label>
      </div>
      <div>Water, Re = <b>{Math.round(re)}</b> → {flowRegime(re)}</div>
    </div>
  )
}

export function CalcProjectile() {
  const [speed, setSpeed] = useState("20")
  const [angle, setAngle] = useState("45")
  const p = projectile({ speed: num(speed), angleDeg: num(angle) })
  return (
    <div style={box}>
      <div style={row}>
        <label>v₀ (m/s) <input value={speed} onChange={(e) => setSpeed(e.target.value)} size={5} /></label>
        <label>θ (°) <input value={angle} onChange={(e) => setAngle(e.target.value)} size={5} /></label>
      </div>
      <div>Range <b>{p.range.toFixed(2)}</b> m · max height <b>{p.maxHeight.toFixed(2)}</b> m · time <b>{p.flightTime.toFixed(2)}</b> s</div>
    </div>
  )
}

export function CalcMolarMass() {
  const [formula, setFormula] = useState("Ca(OH)2")
  let out: { mass: number; pct: Record<string, number> } | null = null
  let error = ""
  try {
    out = { mass: molarMass(formula), pct: percentComposition(formula) }
  } catch (e) {
    error = (e as Error).message
  }
  return (
    <div style={box}>
      <input value={formula} onChange={(e) => setFormula(e.target.value)} style={{ fontFamily: "monospace" }} />
      {error && <small style={{ color: "crimson" }}>{error}</small>}
      {out && (
        <div>
          <b>{out.mass.toFixed(3)}</b> g/mol · {Object.entries(out.pct).map(([k, v]) => `${k} ${v.toFixed(1)}%`).join(" · ")}
        </div>
      )}
    </div>
  )
}

export function CalcBalance() {
  const [eq, setEq] = useState("C3H8 + O2 -> CO2 + H2O")
  let result = ""
  try {
    result = balanceEquation(eq).equation
  } catch (e) {
    result = (e as Error).message
  }
  return (
    <div style={box}>
      <input value={eq} onChange={(e) => setEq(e.target.value)} style={{ fontFamily: "monospace" }} />
      <div><b>{result}</b></div>
    </div>
  )
}

export function CalcPH() {
  const [c, setC] = useState("0.01")
  const [ka, setKa] = useState("1.8e-5")
  return (
    <div style={box}>
      <div style={row}>
        <label>Concentration (M) <input value={c} onChange={(e) => setC(e.target.value)} size={7} /></label>
        <label>Ka <input value={ka} onChange={(e) => setKa(e.target.value)} size={7} /></label>
      </div>
      <div>Strong acid: pH <b>{pHStrongAcid(num(c)).toFixed(2)}</b> · weak acid: pH <b>{pHWeakAcid(num(ka), num(c)).toFixed(2)}</b></div>
    </div>
  )
}

export function CalcQuadratic() {
  const [a, setA] = useState("1")
  const [b, setB] = useState("-3")
  const [c, setC] = useState("2")
  let text = ""
  try {
    const r = solveQuadratic(num(a), num(b), num(c))
    text = r.roots.map((x) => (x.im === 0 ? x.re.toFixed(3) : `${x.re.toFixed(3)} ${x.im < 0 ? "−" : "+"} ${Math.abs(x.im).toFixed(3)}i`)).join(",  ")
  } catch (e) {
    text = (e as Error).message
  }
  return (
    <div style={box}>
      <div style={row}>
        <label>a <input value={a} onChange={(e) => setA(e.target.value)} size={4} /></label>
        <label>b <input value={b} onChange={(e) => setB(e.target.value)} size={4} /></label>
        <label>c <input value={c} onChange={(e) => setC(e.target.value)} size={4} /></label>
      </div>
      <div>x = <b>{text}</b></div>
    </div>
  )
}

export const doc: RichDoc = {
  intro: [
    "`@indoku/science` is a pure TypeScript engine with no dependencies and no framework: physics, chemistry, math and Cartesian helpers you can call from a calculator, a server route or a React component.",
    "These demos are plain inputs wired to engine functions. Wrap the results in `FormulaBlock`, `Graph2D` or `Plot3D` for a richer UI.",
  ],
  importCode: `import { waveSpeed, molarMass, balanceEquation, projectile } from "@indoku/science"\n\n// Subpaths keep bundles small:\nimport { molarMass } from "@indoku/science/chemistry"`,
  examples: [
    { id: "waves", title: "Waves", description: "Wave speed and the Doppler effect.", fn: "CalcWave" },
    { id: "fluids", title: "Fluids", description: "Reynolds number and flow regime.", fn: "CalcFluid" },
    { id: "projectile", title: "Projectile", fn: "CalcProjectile" },
    { id: "molar-mass", title: "Molar mass", description: "Parses brackets and hydrates such as `CuSO4·5H2O`.", fn: "CalcMolarMass" },
    { id: "balance", title: "Equation balancer", fn: "CalcBalance" },
    { id: "ph", title: "pH", description: "Strong acid and weak acid (exact quadratic).", fn: "CalcPH" },
    { id: "quadratic", title: "Quadratic equation", description: "Complex roots included.", fn: "CalcQuadratic" },
  ],
  notes: ["All functions use SI units unless the name says otherwise.", "Invalid input throws a plain `Error`; catch it and show the message."],
  seeAlso: ["graph-2d", "periodic-table", "math"],
}
