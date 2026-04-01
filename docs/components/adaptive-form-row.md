# AdaptiveFormRow

A labeled form row for use inside `AdaptiveFormLayout`. Pairs a label with a field and an optional help text below.

---

## Import

```js
import { AdaptiveFormRow, AdaptiveFormLayout } from 'fabkit';
```

---

## Basic Usage

```svelte
<AdaptiveFormLayout>
  <AdaptiveFormRow label="Full name">
    <TextField placeholder="Alice Rossi" />
  </AdaptiveFormRow>
  <AdaptiveFormRow label="Email" help="We'll never share your email.">
    <TextField type="email" placeholder="alice@example.com" />
  </AdaptiveFormRow>
</AdaptiveFormLayout>
```

---

## Component Props

| Prop       | Type      | Default | Description                                   |
|------------|-----------|---------|-----------------------------------------------|
| `label`    | `string`  | `""`    | Label text shown to the left of the field     |
| `help`     | `string`  | `""`    | Optional hint text shown below the field      |
| `children` | `Snippet` | —       | The form field or any content                 |

---

## Notes

- Designed to be used as a direct child of `AdaptiveFormLayout`.
- In wide layouts the label appears to the left; in narrow layouts it stacks above.
- See [AdaptiveFormLayout](./adaptive-form-layout.md) for layout-level props.
