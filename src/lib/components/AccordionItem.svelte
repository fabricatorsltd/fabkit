<script>
  import { resolveProps } from "../system.js";
  import PhCaretRight from "../icons/components/CaretRight.svelte";

  let {
    title = "",
    open = $bindable(false),
    icon = undefined,
    children,
    // Collect expressive syntax props
    class: className = "",
    ...rest
  } = $props();

  function toggle() {
    open = !open;
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
  class="AccordionItem {className}"
  style={processedProps.styles}
  {...processedProps.filteredRest}
>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="AccordionItem-header" onclick={toggle}>
    {#if icon}
      {@const Component = icon}
      <span class="AccordionItem-icon">
        <Component size={18} />
      </span>
    {/if}
    <span class="AccordionItem-title">{title}</span>
    <span class="AccordionItem-caret" class:AccordionItem-caret--open={open}>
      <PhCaretRight size={16} />
    </span>
  </div>
  <div
    class="AccordionItem-body"
    class:AccordionItem-body--open={open}
  >
    <div class="AccordionItem-content">
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
</div>

<style>
  :global(.AccordionItem) {
    border-bottom: 1px solid var(--border-primary);
  }

  .AccordionItem-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 4px;
    cursor: pointer;
    user-select: none;
    color: var(--text-primary);
  }

  .AccordionItem-header:hover {
    color: var(--action-suggested);
  }

  .AccordionItem-icon {
    color: var(--text-secondary);
    display: flex;
    align-items: center;
  }

  .AccordionItem-title {
    flex: 1;
    font-weight: 500;
  }

  .AccordionItem-caret {
    display: flex;
    align-items: center;
    transition: transform 0.2s ease;
    color: var(--text-secondary);
  }

  .AccordionItem-caret--open {
    transform: rotate(90deg);
  }

  .AccordionItem-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.25s ease;
  }

  .AccordionItem-body--open {
    max-height: 1000px;
  }

  .AccordionItem-content {
    padding: 0 4px 12px;
    color: var(--text-secondary);
    font-size: 0.95rem;
  }
</style>
