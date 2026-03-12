# NavigationSplitView

An adaptive split view (sidebar + content) that collapses into a stacked navigation flow on narrow widths.

This is a named primitive aligned with libadwaita’s `NavigationSplitView`.

---

## Import

```js
import { NavigationSplitView } from 'fabkit';
```

---

## Basic Usage

```svelte
<NavigationSplitView bind:revealContent stackAt={900} sidebarWidth={320}>
  {#snippet sidebar()}
    <Menu>
      <Menu.Item label="Item A" action={() => (revealContent = true)} />
      <Menu.Item label="Item B" action={() => (revealContent = true)} />
    </Menu>
  {/snippet}

  {#snippet content()}
    <ActionRow title="Back" activatable onClick={() => (revealContent = false)} />
    <div style="padding: 12px;">Detail…</div>
  {/snippet}
</NavigationSplitView>
```

---

## Props

Same props as [Leaflet](./leaflet.md).
