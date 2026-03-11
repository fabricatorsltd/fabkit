# Leaflet

An adaptive two-pane container (GTK/libadwaita-style).

When wide, it shows a sidebar + content side-by-side.

When narrow, it collapses into a stacked navigation flow (sidebar → content), without media queries.

---

## Import

```js
import { Leaflet } from 'fabkit';
```

---

## Basic Usage

```svelte
<script>
  let revealContent = $state(false);

  function openDetail() {
    revealContent = true;
  }

  function goBack() {
    revealContent = false;
  }
</script>

<Leaflet bind:revealContent stackAt={900} sidebarWidth={320}>
  {#snippet sidebar()}
    <Menu>
      <Menu.Item label="Item A" action={openDetail} />
      <Menu.Item label="Item B" action={openDetail} />
    </Menu>
  {/snippet}

  {#snippet content()}
    <ActionRow title="Detail" onClick={goBack} />
    <div style="padding: 12px;">Detail content…</div>
  {/snippet}
</Leaflet>
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sidebar` | `Snippet` | — | Sidebar pane content |
| `content` | `Snippet` | — | Content pane content |
| `mode` | `"auto" \| "split" \| "stacked"` | `"auto"` | Layout behavior |
| `stackAt` | `number` | `900` | Switch to stacked mode under this width (px) |
| `sidebarWidth` | `number \| string` | `320` | Sidebar width in split mode |
| `revealContent` | `boolean` | `false` | In stacked mode, controls whether the content pane is revealed |
| `keepMounted` | `boolean` | `true` | Keep both panes mounted in stacked mode (preserves state) |
| `class` | `string` | `""` | Additional CSS classes |
| `ref` | `bindable` | — | DOM element reference |

---

## Notes

- Uses `ResizeObserver` on the Leaflet root element.
- In stacked mode, the content pane slides in from the right when `revealContent={true}`.
