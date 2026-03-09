# Tooltip

A floating label that appears on hover or focus, providing extra information.

---

## Import

```js
import { Tooltip } from 'fabkit';
```

---

## Basic Usage

```svelte
<Tooltip content="More info">
  <Button label="Hover me" />
</Tooltip>
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `content` | `string`  | `""`   | Tooltip text               |
| `placement`| `string` | `"top"`| Tooltip position (`top`, `bottom`, `left`, `right`) |
| `children`| `Snippet` | —       | Target element             |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Example

```svelte
<Tooltip content="Delete this item">
  <Button label="Delete" type="destructive" />
</Tooltip>
```

