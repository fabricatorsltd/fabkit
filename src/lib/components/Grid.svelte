<script>
  /**
   * @typedef {import("../../types/index.d.ts").GridProps} GridProps
   */

  import { resolveProps } from "../system.js";
  import { GridAlign, GridJustify } from "../propTypes.js";
  import { validateProp } from "../validator.js";

  /** @type {GridProps} */
  let {
    spacing = 0,
    columns = "1fr",
    rows = "auto",
    align = GridAlign.stretch,
    justify = GridJustify.stretch,
    height = "auto",
    children,
    class: className = "",
    // Collect expressive syntax props
    ...rest
  } = $props();

  $derived.by(() => {
    validateProp("Grid", "align", align, GridAlign);
    validateProp("Grid", "justify", justify, GridJustify);
  });

  function formatValue(val) {
    if (typeof val === "number") return `${val}px`;
    return val;
  }

  function formatGap(val) {
    if (val === undefined) return undefined;
    if (Array.isArray(val)) {
      if (val.length === 0) return undefined;
      if (val.length === 1) return formatValue(val[0]);
      return `${formatValue(val[0])} ${formatValue(val[1])}`;
    }
    return formatValue(val);
  }

  const gap = $derived.by(() => formatGap(spacing));

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
    gap !== undefined ? `gap: ${gap}` : undefined,
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
