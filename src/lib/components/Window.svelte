<script>
  import Skeleton from "./Skeleton.svelte";
  import { onMount } from "svelte";
  import { getEngine } from "../EngineContext.js";

  let {
    top,
    content,
    flat = false,
    hideTitleBarOnScroll = false,
    class: className = "",
    // Skeleton Props Pass-through
    margin,
    padding = [0, 0, 0, 0],
    bg,
    bgHover,
    bgFocus,
    bgActive,
    borderWidth = flat ? [0, 0, 0, 0] : [1, 1, 1, 1],
    borderWidthHover,
    borderWidthFocus,
    borderWidthActive,
    borderColor = "var(--border-secondary)",
    borderStyle = "solid",
    borderRadius,
    shadow,
    zIndex = 0,
    ref = $bindable(),
    ...rest
  } = $props();

  let maximized = $state(false);
  let resizing = $state(false);

  let contentElement = $state();
  let topHidden = $state(false);
  let lastScrollTop = 0;

  const engineInstance = getEngine();

  let unsubscribeResize;
  let resizeInterval;

  function handleContentScroll() {
    if (!hideTitleBarOnScroll || !contentElement) return;

    const current = contentElement.scrollTop;

    if (current === 0) {
      topHidden = false;
      lastScrollTop = 0;
      return;
    }

    if (current > lastScrollTop) {
      topHidden = true;
    } else if (current < lastScrollTop) {
      topHidden = false;
    }

    lastScrollTop = current;
  }

  onMount(() => {
    unsubscribeResize = engineInstance.onResize(() => {
      if (ref) {
        const screenHeight = screen.availHeight - 20;
        engineInstance.isMaximized().then((isMax) => {
          maximized = isMax || ref.clientHeight === screenHeight;
        });
      }
    });

    const windowResizeHandler = () => {
      resizing = true;
      clearInterval(resizeInterval);
      resizeInterval = setInterval(() => {
        if (ref) {
          // Store size if needed
        }
      }, 100);

      setTimeout(() => {
        clearInterval(resizeInterval);
        resizing = false;
      }, 600);

      engineInstance.isMaximized().then((isMax) => {
        if (isMax) {
          maximized = true;
        } else {
          if (ref) {
            const screenHeight = screen.availHeight - 20;
            maximized = ref.clientHeight === screenHeight;
          }
        }
      });
    };
    window.addEventListener("resize", windowResizeHandler);

    return () => {
      if (unsubscribeResize) {
        unsubscribeResize();
      }
      window.removeEventListener("resize", windowResizeHandler);
      clearInterval(resizeInterval);
    };
  });

  const finalMargin = $derived(
    margin !== undefined
      ? margin
      : flat || maximized
        ? [0, 0, 0, 0]
        : [10, 10, 10, 10],
  );
  const finalBg = $derived(bg !== undefined ? bg : "var(--background-base)");
  const finalBorderRadius = $derived(
    borderRadius !== undefined
      ? borderRadius
      : flat || maximized
        ? [0, 0, 0, 0]
        : "var(--snt-border-radius, 12px)",
  );
  const finalShadow = $derived(
    shadow !== undefined
      ? shadow
      : flat || maximized
        ? "none"
        : "0 0 10px rgba(0, 0, 0, 0.3)",
  );
</script>

<Skeleton
  class={[
    "Window",
    className,
    flat && "Window--flat",
    topHidden && "Window--top-hidden",
    maximized && "Window--maximized",
    resizing && "Window--resizing",
  ]
    .filter(Boolean)
    .join(" ")}
  bind:ref
  margin={finalMargin}
  {padding}
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
  borderRadius={finalBorderRadius}
  shadow={finalShadow}
  {zIndex}
  style="height: {flat || maximized ? '100vh' : 'calc(100vh - 20px)'}"
  {...rest}
>
  <div class="Window-top">
    {@render top?.()}
  </div>
  <div
    class="Window-content"
    bind:this={contentElement}
    onscroll={handleContentScroll}
  >
    {@render content?.()}
  </div>
</Skeleton>

<style>
  :global(.Window) {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  :global(.Window.Window--maximized) {
    height: 100vh;
  }

  .Window-top {
    background-color: var(--background-top);
  }

  .Window-content {
    flex-grow: 1;
    overflow: auto;
    background-color: var(--background-elevated);
    border-top: 1px solid var(--border-primary);
    border-radius: var(--snt-border-radius, 12px);
  }

  :global(.Window.Window--top-hidden) .Window-top {
    display: none;
  }

  :global(.Window.Window--flat) .Window-top {
    background-color: transparent;
  }

  :global(.Window.Window--flat) .Window-content {
    background-color: transparent;
    border-top: none;
    border-radius: 0;
  }
</style>
