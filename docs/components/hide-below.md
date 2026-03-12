# HideBelow

A small container-driven primitive that hides its children below a measured container width.

---

## Import

```js
import { HideBelow } from 'fabkit';
```

---

## Basic Usage

```svelte
<HideBelow below={520}>
  <Button label="Secondary action" />
</HideBelow>
```

With fallback:

```svelte
<HideBelow below={520} fallback={() => ""}>
  <Button label="Secondary action" />
</HideBelow>
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `below` | `number` | `600` | Hide when container width is below this value (px) |
| `mode` | `"auto" \| "visible" \| "hidden"` | `"auto"` | Force visibility (useful for debugging) |
| `fallback` | `Snippet` | — | Content rendered when hidden |
| `ref` | `bindable` | — | DOM element reference |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).
