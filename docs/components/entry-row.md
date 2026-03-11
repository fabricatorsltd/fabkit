# EntryRow

A row for displaying a label and value, often used in forms or summary lists.

---

## Import

```js
import { EntryRow } from 'fabkit';
```

---

## Basic Usage

```svelte
<EntryRow label="Username" value="gabs" />
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `label`   | `string`  | `""`   | Row label                  |
| `value`   | `string`  | `""`   | Row value                  |
| `children`| `Snippet` | —       | Custom value content       |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Example

```svelte
<EntryRow label="Email" value="user@email.com" />
```

