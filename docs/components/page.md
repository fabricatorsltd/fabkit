# Page

A full-page container. Alias for `Container` with sensible page-level defaults.

---

## Import

```js
import { Page } from 'fabkit';
```

---

## Basic Usage

```svelte
<Page padding={[16, 24]}>
  <Text>Page content</Text>
</Page>
```

---

## Component Props

Accepts all [Container props](./container.md) and all [Skeleton props](./skeleton.md).

---

## Example

```svelte
<Page bg="var(--background-base)" padding={[0, 0]}>
  <TitleBar title="My App" />
  <VBox padding={[16, 24]} spacing={12}>
    <Text fontSize={18} fontWeight={600}>Welcome</Text>
    <Text>Start building your app here.</Text>
  </VBox>
</Page>
```
