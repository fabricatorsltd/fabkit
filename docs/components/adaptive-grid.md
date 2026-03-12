# AdaptiveGrid

A container-driven grid that can intentionally switch into a list layout when the container is too narrow.

No media queries — it observes the container.

---

## Import

```js
import { AdaptiveGrid } from 'fabkit';
```

---

## Basic Usage

```svelte
<AdaptiveGrid minCardWidth={240} minColumns={2} spacing={16} listSpacing={12}>
  {#each items as item}
    <Card padding={[16,16,16,16]}>{item.title}</Card>
  {/each}
</AdaptiveGrid>
```

---

## Force List/Grid

```svelte
<AdaptiveGrid mode="list">
  ...
</AdaptiveGrid>

<AdaptiveGrid mode="grid">
  ...
</AdaptiveGrid>
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `"auto" \| "grid" \| "list"` | `"auto"` | Force a variant, or choose automatically |
| `minCardWidth` | `number` | `240` | Used to compute grid columns (when `columns` isn’t provided) |
| `minColumns` | `number` | `2` | When `mode="auto"`, switch to list when width is too small to fit this many cards |
| `listBelow` | `number` | — | Explicit threshold (px) for list mode |
| `columns` | `string` | — | Override `grid-template-columns` (passes through to `Grid`) |
| `spacing` | `number \| string \| (number \| string)[]` | `12` | Gap for grid mode |
| `listSpacing` | `number \| string` | `12` | Vertical gap for list mode |
| `listPadding` | `number \| string \| (number \| string)[]` | — | Optional padding for list mode container |
| `ref` | `bindable` | — | DOM element reference (used for measurement) |

Accepts all [Skeleton props](./skeleton.md).

---

## Notes

- Container-driven: uses `ResizeObserver` on the root element.
- SSR-safe: if container width can’t be measured yet, it uses grid mode.
