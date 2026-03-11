# PreferencesGroup

A container for grouping related preference or settings rows.

---

## Import

```js
import { PreferencesGroup } from 'fabkit';
```

---

## Basic Usage

```svelte
<PreferencesGroup>
  <ActionRow title="Enable feature">
    <Switcher bind:checked={enabled} />
  </ActionRow>
</PreferencesGroup>
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `children`| `Snippet` | —       | Grouped content            |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Example

```svelte
<PreferencesGroup>
  <ActionRow title="Dark mode">
    <Switcher bind:checked={darkMode} />
  </ActionRow>
</PreferencesGroup>
```

