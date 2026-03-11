<script>
  import Skeleton from "./Skeleton.svelte";
  import eventBus from "../EventBus.js";
  import PhCaretLeft from "../icons/components/CaretLeft.svelte";
  import PhCaretRight from "../icons/components/CaretRight.svelte";

  let {
    context,
    size = { left: 50, right: 50 },
    minLeft = 0,
    leftTrigger = 0,
    left,
    right,
    class: className = "",
    // Skeleton Props Pass-through
    margin = [0, 0, 0, 0],
    padding = [0, 0, 0, 0],
    bg = "transparent",
    bgHover,
    bgFocus,
    bgActive,
    borderWidth = [0, 0, 0, 0],
    borderWidthHover,
    borderWidthFocus,
    borderWidthActive,
    borderColor = "transparent",
    borderStyle = "solid",
    borderRadius = [0, 0, 0, 0],
    shadow = "none",
    zIndex = 0,
    ref = $bindable(),
    ...rest
  } = $props();

  let resizing = $state(false);
  let _size = $state({ left: size.left, right: size.right });
  let minLeftReached = $state(false);
  let overlayVisible = $state(false);

  function startResize() {
    resizing = true;
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  }

  /**
   * @param {MouseEvent} event
   */
  function mouseMove(event) {
    if (!ref) return;
    let leftWidth = event.clientX - ref.getBoundingClientRect().left;
    leftWidth = Math.max(leftWidth, minLeft);
    _size.left = (leftWidth / ref.clientWidth) * 100;
    checkMinLeft();
  }

  function mouseUp() {
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("mouseup", mouseUp);
    resizing = false;
  }

  function checkMinLeft() {
    if (typeof window !== "undefined") {
      minLeftReached = window.innerWidth <= leftTrigger;
    }
  }

  function toggleLeftOverlay() {
    overlayVisible = !overlayVisible;
  }

  function mustToggleLeftOverlay() {
    if (overlayVisible) {
      toggleLeftOverlay();
    }
  }

  $effect(() => {
    // Sync with prop changes
    _size = { left: size.left, right: size.right };
  });

  $effect(() => {
    checkMinLeft();

    if (leftTrigger > 0) {
      window.addEventListener("resize", checkMinLeft);
    }

    if (context) {
      eventBus.on(`${context}-close`, mustToggleLeftOverlay);
    }

    return () => {
      if (leftTrigger > 0) {
        window.removeEventListener("resize", checkMinLeft);
      }
      if (context) {
        eventBus.off(`${context}-close`, mustToggleLeftOverlay);
      }
    };
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<Skeleton
  class={[
    "Paned",
    className,
    resizing && "Paned--resizing",
    minLeftReached && "Paned--min-left-reached",
  ]
    .filter(Boolean)
    .join(" ")}
  bind:ref
  {margin}
  {padding}
  {bg}
  {bgHover}
  {bgFocus}
  {bgActive}
  {borderWidth}
  {borderWidthHover}
  {borderWidthFocus}
  {borderWidthActive}
  {borderColor}
  {borderStyle}
  {borderRadius}
  {shadow}
  {zIndex}
  {...rest}
>
  {#if minLeftReached}
    <button class="Paned-toggle" onclick={toggleLeftOverlay}>
      {#if overlayVisible}
        <PhCaretLeft size={20} />
      {:else}
        <PhCaretRight size={20} />
      {/if}
    </button>
  {/if}

  {#if !minLeftReached || overlayVisible}
    <div
      class="Paned-left"
      style:width="{_size.left}%"
      style:min-width="{minLeft}px"
      class:Paned-left--overlay-visible={overlayVisible}
      class:Paned-left--overlay-hidden={minLeftReached && !overlayVisible}
    >
      {@render left?.()}
    </div>
  {/if}

  <div class="Paned-divider" onmousedown={startResize}></div>

  <div class="Paned-right" style:left="{_size.left}%">
    {@render right?.()}
  </div>
</Skeleton>

<style>
  :global(.Paned) {
    display: flex;
    flex-direction: row;
    height: 100%;
    position: relative;
  }

  .Paned-left,
  .Paned-right {
    overflow: auto;
    display: flex;
    flex-direction: column;
  }

  .Paned-left {
    flex: 0 0 auto;
    transition: left 0.3s;
  }

  .Paned-left--overlay-visible,
  .Paned-left--overlay-hidden {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    min-width: 100% !important;
    z-index: 1000;
    border-top-right-radius: var(--snt-border-radius, 12px);
    border-bottom-right-radius: var(--snt-border-radius, 12px);
    box-shadow: var(--shadow-elevated-2);
    animation: slide-in 0.3s;
  }

  .Paned-left--overlay-hidden {
    animation: slide-out 0.3s;
  }

  .Paned-right {
    flex: 1 1 auto;
  }

  .Paned-toggle {
    position: absolute;
    left: 10px;
    bottom: 10px;
    z-index: 1010;
    background-color: var(--background-base);
    border: 1px solid var(--border-primary);
    border-radius: var(--snt-border-radius, 12px);
    padding: 5px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text-primary);
  }

  .Paned-toggle:hover {
    background-color: var(--background-elevated);
  }

  .Paned-toggle:active {
    background-color: var(--background-elevated-2);
  }

  .Paned-divider {
    cursor: ew-resize;
    background-color: var(--background-elevated-2);
    border: 2px solid transparent;
    transition: all 0.2s;
  }

  .Paned-divider:hover,
  .Paned--resizing .Paned-divider {
    background-color: var(--background-top);
    border: 2px solid var(--background-top);
  }

  @keyframes slide-in {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }

    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slide-out {
    from {
      transform: translateX(0);
      opacity: 1;
    }

    to {
      transform: translateX(-100%);
      opacity: 0;
    }
  }
</style>
