# Menu

A vertical list of clickable items.

---

## Import

```js
import { Menu } from 'fabkit';
```

---

## Basic Usage

```svelte
<script>
  const items = [
    { label: 'New File', action: () => newFile() },
    { label: 'Open…', action: () => open() },
    { label: 'Save', action: () => save() },
  ];
</script>

<Menu items={items} />
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `MenuItemData[]` | `[]` | List of menu items |
| `ref` | `bindable` | — | DOM element reference |

### MenuItemData shape

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Display text |
| `action` | `() => void` | Called on click |

### Menu.Item (standalone usage)

`Menu.Item` is also exported as a sub-component for composing menus manually:

```svelte
<Menu>
  <Menu.Item label="Cut" action={cut} />
  <Menu.Item label="Copy" action={copy} />
  <Menu.Item label="Paste" action={paste} />
</Menu>
```

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Example: Menu inside PopOver

```svelte
<Button onClick={togglePopOver} bind:ref={popBtn}>
  <PhDotsThreeVertical size={18} />
</Button>

{#if open}
  <PopOver attachTo={popBtn} onclose={() => open = false}>
    <Menu items={menuItems} />
  </PopOver>
{/if}
```
