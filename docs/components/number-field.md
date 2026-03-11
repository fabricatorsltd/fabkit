# NumberField

A numeric input field for entering numbers.

---

## Import

```js
import { NumberField } from 'fabkit';
```

---

## Basic Usage

```svelte
<NumberField bind:value={age} min={0} max={100} />
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `value`   | `number`  | `0`     | Numeric value (**bindable**) |
| `min`     | `number`  | `0`     | Minimum value              |
| `max`     | `number`  | `100`   | Maximum value              |
| `step`    | `number`  | `1`     | Step size                  |
| `disabled`| `boolean` | `false` | Disables the input         |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Example

```svelte
<NumberField min={1} max={10} bind:value={qty} />
```

