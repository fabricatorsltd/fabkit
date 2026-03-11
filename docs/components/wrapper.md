# Wrapper

A generic container for wrapping content, useful for layout or styling purposes.

---

## Import

```js
import { Wrapper } from 'fabkit';
```

---

## Basic Usage

```svelte
<Wrapper padding={[16, 24]} bg="#f3f4f6">
  <Text>Wrapped content</Text>
</Wrapper>
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `children`| `Snippet` | —       | Wrapped content            |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Example

```svelte
<Wrapper borderRadius={[8,8,8,8]} shadow="var(--shadow-base)">
  <Text>Card-like wrapper</Text>
</Wrapper>
```

