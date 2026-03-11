# Dialog

A modal confirmation dialog with title, message(s), and confirm/cancel buttons.

---

## Import

```js
import { Dialog } from 'fabkit';
```

---

## Basic Usage

```svelte
<script>
  let show = $state(false);
</script>

<Button label="Delete" type="destructive" onClick={() => show = true} />

{#if show}
  <Dialog
    title="Confirm deletion"
    messages={["This action cannot be undone.", "Are you sure?"]}
    confirmText="Delete"
    confirmType="destructive"
    confirm={() => { deleteItem(); show = false; }}
    cancelText="Cancel"
    cancel={() => show = false}
  />
{/if}
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `""` | Dialog title |
| `messages` | `string[]` | `[]` | Array of message paragraphs shown in the body |
| `confirmText` | `string` | `"Confirm"` | Label for the confirm button |
| `confirmType` | `"suggested" \| "destructive" \| "button"` | `"suggested"` | Confirm button variant |
| `confirm` | `() => void` | — | Called on confirm |
| `cancelText` | `string` | `"Cancel"` | Label for the cancel button |
| `cancel` | `() => void` | — | Called on cancel |
| `ref` | `bindable` | — | DOM element reference |

---

## Notes

- Dialog renders as a modal overlay (full-screen backdrop).
- Use `{#if show}` to mount/unmount it — Dialog does not manage its own visibility.
- `messages` is an array — each string becomes a separate `<p>`.
