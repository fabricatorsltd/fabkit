# ToolbarView

A GTK-style layout container that manages a top bar, a scrollable content area, and an optional bottom bar.

It supports an adaptive header layout driven by container size (no CSS media queries).

---

## Import

```js
import { ToolbarView } from 'fabkit';
```

---

## Basic Usage

```svelte
<script>
  import { ToolbarView, HBox, Button } from 'fabkit';
</script>

<ToolbarView title="Settings" subtitle="Manage your preferences">
  {#snippet start()}
    <HBox spacing={6}>
      <Button label="Back" />
    </HBox>
  {/snippet}

  {#snippet end()}
    <HBox spacing={6}>
      <Button label="Save" />
    </HBox>
  {/snippet}

  {#snippet content()}
    <div style="padding: 16px">
      <p>Content</p>
    </div>
  {/snippet}
</ToolbarView>
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `top` | `Snippet` | — | Fully custom top bar (replaces `title`/`start`/`end`) |
| `bottom` | `Snippet` | — | Optional bottom bar |
| `content` | `Snippet` | — | Scrollable content |
| `title` | `string` | `''` | Title text (default header) |
| `subtitle` | `string` | `''` | Subtitle text (default header) |
| `start` | `Snippet` | — | Start area (default header) |
| `end` | `Snippet` | — | End area (default header) |
| `center` | `Snippet` | — | Center area override (default header) |
| `mode` | `'auto' \| 'wide' \| 'compact'` | `'auto'` | Header layout mode |
| `compactMinWidth` | `number` | `520` | Auto-mode threshold (px) |
| `ref` | `bindable` | — | DOM element reference |

---

## Notes

- In `mode="auto"`, the header switches to a compact layout under `compactMinWidth`.
- The `content` area is scrollable; the top and bottom bars are sticky.
