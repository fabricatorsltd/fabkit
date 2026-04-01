# PhIcon

Base icon renderer for Phosphor-style icons. Renders an SVG icon from a set of path definitions.

In most cases you won't use `PhIcon` directly — import individual icon components from `fabkit` instead (e.g. `Bell`, `Gear`, `House`). Use `PhIcon` only when you need to render an icon dynamically by passing its `paths` map at runtime.

---

## Import

```js
import { PhIcon } from 'fabkit';

// Named icon components (recommended)
import { Bell, Gear, House } from 'fabkit';
```

---

## Basic Usage

```svelte
<!-- Recommended: use named icon components -->
<Bell />
<Bell size={32} weight="bold" />
<Gear color="var(--accent-primary)" />

<!-- Advanced: dynamic icon via PhIcon -->
<PhIcon {paths} size={24} weight="fill" />
```

---

## Component Props

| Prop       | Type                                                   | Default          | Description                                          |
|------------|--------------------------------------------------------|------------------|------------------------------------------------------|
| `weight`   | `'regular' \| 'bold' \| 'fill' \| 'light' \| 'duotone' \| 'thin'` | `'regular'` | Icon weight/style variant |
| `size`     | `number \| string`                                     | `24`             | Width and height in px                               |
| `color`    | `string`                                               | `currentColor`   | SVG fill color                                       |
| `mirrored` | `boolean`                                              | `false`          | Flip the icon horizontally                           |
| `class`    | `string`                                               | `""`             | Extra CSS classes                                    |
| `paths`    | `Record<string, string>`                               | `{}`             | SVG inner path strings per weight (injected automatically by named icon components) |

---

## Examples

```svelte
<!-- Named icon, default size -->
<Bell />

<!-- Larger, bold, colored -->
<House size={32} weight="bold" color="var(--accent-primary)" />

<!-- Mirrored (e.g. back arrow in RTL) -->
<ArrowLeft mirrored />

<!-- Inside a Button -->
<Button label="Settings" icon="gear" />
```

---

## Available Icon Components

All exported icon components accept the same props as `PhIcon`. See the icons index for the full list.
