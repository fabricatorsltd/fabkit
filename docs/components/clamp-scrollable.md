# ClampScrollable

A scroll container that constrains its child to a maximum size.

Use it when you want clamped content inside a vertically scrollable area, without relying on CSS media queries.

---

## Import

```js
import { ClampScrollable } from 'fabkit';
```

---

## Basic Usage

```svelte
<ClampScrollable maximumSize={720} tighteningThreshold={520} height={480} padding={[16, 24]}>
  <TextRich>
    <h2>Scrollable, clamped content</h2>
    <p>…</p>
  </TextRich>
</ClampScrollable>
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Which axis to clamp |
| `maximumSize` | `number` | `600` | Maximum size (px) allocated to the child |
| `tighteningThreshold` | `number` | `600` | Size (px) above which the clamp starts tightening |
| `children` | `Snippet` | — | Content |
| `ref` | `bindable` | — | DOM element reference |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).
