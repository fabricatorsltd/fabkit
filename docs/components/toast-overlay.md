# ToastOverlay

An overlay container that displays a stack of toasts over its content.

This is a common GTK/libadwaita pattern for responsive apps (no layout media queries required).

---

## Import

```js
import { ToastOverlay } from 'fabkit';
```

---

## Basic Usage

```svelte
<script>
  import { ToastOverlay, Button } from 'fabkit';

  let overlay;

  function showToast() {
    overlay?.addToast({
      variant: 'info',
      title: 'Download finished',
      subtitle: 'File saved to your Downloads folder.',
      actionLabel: 'Open',
      onAction: () => console.log('open'),
      timeout: 5000,
    });
  }
</script>

<ToastOverlay bind:this={overlay}>
  <Button label="Show toast" onClick={showToast} />
</ToastOverlay>
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `toasts` | `Array<{ id?: string, title?: string, subtitle?: string, variant?: string, actionLabel?: string, onAction?: Function, dismissible?: boolean, timeout?: number, icon?: Component }>` | — | Controlled list of toasts (disables `addToast`) |
| `limit` | `number` | `3` | Max visible toasts |
| `timeout` | `number` | `4000` | Default auto-dismiss timeout (ms). `<= 0` disables auto-dismiss |
| `placement` | `'top' \| 'bottom'` | `'bottom'` | Where the toast stack is anchored |
| `width` | `number` | `420` | Max width (px) for the toast stack |
| `gap` | `number` | `10` | Vertical gap (px) between toasts |
| `offset` | `number` | `16` | Distance (px) from the top/bottom edge |
| `children` | `Snippet` | — | Content behind the overlay |
| `ref` | `bindable` | — | DOM element reference |

---

## Component Methods

Available when using `bind:this`:

- `addToast(toast)`
- `dismissToast(id)`
- `clearToasts()`
