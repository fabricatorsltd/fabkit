# TagsInput

A multi-value input for entering tags or chips.

---

## Import

```js
import { TagsInput } from 'fabkit';
```

---

## Basic Usage

```svelte
<TagsInput bind:values={tags} placeholder="Add tag..." />
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `values`  | `string[]`| `[]`    | List of tags (**bindable**) |
| `placeholder` | `string` | `""` | Placeholder text           |
| `disabled`| `boolean` | `false` | Disables the input         |
| `flat`    | `boolean` | `false` | Removes the internal underline/bottom border |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Example

```svelte
<TagsInput bind:values={skills} placeholder="Add skill..." />
```

