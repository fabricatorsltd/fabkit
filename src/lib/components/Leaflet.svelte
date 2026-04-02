<script>
  /**
   * @typedef {import("../../types/index.d.ts").LeafletProps} LeafletProps
   */

  import Skeleton from "./Skeleton.svelte";
  import { LeafletMode } from "../propTypes.js";
  import { validateProp } from "../validator.js";

  /** @type {LeafletProps} */
  let {
    sidebar,
    content,
    children,
    mode = LeafletMode.auto,
    stackAt = 900,
    sidebarWidth = 320,
    revealContent = $bindable(false),
    keepMounted = true,
    class: className = "",
    ref = $bindable(),
    ...rest
  } = $props();

  $derived.by(() => {
    validateProp("Leaflet", "mode", mode, LeafletMode);
  });

  let availableWidth = $state(undefined);

  const isStacked = $derived.by(() => {
    if (mode === "stacked") return true;
    if (mode === "split") return false;

    const w = Number(availableWidth);
    const t = Number(stackAt);

    if (!Number.isFinite(w) || w <= 0) return false;
    if (!Number.isFinite(t) || t <= 0) return false;

    return w < t;
  });

  const sidebarWidthCss = $derived.by(() =>
    typeof sidebarWidth === "number" ? `${sidebarWidth}px` : sidebarWidth
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
  class={["Leaflet", isStacked ? "Leaflet--stacked" : "Leaflet--split", className]
    .filter(Boolean)
    .join(" ")}
  bind:ref
  style={[`--leaflet-sidebar-width: ${sidebarWidthCss}`].join("; ")}
  {...rest}
>
  {#if isStacked}
    {#if keepMounted}
      <div class="Leaflet-stacked">
        <div
          class="Leaflet-pane Leaflet-pane--sidebar"
          style:transform={revealContent ? "translateX(-20%)" : "translateX(0)"}
          style:opacity={revealContent ? 0.25 : 1}
          style:pointer-events={revealContent ? "none" : "auto"}
        >
          {@render sidebar?.()}
        </div>

        <div
          class="Leaflet-pane Leaflet-pane--content"
          style:transform={revealContent ? "translateX(0)" : "translateX(100%)"}
          style:pointer-events={revealContent ? "auto" : "none"}
        >
          {@render content?.()}
          {@render children?.()}
        </div>
      </div>
    {:else}
      <div class="Leaflet-stacked">
        {#if revealContent}
          <div class="Leaflet-pane Leaflet-pane--content">
            {@render content?.()}
            {@render children?.()}
          </div>
        {:else}
          <div class="Leaflet-pane Leaflet-pane--sidebar">
            {@render sidebar?.()}
          </div>
        {/if}
      </div>
    {/if}
  {:else}
    <div class="Leaflet-split">
      <div class="Leaflet-split-sidebar">{@render sidebar?.()}</div>
      <div class="Leaflet-split-content">
        {@render content?.()}
        {@render children?.()}
      </div>
    </div>
  {/if}
</Skeleton>

<style>
  :global(.Leaflet) {
    display: flex;
    height: 100%;
    min-height: 0;
    overflow: hidden;
  }

  .Leaflet-split {
    display: flex;
    flex: 1;
    min-width: 0;
    min-height: 0;
  }

  .Leaflet-split-sidebar {
    width: var(--leaflet-sidebar-width, 320px);
    flex: 0 0 auto;
    min-width: 0;
    min-height: 0;
    overflow: auto;
    background: var(--background-elevated);
    border-right: 1px solid var(--border-primary);
  }

  .Leaflet-split-content {
    flex: 1 1 auto;
    min-width: 0;
    min-height: 0;
    overflow: auto;
  }

  .Leaflet-stacked {
    position: relative;
    flex: 1;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
  }

  .Leaflet-pane {
    position: absolute;
    inset: 0;
    overflow: auto;
    transition: transform 0.22s ease, opacity 0.22s ease;
    background: var(--background-base);
  }

  .Leaflet-pane--sidebar {
    background: var(--background-elevated);
  }

  .Leaflet-pane--content {
    background: var(--background-base);
    box-shadow: var(--shadow-elevated-2);
  }
</style>
