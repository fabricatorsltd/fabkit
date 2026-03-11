<script>
  import { resolveProps } from "../system.js";
  import PhCaretUp from "../icons/components/CaretUp.svelte";
  import PhCaretDown from "../icons/components/CaretDown.svelte";
  /**
   * @typedef {object} Option
   * @property {string} value
   * @property {string} text
   */

  let {
    value = $bindable(""),
    label = "",
    options = [],
    icon = "",
    iconPosition = "right",
    flat = false,
    class: className = "",
    // Collect expressive syntax props
    ...rest
  } = $props();

  let isOpen = $state(false);
  let ref = $state(null);
  let displayText = $derived(
    options.find((option) => option.value === value)?.text ?? "",
  );
  let hasContent = $derived(displayText.toString().length > 0);

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  /**
   * @param {Option} option
   */
  function selectOption(option) {
    value = option.value;
    isOpen = false;
  }

  /**
   * @param {MouseEvent} event
   */
  function handleClickOutside(event) {
    if (ref && !ref.contains(event.target)) {
      isOpen = false;
    }
  }

  $effect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  let dropdownZIndex = $derived(
    typeof rest.zIndex === "number" ? rest.zIndex + 1 : 1000,
  );

  const finalPadding = $derived(
    rest.padding !== undefined
      ? rest.padding
      : iconPosition === "left" && !isOpen && !hasContent
        ? [8, 0, 8, 34]
        : [8, 0, 8, 0],
  );

  const finalBg = $derived(rest.bg !== undefined ? rest.bg : "transparent");
  const finalBorderRadius = $derived(
    rest.borderRadius !== undefined ? rest.borderRadius : [0, 0, 0, 0],
  );
  const finalBorderColor = $derived(
    rest.borderColor !== undefined ? rest.borderColor : "transparent",
  );

  const processedProps = $derived.by(() => {
    const defaults = {
      margin: rest.margin ?? [0, 0, 0, 0],
      padding: finalPadding,
      bg: finalBg,
      borderWidth: rest.borderWidth ?? [0, 0, 0, 0],
      borderColor: finalBorderColor,
      borderStyle: rest.borderStyle ?? "solid",
      borderRadius: finalBorderRadius,
      shadow: rest.shadow ?? "none",
      zIndex: rest.zIndex ?? "auto",
      ...rest
    };
    return resolveProps(defaults);
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="SelectField {className}"
  onclick={toggleDropdown}
  bind:this={ref}
  style={processedProps.styles}
  {...processedProps.filteredRest}
>
  <!-- svelte-ignore a11y_label_has_associated_control -->
  <label
    class="SelectField-label"
    class:SelectField-label--active={isOpen || hasContent}
  >
    {label}
  </label>
  <div
    class="SelectField-display"
    style:border-bottom-width={flat ? "0" : isOpen ? "2px" : "1px"}
    style:border-bottom-color={flat
      ? "transparent"
      : isOpen
        ? "var(--action-suggested)"
        : "var(--border-tertiary)"}
  >
    {displayText}
    <span class="SelectField-expand-icon">
      {#if isOpen}<PhCaretUp size={16} />{:else}<PhCaretDown size={16} />{/if}
    </span>
  </div>
  {#if icon}
    {@const Component = icon}
    <div
      class="SelectField-icon"
      class:SelectField-icon--left={iconPosition === "left"}
      class:SelectField-icon--right={iconPosition === "right"}
      class:SelectField-icon--active={isOpen || hasContent}
    >
      <Component size={18} />
    </div>
  {/if}
  {#if isOpen}
    <div class="SelectField-dropdown" style:z-index={dropdownZIndex}>
      {#each options as option}
        <div
          class="SelectField-option"
          onclick={(e) => {
            e.stopPropagation();
            selectOption(option);
          }}
        >
          {option.text}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  :global(.SelectField) {
    position: relative;
  }

  .SelectField-display {
    border: none;
    border-bottom: 1px solid var(--border-tertiary);
    font-size: 1rem;
    padding: 8px 0;
    background: transparent;
    color: var(--text-primary);
    outline: none;
    line-height: normal;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 22px;
  }

  .SelectField-display:focus {
    border-bottom: 2px solid var(--action-suggested);
  }

  .SelectField-label {
    position: absolute;
    left: 0;
    top: 0;
    color: var(--text-secondary);
    pointer-events: none;
    transition:
      all 0.2s ease-out,
      color 0.2s ease-out,
      top 0.2s ease-out;
    transform: translateY(10px);
  }

  .SelectField-label--active {
    transform: translateY(-10px);
    font-size: 0.85rem;
  }

  .SelectField-dropdown {
    display: flex;
    position: absolute;
    top: 100%;
    width: calc(100% - 20px);
    background-color: var(--background-base);
    border: 1px solid var(--border-primary);
    border-radius: var(--snt-border-radius, 12px);
    box-shadow: var(--shadow-elevated);
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    padding: 10px;
    flex-direction: column;
    align-items: stretch;
  }

  .SelectField-option {
    padding: 10px 16px;
    background-color: transparent;
    border-radius: var(--snt-border-radius, 12px);
    text-align: left;
  }

  .SelectField-option:hover {
    background-color: var(--background-elevated-2-hover);
  }

  .SelectField-option:active {
    background-color: var(--background-top);
  }

  .SelectField-icon {
    text-align: left;
  }

  .SelectField-icon,
  .SelectField-expand-icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .SelectField-icon--left {
    left: 0;
  }

  .SelectField-icon--right {
    right: 30px;
  }

  .SelectField-icon--active {
    color: var(--action-suggested);
  }

  .SelectField-expand-icon {
    right: 8px;
  }
</style>
