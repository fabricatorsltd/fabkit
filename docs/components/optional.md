# Optional

A small container-driven primitive that keeps content inline on wide containers and moves it to a full-width block when compact.

This is meant for optional / secondary UI (e.g. secondary actions, extra filters) in flex layouts with wrapping.

---

## Import

```js
import { Optional } from 'fabkit';
```

---

## Basic Usage

```svelte
<div style="display:flex; flex-wrap:wrap; gap: 8px;">
  <Button label="Primary" />

  <Optional below={520}>
    <Button label="Secondary" />
  </Optional>
</div>
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `below` | `number` | `600` | Switch to below mode when container width is below this value (px) |
| `mode` | `"auto" \| "inline" \| "below"` | `"auto"` | Force layout mode |
| `orderBelow` | `number` | `1000` | CSS `order` applied in below mode (useful in flex layouts) |
| `unwrapInline` | `boolean` | `true` | When true, uses `display: contents` in inline mode |
| `ref` | `bindable` | — | DOM element reference |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).
