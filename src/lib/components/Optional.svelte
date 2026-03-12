<script>
  import Skeleton from "./Skeleton.svelte";

  let {
    below = 600,
    mode = "auto", // auto | inline | below
    orderBelow = 1000,
    unwrapInline = true,
    children,
    class: className = "",
    ref = $bindable(),
    ...rest
  } = $props();

  let availableWidth = $state(undefined);

  const isBelow = $derived.by(() => {
    if (mode === "below") return true;
    if (mode === "inline") return false;

    const w = Number(availableWidth);
    const t = Number(below);

    if (!Number.isFinite(w) || w <= 0) return false;
    if (!Number.isFinite(t) || t <= 0) return false;

    return w < t;
  });

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

<Skeleton
  class={["Optional", isBelow ? "Optional--below" : "Optional--inline", className]
    .filter(Boolean)
    .join(" ")}
  bind:ref
  style={[
    `--snt-optional-inline-display: ${unwrapInline ? "contents" : "block"}`,
    isBelow ? `order: ${orderBelow};` : undefined,
  ]
    .filter(Boolean)
    .join("; ")}
  {...rest}
>
  {@render children?.()}
</Skeleton>

<style>
  :global(.Optional.Optional--inline) {
    display: var(--snt-optional-inline-display, contents);
  }

  :global(.Optional.Optional--below) {
    display: var(--snt-optional-below-display, block);
    width: 100%;
    flex-basis: 100%;
  }
</style>
