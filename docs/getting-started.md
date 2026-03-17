# Fabkit — Getting Started

Fabkit is a Svelte 5 UI component library. It provides layout primitives, interactive widgets, form fields, and over 1500 Phosphor icons — all built on top of the **Skeleton** base component.

---

## Installation

Install from GitHub (pin to a specific commit for reproducibility):

```bash
npm install github:fabricatorsltd/fabkit#<commit-sha>
```

---

## Basic Setup

Call `initTheme()` inside `onMount` in your root layout. This injects all CSS variables into `<html>`. Calling it at module level will fail during SSR because `document` is not available.

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import { onMount } from 'svelte';
  import { initTheme } from 'fabkit';

  onMount(() => {
    initTheme(); // uses default theme
  });
</script>

<slot />
```

To apply a custom brand color or font:

```svelte
<script>
  import { onMount } from 'svelte';
  import { initTheme } from 'fabkit';

  onMount(() => {
    initTheme({
      colors: { primary: '#6366f1' },
      fonts: { primary: "'Inter', sans-serif" },
      dimensions: { borderRadius: 8, fontSize: 14 }
    });
  });
</script>
```

See [Theming](./theming.md) for the full theme API.

---

## SvelteKit SSR

Fabkit components import `.svelte` files internally. To avoid `ERR_UNKNOWN_FILE_EXTENSION` during SSR, add this to your `vite.config.js`:

```js
// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';

export default {
  plugins: [sveltekit()],
  ssr: {
    noExternal: ['fabkit']
  }
};
```

---

## Importing Components

All components and icons are exported from the `fabkit` package:

```js
import {
  Button,
  Card,
  HBox,
  VBox,
  Window,
  TitleBar,
  Image,
  PhArrowRight,
  PhHouse
} from 'fabkit';
```

---

## Dark Mode

Dark mode is toggled by adding the `.dark` class to `<html>`. There is no automatic OS detection — you control it entirely.

```js
// toggle dark mode
document.documentElement.classList.toggle('dark', isDark);
document.body.classList.toggle('dark', isDark);

// re-apply theme vars after toggling
import('fabkit').then(({ initTheme }) => initTheme());
```

`initTheme()` reads the `.dark` class at call time and injects the correct set of CSS variables.

---

## Component Index

| Component | Description |
|-----------|-------------|
| [Skeleton](./components/skeleton.md) | Base layout primitive — all visual props |
| [Button](./components/button.md) | Clickable action button |
| [Card](./components/card.md) | Bordered content container |
| [Carousel](./components/carousel.md) | Horizontal slide viewer |
| [ContextArea](./components/context-area.md) | Right-click context menu |
| [Dialog](./components/dialog.md) | Generic modal dialog container |
| [ConfirmDialog](./components/confirm-dialog.md) | Modal confirmation dialog |
| [Grid](./components/grid.md) | CSS Grid wrapper |
| [HBox](./components/hbox.md) | Horizontal flexbox row |
| [VBox](./components/vbox.md) | Vertical flexbox column |
| [Image](./components/image.md) | Versatile image component |
| [Menu](./components/menu.md) | Vertical item list |
| [MenuSwitcher](./components/menu-switcher.md) | Sidebar navigation linked to StaticNotebook |
| [Notebook](./components/notebook.md) | Dynamic tabbed content (dynamic tabs) |
| [StaticNotebook](./components/static-notebook.md) | Page switcher driven by context |
| [TabsSwitcher](./components/tabs-switcher.md) | Tab bar for Notebook |
| [Paned](./components/paned.md) | Resizable two-panel split |
| [PopOver](./components/pop-over.md) | Floating anchored overlay |
| [SelectField](./components/select-field.md) | Dropdown select input |
| [SideLayout](./components/side-layout.md) | Sidebar + content layout |
| [Slider](./components/slider.md) | Range input with labels |
| [SlideOver](./components/slide-over.md) | Bottom sheet / modal drawer |
| [Switcher](./components/switcher.md) | Toggle switch |
| [Text](./components/text.md) | Inline text with style helpers |
| [TextField](./components/text-field.md) | Single-line text input |
| [TextRich](./components/text-rich.md) | Styled prose container |
| [TitleBar](./components/title-bar.md) | App window title bar |
| [Window](./components/window.md) | App window shell |
| [BaseField](./components/base-field.md) | Internal field primitive |
| [Icons](./icons.md) | 1514 Phosphor icons |

---

## Skeleton Props

Every component that renders visual chrome accepts **Skeleton props** — a shared set of layout and styling properties described in full in [Skeleton](./components/skeleton.md).

Each component page marks which props are **component-specific** and which are **Skeleton pass-through**.
