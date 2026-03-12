# AdaptiveContent (ResponsiveSlot)

Render different content variants based on the current container breakpoint.

It is driven by `AdaptiveLayout` (via context). You can also pass `activeBreakpoint` directly.

---

## Import

```js
import { AdaptiveContent, ResponsiveSlot } from 'fabkit';
```

---

## Basic Usage (with AdaptiveLayout)

```svelte
<AdaptiveLayout>
  <Breakpoint name="compact" maxWidth={640} />
  <Breakpoint name="regular" minWidth={641} fallback />

  <AdaptiveContent>
    {#snippet compact()}
      <Button icon={PhTrash} aria-label="Delete" />
    {/snippet}

    {#snippet regular()}
      <Button icon={PhTrash} label="Delete" />
    {/snippet}

    {#snippet fallback()}
      <Button icon={PhTrash} label="Delete" />
    {/snippet}
  </AdaptiveContent>
</AdaptiveLayout>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activeBreakpoint` | `string` | — | Override breakpoint manually (skips context) |
| `fallback` | `Snippet` | — | Rendered when no matching snippet exists |
| `children` | `Snippet` | — | Rendered when no `fallback` is provided |

Any other snippet prop name is treated as a breakpoint variant.

---

## ResponsiveSlot

`ResponsiveSlot` is an alias of `AdaptiveContent`.
