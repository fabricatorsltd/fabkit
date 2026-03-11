# Image

A comprehensive image component supporting lazy loading, blur-up, placeholders, fallback, overlays, zoom on hover, and all HTML `<img>` attributes.

---

## Import

```js
import { Image } from 'fabkit';
```

---

## Basic Usage

```svelte
<Image src="/photo.jpg" alt="A photo" width={400} height={300} />
```

---

## Component Props

### Source & Accessibility

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | `""` | Image URL or data URI |
| `srcSet` | `string` | `""` | Responsive srcset attribute |
| `sizes` | `string` | `""` | Sizes attribute for responsive images |
| `alt` | `string` | `""` | Alt text (accessibility) |

### Sizing

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number \| string` | — | Container width |
| `height` | `number \| string` | — | Container height |
| `aspectRatio` | `string` | — | CSS aspect-ratio (e.g. `"16 / 9"`) |
| `square` | `boolean` | `false` | Forces `1 / 1` aspect ratio |
| `portrait` | `boolean` | `false` | Forces `3 / 4` aspect ratio |
| `landscape` | `boolean` | `false` | Forces `16 / 9` aspect ratio |

### Fit & Position

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fit` | `"cover" \| "contain" \| "fill" \| "none" \| "scale-down"` | `"cover"` | CSS object-fit |
| `position` | `string` | `"center"` | CSS object-position (e.g. `"top"`, `"50% 20%"`) |

### Loading

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `"lazy" \| "eager"` | `"lazy"` | Native lazy loading |
| `decoding` | `"async" \| "sync" \| "auto"` | `"async"` | Image decoding hint |
| `fetchPriority` | `"auto" \| "high" \| "low"` | `"auto"` | Fetch priority hint |
| `crossOrigin` | `"anonymous" \| "use-credentials"` | — | CORS attribute |
| `draggable` | `boolean` | `false` | Whether the image is draggable |

### Placeholder

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `""` | URL/data URI shown while main image loads (displayed blurred) |
| `placeholderColor` | `string` | `var(--background-elevated)` | Solid background color while loading (when no placeholder URL) |

### Fallback on Error

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fallback` | `string` | `""` | Image URL shown when main image fails to load |
| `fallbackColor` | `string` | `var(--background-elevated-2)` | Background color on error |

Fallback resolution order on error:

1. Show `fallback` URL if provided
2. Otherwise show `placeholder` URL if provided
3. Otherwise show `fallbackColor` background

### Blur-up Effect

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `blur` | `boolean` | `false` | Animates image from blurred to sharp on load |
| `blurAmount` | `number` | `12` | Initial blur (number = px, no units) |

### Zoom on Hover

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `zoomOnHover` | `boolean` | `false` | Scales image to 1.06 on container hover |

### Overlay

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `overlay` | `Snippet` | — | Snippet rendered absolutely on top of the image. Use it for tints, badges, captions |

### Snippets

| Prop | Type | Description |
|------|------|-------------|
| `overlay` | `Snippet` | Rendered on top (z-index 4) — full overlay |

### Events

| Prop | Type | Description |
|------|------|-------------|
| `onLoad` | `() => void` | Called when the image loads successfully |
| `onError` | `() => void` | Called when the image fails to load |
| `onClick` | `(e: Event) => void` | Click handler — adds `cursor: pointer` |

---

## Skeleton Pass-through Props

Image accepts all [Skeleton props](./skeleton.md). Notable defaults:

| Prop | Default |
|------|---------|
| `overflow` | `"hidden"` |
| `position` | `"relative"` |
| `bg` | `placeholderColor` while loading, `fallbackColor` on error |
| `borderRadius` | `[0,0,0,0]` |

---

## Examples

```svelte
<!-- Cover fit with aspect ratio -->
<Image
  src="/hero.jpg"
  alt="Hero"
  landscape
  width="100%"
  borderRadius={[12,12,12,12]}
/>

<!-- Circle avatar -->
<Image
  src="/avatar.jpg"
  alt="User"
  square
  width={80}
  borderRadius={[999,999,999,999]}
/>

<!-- Blur-up with placeholder color -->
<Image
  src="/large-photo.jpg"
  alt="Photo"
  blur
  blurAmount={20}
  placeholderColor="#d4e2ff"
  landscape
  width={600}
/>

<!-- With overlay snippet -->
<Image
  src="/cover.jpg"
  alt="Cover"
  landscape
  width={400}
  borderRadius={[8,8,8,8]}
>
  {#snippet overlay()}
    <div style="
      position: absolute; inset: 0;
      background: rgba(0,0,0,0.4);
      display: flex; align-items: flex-end;
      padding: 16px;
    ">
      <span style="color: #fff; font-weight: 700">Caption text</span>
    </div>
  {/snippet}
</Image>

<!-- Zoom on hover + shadow -->
<Image
  src="/card-photo.jpg"
  alt="Card"
  zoomOnHover
  width={240}
  height={160}
  borderRadius={[8,8,8,8]}
  shadow="0 4px 20px rgba(0,0,0,0.15)"
/>

<!-- Eager load, high priority (above the fold) -->
<Image
  src="/banner.jpg"
  alt="Banner"
  lazy={false}
  fetchPriority="high"
  width="100%"
  height={300}
/>

<!-- Responsive with srcSet -->
<Image
  src="/photo-800.jpg"
  srcSet="/photo-400.jpg 400w, /photo-800.jpg 800w, /photo-1600.jpg 1600w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px"
  alt="Responsive photo"
  landscape
  width="100%"
/>
```
