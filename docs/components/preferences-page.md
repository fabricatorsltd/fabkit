# PreferencesPage

A layout container for settings or preferences pages.

---

## Import

```js
import { PreferencesPage } from 'fabkit';
```

---

## Basic Usage

```svelte
<PreferencesPage>
  <PreferencesGroup>
    <ActionRow title="Enable notifications">
      <Switcher bind:checked={notifications} />
    </ActionRow>
  </PreferencesGroup>
</PreferencesPage>
```

---

## Component Props

| Prop      | Type      | Default | Description                |
|-----------|-----------|---------|----------------------------|
| `children`| `Snippet` | —       | Page content               |
| `ref`     | `bindable`| —       | DOM element reference      |

---

## Skeleton Pass-through Props

Accepts all [Skeleton props](./skeleton.md).

---

## Example

```svelte
<PreferencesPage>
  <PreferencesGroup>
    <ActionRow title="Language">
      <SelectField options={languages} bind:value={lang} />
    </ActionRow>
  </PreferencesGroup>
</PreferencesPage>
```

