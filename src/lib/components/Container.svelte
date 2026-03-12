<script>
  import { resolveProps } from "../system.js";

  let {
    maxWidth = 1200,
    gutters = { compact: 0, regular: 16, wide: 24 },
    compactBelow = 640,
    wideAbove = 1024,
    edgeToEdgeBelow = "compact",
    center = true,
    children,
    class: className = "",
    ref = $bindable(),
    ...rest
  } = $props();

  let availableWidth = $state(undefined);

  function toNumber(val) {
    const n = Number(val);
    return Number.isFinite(n) ? n : undefined;
  }

  function formatValue(val) {
    if (val === undefined || val === null) return undefined;
    if (typeof val === "number") return `${val}px`;
    return String(val);
  }

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

  const size = $derived.by(() => {
    const w = Number(availableWidth);
    if (!Number.isFinite(w) || w <= 0) return "regular";

    const compact = toNumber(compactBelow) ?? 640;
    const wide = toNumber(wideAbove) ?? 1024;

    if (w <= compact) return "compact";
    if (w >= wide) return "wide";
    return "regular";
  });

  const isEdgeToEdge = $derived.by(() => {
    const w = Number(availableWidth);

    if (edgeToEdgeBelow === true) return size === "compact";
    if (edgeToEdgeBelow === false || edgeToEdgeBelow === undefined) return false;

    if (typeof edgeToEdgeBelow === "number") {
      if (!Number.isFinite(w) || w <= 0) return false;
      return w <= edgeToEdgeBelow;
    }

    if (typeof edgeToEdgeBelow === "string") {
      return size === edgeToEdgeBelow;
    }

    return false;
  });

  const resolvedGutter = $derived.by(() => {
    if (isEdgeToEdge) return 0;

    if (typeof gutters === "number" || typeof gutters === "string") return gutters;

    if (gutters && typeof gutters === "object") {
      if (size === "compact" && gutters.compact !== undefined) return gutters.compact;
      if (size === "wide" && gutters.wide !== undefined) return gutters.wide;
      if (gutters.regular !== undefined) return gutters.regular;
    }

    return 16;
  });

  const processedProps = $derived.by(() => {
    const defaults = {
      w: "100%",
      ...rest,
    };
    return resolveProps(defaults);
  });

  const containerStyle = $derived.by(() => {
    const maxW = isEdgeToEdge ? "100%" : formatValue(maxWidth);
    const g = formatValue(resolvedGutter);

    return [
      processedProps.styles,
      "box-sizing: border-box",
      center ? "margin-left: auto" : undefined,
      center ? "margin-right: auto" : undefined,
      maxW ? `max-width: ${maxW}` : undefined,
      g ? `padding-left: ${g}` : undefined,
      g ? `padding-right: ${g}` : undefined,
    ]
      .filter(Boolean)
      .join("; ");
  });
</script>

<div
  class="Container {className}"
  bind:this={ref}
  style={containerStyle}
  {...processedProps.filteredRest}
>
  {@render children?.()}
</div>

<style>
  :global(.Container) {
    width: 100%;
  }
</style>
