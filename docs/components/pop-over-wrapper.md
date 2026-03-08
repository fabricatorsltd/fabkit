# PopOverWrapper

A utility component for managing PopOver positioning and attachment.

---

## Import

```js
import { PopOverWrapper } from 'fabkit';
```

---

## Basic Usage

```svelte
<PopOverWrapper attachTo={buttonRef}>
  <PopOver>Popover content</PopOver>
</PopOverWrapper>
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `attachTo`| `HTMLElement` | —   | Element to attach the popover to |
| `children`| `Snippet` | —       | Popover content            |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Example

```svelte
<Button bind:ref={btnRef}>Open</Button>
<PopOverWrapper attachTo={btnRef}>
  <PopOver>Popover content</PopOver>
</PopOverWrapper>
```

