<script>
  import Skeleton from "./Skeleton.svelte";
  import { onMount, onDestroy } from "svelte";

  let {
    model = $bindable(false),
    class: className = "",
    // Skeleton Props Pass-through
    margin = [0, 0, 0, 0],
    bg,
    bgHover,
    bgFocus,
    bgActive,
    borderWidth,
    borderColor,
    shadow,
    zIndex = 0,
    ref = $bindable(),
    ...rest
  } = $props();

  let value = $state(model);
  let dragging = $state(false);
  let hasMoved = $state(false);
  let justDragged = $state(false); // To prevent click event after drag
  let startX = $state(4); // initial position of the handle
  let initialPosition = $state(4);
  let handleStyle = $state({ left: "4px", transition: "initial" });

  // Watcher for model prop
  $effect(() => {
    value = model;
    updateHandlePosition();
  });

  /**
   * @param {MouseEvent} event
   */
  function startDrag(event) {
    dragging = true;
    hasMoved = false;
    startX = event.clientX;
    initialPosition = value ? 34 : 4;
    handleStyle.transition = "initial"; // Disable transition during drag

    /**
     * @param {MouseEvent} moveEvent
     */
    const moveHandler = (moveEvent) => {
      const diff = moveEvent.clientX - startX;
      if (Math.abs(diff) > 5) {
        hasMoved = true;
      }
      let newPosition = initialPosition + diff;
      newPosition = Math.max(4, Math.min(34, newPosition)); // Clamp position between 4px and 34px
      handleStyle.left = `${newPosition}px`;
      updateValueBasedOnPosition(newPosition);
    };

    const stopDrag = () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseup", stopDrag);
      dragging = false;
      justDragged = true; // Set flag to prevent click
      setTimeout(() => (justDragged = false), 0); // Reset after a short delay
      handleStyle.transition = "left 0.2s ease-in-out";
      model = value; // Update the bound prop
      updateHandlePosition();
    };

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseup", stopDrag);
  }

  function updateValueBasedOnPosition(position) {
    /**
     * @param {number} position
     */
    const newValue = position > 15; // Threshold for switching
    if (value !== newValue) {
      value = newValue;
      model = value; // Update the bound prop immediately during drag
    }
  }

  function onClick() {
    if (!dragging && !justDragged) {
      value = !value;
      model = value; // Update the bound prop
      updateHandlePosition();
    }
    justDragged = false; // Reset justDragged in case it wasn't a drag
  }

  function updateHandlePosition() {
    handleStyle.left = value ? "34px" : "4px";
    handleStyle.transition = "left 0.2s ease-in-out";
  }

  onMount(() => {
    console.debug("Switcher mounted");
    updateHandlePosition();
  });

  const finalBg = $derived(
    bg !== undefined
      ? bg
      : value
        ? "var(--action-suggested)"
        : "var(--background-elevated)",
  );
  const finalShadow = $derived(
    shadow !== undefined ? shadow : value ? "var(--shadow-elevated-2)" : "none",
  );
  const finalBorderColor = $derived(
    borderColor !== undefined
      ? borderColor
      : value
        ? "transparent"
        : "var(--border-primary)",
  );
  const finalBorderWidth = $derived(
    borderWidth !== undefined ? borderWidth : [1, 1, 1, 1],
  );
</script>

<Skeleton
  class="Switcher {className} {value ? 'Switcher--activated' : ''}"
  onclick={onClick}
  bind:ref
  bg={finalBg}
  shadow={finalShadow}
  borderColor={finalBorderColor}
  borderWidth={finalBorderWidth}
  borderRadius="var(--snt-border-radius, 20px)"
  padding={[0, 0, 0, 0]}
  {margin}
  {zIndex}
  role="switch"
  aria-checked={value}
  tabindex="0"
  onkeydown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  }}
  {...rest}
>
  <div
    class="Switcher-handler"
    style={handleStyle.left
      ? `left: ${handleStyle.left}; transition: ${handleStyle.transition};`
      : ""}
    onmousedown={(e) => {
      e.preventDefault();
      startDrag(e);
    }}
    role="none"
  ></div>
</Skeleton>

<style>
  :global(.Switcher) {
    width: 60px;
    height: 28px;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
  }

  :global(.Switcher--activated) {
  }

  .Switcher-handler {
    width: 20px;
    height: 20px;
    background-color: var(--text-secondary);
    border-radius: 50%;
    position: absolute;
    cursor: grab;
    box-shadow: var(--shadow-elevated);
  }

  .Switcher--activated .Switcher-handler {
    background-color: var(--background-base);
  }
</style>
