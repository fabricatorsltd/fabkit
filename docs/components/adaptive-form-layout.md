# AdaptiveFormLayout

A container-driven form layout helper that switches between:

- wide: label-inline / multi-column
- compact: label-top / single-column

---

## Import

```js
import { AdaptiveFormLayout, AdaptiveFormRow } from 'fabkit';
```

---

## Basic Usage

```svelte
<AdaptiveFormLayout stackAt={640} labelWidth={200}>
  <AdaptiveFormRow label="Username">
    <TextField bind:value={username} flat />
  </AdaptiveFormRow>

  <AdaptiveFormRow label="Email" help="We’ll never share your email.">
    <TextField bind:value={email} type="email" flat />
  </AdaptiveFormRow>
</AdaptiveFormLayout>
```

---

## AdaptiveFormLayout Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `stackAt` | `number` | `600` | Switch to compact layout below this container width (px) |
| `labelWidth` | `number \| string` | `180` | Label column width in wide mode |
| `ref` | `bindable` | — | DOM element reference |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).
