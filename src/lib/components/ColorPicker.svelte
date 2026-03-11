<script>
  import Skeleton from "./Skeleton.svelte";

  let {
    value = $bindable("#000000"),
    label = "",
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

  let isOpen = $state(false);
  let wrapperEl = $state();
  let hexInput = $state(value);
  let uniqueId = Math.random().toString(36).substr(2, 9);

  $effect(() => {
    hexInput = value;
  });

  function toggleOpen() {
    isOpen = !isOpen;
  }

  function handleHexInput(event) {
    const v = event.target.value;
    hexInput = v;
    if (/^#[0-9A-Fa-f]{6}$/.test(v)) {
      value = v;
    }
  }

  function handleColorInput(event) {
    value = event.target.value;
    hexInput = event.target.value;
  }

  function handleClickOutside(event) {
    if (wrapperEl && !wrapperEl.contains(event.target)) {
      isOpen = false;
    }
  }

  $effect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });
</script>

<Skeleton
  class="ColorPicker {className}"
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
  <div class="ColorPicker-wrapper" bind:this={wrapperEl}>
    {#if label}
      <span class="ColorPicker-label">{label}</span>
    {/if}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="ColorPicker-trigger"
      onclick={toggleOpen}
      role="button"
      tabindex="0"
      onkeydown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleOpen();
        }
      }}
    >
      <div class="ColorPicker-swatch" style:background={value}></div>
      <span class="ColorPicker-value">{value}</span>
    </div>
    {#if isOpen}
      <div class="ColorPicker-dropdown">
        <input
          type="color"
          class="ColorPicker-native"
          value={value}
          oninput={handleColorInput}
        />
        <div class="ColorPicker-hex-row">
          <label class="ColorPicker-hex-label" for="hex-{uniqueId}">Hex</label>
          <input
            id="hex-{uniqueId}"
            type="text"
            class="ColorPicker-hex-input"
            value={hexInput}
            oninput={handleHexInput}
            maxlength={7}
          />
        </div>
      </div>
    {/if}
  </div>
</Skeleton>

<style>
  .ColorPicker-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid var(--border-tertiary);
    padding: 4px 0;
  }

  .ColorPicker-label {
    color: var(--text-secondary);
    font-size: 0.85rem;
    flex-shrink: 0;
  }

  .ColorPicker-trigger {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    flex: 1;
  }

  .ColorPicker-swatch {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    border: 1px solid var(--border-secondary);
    flex-shrink: 0;
  }

  .ColorPicker-value {
    color: var(--text-primary);
    font-size: 0.9rem;
    font-family: monospace;
  }

  .ColorPicker-dropdown {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    background: var(--background-elevated);
    border: 1px solid var(--border-primary);
    border-radius: var(--snt-border-radius, 10px);
    padding: 12px;
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    min-width: 180px;
  }

  .ColorPicker-native {
    width: 100%;
    height: 120px;
    border: none;
    padding: 0;
    cursor: pointer;
    border-radius: 6px;
  }

  .ColorPicker-hex-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .ColorPicker-hex-label {
    color: var(--text-secondary);
    font-size: 0.85rem;
    min-width: 28px;
  }

  .ColorPicker-hex-input {
    flex: 1;
    background: var(--background-base);
    border: 1px solid var(--border-secondary);
    border-radius: 6px;
    color: var(--text-primary);
    font-family: monospace;
    font-size: 0.9rem;
    padding: 4px 8px;
    outline: none;
  }

  .ColorPicker-hex-input:focus {
    border-color: var(--action-suggested);
  }
</style>
