# Container (Page)

A page-level wrapper that standardizes:

- max width
- gutters (padding)
- edge-to-edge mode on compact containers

It is container-driven (no media queries).

---

## Import

```js
import { Container, Page } from 'fabkit';
```

---

## Basic Usage

```svelte
<Container maxWidth={1200}>
  <Text>Content</Text>
</Container>
```

---

## Gutters by size

```svelte
<Container
  maxWidth={1200}
  gutters={{ compact: 0, regular: 16, wide: 24 }}
>
  <Text>Responsive gutters</Text>
</Container>
```

---

## Edge-to-edge on compact

```svelte
<Container
  maxWidth={1200}
  edgeToEdgeBelow="compact"
>
  <Text>Edge-to-edge on compact</Text>
</Container>
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `maxWidth` | `number \| string` | `1200` | Max width when not edge-to-edge |
| `gutters` | `number \| string \| { compact?: any, regular?: any, wide?: any }` | `{ compact: 0, regular: 16, wide: 24 }` | Horizontal padding by size |
| `compactBelow` | `number` | `640` | Compact threshold (px) |
| `wideAbove` | `number` | `1024` | Wide threshold (px) |
| `edgeToEdgeBelow` | `"compact" \| "regular" \| "wide" \| number \| boolean` | `"compact"` | When true, uses `max-width: 100%` and `gutters: 0` |
| `center` | `boolean` | `true` | Centers the container (auto margins) |
| `ref` | `bindable` | — | DOM element reference |

Accepts all [Skeleton props](./skeleton.md).
