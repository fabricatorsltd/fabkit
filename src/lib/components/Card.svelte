<script>
  import { setContext } from "svelte";
  import { CARD_RADIUS_CONTEXT_KEY } from "../context.js";
  import { resolveProps } from "../system.js";

  let {
    children,
    class: className = "",
    clip = false,
    // Collect expressive syntax props
    ...rest
  } = $props();

  const finalBorderRadius = $derived(rest.radius ?? rest.borderRadius ?? "var(--snt-border-radius, 12px)");

  // Apply defaults and process with system
  const processedProps = $derived.by(() => {
    const defaults = {
      margin: rest.margin ?? [0, 0, 0, 0],
      padding: rest.padding ?? [16, 16, 16, 16],
      bg: rest.bg ?? "var(--background-elevated)",
      borderWidth: rest.borderWidth ?? [1, 1, 1, 1],
      borderColor: rest.borderColor ?? "var(--border-primary)",
      borderStyle: rest.borderStyle ?? "solid",
      borderRadius: finalBorderRadius,
      shadow: rest.shadow ?? "var(--shadow-elevated-2)",
      zIndex: rest.zIndex ?? 0,
      overflow: clip ? "hidden" : rest.overflow,
      ...rest
    };
    return resolveProps(defaults);
  });

  setContext(CARD_RADIUS_CONTEXT_KEY, () => finalBorderRadius);
</script>

<div
  class="Card {className}"
  style={processedProps.styles}
  {...processedProps.filteredRest}
>
  {@render children?.()}
</div>

<style>
  :global(.Card) {
    text-align: left;
  }
</style>
