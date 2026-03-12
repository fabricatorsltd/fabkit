# PopOver

A floating panel anchored to a reference element. Positions itself automatically to stay within the viewport.

---

## Import

```js
import { PopOver } from 'fabkit';
```

---

## Basic Usage

```svelte
<script>
  let open = $state(false);
  let btnRef = $state();
</script>

<Button onClick={() => open = true} bind:ref={btnRef}>
  <PhDotsThreeVertical size={18} />
</Button>

{#if open}
  <PopOver attachTo={btnRef} onClose={() => open = false}>
    <Menu items={menuItems} />
  </PopOver>
{/if}
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `attachTo` | `HTMLElement` | — | **Required.** The anchor element the PopOver positions itself relative to |
| `onClose` | `() => void` | — | Called when a click outside the PopOver occurs |
| `align` | `"start" \| "end" \| "center"` | `"start"` | Horizontal alignment relative to the anchor |
| `offset` | `[number, number]` | `[0, 5]` | `[x, y]` offset in px from the anchor |
| `initialStyle` | `string` | `""` | Inline styles applied before auto-positioning kicks in |
| `bg` | `ColorValue` | `"var(--background-base)"` | Background color for the popover panel |
| `color` | `ColorValue` | — | Text/icon color for the popover content |
| `children` | `Snippet` | — | PopOver content |
| `class` | `string` | `""` | Additional CSS classes |
| `ref` | `bindable` | — | DOM element reference |

---

## Notes

- PopOver uses a click-outside listener to call `onClose`. You control the visibility via `{#if open}`.
- Auto-positioning ensures the popover does not clip outside the viewport — it flips sides if needed.
- The element is rendered in-flow (not teleported) — be aware of stacking context.

---

## PopOverWrapper

`PopOverWrapper` is a convenience wrapper that manages the open/close state internally:

```svelte
import { PopOverWrapper } from 'fabkit';

<PopOverWrapper>
  {#snippet trigger()}
    <Button>Open</Button>
  {/snippet}
  {#snippet content()}
    <Menu items={menuItems} />
  {/snippet}
</PopOverWrapper>
```
