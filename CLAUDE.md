# slidev-theme-troshab

> **This file must be written in English only.**

Minimal universal Slidev theme with flexible layouts and a library of ready-made slides.

---

## Development Rules

### Styling Principles

1. **All styling via CSS classes** — never use inline styles (`style="..."`)
2. **Semantic class names** — classes should describe component purpose, not appearance
   - Good: `.btn-primary`, `.link-button`, `.card-metric`
   - Bad: `.text-white`, `.bg-blue-500` (only use utility classes from UnoCSS when necessary)
3. **All custom classes in `styles/base.css`** — component styles must be centralized
4. **Type-specific variations** — use modifier classes like `.block-info`, `.block-warning`
5. **Dark theme support** — always add `.dark` variants when colors differ

### File Organization

- `styles/colors.css` — color variables only (no component styles) **← SOURCE OF TRUTH**
- `styles/base.css` — typography, spacing, and component styles
- `styles/motion.css` — motion system (transitions, animations, v-click)
- `uno.config.ts` — grid utilities and UnoCSS configuration
- `scripts/sync-colors.js` — generates Mermaid/PlantUML themes from colors.css

### Color Sync

After changing colors in `styles/colors.css`, run:

```bash
node scripts/sync-colors.js
```

This regenerates:
- `setup/mermaid.ts` — Mermaid theme configuration
- `themes/puml-theme-troshab-dark.puml` — PlantUML dark theme
- `themes/puml-theme-troshab-light.puml` — PlantUML light theme

---

## Project Structure

```
slidev-theme-troshab/
├── package.json
├── uno.config.ts          # UnoCSS: grid, utilities
├── styles/
│   ├── index.css          # CSS entry point (auto-detected by Slidev)
│   ├── base.css           # Typography, spacing, component styles
│   ├── colors.css         # Color system (light/dark) ← SOURCE OF TRUTH
│   └── motion.css         # Motion system (transitions, animations)
├── setup/
│   └── mermaid.ts         # Mermaid theme (auto-generated)
├── themes/
│   ├── puml-theme-troshab-dark.puml   # PlantUML dark (auto-generated)
│   └── puml-theme-troshab-light.puml  # PlantUML light (auto-generated)
├── scripts/
│   └── sync-colors.js     # Syncs colors.css → Mermaid/PlantUML
├── fonts/                 # IBM Plex Sans/Mono (woff2)
├── layouts/               # 20 layouts
├── components/            # 2 components (Steps, Tags)
├── snippets/              # Code snippets for import demos
├── example_content.md     # ~100 slides (all content, no theme config)
├── example_white.md       # Light theme wrapper (src: example_content.md)
├── example_dark.md        # Dark theme wrapper (src: example_content.md)
└── slides-export/         # Visual testing reference
    ├── white/             # Light theme PNG exports
    └── black/             # Dark theme PNG exports
```

---

## Development Servers

Run both themes simultaneously on different ports:

```bash
# Dark theme on port 30303
npx slidev example_dark.md --port 30303

# Light theme on port 31313
npx slidev example_white.md --port 31313
```

**Quick start (both in parallel):**

```bash
npx slidev example_dark.md --port 30303 &
npx slidev example_white.md --port 31313 &
```

**URLs:**
- Dark theme: http://localhost:30303
- Light theme: http://localhost:31313

---

## Visual Testing

To verify theme changes, export slides to PNG and compare visually.

### Export Commands

```bash
# Light theme
npx slidev export example_white.md --format png --output ./slides-export/white

# Dark theme
npx slidev export example_dark.md --format png --output ./slides-export/black
```

### Key Slides to Check

| Slide | Layout | What to verify |
|-------|--------|----------------|
| 2 | `cover` | Centered, typography hierarchy |
| 4 | `section` | Centered, gradient background |
| 12 | `fact` | "73%" visible with gradient text |
| 13 | `two-cols` | Two columns side-by-side |
| 19 | `full` | Edge-to-edge, no safe-zone padding |
| 20-21 | `image` | Edge-to-edge image, caption visible |
| 25 | custom | Colored metric cards |
| 27 | `Theorem` | Borders and backgrounds |
| 33 | `intro` | Avatar with initial, gradient |
| 36 | table | Column ratios overview |
| 37-43 | `two-cols` | All column ratios: is-3 to is-9 |
| 44 | `Block` | Left border, icon, padding |

### Edge-to-Edge Layouts

