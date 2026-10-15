import * as React from "react"
import { Button, HStack, Image, Skeleton, Stack, Text } from "@indoku/ui"
import type { RichDoc } from "../types"

const r = (name: string, type: string, description: string, def?: string) => ({ name, type, required: false, default: def, description })

const art = (hue: number, w = 600, h = 400) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue} 80% 62%)"/><stop offset="1" stop-color="hsl(${hue + 60} 70% 32%)"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/><circle cx="${w * 0.3}" cy="${h * 0.32}" r="${h * 0.11}" fill="rgba(255,255,255,.6)"/><path d="M0 ${h}L${w * 0.32} ${h * 0.55}L${w * 0.52} ${h * 0.8}L${w * 0.74} ${h * 0.45}L${w} ${h}Z" fill="rgba(0,0,0,.3)"/></svg>`)}`

export function ImageBasic() {
  return <Image rounded="md" src={art(210)} alt="Mountain landscape" maxW="sm" />
}
export function ImageWithHeight() {
  return <Image height="200px" src={art(20)} alt="Sunset landscape" />
}
export function ImageCircular() {
  return <Image src={art(150, 300, 300)} boxSize="150px" borderRadius="full" fit="cover" alt="Round avatar" />
}
export function ImageWithAspectRatio() {
  return <Image src={art(280)} alt="Landscape in 4:3" aspectRatio={4 / 3} width="300px" />
}
export function ImageWithFit() {
  return (
    <HStack gap="4" align="flex-start">
      {(["cover", "contain", "fill"] as const).map((fit) => (
        <Stack key={fit} gap="2" align="center">
          <Image border="1px solid" borderColor="border" rounded="md" h="150px" w="200px" fit={fit} src={art(190, 300, 300)} alt={`fit ${fit}`} />
          <Text fontSize="sm" color="fg.muted">{fit}</Text>
        </Stack>
      ))}
    </HStack>
  )
}
export function ImageWithAlign() {
  return (
    <HStack gap="4" align="flex-start">
      {(["top", "center", "bottom"] as const).map((align) => (
        <Stack key={align} gap="2" align="center">
          <Image rounded="md" h="120px" w="120px" fit="cover" align={align} src={art(330, 300, 600)} alt={`align ${align}`} />
          <Text fontSize="sm" color="fg.muted">{align}</Text>
        </Stack>
      ))}
    </HStack>
  )
}
export function ImageWithHtmlSize() {
  return <Image htmlWidth="400px" htmlHeight="400px" src={art(100, 400, 400)} alt="Square with native size" />
}
export function ImageAsChild() {
  return (
    <Image asChild rounded="md" fit="cover" boxSize="160px">
      <img src={art(240, 320, 320)} alt="Rendered through asChild" width={320} height={320} />
    </Image>
  )
}
export function ImageLazy() {
  return <Image loading="lazy" decoding="async" rounded="md" src={art(45)} alt="Loaded only when near the viewport" maxW="sm" />
}
export function ImageWithFallback() {
  const [src, setSrc] = React.useState<string>()
  React.useEffect(() => {
    if (src) return
    const timer = setTimeout(() => setSrc(art(170)), 1500)
    return () => clearTimeout(timer)
  }, [src])
  return (
    <Stack gap="3" align="flex-start">
      <Image src={src} alt="Slow image" w="240px" h="160px" rounded="md" fallback={<Skeleton />} />
      <Button size="sm" variant="outline" onClick={() => setSrc(undefined)}>Reload</Button>
    </Stack>
  )
}
export function ImageWithError() {
  return (
    <HStack gap="4" align="flex-start">
      <Stack gap="2" align="center">
        <Image src="/this-image-does-not-exist.png" alt="Missing image" w="160px" h="120px" rounded="md" fallback={<Skeleton />} />
        <Text fontSize="sm" color="fg.muted">default error icon</Text>
      </Stack>
      <Stack gap="2" align="center">
        <Image src="/this-image-does-not-exist.png" alt="Missing image" w="160px" h="120px" rounded="md" errorFallback={<Text fontSize="sm" color="fg.muted">No preview</Text>} />
        <Text fontSize="sm" color="fg.muted">custom errorFallback</Text>
      </Stack>
    </HStack>
  )
}
export function ImageResponsive() {
  return (
    <Image
      rounded="md"
      maxW="sm"
      src={art(300, 600, 400)}
      srcSet={`${art(300, 300, 200)} 300w, ${art(300, 600, 400)} 600w, ${art(300, 1200, 800)} 1200w`}
      sizes="(max-width: 640px) 300px, 600px"
      loading="lazy"
      alt="Responsive image"
    />
  )
}

