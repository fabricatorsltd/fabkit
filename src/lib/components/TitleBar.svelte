<script>
  import Skeleton from "./Skeleton.svelte";
  import { onMount, onDestroy } from "svelte";
  import { getEngine } from "../EngineContext.js";
  import PhMinus from "../icons/components/Minus.svelte";
  import PhSquare from "../icons/components/Square.svelte";
  import PhX from "../icons/components/X.svelte";

  let engineInstance = null;
  try {
    engineInstance = getEngine();
  } catch {
    engineInstance = null;
  }

  let {
    area,
    class: className = "",
    showWindowControls = engineInstance !== null && engineInstance !== undefined,
    onScrollTop,
    onScrollBottom,
    // Skeleton Props Pass-through
    margin = [0, 0, 0, 0],
    padding,
    bg,
    bgHover,
    bgFocus,
    bgActive,
    borderWidth = [0, 0, 1, 0],
    borderWidthHover,
    borderWidthFocus,
    borderWidthActive,
    borderColor = "var(--border-primary)",
    borderStyle = "solid",
    borderRadius = [0, 0, 0, 0],
    shadow = "none",
    zIndex = 0,
    ref = $bindable(),
    ...rest
  } = $props();

  function minimizeWindow() {
    engineInstance?.minimize();
  }

  async function maximizeWindow() {
    if (await engineInstance?.isMaximized()) {
      engineInstance?.unmaximize();
      return;
    }
    engineInstance?.maximize();
  }

  let cleanupScroll;
  let lastScrollTop = 0;
  let lastScrollDirection = null;

  function closeWindow() {
    engineInstance?.close();
  }

  onMount(() => {
    if (!onScrollTop && !onScrollBottom) return;

    const windowRoot = ref?.closest?.(".Window");
    const contentElement = windowRoot?.querySelector?.(".Window-content");

    const target = contentElement || window;
    lastScrollTop = contentElement ? contentElement.scrollTop : window.scrollY;

    const handler = () => {
      const current = contentElement ? contentElement.scrollTop : window.scrollY;

      if (current > lastScrollTop && lastScrollDirection !== "down") {
        lastScrollDirection = "down";
        onScrollBottom?.();
      } else if (current < lastScrollTop && lastScrollDirection !== "up") {
        lastScrollDirection = "up";
        onScrollTop?.();
      }

      lastScrollTop = current;
    };

    target.addEventListener("scroll", handler, { passive: true });
    cleanupScroll = () => target.removeEventListener("scroll", handler);
  });

  onDestroy(() => {
    cleanupScroll?.();
  });

  const finalPadding = $derived(
    padding !== undefined ? padding : [0, 10, 0, 10],
  );
  const finalBg = $derived(bg !== undefined ? bg : "var(--background-base)");
</script>

<Skeleton
  class="TitleBar {className}"
  bind:ref
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
  {borderColor}
  {borderStyle}
  {borderRadius}
  {shadow}
  {zIndex}
  {...rest}
>
  <div class="TitleBar-area" data-tauri-drag-region>
    {@render area?.()}
  </div>
  {#if showWindowControls}
    <div class="TitleBar-controls">
      <button class="TitleBar-controls-item" onclick={minimizeWindow}>
        <PhMinus size={16} />
      </button>
      <button class="TitleBar-controls-item" onclick={maximizeWindow}>
        <PhSquare size={16} />
      </button>
      <button class="TitleBar-controls-item" onclick={closeWindow}>
        <PhX size={16} />
      </button>
    </div>
  {/if}
</Skeleton>

<style>
  :global(.TitleBar) {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    height: auto !important;
    min-height: 48px !important;
    position: sticky !important;
    top: 0 !important;
    z-index: 100 !important;
    backdrop-filter: blur(16px);
    background-color: var(--background-translucent);
    color: var(--text-primary);
    user-select: none;
  }

  .TitleBar-area {
    display: flex;
    align-items: center;
    flex-grow: 1;
    /* These Wails/Electron specific styles might not be needed in a pure SvelteKit app */
    /* --wails-draggable: drag; */
    /* -webkit-app-region: drag; */
  }

  .TitleBar-controls {
    display: flex;
    align-items: center;
  }

  .TitleBar-controls-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    color: var(--text-primary);
    border: none;
    background-color: transparent;
    border-radius: var(--snt-border-radius, 12px);
  }

  .TitleBar-controls-item:hover {
    background-color: var(--background-elevated-2-hover);
  }

  .TitleBar-controls-item:active {
    background-color: var(--background-top);
  }

  .TitleBar-controls-item:focus {
    outline: none;
  }
</style>
