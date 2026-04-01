# DataTable

A sortable, selectable data table with column headers.

---

## Import

```js
import { DataTable } from 'fabkit';
```

---

## Basic Usage

```svelte
<DataTable
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', width: '120px' },
  ]}
  rows={users}
/>
```

---

## Component Props

| Prop           | Type                                             | Default | Description                                    |
|----------------|--------------------------------------------------|---------|------------------------------------------------|
| `columns`      | `Array<{ key: string, label: string, width?: string, sortable?: boolean }>` | `[]` | Column definitions |
| `rows`         | `array`                                          | `[]`    | Row data objects                               |
| `selectable`   | `boolean`                                        | `false` | Enables row selection checkboxes               |
| `selectedRows` | `array` (**bindable**)                           | `[]`    | Currently selected rows                        |
| `onRowClick`   | `(row: any) => void`                             | —       | Called when a row is clicked                   |
| `ref`          | `bindable`                                       | —       | DOM element reference                          |

---

## Column Definition

| Field      | Type      | Description                                      |
|------------|-----------|--------------------------------------------------|
| `key`      | `string`  | Property name to read from each row object       |
| `label`    | `string`  | Column header text                               |
| `width`    | `string`  | Optional CSS width (e.g. `"120px"`, `"20%"`)     |
| `sortable` | `boolean` | Enable click-to-sort on this column              |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Example: Sortable + Selectable

```svelte
<script>
  let selected = $state([]);
  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'age',  label: 'Age',  sortable: true, width: '80px' },
    { key: 'city', label: 'City' },
  ];
  const rows = [
    { name: 'Alice', age: 30, city: 'Rome' },
    { name: 'Bob',   age: 25, city: 'Milan' },
    { name: 'Carol', age: 35, city: 'Turin' },
  ];
</script>

<DataTable
  {columns}
  {rows}
  selectable
  bind:selectedRows={selected}
  onRowClick={(row) => console.log(row)}
/>
```
