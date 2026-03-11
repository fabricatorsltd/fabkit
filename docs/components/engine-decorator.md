# EngineDecorator

A utility component for providing engine context to its children.

---

## Import

```js
import { EngineDecorator } from 'fabkit';
```

---

## Basic Usage

```svelte
<EngineDecorator engine={engine}>
  <YourComponent />
</EngineDecorator>
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `engine`  | `object`  | —       | The engine context object  |
| `children`| `Snippet` | —       | Children to provide context to |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Example

```svelte
<EngineDecorator engine={myEngine}>
  <Card>Engine-powered content</Card>
</EngineDecorator>
```

