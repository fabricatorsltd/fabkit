# SpinRow

A row with a label and a numeric spinner input.

---

## Import

```js
import { SpinRow } from 'fabkit';
```

---

## Basic Usage

```svelte
<SpinRow label="Quantity" bind:value={qty} min={1} max={10} />
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `label`   | `string`  | `""`   | Row label                  |
| `value`   | `number`  | `0`     | Spinner value (**bindable**) |
| `min`     | `number`  | `0`     | Minimum value              |
| `max`     | `number`  | `100`   | Maximum value              |
| `step`    | `number`  | `1`     | Step size                  |
| `disabled`| `boolean` | `false` | Disables the spinner       |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Example

```svelte
<SpinRow label="Pages" bind:value={pages} min={1} max={1000} />
```

