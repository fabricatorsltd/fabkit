<script>
  import { resolveProps } from "../system.js";

  let {
    keys = [],
    children,
    // Collect expressive syntax props
    class: className = "",
    ...rest
  } = $props();

  const processedProps = $derived.by(() => {
    const defaults = {
      margin: rest.margin ?? [0, 0, 0, 0],
      padding: rest.padding ?? [0, 0, 0, 0],
      bg: rest.bg ?? "transparent",
      borderWidth: rest.borderWidth ?? [0, 0, 0, 0],
      borderColor: rest.borderColor ?? "transparent",
      borderStyle: rest.borderStyle ?? "solid",
      borderRadius: rest.borderRadius ?? [0, 0, 0, 0],
      shadow: rest.shadow ?? "none",
      zIndex: rest.zIndex ?? 0,
      ...rest
    };
    return resolveProps(defaults);
  });
</script>

<div
  class="Kbd {className}"
  style={processedProps.styles}
  {...processedProps.filteredRest}
>
  {#if keys.length > 0}
    {#each keys as key, i}
      <kbd class="Kbd-key">{key}</kbd>
      {#if i < keys.length - 1}
        <span class="Kbd-sep">+</span>
      {/if}
    {/each}
  {:else if children}
    {@render children()}
  {/if}
</div>

<style>
  :global(.Kbd) {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 0.82rem;
  }

  .Kbd-key {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--background-elevated);
    border: 1px solid var(--border-secondary);
    border-bottom-width: 3px;
    border-radius: 5px;
    padding: 2px 7px;
    font-family: inherit;
    font-size: inherit;
    color: var(--text-primary);
    box-shadow: 0 1px 0 var(--border-tertiary);
    min-width: 22px;
  }

  .Kbd-sep {
    color: var(--text-secondary);
    font-size: 0.78rem;
  }
</style>
