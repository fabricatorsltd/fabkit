# ColorPicker

A color selection input with palette and custom color support.

---

## Import

```js
import { ColorPicker } from 'fabkit';
```

---

## Basic Usage

```svelte
<ColorPicker bind:value={color} />
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `value`   | `string`  | `""`   | Selected color (**bindable**) |
| `palette` | `string[]`| `[]`    | Array of preset colors     |
| `disabled`| `boolean` | `false` | Disables the picker        |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Example

```svelte
<ColorPicker palette={["#2563eb", "#f59e42", "#e11d48"]} bind:value={color} />
```

