# CheckboxGroup

A group of checkboxes for selecting multiple options.

---

## Import

```js
import { CheckboxGroup } from 'fabkit';
```

---

## Basic Usage

```svelte
<CheckboxGroup options={[{label: 'A', value: 'a'}, {label: 'B', value: 'b'}]} bind:values={selected} />
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `options` | `Array<{label: string, value: any}>` | `[]` | List of options |
| `values`  | `array`   | `[]`    | Selected values (**bindable**) |
| `disabled`| `boolean` | `false` | Disables all checkboxes    |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Example

```svelte
<CheckboxGroup options={[{label: 'One', value: 1}, {label: 'Two', value: 2}]} bind:values={selected} />
```