These layouts have NO safe-zone padding (content goes to screen edges):
- `full` — completely edge-to-edge
- `image` — image fills screen, caption has internal padding
- `iframe` — iframe fills screen, header has internal padding
- `image-left` — image fills left half, content has padding
- `image-right` — image fills right half, content has padding
- `iframe-left` — iframe fills left half, content has padding
- `iframe-right` — iframe fills right half, content has padding

All other layouts have 5% safe-zone padding for projector/TV overscan protection.

---

## LAYOUTS (20)

### Basic

| Layout | Description | Slots |
|--------|-------------|-------|
| `default` | Standard content | `default` |
| `cover` | Title slide | `default` |
| `section` | Section divider (with background gradient) | `default` |
| `center` | Centered content (no background) | `default` |
| `end` | Final slide | `default` |

### Column-based

| Layout | Description | Slots | Props |
|--------|-------------|-------|-------|
| `two-cols` | Two columns | `title`, `left`, `right` | `columns`, `gap`, `align` |
| `two-cols-header` | Header + two columns | `header`, `left`, `right` | `columns`, `gap`, `align` |
| `side-title` | Title on side | `title`, `default` | `side`, `titleWidth` |
| `top-title` | Colored bar on top | `title`, `default` | — |

### Specialized

| Layout | Description | Slots | Props |
|--------|-------------|-------|-------|
| `quote` | Quote | `default` | `author`, `source` |
| `fact` | Large number/KPI | `default` | `value`, `label`, `source` |
| `intro` | Speaker introduction | `default` | `image`, `name`, `title`, `side` |
| `image` | Image with caption | `default` | `image`, `caption` |
| `image-left` | Image on left, content right | `default` | `image`, `backgroundSize` |
| `image-right` | Content left, image on right | `default` | `image`, `backgroundSize` |
| `iframe` | Embedded content | `default` | `src`, `title` |
| `iframe-left` | Iframe on left, content right | `default` | `src`, `title` |
| `iframe-right` | Content left, iframe on right | `default` | `src`, `title` |
| `full` | Fullscreen | `default` | — |
| `statement` | Large centered statement | `default` | — |

---

## PROPS for layouts

### two-cols

```yaml
layout: two-cols
columns: is-6      # is-3 (25:75), is-4 (33:67), is-5, is-6 (50:50), is-7, is-8 (67:33), is-9 (75:25)
gap: '4'           # '0', '1', '2', '4', '6', '8' (rem)
align: top         # top, center, bottom
```

### side-title

```yaml
layout: side-title
side: left         # left, right
titleWidth: is-4   # is-3 (25%), is-4 (33%)
```

### quote

```yaml
layout: quote
author: "Author Name"
source: "Source, 2024"
```

### fact

```yaml
layout: fact
value: "73%"
label: "of developers use TypeScript"
source: "Stack Overflow Survey 2024"
```

### intro

```yaml
layout: intro
image: "/photo.jpg"    # or without image - will show avatar with initial
name: "John Doe"
title: "Senior Developer"
side: right            # left, right (where photo is)
```

### image

```yaml
layout: image
image: "/diagram.png"
caption: bottom        # bottom, overlay
```

### iframe

```yaml
layout: iframe
src: "https://example.com"
title: "Demo"          # optional
```

### image-left / image-right

```yaml
layout: image-left     # or image-right
image: "/photo.jpg"
backgroundSize: cover  # cover (default) or contain
```

### iframe-left / iframe-right

```yaml
layout: iframe-left    # or iframe-right
src: "https://example.com"
title: "Demo"          # optional, for accessibility
```

### two-cols-header

```yaml
layout: two-cols-header
columns: is-6          # same as two-cols
gap: '4'               # same as two-cols
align: top             # same as two-cols
```

### statement

```yaml
layout: statement
# No props - uses larger typography for impact
```

---

## COMPONENTS (2)

### Steps

Step-by-step progress visualization with three modes.

**Static mode** (default) — manual `current` prop:

```md
<Steps :items="['Plan', 'Build', 'Test', 'Ship']" :current="2" />
```

**Clicks mode** — advances with each presentation click:

```md
<Steps :items="['Plan', 'Build', 'Test']" mode="clicks">
  <template #step1>Planning content...</template>
  <template #step2>Building content...</template>
  <template #step3>Testing content...</template>
</Steps>
```

**Tabs mode** — clickable steps, jump to any:

```md
<Steps :items="['Plan', 'Build', 'Test']" mode="tabs">
  <template #step1>Planning content...</template>
  <template #step2>Building content...</template>
  <template #step3>Testing content...</template>
</Steps>
```

