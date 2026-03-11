<script>
  import Skeleton from "./Skeleton.svelte";
  let {
    spacing = 0,
    columns = "1fr",
    rows = "auto",
    align = "stretch",
    justify = "stretch",
    height = "auto",
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
    ...rest
  } = $props();

  const finalMargin = $derived(
    Array.isArray(margin) ? margin : [margin, margin, margin, margin],
  );

  const gapPx = $derived.by(() => {
    const n = typeof spacing === "number" ? spacing : parseFloat(String(spacing));
    return Number.isFinite(n) ? n : 0;
  });
</script>

<Skeleton
  class="Grid {className}"
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
  style={[
    `gap: ${gapPx}px`,
    `grid-template-columns: ${columns}`,
    `grid-template-rows: ${rows}`,
    `align-items: ${align}`,
    `justify-items: ${justify}`,
    `height: ${height}`,
  ].join("; ")}
  {...rest}
>
  {@render children?.()}
</Skeleton>

<style>
  :global(.Grid) {
    display: grid;
  }
</style>
