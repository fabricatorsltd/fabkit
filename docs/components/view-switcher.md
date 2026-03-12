# ViewSwitcher

An adaptive view switcher for a [`ViewStack`](./view-stack.md).

It automatically switches between a tab bar, segmented buttons, and a dropdown based on the available width (container-driven, no media queries).

---

## Import

```js
import { ViewSwitcher } from 'fabkit';
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
| `views` | `Array<{ id: string, title: string, disabled?: boolean, icon?: Component }>` | `[]` | View definitions (labels + metadata) |
| `activeId` | `string` | `''` | Active view id — **bindable** |
| `mode` | `'auto' \| 'tabs' \| 'segmented' \| 'dropdown'` | `'auto'` | Switcher presentation mode |
| `tabsMinWidth` | `number` | `520` | Auto-mode threshold for tabs |
| `segmentedMinWidth` | `number` | `360` | Auto-mode threshold for segmented |
| `dropdownLabel` | `string` | `''` | Optional label for dropdown mode |
| `showIcons` | `boolean` | `false` | Render `icon` in tabs/segmented modes |
| `ref` | `bindable` | — | DOM element reference |

---

## Notes

- In `mode="auto"`, the switcher measures its own width and adapts.
- If `activeId` is empty or not found in `views`, it falls back to the first view.
