# SwitchRow

A row with a label and a switch, for toggling settings.

---

## Import

```js
import { SwitchRow } from 'fabkit';
```

---

## Basic Usage

```svelte
<SwitchRow label="Enable notifications" bind:checked={enabled} />
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `label`   | `string`  | `""`   | Row label                  |
| `checked` | `boolean` | `false` | Switch state (**bindable**) |
| `disabled`| `boolean` | `false` | Disables the switch        |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Example

```svelte
<SwitchRow label="Dark mode" bind:checked={darkMode} />
```

