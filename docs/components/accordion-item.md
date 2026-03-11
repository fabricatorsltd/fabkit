# AccordionItem

A single panel within an Accordion, used to display expandable/collapsible content.

---

## Import

```js
import { AccordionItem } from 'fabkit';
```

---

## Basic Usage

```svelte
<AccordionItem title="Section Title">
  <p>Panel content goes here.</p>
</AccordionItem>
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `title`   | `string`  | `""`   | Panel header text          |
| `open`    | `boolean` | `false` | Whether the panel is open (**bindable**) |
| `children`| `Snippet` | —       | Panel content              |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Example

```svelte
<AccordionItem title="FAQ">Answer to the question.</AccordionItem>
```

