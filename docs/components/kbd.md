# Kbd

Displays keyboard shortcuts with styled key badges.

---

## Import

```js
import { Kbd } from 'fabkit';
```

---

## Basic Usage

```svelte
<!-- Via keys array (recommended) -->
<Kbd keys={['Ctrl', 'S']} />

<!-- Via children snippet -->
<Kbd>
  <kbd>⌘</kbd><span>+</span><kbd>K</kbd>
</Kbd>
```

---

## Component Props

| Prop       | Type       | Default | Description                                           |
|------------|------------|---------|-------------------------------------------------------|
| `keys`     | `string[]` | `[]`    | Key labels rendered as `<kbd>` elements separated by `+` |
| `children` | `Snippet`  | —       | Custom content (used when `keys` is empty)            |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Examples

```svelte
<!-- Single key -->
<Kbd keys={['Esc']} />

<!-- Multi-key shortcut -->
<Kbd keys={['Ctrl', 'Shift', 'P']} />

<!-- Mac style -->
<Kbd keys={['⌘', 'K']} />

<!-- Inline in text -->
<Text>Press <Kbd keys={['Ctrl', 'Z']} /> to undo.</Text>
```
