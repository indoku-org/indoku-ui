import { PlayerBar, usePlayer } from "../../science-ui"
import type { RichDoc } from "../types"

export function PlayerBasic() {
  const player = usePlayer({ duration: 4, loop: true })
  const pct = (player.t / 4) * 100
  return (
    <div style={{ border: "1px solid var(--indoku-colors-border, #8884)", borderRadius: 8, overflow: "hidden" }}>
      <div style={{ position: "relative", height: 64 }}>
        <div style={{ position: "absolute", top: 20, left: `calc(${pct}% - ${pct * 0.24}px)`, width: 24, height: 24, borderRadius: 12, background: "#3b82f6" }} />
      </div>
      <PlayerBar player={player} />
    </div>
  )
}

export function PlayerCustom() {
  const player = usePlayer({ duration: 6, loop: false, autoPlay: false })
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ fontVariantNumeric: "tabular-nums" }}>
        t = {player.t.toFixed(2)} s · {player.playing ? "playing" : "paused"} · {player.speed}x
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={player.play}>Play</button>
        <button onClick={player.pause}>Pause</button>
        <button onClick={() => player.seek(0)}>Reset</button>
        <button onClick={() => player.setSpeed(2)}>2x</button>
      </div>
    </div>
  )
}

export const doc: RichDoc = {
  intro: [
    "A small animation clock for scenes. `usePlayer` ticks `t` (seconds) with `requestAnimationFrame` and gives you play, pause, seek, speed and looping. `PlayerBar` is a ready-made control bar for it.",
    "`Plot2D`, `Plot3D` and `ModelLab` use these internally. Use them directly when you animate something else, such as a CSS demo, a canvas or a custom chart.",
  ],
  importCode: 'import { usePlayer, PlayerBar } from "@indoku/ui"',
  anatomy: `const player = usePlayer({ duration, loop?, autoPlay?, speed? })
// player.t, player.playing, player.speed, player.duration
// player.play(), pause(), toggle(), seek(t), setSpeed(s)

<PlayerBar player={player} />`,
  examples: [
    { id: "basic", title: "Clock and control bar", description: "Drive anything from `player.t`. Here a dot moves along a track.", fn: "PlayerBasic" },
    { id: "custom", title: "Your own controls", description: "`autoPlay: false` starts paused and `loop: false` stops at the end. Build any controls from the returned methods.", fn: "PlayerCustom" },
  ],
  props: [
    {
      part: "usePlayer(options)",
      rows: [
        { name: "duration", type: "number", required: true, description: "Length in seconds. 0 or less means static: the clock never ticks." },
        { name: "loop", type: "boolean", required: false, default: "true", description: "Wrap around at the end. When false, playback stops at `duration`." },
        { name: "autoPlay", type: "boolean", required: false, default: "true (false with reduced motion)", description: "Start playing right away." },
        { name: "speed", type: "number", required: false, default: "1", description: "Initial playback speed multiplier." },
      ],
    },
    {
      part: "PlayerBar",
      rows: [{ name: "player", type: "PlayerState", required: true, description: "The object returned by `usePlayer`." }],
    },
  ],
  a11y: [
    "The bar uses a native `button` and `input[type=range]`, both labeled and keyboard accessible.",
    "`prefers-reduced-motion` turns autoplay off by default.",
  ],
  notes: [
    "`t` is React state updated every frame, so keep components that read it small, or compute from it with `useMemo`.",
    "Changing `duration` resets the clock to 0.",
  ],
  seeAlso: ["plot-2d"],
}
