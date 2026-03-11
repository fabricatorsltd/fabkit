# TitleBar

The application title bar. Renders a bar with window controls and a configurable content area.

---

## Import

```js
import { TitleBar } from 'fabkit';
```

---

## Basic Usage

```svelte
<TitleBar>
  {#snippet area()}
    <span>My App</span>
  {/snippet}
</TitleBar>
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `area` | `Snippet` | — | Custom content rendered in the title bar area (title text, tabs, toolbar, etc.) |
| `onScrollTop` | `() => void` | — | Called when scrolling direction changes to up (closest `Window` content scroll, otherwise `window`) |
| `onScrollBottom` | `() => void` | — | Called when scrolling direction changes to down (closest `Window` content scroll, otherwise `window`) |
| `ref` | `bindable` | — | DOM element reference |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md). Defaults:

| Prop | Default |
|------|---------|
| `bg` | `transparent` |
| `margin` | `[0,0,0,0]` |
| `borderWidth` | `[0,0,0,0]` |
| `shadow` | `none` |

---

## Example

```svelte
<!-- TitleBar with centered app name and toolbar buttons -->
<TitleBar bg="var(--background-elevated)">
  {#snippet area()}
    <HBox spacing={8} justify="space-between" align="center" flex="1">
      <span style="font-weight: 600">My Application</span>
      <HBox spacing={4}>
        <Button square onclick={openSettings}>
          <PhGear size={16} />
        </Button>
      </HBox>
    </HBox>
  {/snippet}
</TitleBar>
```
