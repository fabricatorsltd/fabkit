# SelectField

A styled dropdown select input with floating label.

---

## Import

```js
import { SelectField } from 'fabkit';
```

---

## Basic Usage

```svelte
<script>
  let role = $state('');

  const options = [
    { text: 'Admin', value: 'admin' },
    { text: 'Editor', value: 'editor' },
    { text: 'Viewer', value: 'viewer' },
  ];
</script>

<SelectField label="Role" bind:value={role} options={options} />
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `""` | Selected value — **bindable** |
| `label` | `string` | `""` | Floating label text |
| `options` | `SelectOption[]` | `[]` | Available options |
| `icon` | `SvelteComponent` | `""` | Phosphor icon component shown inside the field |
| `iconPosition` | `"left" \| "right"` | `"right"` | Icon placement |
| `ref` | `bindable` | — | DOM element reference |

### SelectOption shape

| Field | Type | Description |
|-------|------|-------------|
| `text` | `string` | Display label |
| `value` | `string` | Value written to `value` on selection |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Examples

```svelte
<!-- With icon -->
<SelectField
  label="Category"
  bind:value={category}
  options={categoryOptions}
  icon={PhTag}
  iconPosition="left"
/>
```

---

## Notes

- The dropdown list is custom (not a native `<select>`) — consistent styling across all browsers.
- Clicking outside the dropdown closes it.
- The expand caret icon uses `PhCaretDown` from Phosphor.
