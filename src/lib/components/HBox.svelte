<script>
  /**
   * @typedef {import("../../types/index.d.ts").HBoxProps} HBoxProps
   */

  import { resolveProps } from "../system.js";
  import { Align, Justify } from "../propTypes.js";
  import { validateProp } from "../validator.js";

  /** @type {HBoxProps} */
  let {
    spacing = 0,
    align = Align.center,
    children,
    class: className = "",
    // Collect expressive syntax props
    justify = Justify.start,
    ...rest
  } = $props();

  $derived.by(() => {
    validateProp("HBox", "align", align, Align);
    validateProp("HBox", "justify", justify, Justify);
  });

  let _justify = $derived.by(() => {
    switch (justify) {
      case Justify.start:
      case Justify.end:
        return "flex-" + justify;
      case Justify.center:
        return "center";
      case Justify.spaceBetween:
      case Justify.spaceAround:
      case Justify.spaceEvenly:
        return justify;
      default:
        return "flex-start";
    }
  });

  let _align = $derived.by(() => {
    switch (align) {
      case Align.fill:
        return "stretch";
      case Align.start:
      case Align.end:
        return "flex-" + align;
      case Align.center:
        return "center";
      default:
        return "center";
    }
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
  class="HBox {className}"
  style={[
    processedProps.styles,
    gap !== undefined ? `gap: ${gap}` : undefined,
    `align-items: ${_align}`,
    `justify-content: ${_justify}`,
  ].filter(Boolean).join("; ")}
  {...processedProps.filteredRest}
>
  {@render children?.()}
</div>

<style>
  :global(.HBox) {
    display: flex;
    flex-direction: row;
    min-width: 0;
    min-height: 0;
  }
</style>
