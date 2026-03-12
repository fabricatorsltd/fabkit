<script>
  import { getContext } from "svelte";
  import { ADAPTIVE_LAYOUT_CONTEXT_KEY } from "../context.js";

  let {
    name,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    priority = 0,
    fallback = false,
    children,
  } = $props();

  const ctx = getContext(ADAPTIVE_LAYOUT_CONTEXT_KEY);

  const isActive = $derived.by(() => {
    if (!ctx?.state) return true;
    if (name === undefined || name === null) return false;
    return ctx.state.activeBreakpoint === name;
  });

  $effect(() => {
    if (!ctx?.registerBreakpoint) return;
    if (name === undefined || name === null) return;

    return ctx.registerBreakpoint({
      name,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      priority,
      fallback,
    });
  });
</script>

{#if isActive}
  {@render children?.()}
{/if}
