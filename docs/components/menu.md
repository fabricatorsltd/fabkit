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
  import { Bug, Bell, Axe } from 'fabkit/icons';

  const items = [
    { label: 'New File', action: () => newFile() },
    { label: 'Open…', action: () => open() },
    { label: 'Save', action: () => save() },
  ];

  const itemsWithIcons = [
    { label: 'Report a Bug', icon: Bug, action: () => reportBug() },
    { label: 'Notifications', icon: Bell, action: () => openNotifications() },
    { label: 'Changelog', icon: Axe, action: () => openChangelog() },
  ];
</script>

<Menu items={items} />

<Menu items={itemsWithIcons} />
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
| `icon` | `SvelteComponent` | Icon component to display |

### Menu.Item (standalone usage)

`Menu.Item` is also exported as a sub-component for composing menus manually:

```svelte
<script>
  import { Bug, Bell, Axe } from 'fabkit/icons';
</script>

<Menu>
  <Menu.Item label="Cut" action={cut} />
  <Menu.Item label="Copy" action={copy} />
  <Menu.Item label="Paste" action={paste} />
</Menu>

<Menu>
  <Menu.Item icon={Bug} label="Report a Bug" action={reportBug} />
  <Menu.Item icon={Bell} label="Notifications" action={openNotifications} />
  <Menu.Item icon={Axe} label="Changelog" action={openChangelog} />
</Menu>
```

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Example: Menu inside PopOver

```svelte
<script>
  import { PhDotsThreeVertical } from 'fabkit/icons';
</script>

<Button onclick={togglePopOver} bind:ref={popBtn}>
  <PhDotsThreeVertical size={18} />
</Button>

{#if open}
  <PopOver attachTo={popBtn} onclose={() => open = false}>
    <Menu items={menuItems} />
  </PopOver>
{/if}
```
