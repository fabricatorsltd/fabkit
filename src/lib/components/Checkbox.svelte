<script>
  import Skeleton from "./Skeleton.svelte";
  import PhCheck from "../icons/components/Check.svelte";
  import PhMinus from "../icons/components/Minus.svelte";

  let {
    checked = $bindable(false),
    label = "",
    indeterminate = false,
    disabled = false,
    onChange,
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

  if (rest.onchange !== undefined) delete rest.onchange;

  function toggle() {
    if (disabled) return;
    checked = !checked;
    onChange?.(checked);
  }
</script>

<Skeleton
  class="Checkbox {className}"
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
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="Checkbox-wrapper"
    class:Checkbox-wrapper--disabled={disabled}
    onclick={toggle}
  >
    <div
      class="Checkbox-box"
      class:Checkbox-box--checked={checked || indeterminate}
    >
      {#if indeterminate}
        <PhMinus size={12} />
      {:else if checked}
        <PhCheck size={12} />
      {/if}
    </div>
    {#if label}
      <span class="Checkbox-label">{label}</span>
    {/if}
  </div>
</Skeleton>

<style>
  .Checkbox-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    user-select: none;
  }

  .Checkbox-wrapper--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .Checkbox-box {
    width: 18px;
    height: 18px;
    border: 2px solid var(--border-secondary);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    transition:
      background-color 0.15s ease,
      border-color 0.15s ease;
    flex-shrink: 0;
    color: white;
  }

  .Checkbox-box--checked {
    background: var(--action-suggested);
    border-color: var(--action-suggested);
  }

  .Checkbox-label {
    color: var(--text-primary);
    font-size: 0.95rem;
  }
</style>
