<script>
  import Skeleton from "./Skeleton.svelte";
  import Grid from "./Grid.svelte";

  let {
    mode = "auto",

    minCardWidth = 240,
    minColumns = 2,
    listBelow,

    columns,
    spacing = 12,

    listSpacing = 12,
    listPadding,

    align = "stretch",
    justify = "stretch",

    children,
    class: className = "",

    margin = [0, 0, 0, 0],
    padding = [0, 0, 0, 0],
    bg = "transparent",
    bgHover,
    bgFocus,
    bgActive,
    borderWidth = [0, 0, 0, 0],
    borderColor = "transparent",
    borderStyle = "solid",
    borderRadius = [0, 0, 0, 0],
    shadow = "none",
    zIndex = 0,

    ref = $bindable(),
    ...rest
  } = $props();

  let availableWidth = $state(undefined);

  $effect(() => {
    if (!ref) return;
    if (typeof ResizeObserver === "undefined") return;

    const update = () => {
      availableWidth = ref.clientWidth;
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(ref);

    return () => ro.disconnect();
  });

  function toPx(val) {
    if (typeof val === "number") return val;
    const n = Number(val);
    return Number.isFinite(n) ? n : undefined;
  }

  const shouldList = $derived.by(() => {
    if (mode === "list") return true;
    if (mode === "grid") return false;

    const w = Number(availableWidth);
    if (!Number.isFinite(w) || w <= 0) return false;

    const explicit = toPx(listBelow);
    if (Number.isFinite(explicit) && explicit > 0) return w < explicit;

    const minW = toPx(minCardWidth) ?? 240;
    const cols = toPx(minColumns) ?? 2;

    if (cols <= 1) return false;

    return w < minW * cols;
  });

  const resolvedGridColumns = $derived.by(() => {
    if (columns) return columns;

    const minW = toPx(minCardWidth) ?? 240;
    return `repeat(auto-fill, minmax(${minW}px, 1fr))`;
  });

  const listStyle = $derived.by(() => {
    const parts = [];
    const p = listPadding !== undefined ? listPadding : undefined;

    if (p !== undefined) {
      if (Array.isArray(p)) {
        const vals = p.map((v) => (typeof v === "number" ? `${v}px` : v));
        parts.push(`padding: ${vals.join(" ")}`);
      } else if (typeof p === "number") {
        parts.push(`padding: ${p}px`);
      } else {
        parts.push(`padding: ${p}`);
      }
    }

    return parts.join("; ");
  });
</script>

<Skeleton
  class="AdaptiveGrid {className}"
  bind:ref
  {margin}
  {padding}
  {bg}
  {bgHover}
  {bgFocus}
  {bgActive}
  {borderWidth}
  {borderColor}
  {borderStyle}
  {borderRadius}
  {shadow}
  {zIndex}
  {...rest}
>
  {#if shouldList}
    <div class="AdaptiveGrid-list" style={[`gap:${typeof listSpacing === 'number' ? listSpacing + 'px' : listSpacing}`, listStyle].filter(Boolean).join('; ')}>
      {@render children?.()}
    </div>
  {:else}
    <Grid
      class="AdaptiveGrid-grid"
      columns={resolvedGridColumns}
      spacing={spacing}
      {align}
      {justify}
    >
      {@render children?.()}
    </Grid>
  {/if}
</Skeleton>

<style>
  :global(.AdaptiveGrid-list) {
    display: flex;
    flex-direction: column;
  }

  :global(.AdaptiveGrid-grid) {
    width: 100%;
  }
</style>
