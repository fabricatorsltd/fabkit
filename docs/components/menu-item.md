# MenuItem

A single item within a Menu, used for custom menu composition.

---

## Import

```js
import { MenuItem } from 'fabkit';
```

---

## Basic Usage

```svelte
<Menu>
  <MenuItem label="Cut" action={cut} />
  <MenuItem label="Copy" action={copy} />
  <MenuItem label="Paste" action={paste} />
</Menu>
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `label`   | `string`  | `""`   | Display text               |
| `action`  | `() => void` | —    | Called on click            |
| `icon`    | `SvelteComponent` | — | Icon component to display  |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Example

```svelte
<MenuItem label="Delete" icon={PhTrash} action={deleteItem} />
```

