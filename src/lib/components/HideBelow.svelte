<script>
  /**
   * @typedef {import("../../types/index.d.ts").HideBelowProps} HideBelowProps
   */

  import Skeleton from "./Skeleton.svelte";
  import { HideBelowMode } from "../propTypes.js";
  import { validateProp } from "../validator.js";

  /** @type {HideBelowProps} */
  let {
    below = 600,
    mode = HideBelowMode.auto,
    children,
    fallback,
    class: className = "",
    ref = $bindable(),
    ...rest
  } = $props();

  $derived.by(() => {
    validateProp("HideBelow", "mode", mode, HideBelowMode);
  });

  let availableWidth = $state(undefined);

  const isHidden = $derived.by(() => {
    if (mode === "hidden") return true;
    if (mode === "visible") return false;

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
  class={["HideBelow", className].filter(Boolean).join(" ")}
  bind:ref
  {...rest}
>
  {#if isHidden}
    {@render fallback?.()}
  {:else}
    {@render children?.()}
  {/if}
</Skeleton>
