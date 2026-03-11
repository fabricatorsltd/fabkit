# BaseField

The internal primitive used by `TextField` and `SelectField`. Use it when building custom input components.

---

## Import

```js
import { BaseField } from 'fabkit';
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `""` | Current value — **bindable** |
| `label` | `string` | `""` | Floating label |
| `placeholder` | `string` | `""` | Placeholder text |
| `type` | `string` | `"text"` | Input type |
| `icon` | `SvelteComponent` | `""` | Phosphor icon component |
| `iconPosition` | `"left" \| "right"` | `"right"` | Icon placement |
| `readOnly` | `boolean` | `false` | Read-only mode |
| `flat` | `boolean` | `false` | Removes the underline (and keeps focus from re-adding it) |
| `contained` | `boolean` | `false` | Compact variant without floating label animation |
| `ref` | `bindable` | — | DOM element reference |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Notes

- `TextField` and `SelectField` are thin wrappers around BaseField.
- Use `BaseField` directly when you need a custom input type or non-standard rendering inside the field shell.
- `contained` disables the animated float effect — the label stays in place.
