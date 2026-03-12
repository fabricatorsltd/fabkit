<script>
  import Skeleton from "./Skeleton.svelte";

  let {
    stackAt = 600,
    labelWidth = 180,
    children,
    class: className = "",
    ref = $bindable(),
    ...rest
  } = $props();

  let availableWidth = $state(undefined);

  const isCompact = $derived.by(() => {
    const w = Number(availableWidth);
    const t = Number(stackAt);

    if (!Number.isFinite(w) || w <= 0) return false;
    if (!Number.isFinite(t) || t <= 0) return false;

    return w < t;
  });

  const labelWidthCss = $derived.by(() =>
    typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth
  );

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
  class={[
    "AdaptiveFormLayout",
    isCompact ? "AdaptiveFormLayout--compact" : "AdaptiveFormLayout--wide",
    className,
  ]
    .filter(Boolean)
    .join(" ")}
  bind:ref
  style={[`--snt-form-label-width: ${labelWidthCss}`].join("; ")}
  {...rest}
>
  {@render children?.()}
</Skeleton>

<style>
  :global(.AdaptiveFormLayout) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  :global(.AdaptiveFormRow) {
    display: grid;
    gap: 6px 14px;
    align-items: start;
  }

  :global(.AdaptiveFormLayout--wide .AdaptiveFormRow) {
    grid-template-columns: var(--snt-form-label-width, 180px) minmax(0, 1fr);
  }

  :global(.AdaptiveFormLayout--compact .AdaptiveFormRow) {
    grid-template-columns: 1fr;
  }

  :global(.AdaptiveFormRow-label) {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.2;
    padding-top: 8px;
  }

  :global(.AdaptiveFormRow-field) {
    min-width: 0;
  }

  :global(.AdaptiveFormRow-help) {
    grid-column: 2;
    color: var(--text-secondary);
    font-size: 0.85rem;
  }

  :global(.AdaptiveFormLayout--compact .AdaptiveFormRow-help) {
    grid-column: 1;
  }
</style>
