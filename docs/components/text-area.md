# TextArea

A multi-line text input with a floating label.

---

## Import

```js
import { TextArea } from 'fabkit';
```

---

## Basic Usage

```svelte
<script>
  let description = $state('');
</script>

<TextArea
  label="Description"
  placeholder="Write something…"
  bind:value={description}
/>
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `""` | Text value — **bindable** |
| `label` | `string` | `""` | Floating label text |
| `placeholder` | `string` | `""` | Placeholder shown when empty |
| `rows` | `number` | `4` | Initial row count |
| `autoResize` | `boolean` | `false` | Auto-resize height to content |
| `readOnly` | `boolean` | `false` | Makes the field read-only |
| `flat` | `boolean` | `false` | Removes the underline |
| `ref` | `bindable` | — | DOM element reference |

---

## Skeleton Pass-through Props

TextArea is built on [Skeleton](./skeleton.md). All Skeleton props are accepted.

---

## Examples

```svelte
<!-- Auto-resize -->
<TextArea label="Notes" bind:value={notes} autoResize />

<!-- Flat -->
<TextArea label="Title" bind:value={title} flat />
```
