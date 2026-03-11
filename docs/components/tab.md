# Tab

A single tab for use within TabsSwitcher.

---

## Import

```js
import { Tab } from 'fabkit';
```

---

## Basic Usage

```svelte
<TabsSwitcher>
  <Tab label="Tab 1">Content 1</Tab>
  <Tab label="Tab 2">Content 2</Tab>
</TabsSwitcher>
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `label`   | `string`  | `""`   | Tab label                  |
| `children`| `Snippet` | —       | Tab content                |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Example

```svelte
<Tab label="Settings">Settings content</Tab>
```

