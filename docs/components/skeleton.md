# Skeleton

The `Skeleton` component is the **base primitive** that every other Fabkit component is built on. It renders any HTML element with a comprehensive set of layout and interactive styling props applied as inline styles.

You rarely use `Skeleton` directly — but every component that accepts visual styling passes those props through to an internal `Skeleton` instance.

---

## Import

```js
import { Skeleton } from 'fabkit';
```

---

## Basic Usage

```svelte
<Skeleton
  element="section"
  bg="var(--background-elevated)"
  padding={[16, 24, 16, 24]}
  borderRadius={[12, 12, 12, 12]}
  shadow="var(--shadow-elevated)"
>
  Content here
</Skeleton>
```

---

## Props

### Layout

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `element` | `string` | `"div"` | HTML tag to render (`div`, `section`, `article`, `button`, etc.) |
| `ref` | `bindable` | — | Bind to get the DOM element reference |
| `margin` | `number[] \| number` | `[0,0,0,0]` | CSS margin — `[top, right, bottom, left]` in px |
| `padding` | `number[] \| number` | `[0,0,0,0]` | CSS padding — `[top, right, bottom, left]` in px |
| `spacing` | `number \| string` | — | CSS `gap` (works with `display: flex` / `grid`) |
| `width` | `number \| string` | — | Width (number = px, string = any CSS unit) |
| `height` | `number \| string` | — | Height |
| `minWidth` | `number \| string` | — | min-width |
| `minHeight` | `number \| string` | — | min-height |
| `maxWidth` | `number \| string` | — | max-width |
| `maxHeight` | `number \| string` | — | max-height |
| `display` | `string` | — | CSS display |
| `position` | `string` | — | CSS position |
| `top` / `bottom` / `left` / `right` | `number \| string` | — | CSS positioning offsets |
| `zIndex` | `number` | `0` | CSS z-index |
| `overflow` | `string` | — | CSS overflow |
| `flex` | `string` | — | CSS flex shorthand |
| `flexWrap` | `string` | — | CSS flex-wrap |
| `opacity` | `number` | — | CSS opacity (0–1) |

### Background

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `bg` | `string` | `"transparent"` | Background color (idle) |
| `bgHover` | `string` | fallback to `bg` | Background on `:hover` |
| `bgFocus` | `string` | fallback to `bgHover` | Background on `:focus` |
| `bgActive` | `string` | fallback to `bgHover` | Background on `:active` |

### Border

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `borderWidth` | `number[]` | `[0,0,0,0]` | Border widths `[top, right, bottom, left]` px |
| `borderWidthHover` | `number[]` | fallback to `borderWidth` | Border widths on hover |
| `borderWidthFocus` | `number[]` | fallback | Border widths on focus |
| `borderWidthActive` | `number[]` | fallback | Border widths on active |
| `borderColor` | `string \| string[]` | `"transparent"` | Border color(s) — single value or `[top, right, bottom, left]` |
| `borderColorHover` | `string \| string[]` | fallback | Border color on hover |
| `borderColorFocus` | `string \| string[]` | fallback | Border color on focus |
| `borderColorActive` | `string \| string[]` | fallback | Border color on active |
| `borderStyle` | `string` | `"solid"` | CSS border-style |
| `borderRadius` | `number[]` | `[0,0,0,0]` | Border radii `[tl, tr, br, bl]` px |

### Shadow

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `shadow` | `string` | `"none"` | Box shadow (idle) |
| `shadowSecondary` | `string` | fallback | Box shadow on hover/focus |
| `shadowActive` | `string` | fallback | Box shadow on active |

### Color & Typography

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | — | Text color (idle) |
| `colorHover` | `string` | fallback | Text color on hover |
| `colorFocus` | `string` | fallback | Text color on focus |
| `colorActive` | `string` | fallback | Text color on active |
| `fontSize` | `number \| string` | — | Font size |
| `fontWeight` | `string \| number` | — | Font weight |
| `textAlign` | `string` | — | Text alignment |
| `textTransform` | `string` | — | CSS text-transform |
| `letterSpacing` | `number \| string` | — | Letter spacing |
| `whiteSpace` | `string` | — | CSS white-space |
| `textOverflow` | `string` | — | CSS text-overflow |

### Transform & Interaction

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `transform` | `string` | — | CSS transform (idle) |
| `transformHover` | `string` | fallback | Transform on hover |
| `transformFocus` | `string` | fallback | Transform on focus |
| `transformActive` | `string` | fallback | Transform on active |
| `cursor` | `string` | — | CSS cursor |
| `pointerEvents` | `string` | — | CSS pointer-events |

### Other

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `class` | `string` | `""` | Additional CSS classes |
| `style` | `string` | — | Raw CSS string merged into the computed style |
| `children` | `Snippet` | — | Default slot content |

---

## State Transitions

Skeleton applies hover/focus/active state styles automatically via CSS variable injection. All interactive states transition with `0.2s ease`.

```svelte
<!-- Button-like element with full state feedback -->
<Skeleton
  element="button"
  bg="var(--background-top)"
  bgHover="var(--background-elevated)"
  bgActive="var(--background-elevated-2)"
  borderWidth={[1,1,1,1]}
  borderColor="var(--border-primary)"
  borderColorHover="var(--border-tertiary)"
  borderRadius={[8,8,8,8]}
  padding={[8,16,8,16]}
  transformHover="translateY(-1px)"
  transformActive="translateY(0) scale(0.98)"
  shadow="none"
  shadowSecondary="0 4px 12px rgba(0,0,0,0.1)"
>
  Click me
</Skeleton>
```

---

## Array Notation

All box-model arrays follow CSS shorthand order — `[top, right, bottom, left]`.

```js
// Equal on all sides
padding={[16, 16, 16, 16]}

// Vertical 8, horizontal 16
padding={[8, 16, 8, 16]}

// Number shorthand (same on all sides)
padding={16}
```
