<script>
  import { setContext } from "svelte";
  import Skeleton from "./Skeleton.svelte";
  import { ADAPTIVE_LAYOUT_CONTEXT_KEY } from "../context.js";

  let {
    children,
    activeBreakpoint = $bindable(undefined),
    width = $bindable(undefined),
    height = $bindable(undefined),
    class: className = "",
    ref = $bindable(),
    ...rest
  } = $props();

  const state = $state({
    width: undefined,
    height: undefined,
    activeBreakpoint: undefined,
  });

  let registered = $state([]);
  let orderCounter = 0;

  function registerBreakpoint(breakpoint) {
    const id = Symbol();
    const order = orderCounter++;

    registered = [...registered, { id, order, ...breakpoint }];

    return () => {
      registered = registered.filter((b) => b.id !== id);
    };
  }

  function isDefined(v) {
    return v !== undefined && v !== null;
  }

  function matches(b, w, h, hasW, hasH) {
    if (hasW) {
      if (isDefined(b.minWidth) && w < Number(b.minWidth)) return false;
      if (isDefined(b.maxWidth) && w > Number(b.maxWidth)) return false;
    }

    if (hasH) {
      if (isDefined(b.minHeight) && h < Number(b.minHeight)) return false;
      if (isDefined(b.maxHeight) && h > Number(b.maxHeight)) return false;
    }

    return true;
  }

  function isUnconditional(b) {
    return (
      !isDefined(b.minWidth) &&
      !isDefined(b.maxWidth) &&
      !isDefined(b.minHeight) &&
      !isDefined(b.maxHeight)
    );
  }

  function pick(candidates) {
    if (!candidates.length) return undefined;

    let best = candidates[0];
    for (const c of candidates.slice(1)) {
      const bp = Number.isFinite(Number(c.priority)) ? Number(c.priority) : 0;
      const bestp = Number.isFinite(Number(best.priority))
        ? Number(best.priority)
        : 0;

      if (bp > bestp) {
        best = c;
        continue;
      }

      if (bp === bestp && c.order < best.order) {
        best = c;
      }
    }

    return best.name;
  }

  const resolvedActive = $derived.by(() => {
    const w = Number(state.width);
    const h = Number(state.height);

    const hasW = Number.isFinite(w) && w > 0;
    const hasH = Number.isFinite(h) && h > 0;

    const list = registered;

    if (hasW || hasH) {
      const matched = list.filter((b) => matches(b, w, h, hasW, hasH));
      const picked = pick(matched);
      if (picked !== undefined) return picked;
    }

    const fallbacks = list.filter((b) => b.fallback === true || isUnconditional(b));
    return pick(fallbacks);
  });

  setContext(ADAPTIVE_LAYOUT_CONTEXT_KEY, {
    state,
    registerBreakpoint,
  });

  $effect(() => {
    if (!ref) return;
    if (typeof ResizeObserver === "undefined") return;

    const update = () => {
      state.width = ref.clientWidth;
      state.height = ref.clientHeight;
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(ref);

    return () => ro.disconnect();
  });

  $effect(() => {
    state.activeBreakpoint = resolvedActive;
    activeBreakpoint = state.activeBreakpoint;
    width = state.width;
    height = state.height;
  });
</script>

<Skeleton
  class={[
    "AdaptiveLayout",
    state.activeBreakpoint ? `AdaptiveLayout--${state.activeBreakpoint}` : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ")}
  bind:ref
  {...rest}
>
  {@render children?.({
    activeBreakpoint: state.activeBreakpoint,
    width: state.width,
    height: state.height,
  })}
</Skeleton>

<style>
  :global(.AdaptiveLayout) {
    display: flex;
    min-width: 0;
    min-height: 0;
  }
</style>
