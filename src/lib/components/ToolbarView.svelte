<script>
  import Skeleton from "./Skeleton.svelte";

  let {
    top,
    bottom,
    content,
    title = "",
    subtitle = "",
    start,
    end,
    center,
    mode = "auto",
    compactMinWidth = 520,
    class: className = "",
    margin = [0, 0, 0, 0],
    padding = [0, 0, 0, 0],
    bg = "transparent",
    bgHover,
    bgFocus,
    bgActive,
    borderWidth = [0, 0, 0, 0],
    borderWidthHover,
    borderWidthFocus,
    borderWidthActive,
    borderColor = "transparent",
    borderStyle = "solid",
    borderRadius = [0, 0, 0, 0],
    shadow = "none",
    zIndex = 0,
    ref = $bindable(),
    ...rest
  } = $props();

  let containerWidth = $state(0);

  let ro;
  $effect(() => {
    if (mode !== "auto") return;
    if (!ref) return;
    if (typeof ResizeObserver === "undefined") return;

    const update = () => {
      containerWidth = ref?.getBoundingClientRect()?.width ?? 0;
    };

    update();

    ro?.disconnect?.();
    ro = new ResizeObserver(() => update());
    ro.observe(ref);

    return () => ro?.disconnect?.();
  });

  const resolvedMode = $derived.by(() => {
    if (mode !== "auto") return mode;
    const w = Number(containerWidth) || 0;
    const min = Number(compactMinWidth) || 520;
    return w > 0 && w < min ? "compact" : "wide";
  });

  const hasTop = $derived(!!top || !!start || !!end || !!center || title.length > 0 || subtitle.length > 0);
  const hasBottom = $derived(!!bottom);
</script>

<Skeleton
  class={[
    "ToolbarView",
    className,
    resolvedMode === "compact" && "ToolbarView--compact",
    resolvedMode === "wide" && "ToolbarView--wide",
  ]
    .filter(Boolean)
    .join(" ")}
  bind:ref
  {margin}
  {padding}
  {bg}
  {bgHover}
  {bgFocus}
  {bgActive}
  {borderWidth}
  {borderWidthHover}
  {borderWidthFocus}
  {borderWidthActive}
  {borderColor}
  {borderStyle}
  {borderRadius}
  {shadow}
  {zIndex}
  {...rest}
>
  {#if hasTop}
    <div class="ToolbarView-top">
      {#if top}
        {@render top?.()}
      {:else}
        <div class="ToolbarView-bar">
          <div class="ToolbarView-start">
            {@render start?.()}
          </div>

          <div class="ToolbarView-center">
            {#if center}
              {@render center?.()}
            {:else}
              {#if title}
                <div class="ToolbarView-title">{title}</div>
              {/if}
              {#if subtitle}
                <div class="ToolbarView-subtitle">{subtitle}</div>
              {/if}
            {/if}
          </div>

          <div class="ToolbarView-end">
            {@render end?.()}
          </div>
        </div>
      {/if}
    </div>
  {/if}

  <div class="ToolbarView-content">
    {@render content?.()}
  </div>

  {#if hasBottom}
    <div class="ToolbarView-bottom">
      {@render bottom?.()}
    </div>
  {/if}
</Skeleton>

<style>
  :global(.ToolbarView) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 0;
  }

  .ToolbarView-top {
    position: sticky;
    top: 0;
    z-index: 10;
    background: var(--background-translucent);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border-primary);
  }

  .ToolbarView-bottom {
    position: sticky;
    bottom: 0;
    z-index: 10;
    background: var(--background-translucent);
    backdrop-filter: blur(16px);
    border-top: 1px solid var(--border-primary);
  }

  .ToolbarView-content {
    flex: 1;
    min-height: 0;
    overflow: auto;
  }

  .ToolbarView-bar {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1fr);
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    min-height: 48px;
    color: var(--text-primary);
  }

  .ToolbarView-start {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    justify-content: flex-start;
  }

  .ToolbarView-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
    text-align: center;
    gap: 2px;
  }

  .ToolbarView-end {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    justify-content: flex-end;
  }

  .ToolbarView-title {
    font-weight: 600;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

  .ToolbarView-subtitle {
    font-size: 0.9em;
    color: var(--text-secondary);
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }

  :global(.ToolbarView.ToolbarView--compact) .ToolbarView-bar {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-areas:
      "start end"
      "center center";
    align-items: center;
  }

  :global(.ToolbarView.ToolbarView--compact) .ToolbarView-start {
    grid-area: start;
  }

  :global(.ToolbarView.ToolbarView--compact) .ToolbarView-end {
    grid-area: end;
  }

  :global(.ToolbarView.ToolbarView--compact) .ToolbarView-center {
    grid-area: center;
    align-items: flex-start;
    text-align: left;
    padding-top: 4px;
  }
</style>
