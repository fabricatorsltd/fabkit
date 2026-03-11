<script>
  import { resolveProps } from "../system.js";

  let {
    value = $bindable(""),
    options = [],
    name = "",
    disabled = false,
    // Collect expressive syntax props
    class: className = "",
    ...rest
  } = $props();

  function select(optValue) {
    if (disabled) return;
    value = optValue;
  }

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
  class="RadioGroup {className}"
  style={processedProps.styles}
  {...processedProps.filteredRest}
>
  {#each options as option}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="RadioGroup-item"
      class:RadioGroup-item--disabled={disabled}
      onclick={() => select(option.value)}
    >
      <div
        class="RadioGroup-circle"
        class:RadioGroup-circle--selected={value === option.value}
      >
        {#if value === option.value}
          <div class="RadioGroup-dot"></div>
        {/if}
      </div>
      <span class="RadioGroup-label">{option.label}</span>
    </div>
  {/each}
</div>

<style>
  :global(.RadioGroup) {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .RadioGroup-item {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    user-select: none;
  }

  .RadioGroup-item--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .RadioGroup-circle {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid var(--border-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: border-color 0.15s ease;
  }

  .RadioGroup-circle--selected {
    border-color: var(--action-suggested);
  }

  .RadioGroup-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--action-suggested);
  }

  .RadioGroup-label {
    color: var(--text-primary);
    font-size: 0.95rem;
  }
</style>
