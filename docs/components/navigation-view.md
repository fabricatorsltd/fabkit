# NavigationView

A simple navigation stack container.

Pages are direct children; the visible page is the last entry in the `stack` array.

---

## Import

```js
import { NavigationView } from 'fabkit';
```

---

## Basic Usage

```svelte
<script>
  let stack = $state([0]);
</script>

<NavigationView bind:stack={stack}>
  <div>
    <Button label="Open details" onClick={() => (stack = [...stack, 1])} />
  </div>

  <div>
    <Button label="Back" onClick={() => (stack = stack.slice(0, -1))} />
    <div>Detail page</div>
  </div>
</NavigationView>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `context` | `string` | — | Optional EventBus context (`{context}-push` / `{context}-pop`) |
| `stack` | `number[]` | `[0]` | Bindable navigation stack of page indices |

Accepts all [Skeleton props](./skeleton.md).
