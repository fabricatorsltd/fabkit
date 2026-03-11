# DataTableView

A view component for displaying and interacting with a DataTable.

---

## Import

```js
import { DataTableView } from 'fabkit';
```

---

## Basic Usage

```svelte
<DataTableView columns={[{label: 'Name', key: 'name'}]} rows={[{name: 'Alice'}]} />
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `columns` | `Array<{label: string, key: string}>` | `[]` | Table columns |
| `rows`    | `array`   | `[]`    | Table data rows            |
| `sortable`| `boolean` | `false` | Enable column sorting      |
| `selectable`| `boolean`| `false` | Enable row selection       |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Example

```svelte
<DataTableView columns={[{label: 'Age', key: 'age'}]} rows={[{age: 30}]} sortable />
```

