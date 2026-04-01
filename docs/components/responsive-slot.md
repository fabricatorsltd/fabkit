# ResponsiveSlot

Alias for [`AdaptiveContent`](./adaptive-content.md). Renders one of two content snippets depending on the current breakpoint/density.

---

## Import

```js
import { ResponsiveSlot } from 'fabkit';
```

---

## Basic Usage

```svelte
<ResponsiveSlot>
  {#snippet compact()}
    <Text>Compact view</Text>
  {/snippet}
  {#snippet regular()}
    <Text>Full view</Text>
  {/snippet}
</ResponsiveSlot>
```

---

## Component Props

Accepts all [AdaptiveContent props](./adaptive-content.md).

---

## Notes

`ResponsiveSlot` is a direct alias for `AdaptiveContent`. Prefer `AdaptiveContent` in new code for clarity.
