# Dialog

A generic modal dialog container for custom content. Use it for forms, complex layouts, and custom action footers.

---

## Import

```js
import { Dialog } from 'fabkit';
```

---

## Basic Usage

```svelte
<script>
  import { Dialog, Button } from 'fabkit';

  let open = $state(false);
</script>

<Button label="Open dialog" onClick={() => open = true} />

{#if open}
  <Dialog
    title="Profile"
    onClose={() => open = false}
  >
    <p>Edit profile settings here.</p>
  </Dialog>
{/if}
```

---

## Custom Footer Actions

```svelte
<script>
  import { Dialog, Button, HBox } from 'fabkit';

  let open = $state(false);
</script>

{#snippet Footer()}
  <HBox justify="end" spacing={10}>
    <Button label="Cancel" onClick={() => open = false} />
    <Button label="Save" type="suggested" onClick={() => { save(); open = false; }} />
  </HBox>
{/snippet}

{#if open}
  <Dialog
    title="Edit"
    onClose={() => open = false}
    footer={Footer}
  >
    <p>Custom body content (form, layout, etc.).</p>
  </Dialog>
{/if}
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `""` | Optional title shown above the body |
| `onClose` | `() => void` | — | Called when the dialog requests to close (backdrop / Escape) |
| `closeOnBackdrop` | `boolean` | `true` | Closes when clicking on the backdrop |
| `closeOnEscape` | `boolean` | `true` | Closes when pressing Escape |
| `footer` | `Snippet` | — | Optional footer snippet (custom actions) |
| `children` | `Snippet` | — | Dialog content |
| `ref` | `bindable` | — | DOM element reference |

---

## Notes

- Control visibility with `{#if open}` — Dialog does not manage its own open state.
- For confirmation/alert flows, use `ConfirmDialog` instead.
