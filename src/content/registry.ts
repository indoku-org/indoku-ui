import type { DocMeta } from "./types"

export const groups = ["Basics", "Forms", "Overlays & Feedback", "Navigation", "Data", "Layout", "Chat", "Charts", "Science"] as const

// [slug, name, group, description, flags]  flags: p:<file> = props file in src/components
type Row = [string, string, (typeof groups)[number], string, string?]

const rows: Row[] = [
  // Basics
  ["button", "Button", "Basics", "Triggers an action. Variants, sizes, pill shape and icon support.", "c"],
  ["button-group", "Button Group", "Basics", "Groups related buttons so their borders connect.", "p:button-group"],
  ["badge", "Badge", "Basics", "Small label for status, counts or categories.", "c"],
  ["card", "Card", "Basics", "A container with header, body and footer slots.", "c"],
  ["avatar", "Avatar", "Basics", "A user picture with an initials fallback.", "c"],
  ["aspect-ratio", "Aspect Ratio", "Basics", "Keeps content at a fixed width-to-height ratio.", "c"],
  ["image", "Image", "Basics", "Displays an image with control over fit, shape and aspect ratio."],
  ["item", "Item", "Basics", "A versatile row with media, title, description and actions.", "p:item"],
  ["skeleton", "Skeleton", "Basics", "Placeholder shown while content loads.", "c"],
  ["progress", "Progress", "Basics", "Shows how far a task has progressed.", "c"],
  ["status", "Status", "Basics", "A colored dot with a label for system or user status.", "c"],
  ["stat", "Stat", "Basics", "A metric with a label, value and trend.", "c"],
  ["data-list", "Data List", "Basics", "Label–value pairs for details views.", "c"],
  ["accordion", "Accordion", "Basics", "Vertically stacked sections that expand and collapse.", "c"],
  ["carousel", "Carousel", "Basics", "Cycle through slides with arrows, indicators, autoplay, dragging and thumbnails.", "c"],
  ["color-swatch", "Color Swatch", "Basics", "Previews a single color or a mix of colors.", "c"],
  ["code-block", "Code Block", "Basics", "Code with built-in syntax highlighting (no Shiki), line numbers and copy button.", "p:code-block"],
  // Forms
  ["input", "Input", "Forms", "A single-line text field.", "c"],
  ["input-group", "Input Group", "Forms", "An input with start/end elements such as icons or counters.", "c"],
  ["textarea", "Textarea", "Forms", "A multi-line text field.", "c"],
  ["checkbox-radio-and-switch", "Checkbox, Radio & Switch", "Forms", "Selection controls for booleans and single choices.", "c"],
  ["select", "Select", "Forms", "Pick one value from a list of options.", "c"],
  ["combobox", "Combobox", "Forms", "A searchable input with a list of options.", "c"],
  ["listbox", "Listbox", "Forms", "A list of options with single or multiple selection.", "c"],
  ["form", "Form", "Forms", "useForm and Form.Field: validation, touched state and submit handling.", "p:form"],
  ["toggle", "Toggle", "Forms", "A two-state button that is either on or off.", "p:toggle"],
  ["toggle-group", "Toggle Group", "Forms", "A set of toggles with single or multiple selection, horizontal or vertical.", "p:toggle-group"],
  ["input-otp", "Input OTP", "Forms", "One-time-code input with paste and SMS autofill support, no dependencies.", "p:input-otp"],
  ["pin-input", "Pin Input", "Forms", "One box per character for PINs and codes (see also Input OTP).", "c"],
  ["password-input", "Password Input", "Forms", "A password field with a show/hide button and a strength meter.", "p:password-input"],
  ["number-input", "Number Input", "Forms", "A numeric field with steppers, min, max and step.", "c"],
  ["tags-input", "Tags Input", "Forms", "Enter several values as tags.", "c"],
  ["rating", "Rating", "Forms", "Star ratings, including half stars.", "c"],
  ["color-picker", "Color Picker", "Forms", "Pick a color from an area, sliders and an eye dropper.", "c"],
  ["date-picker", "Date Picker", "Forms", "Pick a date or a range from a calendar; values are ISO strings.", "p:date-fields"],
  ["date-input", "Date Input", "Forms", "A segmented day/month/year input for keyboard entry.", "p:date-fields"],
  ["questionnaire", "Questionnaire", "Forms", "A multi-step form with one question per screen.", "p:questionnaire"],
  ["rich-text-editor", "Rich Text Editor", "Forms", "A rich text editor with no Tiptap dependency: contentEditable, toolbar and HTML sanitizing.", "p:rich-text-editor"],
  // Overlays & Feedback
  ["alert", "Alert", "Overlays & Feedback", "An inline message that needs attention.", "c"],
  ["flash", "Flash", "Overlays & Feedback", "A short inline status message.", "p:flash"],
  ["toast", "Toast", "Overlays & Feedback", "A temporary notification.", "p:toast"],
  ["menu", "Menu", "Overlays & Feedback", "Dropdown and context menus.", "c"],
  ["popover", "Popover", "Overlays & Feedback", "Floating content anchored to a trigger, plus hover cards.", "c"],
  ["command", "Command", "Overlays & Feedback", "A command palette with search, groups and shortcuts (⌘K).", "p:command"],
  ["dialog", "Dialog", "Overlays & Feedback", "A modal dialog with focus trapping.", "c"],
  ["floating-panel", "Floating Panel", "Overlays & Feedback", "A draggable, resizable panel that floats above the page.", "c"],
  ["clipboard", "Clipboard", "Overlays & Feedback", "Copy text to the clipboard.", "c"],
  // Navigation
  ["tabs", "Tabs", "Navigation", "Switch between panels of content.", "c"],
  ["breadcrumb", "Breadcrumb", "Navigation", "Shows where the current page sits in the hierarchy.", "c"],
  ["steps", "Steps", "Navigation", "A step indicator for multi-stage flows.", "c"],
  ["pagination", "Pagination", "Navigation", "Navigate between pages of results.", "p:pagination"],
  ["navigation-menu", "Navigation Menu", "Navigation", "A navigation bar with dropdown content (mega menu).", "p:navigation-menu"],
  ["menubar", "Menubar", "Navigation", "A desktop-style application menu bar.", "p:menubar"],
  ["direction", "Direction", "Navigation", "RTL/LTR utility.", "p:direction"],
  // Data
  ["data-table", "Data Table", "Data", "A table with sorting, filtering, pagination and row selection.", "p:data-table"],
  ["chart", "Overview", "Charts", "Every chart type, themed by IndokuUI and drawn with plain SVG.", "p:chart"],
  ["use-chart", "useChart", "Charts", "Colors, formatting, sorting and legend highlighting shared by all charts.", "p:chart"],
  ["line-chart", "Line Chart", "Charts", "Dashed, gradient, biaxial lines with null handling and series labels.", "p:chart"],
  ["area-chart", "Area Chart", "Charts", "Gradient, stacked and percent areas with reference areas and dots.", "p:chart"],
  ["bar-chart", "Bar Chart", "Charts", "Grouped, stacked, percent, range, histogram, candlestick and bar segment.", "p:chart"],
  ["pie-chart", "Pie & Donut", "Charts", "Angle padding, radial text and detached segments.", "p:chart"],
  ["radar-chart", "Radar Chart", "Charts", "Polygon, circle and filled grids with point labels.", "p:chart"],
  ["scatter-chart", "Scatter Chart", "Charts", "Grouped points with trend lines and dot connectors.", "p:chart"],
  ["sparkline", "Sparkline", "Charts", "Inline trend charts with hover values.", "p:chart"],
  ["cartesian-grid", "Grid & Axes", "Charts", "Custom tick formats, multiple axes and reference lines.", "p:chart"],
  ["calendar", "Calendar", "Data", "An inline calendar for single dates, ranges or multiple dates.", "p:calendar"],
  ["qr-code", "QR Code", "Data", "Dependency-free QR codes with an optional logo overlay.", "p:qr-code"],
  ["tree-view", "Tree View", "Data", "Hierarchical data that can be expanded and collapsed. Unstyled nodes: bring your own icons.", "c"],
  ["file-tree", "File Tree", "Data", "Folders and files with open/closed folder icons, ready to use. Built on Tree View.", "p:file-tree"],
  // Layout
  ["resizable", "Resizable", "Layout", "Panels you can resize by dragging or with the keyboard.", "p:resizable"],
  ["scroll-area", "Scroll Area", "Layout", "A thin custom scrollbar on top of native scrolling.", "p:scroll-area"],
  ["empty", "Empty", "Layout", "An empty state with icon, text and actions.", "p:empty"],
  ["kbd", "Kbd", "Layout", "Keyboard keys and key combinations.", "p:kbd-group"],
  ["prose", "Prose", "Layout", "Typography styles for raw HTML content: headings, lists, quotes, code and tables.", "p:prose"],
  // Chat
  ["message-scroller", "Message Scroller", "Chat", "A message list that sticks to the bottom.", "p:message-scroller"],
  ["message", "Message", "Chat", "A message row with avatar and grouping.", "p:message"],
  ["bubble", "Bubble", "Chat", "A chat bubble: solid, subtle or outline.", "p:bubble"],
  ["attachment", "Attachment", "Chat", "Attached files: rows, thumbnail cards and upload progress.", "p:attachment"],
  ["marker", "Marker", "Chat", "Date separators, status lines and typing indicators.", "p:marker"],
  ["chat", "Chat", "Chat", "Chat components composed together.", "p:marker"],
  // Science
  ["model-lab", "Model Lab", "Science", "Pick any physics, chemistry, biology or math model, change its parameters live and watch it animate."],
  ["plot-2d", "Plot 2D", "Science", "Animated 2D plots drawn with SVG from a plain scene: lines, points, vectors and a play bar."],
  ["graph-2d", "Graph 2D", "Science", "An interactive Cartesian plane: plot functions and points, pan, zoom and hover.", "p:graph2d"],
  ["plot-3d", "Plot 3D", "Science", "A dependency-free 3D viewer on canvas for molecules, flows and small meshes.", "p:plot3d"],
  ["math", "Math", "Science", "MathRenderer and FormulaBlock: LaTeX with KaTeX, themed to your text.", "p:math"],
  ["periodic-table", "Periodic Table", "Science", "The 18-column periodic table with category colors and a detail panel.", "p:periodic-table"],
  ["science-calculators", "Science Calculators", "Science", "Physics, chemistry and math calculators built on @indoku/science."],
  ["player", "Player", "Science", "usePlayer and PlayerBar: an animation clock with play, pause, scrubbing and speed."],
]

export const docs: DocMeta[] = rows.map(([slug, name, group, description, flags = ""]) => {
  const f = flags.split(",")
  return {
    slug,
    name,
    group,
    description,
    propsFile: f.find((x) => x.startsWith("p:"))?.slice(2),
  }
})

export const bySlug = new Map(docs.map((d) => [d.slug, d]))

