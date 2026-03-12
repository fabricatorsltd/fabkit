# DensityProvider

Sets a density context (compact / regular / roomy) that components can consume to standardize spacing and typography.

It can be forced, or selected automatically by container width.

---

## Import

```js
import { DensityProvider } from 'fabkit';
```

---

## Basic Usage

```svelte
<DensityProvider density="regular">
  ...
</DensityProvider>
```

---

## Auto Density (container-driven)

```svelte
<DensityProvider density="auto" compactBelow={560} roomyAbove={960}>
  ...
</DensityProvider>
```

---

## Tokens

The provider sets CSS variables on its root:

- `--fabkit-density` (`compact` / `regular` / `roomy`)
- `--fabkit-density-space2`, `--fabkit-density-space4`, `--fabkit-density-space8`, `--fabkit-density-space12`, `--fabkit-density-space16`, `--fabkit-density-space24`
- `--fabkit-density-fontSize`
- `--fabkit-density-controlHeight`

You can also override tokens:

```svelte
<DensityProvider
  density="compact"
  tokens={{ space12: 8, controlHeight: 26 }}
>
  ...
</DensityProvider>
```

---

## Consuming the context

Inside a component:

```svelte
<script>
  import { getDensityStore } from 'fabkit';
  const density = getDensityStore();
</script>

<div style={`padding: ${$density.tokens.space12}px`}>
  ...
</div>
```
