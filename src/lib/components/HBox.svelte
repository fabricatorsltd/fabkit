<script>
  import Skeleton from "./Skeleton.svelte";
  let {
    spacing = 0,
    align = "center",
    children,
    class: className = "",
    // Skeleton Props Pass-through
    margin = [0, 0, 0, 0],
    padding = [0, 0, 0, 0],
    bg = "transparent",
    bgHover,
    bgFocus,
    bgActive,
    borderWidth = [0, 0, 0, 0],
    borderWidthHover,
    borderWidthFocus,
    borderWidthActive,
    borderColor = "transparent",
    borderStyle = "solid",
    borderRadius = [0, 0, 0, 0],
    shadow = "none",
    zIndex = 0,
    ref = $bindable(),
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

  const finalMargin = $derived(
    Array.isArray(margin) ? margin : [margin, margin, margin, margin],
  );
</script>

<Skeleton
  class="HBox {className}"
  bind:ref
  margin={finalMargin}
  {padding}
  {bg}
  {bgHover}
  {bgFocus}
  {bgActive}
  {borderWidth}
  {borderWidthHover}
  {borderWidthFocus}
  {borderWidthActive}
  {borderColor}
  {borderStyle}
  {borderRadius}
  {shadow}
  {zIndex}
  spacing={spacing}
  style={[
    `align-items: ${_align}`,
    `justify-content: ${_justify}`,
  ].join("; ")}
  {...rest}
>
  {@render children?.()}
</Skeleton>

<style>
  :global(.HBox) {
    display: flex;
    flex-direction: row;
  }
</style>
