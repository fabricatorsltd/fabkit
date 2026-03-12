# Theming

Fabkit uses a CSS-variable-based theme system. All variables are injected into `<html>` by `initTheme()`.

---

## initTheme(userTheme?)

```js
import { initTheme } from 'fabkit';

initTheme(userTheme?: PartialBrandTheme): BrandTheme
```

**Must be called inside `onMount`** — it accesses `document.documentElement` which does not exist during SSR.

### Parameters

`userTheme` is a **partial** object. Any missing keys are filled from the built-in `defaultTheme`. You never need to provide all keys.

```ts
interface PartialBrandTheme {
  fonts?: {
    primary?: string;    // CSS font-family for UI text
    secondary?: string;  // fallback to primary if omitted
    mono?: string;       // monospace font
  };
  dimensions?: {
    borderRadius?: number;  // px — default 12
    spacing?: number;       // base spacing unit, px — default 8
    fontSize?: number;      // root font size, px — default 15
  };
  colors?: {
    primary?: string;           // hex — main brand color, default #2196F3
    primaryHover?: string;      // hex — auto-derived if omitted (darken 12%)
    primaryActive?: string;     // hex — auto-derived if omitted (darken 35%)
    primaryDisabled?: string;   // hex — auto-derived if omitted (desaturate 50%)
    secondary?: string;         // hex — optional secondary brand color
    secondaryHover?: string;
    secondaryActive?: string;
    secondaryDisabled?: string;
  };
}
```

### Return value

Returns the resolved `BrandTheme` (defaults merged with your overrides). Store it if you need to read back values.

---

## Examples

### Minimal — just change the brand color

```js
initTheme({ colors: { primary: '#6366f1' } });
```

### Custom font + radius + font size

```js
initTheme({
  fonts: { primary: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  dimensions: { borderRadius: 6, fontSize: 14 }
});
```

### Full custom theme

```js
initTheme({
  fonts: {
    primary: "'DM Sans', sans-serif",
    secondary: "'DM Sans', sans-serif",
    mono: "'Fira Code', monospace"
  },
  dimensions: {
    borderRadius: 10,
    spacing: 8,
    fontSize: 15
  },
  colors: {
    primary: '#ff6b6b',
    primaryHover: '#e85555',
    primaryActive: '#c73737',
    primaryDisabled: '#f0a0a0',
    secondary: '#4ecdc4'
  }
});
```

---

## CSS Variables Reference

`initTheme()` writes these variables to `<html style="...">`. You can override any of them directly in your CSS after the call.

### Background

| Variable | Light | Dark |
|----------|-------|------|
| `--background-base` | `#ffffff` | `#202020` |
| `--background-elevated` | `#f5f5f5` | `#353535` |
| `--background-elevated-2` | `#e7e7e7` | `#272727` |
| `--background-elevated-2-hover` | `#e1e1e1` | `#3c3c3c` |
| `--background-top` | `#d8d8d8` | `#424242` |
| `--background-translucent` | `rgba(255,255,255,0.65)` | `rgba(36,36,36,0.65)` |

### Text

| Variable | Light | Dark |
|----------|-------|------|
| `--text-primary` | `#000000` | `#ffffff` |
| `--text-primary-alt` | `#ffffff` | `#000000` |
| `--text-secondary` | `#666666` | `#cccccc` |

### Borders

| Variable | Light | Dark |
|----------|-------|------|
| `--border-primary` | `#e4e4e4` | `#3c3c3c` |
| `--border-secondary` | `#f8f8f8` | `#2c2c2c` |
| `--border-tertiary` | `#c7c7c7` | `#4c4c4c` |

### Shadows

| Variable | Light | Dark |
|----------|-------|------|
| `--shadow-base` | `none` | `none` |
| `--shadow-elevated` | `0 2px 4px rgba(0,0,0,0.1)` | `0 2px 4px rgba(0,0,0,0.1)` |
| `--shadow-elevated-2` | `0 2px 4px rgba(0,0,0,0.041)` | same |
| `--shadow-top` | `0 0 10px rgba(0,0,0,0.2)` | `0 0 10px rgba(0,0,0,0.3)` |

### Actions

| Variable | Value |
|----------|-------|
| `--action-suggested` | brand primary |
| `--action-suggested-hover` | brand primaryHover |
| `--action-suggested-active` | brand primaryActive |
| `--action-suggested-disabled` | brand primaryDisabled |
| `--action-destructive` | `#dc3545` |
| `--action-destructive-hover` | `#bd2130` |
| `--action-destructive-active` | `#991724` |
| `--action-destructive-disabled` (light) | `#f0c2c2` |
| `--action-destructive-disabled` (dark) | `#4b3838` |

### Dimensions

| Variable | Description |
|----------|-------------|
| `--snt-border-radius` | Default border radius, set from `dimensions.borderRadius` |

---

## Fine-tuning with Skeleton Props

Every component accepts raw Skeleton props that override per-instance visual styles:

```svelte
<Button
  bg="var(--background-elevated)"
  bgHover="var(--background-top)"
  borderWidth={[1,1,1,1]}
  borderColor="var(--border-primary)"
  borderRadius={[6,6,6,6]}
  shadow="0 2px 8px rgba(0,0,0,0.1)"
  color="var(--text-primary)"
  colorHover="var(--text-primary)"
/>
```

These props do **not** require any CSS — they are applied as inline styles on the element.

For color-like props (`bg`, `color`, `borderColor`, shadows), values can be:

- CSS color strings (`#fff`, `rgba(...)`, `var(...)`, ...)
- Theme tokens (`surface`, `text-primary`, `gray.500`, `surface/30`, ...)
- RGBA tuples (`[r, g, b, a]`)

See [Skeleton](./components/skeleton.md) for the full list of available props.

---

## Overriding Variables in CSS

After `initTheme()` sets inline styles on `<html>`, you can override with `:root` or any selector in your own CSS:

```css
:root {
  --background-base: #fafafa;
  --snt-border-radius: 4px;
}
```

Note: `initTheme()` uses `element.style.setProperty()` which has lower specificity than a `<style>` rule, but higher than a stylesheet `:root` rule. To override, use a more specific selector or `!important`.

---

## getTheme()

Returns the currently active resolved theme object, or `null` if `initTheme()` has not been called yet.

```js
import { getTheme } from 'fabkit';

const theme = getTheme();
console.log(theme.colors.primary); // '#6366f1'
```

---

## generateColorVariants(hex)

Utility to auto-derive hover/active/disabled variants from a base color.

```js
import { generateColorVariants } from 'fabkit';

const variants = generateColorVariants('#6366f1');
// { hover: '#4b4ed4', active: '#2e3097', disabled: '#9596c5' }
```

Pass the result directly into `initTheme`:

```js
const base = '#6366f1';
const v = generateColorVariants(base);
initTheme({
  colors: {
    primary: base,
    primaryHover: v.hover,
    primaryActive: v.active,
    primaryDisabled: v.disabled
  }
});
```
