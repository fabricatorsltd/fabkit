<script>
  import { resolveProps } from "../system.js";

  let {
    spacing = 0,
    align = "center",
    children,
    class: className = "",
    // Collect expressive syntax props
    justify = "start",
    ...rest
  } = $props();

  let _justify = $derived.by(() => {
    switch (justify) {
      case "start":
      case "end":
        return "flex-" + justify;
      case "center":
        return "center";
      case "space-between":
      case "space-around":
      case "space-evenly":
        return justify;
      default:
        return "flex-start";
    }
  });

  let _align = $derived.by(() => {
    switch (align) {
      case "fill":
        return "stretch";
      case "start":
      case "end":
        return "flex-" + align;
      case "center":
        return "center";
      default:
        return "center";
    }
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
  class="HBox {className}"
  style={[
    processedProps.styles,
    `gap: ${spacing}px`,
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
  }
</style>
