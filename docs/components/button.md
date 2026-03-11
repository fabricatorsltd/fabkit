# Button

A clickable action button with built-in visual variants.

---

## Import

```js
import { Button } from 'fabkit';
```

---

## Basic Usage

```svelte
<Button label="Save" onClick={() => save()} />

<Button type="suggested" onClick={confirm}>
  <PhCheck size={16} />
  <span class="Button-label">Confirm</span>
</Button>

<Button type="destructive" onClick={deleteItem}>
  <PhTrash size={16} />
  <span class="Button-label">Delete</span>
</Button>
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `""` | Text label. Ignored when `children` is provided |
| `icon` | `string` | `""` | Legacy string icon — prefer using `children` with a Phosphor component |
| `children` | `Snippet` | — | Slot content — renders instead of `label`/`icon` |
| `disabled` | `boolean` | `false` | Disables the button, reduces opacity |
| `type` | `"button" \| "suggested" \| "destructive" \| "flat"` | `"button"` | Visual variant |
| `square` | `boolean` | `false` | Equal padding on all sides (icon-only buttons) |
| `onClick` | `(e: Event) => void` | — | Click handler |
| `class` | `string` | `""` | Additional CSS classes |
| `ref` | `bindable` | — | DOM element reference |

### Button type variants

| Type | Background | Use for |
|------|-----------|---------|
| `"button"` (default) | `--background-top` | General actions |
| `"suggested"` | `--action-suggested` (brand primary) | Primary / confirm actions |
| `"destructive"` | `--action-destructive` | Delete / irreversible actions |
| `"flat"` | transparent | Toolbar / low-emphasis actions |

---

## Skeleton Pass-through Props

Button accepts all [Skeleton props](./skeleton.md). The defaults listed below are what Button sets — pass different values to override.

| Prop | Button default |
|------|----------------|
| `bg` | type-dependent (see above) |
| `bgHover` | type-dependent (lighter/darker) |
| `bgFocus` | type-dependent |
| `padding` | `[10,15,10,15]`, or `[10,10,10,10]` when `square` or icon-only |
| `borderWidth` | `[0,0,0,0]` |
| `borderColor` | `transparent` |
| `shadow` | `none` |
| `margin` | `[0,0,0,0]` |
| `borderRadius` | inherited from `--snt-border-radius` |

All Skeleton color, border, shadow, and transform props work on Button.

---

## Examples

```svelte
<!-- Icon-only square button -->
<Button square onClick={close}>
  <PhX size={18} />
</Button>

<!-- Custom colors -->
<Button
  label="Custom"
  bg="#ff6b6b"
  bgHover="#e85555"
  color="#fff"
  borderRadius={[4,4,4,4]}
/>

<!-- Disabled -->
<Button label="Saving…" disabled />
```
