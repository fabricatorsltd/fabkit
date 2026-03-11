<script>
  import { resolveProps } from "../system.js";

  let {
    spacing = 0,
    columns = "1fr",
    rows = "auto",
    align = "stretch",
    justify = "stretch",
    height = "auto",
    children,
    class: className = "",
    // Collect expressive syntax props
    ...rest
  } = $props();

  const gapPx = $derived.by(() => {
    const n = typeof spacing === "number" ? spacing : parseFloat(String(spacing));
    return Number.isFinite(n) ? n : 0;
  });

  const processedProps = $derived.by(() => {
    const defaults = {
      bg: rest.bg ?? "transparent",
      borderWidth: rest.borderWidth ?? [0, 0, 0, 0],
      borderColor: rest.borderColor ?? "transparent",
      borderStyle: rest.borderStyle ?? "solid",
      borderRadius: rest.borderRadius ?? [0, 0, 0, 0],
      shadow: rest.shadow ?? "none",
      zIndex: rest.zIndex ?? 0,
      ...rest
    };
    return resolveProps(defaults);
  });
</script>

<div
  class="Grid {className}"
  style={[
    processedProps.styles,
    `gap: ${gapPx}px`,
    `grid-template-columns: ${columns}`,
    `grid-template-rows: ${rows}`,
    `align-items: ${align}`,
    `justify-items: ${justify}`,
    `height: ${height}`,
  ].filter(Boolean).join("; ")}
  {...processedProps.filteredRest}
>
  {@render children?.()}
</div>

<style>
  :global(.Grid) {
    display: grid;
  }
</style>
