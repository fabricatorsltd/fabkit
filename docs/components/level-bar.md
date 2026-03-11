# LevelBar

A horizontal bar for displaying progress, levels, or ratings.

---

## Import

```js
import { LevelBar } from 'fabkit';
```

---

## Basic Usage

```svelte
<LevelBar value={3} max={5} />
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `value`   | `number`  | `0`     | Current value              |
| `max`     | `number`  | `5`     | Maximum value              |
| `color`   | `string`  | `""`   | Bar color                  |
| `bg`      | `string`  | `""`   | Background color           |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Example

```svelte
<LevelBar value={4} max={10} color="#2563eb" />
```

