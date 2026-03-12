# Flap

A container-friendly sidebar drawer.

Use it to keep a classic split layout on wide containers, and move the sidebar into an overlay drawer when space is limited.

---

## Import

```js
import { Flap } from 'fabkit';
```

---

## Basic usage

```svelte
<script>
  import { Flap, Button } from 'fabkit';

  let open = $state(false);
</script>

<Button label="Toggle sidebar" onclick={() => (open = !open)} />

<Flap bind:open {open} width={320}>
  {#snippet sidebar()}
    <div style="padding: 16px;">Sidebar</div>
  {/snippet}

  {#snippet content()}
    <div style="padding: 16px;">Content</div>
  {/snippet}
</Flap>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Whether the drawer is open (bindable) |
| `width` | `number \| string` | `320` | Drawer width |
| `placement` | `'left' \| 'right'` | `'left'` | Which side the drawer slides from |
| `closeOnEscape` | `boolean` | `true` | Close when pressing Escape |
| `closeOnBackdrop` | `boolean` | `true` | Close when clicking the backdrop |
| `keepMounted` | `boolean` | `true` | Keep overlay mounted and only toggle pointer-events/transform |
| `zIndex` | `number` | `1000` | Overlay z-index |
| `sidebar` | `Snippet` | — | Drawer content |
| `content` | `Snippet` | — | Main content behind the drawer |

---

## Notes

- `Flap` does not decide when to open: pair it with `AdaptiveLayout`/`Breakpoint` (or your own logic) to trigger `open`.
- Designed to be container-driven (not viewport-driven).
