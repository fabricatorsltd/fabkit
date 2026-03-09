# RadioGroup

A group of radio buttons for selecting a single option.

---

## Import

```js
import { RadioGroup } from 'fabkit';
```

---

## Basic Usage

```svelte
<RadioGroup options={[{label: 'A', value: 'a'}, {label: 'B', value: 'b'}]} bind:value={selected} />
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `options` | `Array<{label: string, value: any}>` | `[]` | List of options |
| `value`   | `any`     | `null`  | Selected value (**bindable**) |
| `disabled`| `boolean` | `false` | Disables all radios        |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Example

```svelte
<RadioGroup options={[{label: 'One', value: 1}, {label: 'Two', value: 2}]} bind:value={selected} />
```

