<script>
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import Skeleton from "./Skeleton.svelte";
  import { DENSITY_CONTEXT_KEY } from "../context.js";
  import {
    normalizeDensity,
    resolveDensityTokens,
    densityTokensToCssVars,
  } from "../density.js";

  let {
    density = "auto",
    compactBelow = 560,
    roomyAbove = 960,
    tokens,

    class: className = "",
    children,
    ref = $bindable(),
    ...rest
  } = $props();

  let availableWidth = $state(undefined);

  $effect(() => {
    if (density !== "auto") return;
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

  const resolvedDensity = $derived.by(() => {
    if (density !== "auto") return normalizeDensity(density);

    const w = Number(availableWidth);
    if (!Number.isFinite(w) || w <= 0) return "regular";

    if (w < compactBelow) return "compact";
    if (w >= roomyAbove) return "roomy";
    return "regular";
  });

  const resolvedTokens = $derived.by(() =>
    resolveDensityTokens(resolvedDensity, tokens),
  );

  const densityStyle = $derived.by(() => {
    const vars = densityTokensToCssVars(resolvedTokens);
    return [`--fabkit-density: ${resolvedDensity}`, vars].filter(Boolean).join("; ");
  });

  const densityStore = writable({
    density: "regular",
    tokens: resolveDensityTokens("regular"),
  });

  setContext(DENSITY_CONTEXT_KEY, densityStore);

  $effect(() => {
    densityStore.set({ density: resolvedDensity, tokens: resolvedTokens });
  });
</script>

<Skeleton
  class="DensityProvider {className}"
  bind:ref
  style={densityStyle}
  {...rest}
>
  {@render children?.()}
</Skeleton>
