# AdaptiveTable

A responsive table that switches between:

- wide: a sortable table layout
- compact: row cards (key/value)

---

## Import

```js
import { AdaptiveTable } from 'fabkit';
```

---

## Basic Usage

```svelte
<AdaptiveTable
  stackAt={720}
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' }
  ]}
  rows={users}
  titleKey="name"
/>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `"auto" \| "table" \| "cards"` | `"auto"` | Force layout mode (or let it adapt) |
| `stackAt` | `number` | `720` | Switch to cards below this container width (px) |
| `columns` | `Array` | `[]` | Same shape as `DataTable` columns (`key`, `label`, optional `width`, `sortable`) |
| `rows` | `Array` | `[]` | Row objects |
| `selectable` | `boolean` | `false` | Enables selection checkboxes |
| `selectedRows` | `any[]` | `[]` | Bindable selection state |
| `titleKey` | `string` | `""` | Row field shown as card title (cards mode) |
| `onRowClick` | `(row) => void` | — | Row/cell click handler |

Accepts all [Skeleton props](./skeleton.md).
