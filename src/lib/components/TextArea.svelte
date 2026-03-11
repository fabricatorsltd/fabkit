<script>
  import Skeleton from "./Skeleton.svelte";

  let {
    value = $bindable(""),
    label = "",
    placeholder = "",
    rows = 4,
    autoResize = false,
    readOnly = false,
    flat = false,
    // Skeleton pass-through
    margin = [0, 0, 0, 0],
    padding = [0, 0, 0, 0],
    bg = "transparent",
    bgHover,
    bgFocus,
    bgActive,
    borderWidth = [0, 0, 0, 0],
    borderColor = "transparent",
    borderStyle = "solid",
    borderRadius = [0, 0, 0, 0],
    shadow = "none",
    zIndex = 0,
    ref = $bindable(),
    class: className = "",
    ...rest
  } = $props();

  let isActive = $state(false);
  let hasContent = $derived(value.toString().length > 0);
  let textareaEl = $state();

  function handleInput(event) {
    value = event.target.value;
    if (autoResize && textareaEl) {
      textareaEl.style.height = "auto";
      textareaEl.style.height = textareaEl.scrollHeight + "px";
    }
  }

  $effect(() => {
    if (autoResize && textareaEl && value !== undefined) {
      textareaEl.style.height = "auto";
      textareaEl.style.height = textareaEl.scrollHeight + "px";
    }
  });
</script>

<Skeleton
  class="TextArea {className}"
  bind:ref
  {margin}
  {padding}
  {bg}
  {bgHover}
  {bgFocus}
  {bgActive}
  {borderWidth}
  {borderColor}
  {borderStyle}
  {borderRadius}
  {shadow}
  {zIndex}
  {...rest}
>
  {#if label}
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label
      class="TextArea-label"
      class:TextArea-label--active={isActive || hasContent}
    >
      {label}
    </label>
  {/if}
  <textarea
    class="TextArea-input"
    class:TextArea-input--flat={flat}
    {placeholder}
    {rows}
    readonly={readOnly}
    value={value}
    oninput={handleInput}
    onfocus={() => (isActive = true)}
    onblur={() => (isActive = hasContent)}
    style:border-bottom-width={flat ? "0" : "1px"}
    bind:this={textareaEl}
  ></textarea>
</Skeleton>

<style>
  :global(.TextArea) {
    position: relative;
  }

  .TextArea-label {
    position: absolute;
    left: 0;
    top: 0;
    color: var(--text-secondary);
    pointer-events: none;
    transition:
      transform 0.2s ease-out,
      font-size 0.2s ease-out;
    transform: translateY(10px);
  }

  .TextArea-label--active {
    transform: translateY(-15px);
    font-size: 0.85rem;
  }

  .TextArea-input {
    width: 100%;
    border: none;
    border-bottom: 1px solid var(--border-tertiary);
    font-size: 100%;
    padding: 8px 0;
    background: transparent;
    color: var(--text-primary);
    outline: none;
    resize: vertical;
    font-family: inherit;
    line-height: 1.5;
  }

  .TextArea-input:focus:not(.TextArea-input--flat) {
    border-bottom: 2px solid var(--action-suggested);
  }
</style>
