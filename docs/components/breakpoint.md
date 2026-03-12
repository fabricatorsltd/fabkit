# Breakpoint

A rule used inside `AdaptiveLayout` to define when its content should be active.

---

## Import

```js
import { Breakpoint } from 'fabkit';
```

---

## Usage

```svelte
<AdaptiveLayout>
  <Breakpoint name="compact" maxWidth={640}>
    <div>Compact</div>
  </Breakpoint>

  <Breakpoint name="regular" minWidth={641}>
    <div>Regular</div>
  </Breakpoint>
</AdaptiveLayout>
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | Breakpoint identifier |
| `minWidth` | `number` | — | Match when width is at least this value |
| `maxWidth` | `number` | — | Match when width is at most this value |
| `minHeight` | `number` | — | Match when height is at least this value |
| `maxHeight` | `number` | — | Match when height is at most this value |
| `priority` | `number` | `0` | Higher priority wins when multiple rules match |
| `fallback` | `boolean` | `false` | Used when nothing else matches (also used when size is unknown) |
| `children` | `Snippet` | — | Breakpoint content |
