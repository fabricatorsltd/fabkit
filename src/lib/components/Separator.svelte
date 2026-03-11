<script>
  import { resolveProps } from "../system.js";

  let {
    orientation = "horizontal",
    label = "",
    color,
    // Collect everything else: mx, my, p, radius, hover, etc.
    ...rest
  } = $props();

  // This single line replaces 20+ manual prop definitions
  const { styles, className: resolvedClassName, filteredRest } = $derived(resolveProps(rest));
  const lineColor = $derived(color || "var(--border-primary)");
</script>

<div
  class="Separator Separator--{orientation} {resolvedClassName}"
  style={styles}
  {...filteredRest}
>
  {#if orientation === "horizontal"}
    {#if label}
      <div class="Separator-row" style:--sep-color={lineColor}>
        <div class="Separator-line"></div>
        <span class="Separator-label">{label}</span>
        <div class="Separator-line"></div>
      </div>
    {:else}
      <hr class="Separator-hr" style:border-color={lineColor} />
    {/if}
  {:else}
    <div class="Separator-vline" style:background={lineColor}></div>
  {/if}
</div>

<style>
  :global(.Separator) {
    display: flex;
    align-items: center;
  }

  :global(.Separator--vertical) {
    align-self: stretch;
  }

  .Separator-hr {
    border: none;
    border-top: 1px solid;
    margin: 0;
    width: 100%;
  }

  .Separator-row {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  .Separator-line {
    flex: 1;
    height: 1px;
    background: var(--sep-color);
  }

  .Separator-label {
    color: var(--text-secondary);
    font-size: 0.82rem;
    white-space: nowrap;
  }

  .Separator-vline {
    width: 1px;
    height: 100%;
    align-self: stretch;
  }
</style>
