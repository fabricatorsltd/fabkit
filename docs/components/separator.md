# Separator

A horizontal or vertical dividing line, optionally with a text label.

---

## Import

```js
import { Separator } from 'fabkit';
```

---

## Basic Usage

```svelte
<!-- Horizontal (default) -->
<Separator />

<!-- With label -->
<Separator label="or" />

<!-- Vertical -->
<Separator orientation="vertical" />
```

---

## Component Props

| Prop          | Type                          | Default          | Description                            |
|---------------|-------------------------------|------------------|----------------------------------------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"`   | Direction of the separator line        |
| `label`       | `string`                      | `""`             | Optional text shown in the middle      |
| `color`       | `string`                      | `var(--border-primary)` | Line color                      |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Examples

```svelte
<VBox spacing={16}>
  <Text>Section A</Text>
  <Separator />
  <Text>Section B</Text>
</VBox>

<!-- Labeled separator -->
<Separator label="Continue with" my={12} />

<!-- Vertical separator in a horizontal layout -->
<HBox>
  <Button label="Save" />
  <Separator orientation="vertical" mx={8} />
  <Button label="Cancel" type="flat" />
</HBox>
```
