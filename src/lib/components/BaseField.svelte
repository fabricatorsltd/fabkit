<script>
  import Skeleton from "./Skeleton.svelte";
  let {
    value = $bindable(""),
    label = "",
    placeholder = "",
    type = "text",
    icon = "",
    iconPosition = "right",
    readOnly = false,
    flat = false,
    contained = false,
    /** @type {((event: Event) => void) | undefined} */
    oninput,
    class: className = "",
    // Skeleton Props Pass-through
    margin = [0, 0, 0, 0],
    padding,
    bg,
    bgHover,
    bgFocus,
    bgActive,
    borderWidth,
    borderWidthHover,
    borderWidthFocus,
    borderWidthActive,
    borderColor,
    borderColorHover,
    borderColorFocus,
    borderColorActive,
    borderStyle = "solid",
    borderRadius,
    shadow = "none",
    shadowSecondary,
    zIndex = 0,
    ref = $bindable(),
    ...rest
  } = $props();

  let isActive = $state(false);
  let hasContent = $derived(value.toString().length > 0);
  let isDateLike = $derived(
    ["date", "time", "datetime-local", "month", "week"].includes(type),
  );
  let inputElement = $state();

  function focusInput() {
    inputElement?.focus();
  }

  /**
   * @param {Event} event
   */
  function handleInput(event) {
    /** @type {HTMLInputElement} */
    const target = event.target;
    value = target.value;
    if (oninput) oninput(event);
  }

  function handleBlur() {
    isActive = hasContent;
  }

  function handleFocus() {
    isActive = true;
  }

  const finalPadding = $derived(
    padding !== undefined
      ? padding
      : contained
        ? [2, 10, 2, 10]
        : [8, 0, 8, 0],
  );

  const finalBg = $derived(
    bg !== undefined
      ? bg
      : contained
        ? "var(--background-elevated)"
        : "transparent",
  );

  const finalBorderRadius = $derived(
    borderRadius !== undefined
      ? borderRadius
      : contained
        ? "var(--snt-border-radius, 12px)"
        : [0, 0, 0, 0],
  );

  const finalBorderColor = $derived(
    borderColor !== undefined ? borderColor : "transparent",
  );
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<Skeleton
  class="BaseField {className}"
  bind:ref
  onclick={focusInput}
  {margin}
  padding={finalPadding}
  bg={finalBg}
  {bgHover}
  {bgFocus}
  {bgActive}
  {borderWidth}
  {borderWidthHover}
  {borderWidthFocus}
  {borderWidthActive}
  borderColor={finalBorderColor}
  {borderColorHover}
  {borderColorFocus}
  {borderColorActive}
  {borderStyle}
  borderRadius={finalBorderRadius}
  {shadow}
  {shadowSecondary}
  {zIndex}
  {...rest}
>
  {#if label}
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label
      class="BaseField-label"
      class:BaseField-label--active={isDateLike || isActive || hasContent}
      class:BaseField-label--icon-left={icon && iconPosition === "left"}
      class:BaseField-label--icon-right={icon && iconPosition === "right"}
    >
      {label}
    </label>
  {/if}
  <input
    {type}
    placeholder={label ? (isDateLike || isActive ? placeholder : "") : placeholder}
    {value}
    oninput={handleInput}
    onfocus={handleFocus}
    onblur={handleBlur}
    onkeydown={rest.onkeydown}
    class="BaseField-input"
    class:BaseField-input--icon-left={icon && iconPosition === "left"}
    class:BaseField-input--icon-right={icon && iconPosition === "right"}
    class:BaseField-input--flat={flat || contained}
    style:border-bottom-width={flat || contained ? "0" : "1px"}
    readonly={readOnly}
    bind:this={inputElement}
  />
  {#if icon}
    {@const Component = icon}
    <span
      class="BaseField-icon"
      class:BaseField-icon--left={iconPosition === "left"}
      class:BaseField-icon--right={iconPosition === "right"}
      class:BaseField-icon--active={isDateLike || isActive || hasContent}
    >
      <Component size={18} />
    </span>
  {/if}
</Skeleton>

<style>
  :global(.BaseField) {
    position: relative;
  }

  .BaseField-input {
    width: 100%;
    border: none;
    border-bottom: 1px solid var(--border-tertiary);
    font-size: 100%;
    padding: 8px 0;
    background: transparent;
    color: var(--text-primary);
    outline: none;
    line-height: normal;
    border-radius: inherit;
  }

  .BaseField-input:focus:not(.BaseField-input--flat) {
    border-bottom: 2px solid var(--action-suggested);
  }

  .BaseField-input:-webkit-autofill,
  .BaseField-input:-webkit-autofill:hover,
  .BaseField-input:-webkit-autofill:focus,
  .BaseField-input:-internal-autofill-selected {
    border-radius: inherit;
    -webkit-text-fill-color: var(--text-primary);
    caret-color: var(--text-primary);
    background-color: transparent !important;
    box-shadow: 0 0 0px 1000px transparent inset;
  }

  :global(.BaseField:has(input:-webkit-autofill)) .BaseField-label {
    transform: translateY(-15px);
    font-size: 0.85rem;
    left: 0 !important;
  }

  .BaseField-label {
    position: absolute;
    left: 0;
    top: 0;
    color: var(--text-secondary);
    pointer-events: none;
    transition:
      transform 0.2s ease-out,
      font-size 0.2s ease-out,
      color 0.2s ease-out,
      left 0.2s ease-out;
    transform: translateY(10px);
  }

  /* shift label right when icon is on the left and field is inactive */
  .BaseField-label--icon-left {
    left: 26px;
  }

  /* when active (focused or has content), label floats to top-left regardless of icon */
  .BaseField-label--active {
    transform: translateY(-15px);
    font-size: 0.85rem;
    left: 0 !important;
  }

  /* input padding to avoid overlapping the icon */
  .BaseField-input--icon-left {
    padding-left: 26px;
  }

  .BaseField-input--icon-right {
    padding-right: 26px;
  }

  .BaseField-icon {
    position: absolute;
    top: 59%;
    transform: translateY(-67%);
  }

  .BaseField-icon--active {
    color: var(--action-suggested);
  }

  .BaseField-icon--left {
    left: 0;
  }

  .BaseField-icon--right {
    right: 0;
  }
</style>
