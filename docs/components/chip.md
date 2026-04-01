# Chip

A compact label element, optionally with an icon and a remove button.

---

## Import

```js
import { Chip } from 'fabkit';
```

---

## Basic Usage

```svelte
<Chip label="Svelte" />
```

---

## Component Props

| Prop        | Type                    | Default                      | Description                              |
|-------------|-------------------------|------------------------------|------------------------------------------|
| `label`     | `string`                | `""`                         | Text displayed inside the chip           |
| `removable` | `boolean`               | `false`                      | Shows a × button to remove the chip      |
| `onRemove`  | `(event) => void`       | —                            | Called when the × button is clicked      |
| `icon`      | `SvelteComponent`       | —                            | Icon component rendered before the label |
| `color`     | `string`                | `var(--background-elevated)` | Background color shorthand               |
| `textColor` | `string`                | —                            | Text color                               |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Examples

```svelte
<!-- Simple -->
<Chip label="Design" />

<!-- With color -->
<Chip label="In Progress" color="var(--accent-primary)" textColor="#fff" />

<!-- Removable -->
<script>
  let tags = $state(['Svelte', 'TypeScript', 'Vite']);
</script>

{#each tags as tag}
  <Chip
    label={tag}
    removable
    onRemove={() => tags = tags.filter(t => t !== tag)}
  />
{/each}

<!-- With icon -->
<Chip label="Notifications" icon={Bell} />
```
