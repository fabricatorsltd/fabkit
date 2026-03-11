<script>
  import { resolveProps } from "../system.js";

  let {
    value = $bindable(0),
    min = 0,
    max = 100,
    points = [],
    labels = [],
    class: className = "",
    // Collect expressive syntax props
    ...rest
  } = $props();

  let ref = $state(null);
  let dragging = $state(false);
  let startX = 0;
  let startValue = 0;
  let sliderWidth = $state(0);

  let labelPositions = $derived(
    points.map((point) => ((point - min) / (max - min)) * 100),
  );

  let handleStyle = $derived.by(() => {
    const handleWidth = 20;
    const sliderPadding = handleWidth / 2;
    const position =
      sliderWidth > 0
        ? ((value - min) / (max - min)) * (sliderWidth - sliderPadding * 2)
        : 0;
    const positionPercentage =
      sliderWidth > 0 ? (position / sliderWidth) * 100 : 0;
    return `left: ${positionPercentage}%`;
  });

  $effect(() => {
    if (ref) {
      sliderWidth = ref.offsetWidth;
    }
  });

  function startDrag(event) {
    dragging = true;
    startX = event.clientX;
    startValue = value;
    if (ref) sliderWidth = ref.offsetWidth;

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseup", upHandler);
  }

  function moveHandler(event) {
    if (!dragging) return;
    const diffX = event.clientX - startX;
    const percentage = diffX / sliderWidth;
    const valueDiff = percentage * (max - min);
    let newValue = startValue + valueDiff;
    newValue = Math.max(min, Math.min(newValue, max));
    value = newValue;
  }

  function upHandler() {
    window.removeEventListener("mousemove", moveHandler);
    window.removeEventListener("mouseup", upHandler);
    dragging = false;
  }

  function onClick(event) {
    if (!ref) return;
    const rect = ref.getBoundingClientRect();
    const clickPosition = (event.clientX - rect.left) / rect.width;
    let newValue = min + clickPosition * (max - min);
    newValue = Math.max(min, Math.min(newValue, max));
    value = newValue;
  }

  const finalBg = $derived(rest.bg !== undefined ? rest.bg : "var(--background-top)");

  const containerProps = $derived.by(() => {
    const defaults = {
      margin: rest.margin ?? [0, 0, 0, 0],
      padding: rest.padding ?? [0, 0, 0, 0],
      bg: "transparent",
      borderWidth: [0, 0, 0, 0],
      borderColor: "transparent",
      shadow: rest.shadow ?? "none",
      zIndex: rest.zIndex ?? 0,
      ...rest
    };
    return resolveProps(defaults);
  });

  const trackProps = $derived.by(() => {
    return resolveProps({
      bg: finalBg,
      borderWidth: rest.borderWidth ?? [1, 1, 1, 1],
      borderColor: rest.borderColor ?? "var(--border-primary)",
      borderStyle: rest.borderStyle ?? "solid",
      borderRadius: rest.borderRadius ?? "var(--snt-border-radius, 100px)"
    });
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="Slider {className}"
  onclick={onClick}
  bind:this={ref}
  style={containerProps.styles}
  {...containerProps.filteredRest}
>
  <div
    class="Slider-track"
    style={trackProps.styles}
  />
  <div
    class="Slider-handle"
    style={handleStyle}
    onmousedown={(e) => {
      e.preventDefault();
      startDrag(e);
    }}
  ></div>
  {#if labels.length > 0}
    <div class="Slider-labels">
      {#each labels as label, index}
        <span style:left="{labelPositions[index]}%">{label}</span>
      {/each}
    </div>
  {/if}
</div>

<style>
  .Slider {
    width: 100%;
    position: relative;
    height: 50px;
  }

  :global(.Slider-track) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 10px;
    transform: translateY(-50%);
  }

  .Slider-handle {
    position: absolute;
    top: 0;
    width: 20px;
    height: 20px;
    background-color: var(--action-suggested);
    border-radius: 50%;
    transform: translateY(-50%);
    margin-left: -10px;
  }

  .Slider-handle:hover {
    background-color: var(--action-suggested-hover);
  }

  .Slider-handle:active {
    background-color: var(--action-suggested-active);
  }

  .Slider-labels {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 16px 0 0 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .Slider-labels span {
    position: static;
    transform: none;
  }
</style>
