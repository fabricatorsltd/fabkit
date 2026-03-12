# AdaptiveLayout

A container-driven breakpoint system (GTK/libadwaita-style), without CSS media queries.

It observes its own size via `ResizeObserver` and computes an `activeBreakpoint` based on nested `Breakpoint` rules.

---

## Import

```js
import { AdaptiveLayout, Breakpoint } from 'fabkit';
```

---

## Basic Usage

```svelte
<script>
  let activeBreakpoint;
</script>

<AdaptiveLayout bind:activeBreakpoint>
  <Breakpoint name="narrow" maxWidth={599} priority={10}>
    <div style="padding: 12px;">Narrow layout</div>
  </Breakpoint>

  <Breakpoint name="wide" minWidth={600} priority={10}>
    <div style="padding: 12px;">Wide layout</div>
  </Breakpoint>

  <Breakpoint name="fallback" fallback>
    <div style="padding: 12px;">Fallback</div>
  </Breakpoint>
</AdaptiveLayout>
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activeBreakpoint` | `string \| undefined` | `undefined` | Current resolved breakpoint name (bindable) |
| `width` | `number \| undefined` | `undefined` | Current container width (bindable) |
| `height` | `number \| undefined` | `undefined` | Current container height (bindable) |
| `class` | `string` | `""` | Additional CSS classes |
| `ref` | `bindable` | — | DOM element reference |

---

## Notes

- SSR-safe: no `window` access during initialization.
- Uses `ResizeObserver` on the container.
