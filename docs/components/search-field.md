# SearchField

A search input with optional icon and clear button.

---

## Import

```js
import { SearchField } from 'fabkit';
```

---

## Basic Usage

```svelte
<SearchField bind:value={query} placeholder="Search..." />
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `value`   | `string`  | `""`   | Search query (**bindable**) |
| `placeholder` | `string` | `""` | Placeholder text           |
| `icon`    | `SvelteComponent` | — | Optional icon component    |
| `clearable` | `boolean` | `true` | Show clear (reset) button  |
| `disabled`| `boolean` | `false` | Disables the input         |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Example

```svelte
<SearchField placeholder="Find users..." bind:value={search} />
```