**MDC syntax** (experimental — enables markdown inside slots):

Add `mdc: true` to frontmatter for markdown parsing inside slots:

```md
---
mdc: true
---

::Steps{:items="['Plan', 'Build', 'Test']" mode="tabs"}
#step1
### Planning Phase

- Define requirements
- Create timeline

#step2
### Building Phase

Writing code and implementing features.
::
```

**Note:** MDC may have parsing issues with complex content. For reliable results, use Vue template syntax with HTML:

```md
<Steps :items="['Plan', 'Build']" mode="tabs">
  <template #step1>
    <h3>Planning</h3>
    <ul><li>Item 1</li></ul>
  </template>
</Steps>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `string[]` | required | Step labels |
| `current` | `number` | — | Active step (static mode only) |
| `mode` | `'static' \| 'clicks' \| 'tabs'` | `'static'` | Interaction mode |

### Tags

Tag pills for keywords/topics.

```md
<Tags :items="['Vue', 'TypeScript', 'Slidev']" />
```

### Callouts (via blockquote)

Use markdown blockquotes for info/warning boxes:

```md
> **Note:** Important information here.

> **Warning:** Be careful with this.

> **Tip:** A helpful suggestion.
```

---

## MERMAID DIAGRAMS & CHARTS

Slidev supports Mermaid diagrams. **The theme automatically applies matching colors** — no configuration needed.

### Theme Integration

Mermaid diagrams automatically use theme colors:
- **Light theme:** off-white backgrounds, blue accents (#0B5FFF)
- **Dark theme:** Dracula colors with cyan accents (#8BE9FD)

Configuration is in `setup/mermaid.ts`. Colors are synced with `styles/colors.css`.

**Note:** Theme detection happens at page load. If you toggle theme mid-presentation (T key), diagrams won't update — reload the page.

### General Rules

1. **Short labels** — max 8-10 characters per node
2. **Limit nodes** — max 6-8 nodes for flowcharts, 5-6 for complex graphs
3. **No titles in xychart** — they take extra vertical space
4. **Use abbreviations** — `LB` instead of `Load Balancer`, `DB` instead of `Database`

### Flowchart (graph/flowchart)

```md
\`\`\`mermaid
graph TD
    A[Client] --> B[LB]
    B --> C[Gateway]
    C --> D[Auth]
    C --> E[Users]
    D --> F[(DB)]
    E --> F
\`\`\`
```

**Limits:**
- Max 8 nodes
- Labels: 2-8 characters
- Use `TD` (top-down) or `LR` (left-right) based on content

### XY Chart (bar/line)

```md
\`\`\`mermaid
xychart-beta
    x-axis [Jan, Feb, Mar, Apr, May, Jun]
    y-axis "Users (k)" 0 --> 100
    bar [10, 25, 40, 55, 70, 95]
\`\`\`
```

**Limits:**
- NO `title` — causes overflow
- Max 6-8 x-axis labels (3-char abbreviations)
- Short y-axis label (max 10 chars)
- One chart type per diagram (bar OR line, not both)

### Sequence Diagram

```md
\`\`\`mermaid
sequenceDiagram
    Client->>API: Request
    API->>DB: Query
    DB-->>API: Result
    API-->>Client: Response
\`\`\`
```

**Limits:**
- Max 4 participants
- Short names: 2-6 characters
- Max 6-8 messages

### Pie Chart

```md
\`\`\`mermaid
pie
    "TypeScript" : 45
    "JavaScript" : 30
    "Python" : 25
\`\`\`
```

**Limits:**
- Max 5 segments
- Short labels: max 12 characters

### When Diagram is Too Complex

If a diagram doesn't fit:
1. Split into multiple slides
2. Use `two-cols` layout with diagram on one side
3. Create external SVG/PNG and use `image` layout
4. Simplify: remove less important nodes/connections

---

## PLANTUML DIAGRAMS

PlantUML is supported via Slidev's built-in integration. Theme includes custom PlantUML themes that match the slide colors.

### Using Theme Colors

Add the theme directive at the start of your PlantUML block:

**Dark theme (Dracula colors):**
```plantuml
@startuml
!theme troshab-dark from themes

class User {
  +id: string
  +name: string
}
@enduml
```

**Light theme:**
```plantuml
@startuml
!theme troshab-light from themes

class User {
  +id: string
  +name: string
}
@enduml
```

### Available Theme Files

| File | Description |
|------|-------------|
| `themes/puml-theme-troshab-dark.puml` | Dracula-inspired dark theme |
| `themes/puml-theme-troshab-light.puml` | Clean light theme |

