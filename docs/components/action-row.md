# ActionRow

A row for actions/settings, often used in preferences or settings pages.

---

## Import

```js
import { ActionRow } from 'fabkit';
```

---

## Basic Usage

```svelte
<ActionRow title="Enable notifications">
  <Switcher bind:checked={enabled} />
</ActionRow>
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `title`   | `string`  | `""`   | Row title                  |
| `icon`    | `SvelteComponent` | — | Optional icon              |
| `children`| `Snippet` | —       | Row content (e.g. a Switcher) |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Example

```svelte
<ActionRow title="Dark mode" icon={PhMoon}>
  <Switcher bind:checked={darkMode} />
</ActionRow>
```

