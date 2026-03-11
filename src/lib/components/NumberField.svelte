<script>
  import { resolveProps } from "../system.js";
  import PhPlus from "../icons/components/Plus.svelte";
  import PhMinus from "../icons/components/Minus.svelte";

  let {
    value = $bindable(0),
    label = "",
    min = undefined,
    max = undefined,
    step = 1,
    icon = "",
    iconPosition = "right",
    // Collect expressive syntax props
    class: className = "",
    ...rest
  } = $props();

  let isActive = $state(false);
  let hasContent = $derived(value !== undefined && value !== "");

  function clamp(v) {
    let n = Number(v);
    if (min !== undefined && n < min) n = min;
    if (max !== undefined && n > max) n = max;
    return n;
  }

  function increment() {
    value = clamp(Number(value) + step);
  }

  function decrement() {
    value = clamp(Number(value) - step);
  }

  function handleInput(event) {
    value = clamp(event.target.value);
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
  class="NumberField {className}"
  style={processedProps.styles}
  {...processedProps.filteredRest}
>
  {#if label}
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label
      class="NumberField-label"
      class:NumberField-label--active={isActive || hasContent}
    >
      {label}
    </label>
  {/if}
  <div class="NumberField-row">
    <input
      type="number"
      class="NumberField-input"
      value={value}
      {min}
      {max}
      {step}
      oninput={handleInput}
      onfocus={() => (isActive = true)}
      onblur={() => (isActive = hasContent)}
    />
    <div class="NumberField-steppers">
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <button class="NumberField-btn" onclick={increment} type="button">
        <PhPlus size={14} />
      </button>
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <button class="NumberField-btn" onclick={decrement} type="button">
        <PhMinus size={14} />
      </button>
    </div>
  </div>
</div>

<style>
  :global(.NumberField) {
    position: relative;
  }

  .NumberField-label {
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

  .NumberField-label--active {
    transform: translateY(-15px);
    font-size: 0.85rem;
  }

  .NumberField-row {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border-tertiary);
  }

  .NumberField-row:focus-within {
    border-bottom: 2px solid var(--action-suggested);
  }

  .NumberField-input {
    flex: 1;
    border: none;
    font-size: 100%;
    padding: 8px 0;
    background: transparent;
    color: var(--text-primary);
    outline: none;
    -moz-appearance: textfield;
  }

  .NumberField-input::-webkit-inner-spin-button,
  .NumberField-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .NumberField-steppers {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .NumberField-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 2px 4px;
    line-height: 1;
  }

  .NumberField-btn:hover {
    color: var(--text-primary);
  }
</style>
