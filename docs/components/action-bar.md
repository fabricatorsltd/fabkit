# ActionBar

A horizontal set of actions that automatically overflows into a **More** menu when there is not enough space.

---

## Import

```js
import { ActionBar } from 'fabkit';
```

---

## Basic Usage

```svelte
<script>
  import { ActionBar } from 'fabkit';
  import { PhPencil, PhTrash, PhShare } from 'fabkit/icons';

  const actions = [
    { label: 'Edit', icon: PhPencil, onClick: () => edit() },
    { label: 'Share', icon: PhShare, onClick: () => share() },
    { label: 'Delete', icon: PhTrash, variant: 'destructive', onClick: () => del() },
  ];
</script>

<ActionBar items={actions} />
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Array` | `[]` | Actions list (`label`, optional `icon`, `onClick`, `variant`, `disabled`) |
| `mode` | `"auto" \| "all" \| "overflow"` | `"auto"` | `all` disables overflow logic (shows everything) |
| `spacing` | `number` | `8` | Gap between actions (px) |
| `moreLabel` | `string` | `"More"` | Label for the overflow button |
| `moreIcon` | `SvelteComponent` | `PhDotsThreeVertical` | Icon for the overflow button |
| `moreVariant` | `string` | `"flat"` | Variant passed to the overflow button |

Accepts all [Skeleton props](./skeleton.md).
