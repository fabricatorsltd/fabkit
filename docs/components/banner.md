# Banner

An inline announcement bar for contextual messages.

Use it for in-app notifications that should live inside the layout (as opposed to overlays).

---

## Import

```js
import { Banner } from 'fabkit';
```

---

## Basic Usage

```svelte
<Banner
  variant="info"
  title="New version available"
  subtitle="Restart the app to finish installing updates."
  actionLabel="Restart"
  onAction={() => doRestart()}
  dismissible
  onDismiss={() => (showBanner = false)}
/>
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `''` | Primary text |
| `subtitle` | `string` | `''` | Secondary text |
| `variant` | `'neutral' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Visual intent |
| `revealed` | `boolean` | `true` | When `false`, the banner is not rendered |
| `actionLabel` | `string` | `''` | Optional action button label |
| `onAction` | `(event: MouseEvent) => void` | — | Called when action button is pressed |
| `dismissible` | `boolean` | `false` | Show a dismiss button |
| `onDismiss` | `(event: MouseEvent) => void` | — | Called when dismiss button is pressed |
| `icon` | `Component` | — | Optional leading icon component |
| `children` | `Snippet` | — | Custom content (replaces `title`/`subtitle`) |
| `ref` | `bindable` | — | DOM element reference |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).
