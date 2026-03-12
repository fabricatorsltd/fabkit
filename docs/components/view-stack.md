# ViewStack

A GTK-style view container that shows one view at a time.

Designed to work with [`ViewSwitcher`](./view-switcher.md) for responsive view switching without media queries.

---

## Import

```js
import { ViewStack } from 'fabkit';
```

---

## Basic Usage

```svelte
<script>
  import { ViewStack, ViewSwitcher } from 'fabkit';
  import HomeView from './HomeView.svelte';
  import SettingsView from './SettingsView.svelte';

  let activeId = $state('home');

  const views = [
    { id: 'home', title: 'Home', component: HomeView },
    { id: 'settings', title: 'Settings', component: SettingsView },
  ];
</script>

<ViewSwitcher {views} bind:activeId />
<ViewStack {views} bind:activeId />
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `views` | `Array<{ id: string, title: string, component: Component, props?: Record<string, any>, disabled?: boolean, icon?: Component }>` | `[]` | View definitions |
| `activeId` | `string` | `''` | Active view id — **bindable** |
| `keepMounted` | `boolean` | `true` | Keep inactive views mounted (preserves state) |
| `children` | `Snippet` | — | Fallback content when `views` is empty |
| `ref` | `bindable` | — | DOM element reference |

---

## Notes

- If `activeId` is empty or not found in `views`, it falls back to the first view.
