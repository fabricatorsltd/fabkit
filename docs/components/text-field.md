# TextField

A single-line text input with a floating label.

---

## Import

```js
import { TextField } from 'fabkit';
```

---

## Basic Usage

```svelte
<script>
  let name = $state('');
</script>

<TextField label="Full name" placeholder="Enter your name" bind:value={name} />
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `""` | Input value — **bindable** |
| `label` | `string` | `""` | Floating label text |
| `placeholder` | `string` | `""` | Placeholder shown when empty |
| `type` | `string` | `"text"` | HTML input type (`text`, `password`, `email`, `number`, etc.) |
| `icon` | `SvelteComponent` | `""` | Phosphor icon component rendered inside the field |
| `iconPosition` | `"left" \| "right"` | `"right"` | Icon placement |
| `readOnly` | `boolean` | `false` | Makes the field read-only |
| `flat` | `boolean` | `false` | Removes the underline (and keeps focus from re-adding it) |
| `ref` | `bindable` | — | DOM element reference |

---

## Skeleton Pass-through Props

TextField is built on [BaseField](./base-field.md) which handles the Skeleton props. All [Skeleton props](./skeleton.md) are accepted.

---

## Examples

```svelte
<!-- With icon on the left -->
<TextField
  label="Search"
  placeholder="Search…"
  bind:value={query}
  icon={PhMagnifyingGlass}
  iconPosition="left"
/>

<!-- Password field -->
<TextField label="Password" type="password" bind:value={password} />

<!-- Read-only -->
<TextField label="User ID" value={userId} readOnly />

<!-- Flat (no border) -->
<TextField label="Title" bind:value={title} flat />
```
