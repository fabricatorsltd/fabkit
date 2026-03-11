# FileChooser

A file input component for selecting and uploading files.

---

## Import

```js
import { FileChooser } from 'fabkit';
```

---

## Basic Usage

```svelte
<FileChooser bind:files={selectedFiles} multiple />
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `files`   | `FileList`| `null`  | Selected files (**bindable**) |
| `multiple`| `boolean` | `false` | Allow multiple file selection |
| `accept`  | `string`  | `""`   | Accepted file types (e.g. ".jpg,.png") |
| `disabled`| `boolean` | `false` | Disables the input         |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Example

```svelte
<FileChooser accept=".pdf,.docx" bind:files={docs} />
```

