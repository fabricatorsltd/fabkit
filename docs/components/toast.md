# Toast

A transient notification.

`Toast` is usually rendered by [`ToastOverlay`](./toast-overlay.md).

---

## Import

```js
import { Toast } from 'fabkit';
```

---

## Basic Usage

```svelte
<Toast
  variant="info"
  title="Saved"
  subtitle="Your changes were stored successfully."
  actionLabel="Undo"
  onAction={() => undo()}
  onDismiss={() => (show = false)}
/>
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `''` | Primary text |
| `subtitle` | `string` | `''` | Secondary text |
| `variant` | `'neutral' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'neutral'` | Visual intent |
| `actionLabel` | `string` | `''` | Optional action button label |
| `onAction` | `(event: MouseEvent) => void` | — | Called when action button is pressed |
| `dismissible` | `boolean` | `true` | Show a dismiss button |
| `onDismiss` | `(event: MouseEvent) => void` | — | Called when dismiss button is pressed |
| `icon` | `Component` | — | Optional leading icon component |
| `children` | `Snippet` | — | Custom content (replaces `title`/`subtitle`) |
| `ref` | `bindable` | — | DOM element reference |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).
