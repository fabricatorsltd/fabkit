# Accordion

A vertically stacked set of expandable/collapsible panels.

---

## Import

```js
import { Accordion, AccordionItem } from 'fabkit';
```

---

## Basic Usage

```svelte
<Accordion>
  <AccordionItem title="Section 1">
    <p>Content for section 1</p>
  </AccordionItem>
  <AccordionItem title="Section 2">
    <p>Content for section 2</p>
  </AccordionItem>
</Accordion>
```

---

## Component Props (Accordion)

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `children`| `Snippet` | —       | Accordion items            |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Component Props (AccordionItem)

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
<Accordion>
  <AccordionItem title="FAQ 1">Answer 1</AccordionItem>
  <AccordionItem title="FAQ 2">Answer 2</AccordionItem>
</Accordion>
```

