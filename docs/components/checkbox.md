# Checkbox

A simple checkbox input component.

---

## Import

```js
import { Checkbox } from 'fabkit';
```

---

## Basic Usage

```svelte
<Checkbox bind:checked={isChecked} label="Accept terms" />
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `checked` | `boolean` | `false` | Whether the box is checked (**bindable**) |
| `label`   | `string`  | `""`   | Optional label text        |
| `disabled`| `boolean` | `false` | Disables the checkbox      |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Example

```svelte
<Checkbox label="Subscribe to newsletter" checked={subscribed} />
```

