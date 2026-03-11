# Clamp

A layout container that constrains its child to a maximum size.

It behaves like libadwaita’s Clamp: below `tighteningThreshold` the content uses all available space; above it, the Clamp gradually tightens until reaching `maximumSize`.

---

## Import

```js
import { Clamp } from 'fabkit';
```

---

## Basic Usage

```svelte
<Clamp maximumSize={720} tighteningThreshold={520}>
  <Wrapper padding={[16, 24]}>
    <Text>Centered, readable content</Text>
  </Wrapper>
</Clamp>
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

---

## Example

```svelte
<Clamp maximumSize={960} tighteningThreshold={640} padding={[24, 24]}>
  <VBox spacing={12}>
    <Text fontSize={22} fontWeight={600}>Title</Text>
    <Text>Body text…</Text>
  </VBox>
</Clamp>
```
