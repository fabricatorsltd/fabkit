# HBox

A horizontal flexbox row. All children are laid out left to right.

---

## Import

```js
import { HBox } from 'fabkit';
```

---

## Basic Usage

```svelte
<HBox spacing={12}>
  <Button label="Cancel" />
  <Button label="Save" type="suggested" />
</HBox>
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `spacing` | `number` | `0` | Gap between children (number = px, no units) |
| `align` | `string` | `"center"` | `align-items` value (`start`, `center`, `end`, `stretch`, `baseline`) |
| `justify` | `string` | `"start"` | `justify-content` value (`start`, `center`, `end`, `space-between`, `space-around`) |
| `wrap` | `boolean` | `false` | Enables `flex-wrap: wrap` |
| `children` | `Snippet` | — | Row content |
| `ref` | `bindable` | — | DOM element reference |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md). HBox defaults:

| Prop | Default |
|------|---------|
| `bg` | `transparent` |
| `margin` | `[0,0,0,0]` |
| `padding` | `[0,0,0,0]` |
| `borderWidth` | `[0,0,0,0]` |
| `borderColor` | `transparent` |

---

## Examples

```svelte
<!-- Right-aligned action row -->
<HBox spacing={8} justify="end" padding={[12,16,12,16]}>
  <Button label="Cancel" />
  <Button label="OK" type="suggested" />
</HBox>

<!-- Space-between with stretch -->
<HBox spacing={16} justify="space-between" align="stretch">
  <Card flex="1">Left</Card>
  <Card flex="1">Right</Card>
</HBox>

<!-- Wrapping icon row -->
<HBox spacing={8} wrap>
  {#each icons as Icon}
    <Icon size={24} />
  {/each}
</HBox>
```
