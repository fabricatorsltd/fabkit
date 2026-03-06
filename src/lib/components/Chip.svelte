<script>
  import { resolveProps } from "../system.js";
  import PhX from "../icons/components/X.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let {
    label = "",
    removable = false,
    onRemove,
    icon = undefined,
    color,
    textColor,
    // Collect expressive syntax props
    class: className = "",
    ...rest
  } = $props();

  const finalBg = $derived(rest.bg !== undefined ? rest.bg : color || "var(--background-elevated)");

  function handleRemove(event) {
    if (onRemove) onRemove(event);
    dispatch('remove', { originalEvent: event });
  }

  const processedProps = $derived.by(() => {
    const defaults = {
      margin: rest.margin ?? [0, 0, 0, 0],
      padding: rest.padding ?? [2, 10, 2, 10],
      bg: finalBg,
      borderWidth: rest.borderWidth ?? [0, 0, 0, 0],
      borderColor: rest.borderColor ?? "transparent",
      borderStyle: rest.borderStyle ?? "solid",
      borderRadius: rest.borderRadius ?? "20px",
      shadow: rest.shadow ?? "none",
      zIndex: rest.zIndex ?? 0,
      color: textColor,
      ...rest
    };
    return resolveProps(defaults);
  });
</script>

<div
  class="Chip {className}"
  style={processedProps.styles}
  {...processedProps.filteredRest}
>
  {#if icon}
    {@const Component = icon}
    <span class="Chip-icon">
      <Component size={14} />
    </span>
  {/if}
  {#if label}
    <span class="Chip-label">{label}</span>
  {/if}
  {#if removable}
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button
      class="Chip-remove"
      onclick={handleRemove}
      type="button"
    >
      <PhX size={12} />
    </button>
  {/if}
</div>

<style>
  :global(.Chip) {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.85rem;
    color: var(--text-primary);
  }

  .Chip-icon {
    display: flex;
    align-items: center;
    color: inherit;
  }

  .Chip-label {
    white-space: nowrap;
  }

  .Chip-remove {
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: inherit;
    opacity: 0.7;
    padding: 0;
  }

  .Chip-remove:hover {
    opacity: 1;
  }
</style>
