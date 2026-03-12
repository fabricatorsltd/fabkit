# Building responsive apps and websites (container-driven)

Fabkit is designed to build responsive UIs without relying on viewport media queries.

Instead of "what is the screen size?", prefer "how much space does this component (container) have?".

---

## The goal

Build layouts that:

- adapt to any embedding (sidebars, split panes, dialogs, iframes)
- remain stable during SSR / hydration
- scale from compact to wide without rewriting components

---

## Core principles

### 1) Use container-driven breakpoints

Use `AdaptiveLayout` + `Breakpoint` for layout changes.

```svelte
<AdaptiveLayout>
  <Breakpoint name="compact" maxWidth={640}>
    <VBox gap={12}>
      <Sidebar />
      <Main />
    </VBox>
  </Breakpoint>

  <Breakpoint name="wide" minWidth={641}>
    <HBox gap={16}>
      <Sidebar />
      <Main />
    </HBox>
  </Breakpoint>
</AdaptiveLayout>
```

Why this works:

- it adapts to any parent container (not just the viewport)
- it continues to work inside resizable panes

---

### 2) Prefer wrapper primitives for width + gutters

Use `Container` (or `Page`) to standardize:

- max width
- gutters
- edge-to-edge on compact containers

```svelte
<Container
  maxWidth={1200}
  gutters={{ compact: 0, regular: 16, wide: 24 }}
  edgeToEdgeBelow="compact"
>
  <MainContent />
</Container>
```

---

### 3) Make density a first-class input

Use `DensityProvider` to scale spacing and touch targets.

```svelte
<DensityProvider density="auto">
  <YourApp />
</DensityProvider>
```

Typical pattern:

- `compact` for narrow containers
- `regular` as default
- `roomy` for wide containers (more air, easier scanning)

---

### 4) Swap content variants without changing the layout container

Use `AdaptiveContent` when:

- layout stays the same, but the content presentation should simplify

```svelte
<AdaptiveContent>
  {#snippet compact()}
    <Text size="sm">Short label</Text>
  {/snippet}

  {#snippet wide()}
    <Text size="md">Longer, descriptive label</Text>
  {/snippet}
</AdaptiveContent>
```

---

### 5) Prefer adaptive components for common patterns

Examples:

- `AdaptiveGrid` for card grids that become row-lists on compact containers
- `Button` with `labelBehavior="auto"` for toolbars that collapse labels on compact

---

## Best practices

### Layout

- Compose layouts with `HBox`, `VBox`, `Grid`, and use `AdaptiveLayout` only where the structure must change.

- Keep breakpoint thresholds local to the container that owns the decision.

- Use hysteresis-like patterns (a bit of slack) for components that might resize frequently.


### SSR / hydration safety

- Assume the first render might not know the real width.

- Provide a sensible fallback variant (usually non-compact) until measurement is available.


### Performance

- Prefer a few top-level `ResizeObserver` roots (page sections) over per-leaf observers.

- Avoid flipping between variants on every pixel. Use discrete breakpoints.


### Accessibility

- When collapsing labels (icon-only buttons), provide `aria-label`.

- Don’t encode meaning only via layout. Keep the information accessible in all variants.

---

## Bad practices (avoid)

### Viewport media queries as the primary driver

Bad:

- layout decisions based only on `@media (min-width: …)`
- assumptions like "mobile = narrow" and "desktop = wide"

Reason:

- a desktop window can be narrow
- an embedded view can be wide inside a small viewport


### Fixed widths for key UI structure

Bad:

- hard-coded sidebars (e.g. `width: 320px`) with no container-driven fallback

Better:

- use `AdaptiveLayout` to move the sidebar into an overflow pattern when space is limited


### Treating compact as a separate app

Bad:

- duplicating the entire page for mobile/desktop

Better:

- share structure and swap only the parts that truly need it via `Breakpoint` or `AdaptiveContent`

---

## Practical checklist

Before shipping a layout:

- Resize the container (not just the viewport) and verify all variants.

- Verify the first render (SSR) doesn’t explode spacing or hide critical UI.

- Ensure compact variants still provide labels (via text or aria-labels).
