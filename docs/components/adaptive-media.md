# AdaptiveMedia

A responsive wrapper around [Image](./image.md) that can change aspect-ratio / cropping depending on the container width.

---

## Import

```js
import { AdaptiveMedia } from 'fabkit';
```

---

## Basic Usage

```svelte
<AdaptiveMedia
  src="/cover.jpg"
  alt="Cover"
  stackAt={640}
  wide={{ landscape: true, fit: 'cover' }}
  compact={{ square: true, fit: 'cover' }}
  width="100%"
/>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `"auto" \| "wide" \| "compact"` | `"auto"` | Force a layout mode (or let it adapt) |
| `stackAt` | `number` | `600` | Switch to `compact` below this container width (px) |
| `wide` | `Record<string, any>` | `{}` | Props applied to `Image` in wide mode |
| `compact` | `Record<string, any>` | `{}` | Props applied to `Image` in compact mode |
| `ref` | `bindable` | — | DOM element reference |

All remaining props are forwarded to [Image](./image.md).
