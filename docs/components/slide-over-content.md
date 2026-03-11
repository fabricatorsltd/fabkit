# SlideOverContent

A content container for use inside SlideOver.

---

## Import

```js
import { SlideOverContent } from 'fabkit';
```

---

## Basic Usage

```svelte
<SlideOver open={open}>
  <SlideOverContent>
    <Text>Panel content</Text>
  </SlideOverContent>
</SlideOver>
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `children`| `Snippet` | —       | Content                    |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Example

```svelte
<SlideOverContent>
  <Text>Details here</Text>
</SlideOverContent>
```

