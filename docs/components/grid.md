# Grid

A CSS Grid layout wrapper.

---

## Import

```js
import { Grid } from 'fabkit';
```

---

## Basic Usage

```svelte
<Grid columns="repeat(3, 1fr)" spacing={16}>
  <Card>A</Card>
  <Card>B</Card>
  <Card>C</Card>
</Grid>
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `spacing` | `number` | `0` | CSS `gap` (number = px, no units) |
| `columns` | `string` | `"1fr"` | `grid-template-columns` |
| `rows` | `string` | `"auto"` | `grid-template-rows` |
| `align` | `string` | `"stretch"` | `align-items` |
| `justify` | `string` | `"stretch"` | `justify-items` |
| `height` | `string` | `"auto"` | Container height |
| `children` | `Snippet` | — | Grid cells |
| `ref` | `bindable` | — | DOM element reference |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Examples

```svelte
<!-- Responsive auto-fill grid -->
<Grid columns="repeat(auto-fill, minmax(200px, 1fr))" spacing={16}>
  {#each items as item}
    <Card padding={[16,16,16,16]}>{item.title}</Card>
  {/each}
</Grid>

<!-- Fixed 2-column grid with row definition -->
<Grid columns="1fr 2fr" rows="auto 1fr" spacing={12} height="400px">
  <div>Sidebar</div>
  <div>Main content</div>
</Grid>
```