### Theme Features

Both themes include styling for:
- Sequence diagrams (actors, messages, lifelines)
- Class diagrams (classes, interfaces, relationships)
- Component diagrams
- Activity diagrams
- State diagrams
- Use case diagrams
- Notes and legends
- Mind maps and WBS

### Customization

Override specific settings after the theme import:

```plantuml
@startuml
!theme troshab-dark from themes

' Override specific colors
skinparam class {
  BorderColor #FF79C6
}

class Example
@enduml
```

### Remote Usage (for published themes)

Once the theme is published to GitHub:

```plantuml
@startuml
!theme troshab-dark from https://raw.githubusercontent.com/troshab/slidev-theme-troshab/main/themes
...
@enduml
```

---

## CODE BLOCKS

### Limits to Avoid Overflow

| Context | Max lines | Max width |
|---------|-----------|-----------|
| Full-width slide | 12-15 lines | 80 chars |
| `two-cols` column | 8-10 lines | 40 chars |
| Inline with text | 6-8 lines | 60 chars |

### Best Practices

1. **Remove comments** — `// Usage`, `// Example` take space
2. **Shorten error messages** — `throw new Error('HTTP error')` not full status
3. **Omit obvious types** — TypeScript can infer many types
4. **Split long code** — use multiple slides or `two-cols` for before/after
5. **Use highlights** — `{1,3-5}` to focus on key lines instead of showing all

### Example: Compact Code

```typescript
interface User {
  id: string;
  name: string;
  role: 'admin' | 'user';
}

async function fetchUsers(): Promise<User[]> {
  const res = await fetch('/api/users');
  if (!res.ok) throw new Error('HTTP error');
  return res.json();
}
```

---

## SLIDE EXAMPLES

### Cover

```md
---
layout: cover
---

# Presentation Title

## Subtitle

**Author** · Date
```

### Two columns (code + result)

```md
---
layout: two-cols
columns: is-6
---

# Title

::left::

\`\`\`js
const x = 1;
\`\`\`

::right::

Result: `1`
```

### Quote

```md
---
layout: quote
author: Steve Jobs
source: Stanford, 2005
---

Stay hungry, stay foolish.
```

### Fact

```md
---
layout: fact
value: "10x"
label: "faster than competitors"
---

Additional context here
```

### Intro (speaker)

```md
---
layout: intro
name: John Doe
title: Tech Lead @ Company
side: right
---

- 10+ years of experience
- Open source contributor
- Speaker
```

---

## UnoCSS Utilities

Theme includes:
- 12-column grid (`col-span-3` ... `col-span-9`)
- Semantic aliases (`is-half`, `is-one-third`, `is-two-thirds`, `is-one-quarter`, `is-three-quarters`)
- Styles for Block/Theorem components

---

## When to Use Which Layout

| Situation | Layout |
|-----------|--------|
| Regular slide with text/list | `default` |
| First slide | `cover` |
| New section | `section` |
| Single important statement centered | `center` |
| Code + result | `two-cols` |
| Comparison (before/after, pros/cons) | `two-cols` |
| Quote | `quote` |
| Large number/statistic | `fact` |
| About speaker/author | `intro` |
| Image with caption | `image` |
| Demo/video | `iframe` |
| Fullscreen content | `full` |
| Q&A, thank you | `end` |

---

## TYPOGRAPHY

### Fonts

| Role | Font | Weights |
|------|------|---------|
| Text + headings | **IBM Plex Sans** | 400, 500, 600, 700 |
| Code | **IBM Plex Mono** | 400, 500 |

Fonts are stored locally in `fonts/` (woff2).

### Dyslexia-friendly Parameters (defaults)

| Parameter | Value | Source |
|-----------|-------|--------|
| `--line-height-body` | 1.35 | Slides (shorter text) |
| `--line-height-reading` | 1.5 | BDA, WCAG (longer text) |
| `--line-height-heading` | 1.15 | Tight for headings |
| `--letter-spacing-body` | 0.02em | Dyslexia research |
| `--word-spacing-body` | 0.05em | Dyslexia research |
| `--measure` | 65ch | Baymard |
| Text alignment | left | Harvard, ScienceDirect |
| Contrast ratio | ≥4.5:1 | WCAG |
| Min font-weight | 400 | ISO 9241 |

### Font Sizes (Perfect Fourth 1.333)

