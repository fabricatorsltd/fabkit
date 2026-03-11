<script>
  import { resolveProps } from "../system.js";

  let {
    orientation = "horizontal",
    maximumSize = 600,
    tighteningThreshold = 600,
    children,
    class: className = "",
    ref = $bindable(),
    ...rest
  } = $props();

  let availableSize = $state(undefined);

  function clampSize(available, max, threshold) {
    const a = Number(available);
    const m = Number(max);
    const t = Number(threshold);

    if (!Number.isFinite(a) || a <= 0) return undefined;
    if (!Number.isFinite(m) || m <= 0) return undefined;

    let tt = Number.isFinite(t) && t > 0 ? t : m;

    if (tt >= m) return Math.min(a, m);

    if (a <= tt) return a;
    if (a >= m) return m;

    const x = (a - tt) / (m - tt);
    const h = -x * x * x + x * x + x;
    return tt + (m - tt) * h;
  }

  const clamped = $derived.by(() =>
    clampSize(availableSize, maximumSize, tighteningThreshold)
  );

  const outerClass = $derived.by(() =>
    [
      "Clamp",
      orientation === "vertical" ? "Clamp--vertical" : "Clamp--horizontal",
      className,
    ]
      .filter(Boolean)
      .join(" ")
  );

  const processedProps = $derived.by(() => {
    const defaults = {
      w: "100%",
      bg: rest.bg ?? "transparent",
      borderWidth: rest.borderWidth ?? [0, 0, 0, 0],
      borderColor: rest.borderColor ?? "transparent",
      borderStyle: rest.borderStyle ?? "solid",
      borderRadius: rest.borderRadius ?? [0, 0, 0, 0],
      shadow: rest.shadow ?? "none",
      zIndex: rest.zIndex ?? 0,
      ...rest,
    };

    return resolveProps(defaults);
  });

  const innerStyle = $derived.by(() => {
    const m = Number(maximumSize);
    const maxPx = Number.isFinite(m) ? `${m}px` : undefined;

    const s = Number(clamped);
    const sizePx = Number.isFinite(s) ? `${s}px` : undefined;

    if (orientation === "vertical") {
      return [
        "width: 100%",
        maxPx ? `max-height: ${maxPx}` : undefined,
        "height: 100%",
        sizePx ? `height: ${sizePx}` : undefined,
      ]
        .filter(Boolean)
        .join("; ");
    }

    return [
      "height: 100%",
      maxPx ? `max-width: ${maxPx}` : undefined,
      "width: 100%",
      sizePx ? `width: ${sizePx}` : undefined,
    ]
      .filter(Boolean)
      .join("; ");
  });

  $effect(() => {
    if (!ref) return;
    if (typeof ResizeObserver === "undefined") return;

    const update = () => {
      availableSize =
        orientation === "vertical" ? ref.clientHeight : ref.clientWidth;
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(ref);

    return () => ro.disconnect();
  });
</script>

<div class={outerClass} bind:this={ref} style={processedProps.styles} {...processedProps.filteredRest}>
  <div class="Clamp-inner" style={innerStyle}>
    {@render children?.()}
  </div>
</div>

<style>
  :global(.Clamp) {
    display: flex;
    box-sizing: border-box;
  }

  :global(.Clamp--horizontal) {
    flex-direction: row;
    justify-content: center;
  }

  :global(.Clamp--vertical) {
    flex-direction: column;
    justify-content: center;
  }

  .Clamp-inner {
    box-sizing: border-box;
  }
</style>
