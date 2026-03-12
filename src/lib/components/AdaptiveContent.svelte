<script>
  import { getContext } from "svelte";
  import { ADAPTIVE_LAYOUT_CONTEXT_KEY } from "../context.js";

  let {
    activeBreakpoint,
    fallback,
    children,
    ...variants
  } = $props();

  const ctx = getContext(ADAPTIVE_LAYOUT_CONTEXT_KEY);

  const resolvedBreakpoint = $derived.by(() => {
    if (activeBreakpoint) return activeBreakpoint;
    return ctx?.state?.activeBreakpoint;
  });

  const selected = $derived.by(() => {
    const key = resolvedBreakpoint;
    if (key && typeof variants[key] === "function") return variants[key];
    if (typeof fallback === "function") return fallback;
    if (typeof children === "function") return children;
    return undefined;
  });
</script>

{@render selected?.()}