```css
--font-size-h1: 3.5625rem;     /* 57px */
--font-size-h2: 2.6875rem;     /* 43px */
--font-size-subhead: 2rem;     /* 32px (h3) */
--font-size-base: 1.5rem;      /* 24px — body text */
--font-size-caption: 1.125rem; /* 18px */
--font-size-code: 1.25rem;     /* 20px */
```

### Customization

CSS variables can be overridden in frontmatter or custom CSS:

```css
:root {
  --font-size-base: 1.5rem;      /* increase base */
  --letter-spacing-body: 0.03em; /* wider tracking */
  --color-text: #2d2d4a;         /* different text color */
}
```

### Formatting Rules

- **Alignment:** left for multi-line text, center only for single-line headings
- **Italic:** only for book titles/terms, NOT for emphasis
- **ALL CAPS:** only for short labels
- **Underline:** only for links
- **Justified text:** forbidden
- **Light/thin weights:** forbidden (fade on projector)

### Accessibility

- Off-white background (#FAFAFA) instead of pure white
- Off-black text (#1F1F1F) instead of pure black
- Contrast ratio ≥ 4.5:1 for all text
- WCAG 2.2 keyboard focus styles (3px primary outline)

### Safe Zone (Overscan Protection)

Protects content from being cut off on projectors and TVs:

```css
:root {
  --safe-inset-x: 5%;  /* horizontal padding */
  --safe-inset-y: 5%;  /* vertical padding */
}
```

**Debug mode:** Add class `debug-safe-zone` to `<body>` to visualize the safe area with a red dashed border.

---

## COLORS

All colors are defined in `styles/colors.css`.

### Color System

Dracula-inspired palette with scientific basis:
- WCAG 2.1 contrast: minimum **4.5:1** for text, target **7:1** (AAA)
- Different accents for light/dark (one color physically doesn't work on both)
- Colorblind-safe palette for charts (Okabe-Ito)
- Dyslexia-friendly: off-white/off-black instead of pure white/black

### Light Theme (default)

| Variable | Value | Purpose |
|----------|-------|---------|
| `--color-bg` | #FAFAFA | Main background |
| `--color-bg-soft` | #F5F5F0 | Surfaces/cards |
| `--color-bg-muted` | #EEEEE8 | Code, tables |
| `--color-text` | #1F1F1F | Primary text (16:1) |
| `--color-text-secondary` | #4A4A5A | Muted (7.5:1) |
| `--color-text-tertiary` | #6B6B7A | Captions (4.8:1) |
| `--color-primary` | #0B5FFF | Links, accents |
| `--color-success` | #0F7B3E | Success |
| `--color-warning` | #B45309 | Warning |
| `--color-danger` | #B42318 | Danger |
| `--color-info` | #036A96 | Info |

### Dark Theme

| Variable | Value | Purpose |
|----------|-------|---------|
| `--color-bg` | #282A36 | Dracula bg |
| `--color-bg-soft` | #343746 | Surfaces |
| `--color-bg-muted` | #44475A | Code, selection |
| `--color-text` | #F8F8F2 | Dracula fg (13:1) |
| `--color-text-secondary` | #A1AACB | Muted (6.5:1) |
| `--color-text-tertiary` | #8890A8 | Captions (4.6:1) |
| `--color-primary` | #8BE9FD | Dracula cyan (10:1) |
| `--color-success` | #50FA7B | Dracula green |
| `--color-warning` | #FFB86C | Dracula orange |
| `--color-danger` | #FF5555 | Dracula red |
| `--color-info` | #8BE9FD | Dracula cyan |

### Gradients

```css
--gradient-primary   /* side-title, top-title, fact, intro avatar */
--gradient-section   /* section layout background */
```

### Colorblind-safe Charts (Okabe-Ito)

```css
--chart-1: #E69F00;   /* Orange */
--chart-2: #56B4E9;   /* Sky Blue */
--chart-3: #009E73;   /* Bluish Green */
--chart-4: #F0E442;   /* Yellow */
--chart-5: #0072B2;   /* Blue */
--chart-6: #D55E00;   /* Vermillion */
--chart-7: #CC79A7;   /* Reddish Purple */
--chart-8: #000000;   /* Black */
```

**Rule:** Never encode meaning with color alone — duplicate with shape/label/icon.

### Customization

```css
:root {
  --color-primary: #7C3AED;
  --gradient-primary: linear-gradient(135deg, #7C3AED 0%, #EC4899 100%);
}
```

### Contrast (verified)

| Pair | Light | Dark | Requirement |
|------|-------|------|-------------|
| text / bg | 16:1 | 13:1 | ≥7:1 ✓ |
| text-secondary / bg | 7.5:1 | 6.5:1 | ≥4.5:1 ✓ |
| text-tertiary / bg | 4.8:1 | 4.6:1 | ≥4.5:1 ✓ |
| primary / bg | 4.7:1 | 10:1 | ≥4.5:1 ✓ |

---

## MOTION SYSTEM

All motion styles are defined in `styles/motion.css`.

**Design Principles:**
1. Motion explains, not decorates — animations show causality
2. 1-2 properties max — only `opacity + transform` (GPU-friendly)
3. Exit faster than enter — exit is ~20% shorter
4. Desktop prefers shorter — 150-300ms typical
5. Stagger ≤6 items — longer lists skip stagger (avoids "crawling")
6. Reduced motion support — WCAG 2.1 compliance via `prefers-reduced-motion`

### Tokens (IBM Carbon)

```css
/* Easing */
--ease-standard: cubic-bezier(0.2, 0.0, 0.38, 0.9);
--ease-enter: cubic-bezier(0.0, 0.0, 0.38, 0.9);
--ease-exit: cubic-bezier(0.2, 0.0, 1.0, 0.9);
--ease-expressive: cubic-bezier(0.4, 0.14, 0.3, 1.0);

/* Durations */
--dur-fast-01: 70ms;      /* micro-interactions */
--dur-fast-02: 110ms;     /* small UI elements */
--dur-moderate-01: 150ms; /* medium complexity */
--dur-moderate-02: 240ms; /* opening/closing */
--dur-slow-01: 400ms;     /* large movements */
--dur-slow-02: 700ms;     /* complex sequences */

/* Exit modifier (20% faster) */
--dur-exit-modifier: 0.8;

/* Distances */
--shift-xs: 6px;   /* subtle */
--shift-sm: 12px;  /* small */
--shift-md: 20px;  /* medium */
--shift-lg: 28px;  /* large */

/* Stagger */
--stagger-base: 50ms;  /* default stagger delay */
```

### Motion Modes

Apply class to slide or container:

| Mode | Class | Duration | Shift | Stagger | Use |
|------|-------|----------|-------|---------|-----|
| Calm | (default) | 240ms | 20px | 50ms | Standard presentations |
| Crisp | `motion-crisp` | 150ms | 12px | 30ms | Technical demos |
| Expressive | `motion-expressive` | 400ms | 28px | 70ms | Creative presentations |

```yaml
---
layout: default
class: motion-crisp
---
```

### Slide Transitions

**Philosophy:** Content slides "turn like pages" (`slide-left`), accent slides appear with `fade`.

Set global default in first slide's frontmatter:

```yaml
---
layout: cover
transition: slide-left
---
```

Then override for accent slides:

| Layout | Transition | Why |
|--------|------------|-----|
| `cover` | (global default) | First slide, no transition needed |
| `default`, `two-cols`, etc. | `slide-left` | Content "pages" turn left |
| `section` | `fade` | Marks new chapter |
| `fact` | `fade` | Emphasizes the number |
| `image` | `fade` | Clean image reveal |
| `end` | `fade` | Soft ending |

**Available transitions (Slidev built-in):**

| Transition | Effect |
|------------|--------|
| `slide-left` | Push left (book-like) |
| `slide-right` | Push right (going back) |
| `slide-up` | Rise from bottom |
| `slide-down` | Drop from top |
| `fade` | Crossfade |
| `none` | Instant change |

### v-click Reveal Styles

Apply class to slide for different reveal animations:

| Style | Class | Effect |
|-------|-------|--------|
| Default | — | Fade + subtle rise |
| Fade | `reveal-fade` | Opacity only |
| Slide | `reveal-slide` | Slide from right |
| Pop | `reveal-pop` | Scale up |

```yaml
---
layout: default
class: reveal-slide
---

<v-click>This slides in from right</v-click>
```

### Automatic Content-Type Detection

The theme automatically applies appropriate reveal animations based on content type (no class needed):

| Content Type | Reveal Effect | Why |
|--------------|---------------|-----|
| Code blocks (`pre`, `.shiki`) | Fade only | No movement disrupts alignment |
| Tables | Fade only | Preserves alignment |
| Blockquotes | Fade only | Elegant reveal |
| List items (`li`) | Slide from left | Natural reading direction |
| Large text (`.text-4xl`+) | Pop (scale) | Emphasizes importance |
| Images | Fade only | Clean reveal |
| Mermaid/SVG diagrams | Fade only | Preserves layout |

### List Stagger Pattern

List items revealed with `<v-clicks>` have natural stagger delays (limited to 6 items to avoid "crawling" effect):

| Item | Default Delay | Crisp Mode | Expressive Mode |
|------|---------------|------------|-----------------|
| 1st | 0ms | 0ms | 0ms |
| 2nd | 50ms | 30ms | 70ms |
| 3rd | 100ms | 60ms | 140ms |
| 4th | 150ms | 90ms | 210ms |
| 5th | 200ms | 120ms | 280ms |
| 6th+ | 250ms | 150ms | 350ms |

### Layout Entrance Animations

**All layouts have automatic entrance animations** — no configuration needed.

**Semantic Direction Philosophy:**
- **Headings (h1, h2, h3):** "fall" from above ↓
- **Content (single block):** "rise" from below ↑
- **Two columns:** slide from opposite sides ← →
- **Grid (3-4 cols):** edges from sides, center rises

| Layout | Animation |
|--------|-----------|
| `cover` | Title falls ↓, subtitle falls ↓, content rises ↑ |
| `section` | Heading falls ↓ |
| `fact` | Value rises ↑ (expressive), label falls ↓ |
| `intro` | Avatar fades |
| `default` | Heading falls ↓, content rises ↑ |
| `two-cols` | Title falls ↓, left ←, right → |
| `two-cols-header` | Header falls ↓, columns ← → |
| `side-title` | Title fades, content rises ↑ |
| `top-title` | Bar fades, content rises ↑ |
| `quote` | Text rises ↑, author falls ↓ |
| `image` | Image fades, caption rises ↑ |
| `image-left` | Image fades, content slides ← |
| `image-right` | Content slides →, image fades |
| `iframe-left` | Iframe fades, content slides ← |
| `iframe-right` | Content slides →, iframe fades |
| `statement` | Heading falls ↓ (expressive), text rises ↑ |
| `center` | Content rises ↑ |
| `end` | Fade in, heading falls ↓ |
| `full` | No animation (instant) |
| Grid (3-4 cols) | First ←, center ↑, last → |

### Reduced Motion Support (WCAG 2.1)

> **TODO:** Currently disabled. Uncomment `@media (prefers-reduced-motion: reduce)` block in `styles/motion.css` to enable.

When enabled, users with `prefers-reduced-motion: reduce` in their OS will see:
- **No entrance animations** — content appears instantly
- **Instant v-click reveals** — opacity only, no transforms
- **Instant slide transitions** — no movement between slides

---

## SPACING SYSTEM (8-point grid)

Based on 8px base unit for consistent visual rhythm.

| Token | Value | Use |
|-------|-------|-----|
| `--space-xs` | 8px | Tight gaps, inline elements |
| `--space-sm` | 16px | Default gaps, list spacing |
| `--space-md` | 24px | Section gaps, card padding |
| `--space-lg` | 32px | Large gaps, slide padding |
| `--space-xl` | 48px | Section padding, major spacing |
| `--space-2xl` | 64px | Hero sections, major dividers |

### Fibonacci Extras

For special cases requiring non-8px values:

| Token | Value |
|-------|-------|
| `--space-fib-sm` | 13px |
| `--space-fib-md` | 21px |

---

## TYPOGRAPHY SCALE (Perfect Fourth 1.333)

Optimized for projector readability with 24px base.

| Role | Size | Variable | Line Height |
|------|------|----------|-------------|
| H1 | 57px | `--font-size-h1` | 1.15 |
| H2 | 43px | `--font-size-h2` | 1.15 |
| Subhead/H3 | 32px | `--font-size-subhead` | 1.25 |
| Body | 24px | `--font-size-base` | 1.35 |
| Caption | 18px | `--font-size-caption` | 1.35 |
| Code | 20px | `--font-size-code` | 1.4 |

### Line Heights (role-based)

| Variable | Value | Use |
|----------|-------|-----|
| `--line-height-heading` | 1.15 | Tight for 1-2 line headings |
| `--line-height-body` | 1.35 | Slide text blocks |
| `--line-height-reading` | 1.5 | Longer paragraphs (BDA) |

---

## SYNTAX HIGHLIGHTING

Slidev uses Shiki for code highlighting. The theme inherits Shiki's default behavior.

### Customization

To customize syntax colors, create a custom Shiki theme in your presentation:

```yaml
# slides.md frontmatter
---
highlighter: shiki
shikiSetup: |
  import { defineShikiSetup } from '@slidev/types'

  export default defineShikiSetup(() => {
    return {
      themes: {
        light: 'github-light',
        dark: 'dracula'
      }
    }
  })
---
```

### Available Themes

Popular themes that work well with this theme:

| Light Mode | Dark Mode |
|------------|-----------|
| `github-light` | `dracula` |
| `vitesse-light` | `vitesse-dark` |
| `slack-ochin` | `one-dark-pro` |

### Custom Colors via CSS

Override Shiki token colors in `styles/base.css`:

```css
/* Light theme */
:root {
  --shiki-color-text: var(--color-text);
  --shiki-color-background: var(--color-bg-muted);
}

/* Dark theme */
.dark {
  --shiki-color-text: var(--color-text);
  --shiki-color-background: var(--color-bg-muted);
}
```

### Code Block Best Practices

- Use `{1,3-5}` to highlight specific lines
- Keep code under 12-15 lines for readability
- Use `twoslash` for TypeScript hover info
- Add language tag for proper highlighting (`ts`, `vue`, `css`)

---

## BUILT-IN SLIDEV COMPONENTS

Slidev provides many built-in components. Key ones demonstrated in example_content.md:

### Navigation & Structure

| Component | Usage | Description |
|-----------|-------|-------------|
| `<Toc>` | `<Toc maxDepth="2" columns="2" />` | Table of contents |
| `<SlideCurrentNo>` | `Slide <SlideCurrentNo />` | Current slide number |
| `<SlidesTotal>` | `of <SlidesTotal />` | Total slides count |
| `<Link>` | `<Link to="5">Go</Link>` | Link to specific slide |

### Media & Embeds

| Component | Usage | Description |
|-----------|-------|-------------|
| `<Youtube>` | `<Youtube id="VIDEO_ID" />` | YouTube embed |
| `<Tweet>` | `<Tweet id="TWEET_ID" />` | Twitter/X embed |

### Utilities

| Component | Usage | Description |
|-----------|-------|-------------|
| `<Arrow>` | `<Arrow x1="0" y1="0" x2="100" y2="100" />` | Draw arrows |
| `<AutoFitText>` | `<AutoFitText :max="60">Text</AutoFitText>` | Auto-size text |
| `<LightOrDark>` | See below | Theme-aware content |
| `<Transform>` | `<Transform :scale="0.8">` | Scale content |
| `<VSwitch>` | See below | Toggle content on clicks |

### LightOrDark Example

```vue
<LightOrDark>
  <template #light>Light mode content</template>
  <template #dark>Dark mode content</template>
</LightOrDark>
```

### VSwitch Example

```vue
<VSwitch>
  <template #0>Initial state</template>
  <template #1>After first click</template>
  <template #2>After second click</template>
</VSwitch>
```

---

## ADVANCED CODE FEATURES

### Line Numbers

```md
\`\`\`typescript {lines:true}
// Code with line numbers
\`\`\`
```

### Scrollable Code

```md
\`\`\`typescript {maxHeight:'200px'}
// Long code that scrolls
\`\`\`
```

### Import External Files

```md
<<< @/snippets/demo.ts           # Full file
<<< @/snippets/demo.ts {2,4-6}   # With highlights
<<< @/snippets/demo.ts#region    # Named region
```

### Filename Display

```md
\`\`\`ts [utils/api.ts]
// Shows filename header
\`\`\`
```

---

## ADVANCED ANIMATION

### v-motion Directive

```vue
<div
  v-motion
  :initial="{ opacity: 0, y: 100 }"
  :enter="{ opacity: 1, y: 0 }"
>
  Animated content
</div>
```

### v-drag Draggable

```yaml
---
dragPos:
  element: 100,50,80,40
---

<div v-drag="'element'">Drag me!</div>
```

### Direction Variants

```vue
<div v-click class="forward:delay-300">
  Delayed on forward navigation
</div>
```

---

## PRESENTER FEATURES

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `P` | Presenter mode |
| `D` | Drawing mode |
| `O` | Overview mode |
| `T` | Toggle dark mode |
| `C` | Camera overlay |

### Click Markers in Notes

```md
<!--
[click] Explain first point
[click] Show the demo
[click:3] Jump to click 3
-->
```

### Frontmatter Options

| Option | Description |
|--------|-------------|
| `hideInToc: true` | Hide from Table of Contents |
| `disabled: true` | Skip slide entirely |
| `zoom: 0.9` | Scale slide content |
| `preload: true` | Preload slide resources |
