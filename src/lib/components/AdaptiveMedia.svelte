<script>
  import Image from "./Image.svelte";

  let {
    mode = "auto",
    stackAt = 600,
    wide = {},
    compact = {},
    class: className = "",
    ref = $bindable(),
    ...rest
  } = $props();

  let availableWidth = $state(undefined);

  const isCompact = $derived.by(() => {
    if (mode === "compact") return true;
    if (mode === "wide") return false;

    const w = Number(availableWidth);
    const t = Number(stackAt);

    if (!Number.isFinite(w) || w <= 0) return false;
    if (!Number.isFinite(t) || t <= 0) return false;

    return w < t;
  });

  const variantProps = $derived(isCompact ? compact : wide);

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
</script>

<Image
  bind:ref
  class={["AdaptiveMedia", isCompact ? "AdaptiveMedia--compact" : "AdaptiveMedia--wide", className]
    .filter(Boolean)
    .join(" ")}
  {...rest}
  {...variantProps}
/>
