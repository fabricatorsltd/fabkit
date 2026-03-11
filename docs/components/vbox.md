# VBox

A vertical flexbox column. All children are stacked top to bottom.

---

## Import

```js
import { VBox } from 'fabkit';
```

---

## Basic Usage

```svelte
<VBox spacing={16} align="fill">
  <TextField label="Name" bind:value={name} />
  <TextField label="Email" bind:value={email} />
  <Button label="Submit" type="suggested" />
</VBox>
```

---

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `spacing` | `number` | `0` | Gap between children (number = px, no units) |
| `align` | `string` | `"center"` | `align-items` value (`start`, `center`, `end`, `stretch`, `fill`) |
| `justify` | `string` | `"start"` | `justify-content` value |
| `children` | `Snippet` | — | Column content |
| `ref` | `bindable` | — | DOM element reference |

> `"fill"` is an alias for `"stretch"` — children expand to full width.

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md). Same defaults as HBox.

---

## Examples

```svelte
<!-- Form column -->
<VBox spacing={20} align="fill" padding={[24,24,24,24]}>
  <TextField label="Username" bind:value={username} />
  <TextField label="Password" type="password" bind:value={password} />
  <HBox justify="end">
    <Button label="Login" type="suggested" />
  </HBox>
</VBox>

<!-- Centered content -->
<VBox align="center" justify="center" height="100vh">
  <h1>Welcome</h1>
  <Button label="Get Started" type="suggested" />
</VBox>
```