export const doc: RichDoc = {
  intro: ["Displays an image. Renders a native `img`, defaults to `object-fit: cover`, and accepts every style prop.", "Nothing extra happens by default. Lazy loading, a loading placeholder and an error placeholder are all opt-in."],
  importCode: `import { Image } from "@indoku/ui"`,
  examples: [
    { id: "basic", title: "Basic", fn: "ImageBasic", helpers: ["art"] },
    { id: "height", title: "Height", description: "Use the `height` prop to change the height of the image.", fn: "ImageWithHeight", helpers: ["art"] },
    { id: "circular", title: "Circular", description: "Combine `boxSize` and `borderRadius=\"full\"` for a round image.", fn: "ImageCircular", helpers: ["art"] },
    { id: "aspect-ratio", title: "Aspect ratio", description: "Use the `aspectRatio` prop to change the aspect ratio of the image.", fn: "ImageWithAspectRatio", helpers: ["art"] },
    { id: "fit", title: "Fit", description: "By default the image applies `object-fit: cover`. Use `fit` to change it.", fn: "ImageWithFit", helpers: ["art"] },
    { id: "align", title: "Align", description: "Use `align` to set `object-position` when the image is cropped.", fn: "ImageWithAlign", helpers: ["art"] },
    { id: "html-size", title: "HTML width and height", description: "`htmlWidth` and `htmlHeight` set the native `width` and `height` attributes, while `width` and `height` are style props.", fn: "ImageWithHtmlSize", helpers: ["art"] },
    { id: "as-child", title: "As child", description: "Use `asChild` to apply the image styles to a single child, such as a framework image component.", fn: "ImageAsChild", helpers: ["art"] },
    { id: "lazy", title: "Lazy loading", description: "Not lazy by default. Add the native `loading=\"lazy\"` so the browser downloads the image only when it is near the viewport.", fn: "ImageLazy", helpers: ["art"] },
    { id: "fallback", title: "Loading placeholder", description: "`fallback` is shown until the image has loaded. Give the image a size (`w`/`h`, `boxSize` or `aspectRatio`) so the placeholder has room. This demo delays the source to simulate a slow network.", fn: "ImageWithFallback", helpers: ["art"] },
    { id: "error", title: "Error placeholder", description: "When the image fails to load (404, bad URL, blocked), a built-in icon placeholder is shown. Replace it with `errorFallback`. Using `errorFallback` alone adds no loading placeholder.", fn: "ImageWithError" },
    { id: "responsive", title: "Responsive sources", description: "Native `srcSet` and `sizes` let the browser pick the smallest file that fits the layout.", fn: "ImageResponsive", helpers: ["art"] },
  ],
  props: [
    { part: "Image", rows: [
      r("fit", "CSSProperties['objectFit']", "Maps to `object-fit`.", "'cover'"),
      r("align", "CSSProperties['objectPosition']", "Maps to `object-position`."),
      r("htmlWidth", "string | number", "Native `width` attribute. Use `width` for the CSS property."),
      r("htmlHeight", "string | number", "Native `height` attribute. Use `height` for the CSS property."),
      r("asChild", "boolean", "Render the single child element with the image props and styles instead of an `img`. `fallback` and `errorFallback` are ignored.", "false"),
      r("fallback", "ReactNode", "Shown until the image has loaded. Setting it wraps the image in a frame."),
      r("errorFallback", "ReactNode", "Replaces the built-in error icon. Setting it (or `fallback`) enables the error placeholder."),
    ] },
  ],
  a11y: ["Always set `alt`. Use `alt=\"\"` for purely decorative images.", "The loading placeholder is hidden from assistive tech. The error placeholder is exposed as an image labelled with `alt`.", "Set `htmlWidth` and `htmlHeight` (or `aspectRatio`) to reserve space and avoid layout shift while loading."],
  notes: [
    "All native `img` attributes are forwarded, including `loading`, `decoding`, `srcSet`, `sizes`, `onLoad` and `onError`.",
    "With `fallback` or `errorFallback`, size and style props apply to a wrapping `span` frame, and `fit`, `ref` and native attributes stay on the `img`. Without them there is no wrapper.",
    "Image optimization (smaller files in WebP or AVIF) happens at build time or on a CDN, not in this component. Use `srcSet` and `sizes` for responsive files, and wrap with `<picture>` and `<source type=\"image/webp\">` to offer modern formats with a fallback.",
    "The Provider preflight already sets `display: block`, `max-width: 100%` and `height: auto` on images.",
  ],
  seeAlso: ["aspect-ratio", "avatar", "skeleton"],
}
