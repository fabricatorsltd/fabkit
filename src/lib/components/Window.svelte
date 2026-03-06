<script>
  import { resolveProps } from "../system.js";
  import { onMount } from "svelte";
  import { getEngine } from "../EngineContext.js";

  let {
    top,
    content,
    flat = false,
    hideTitleBarOnScroll = false,
    class: className = "",
    // Collect expressive syntax props
    ...rest
  } = $props();

  let ref = $state(null);
  let maximized = $state(false);
  let resizing = $state(false);

  let contentElement = $state();
  let topHidden = $state(false);
  let lastScrollTop = 0;

  let engineInstance = null;
  try {
    engineInstance = getEngine();
  } catch {
    engineInstance = null;
  }

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
    if (!engineInstance) return;

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
    rest.margin !== undefined
      ? rest.margin
      : flat || maximized
        ? [0, 0, 0, 0]
        : [10, 10, 10, 10],
  );
  const finalBg = $derived(rest.bg !== undefined ? rest.bg : "var(--background-base)");
  const finalBorderRadius = $derived(
    rest.borderRadius !== undefined
      ? rest.borderRadius
      : flat || maximized
        ? [0, 0, 0, 0]
        : "var(--snt-border-radius, 12px)",
  );
  const finalShadow = $derived(
    rest.shadow !== undefined
      ? rest.shadow
      : flat || maximized
        ? "none"
        : "0 0 10px rgba(0, 0, 0, 0.3)",
  );

  const processedProps = $derived.by(() => {
    const defaults = {
      margin: finalMargin,
      padding: rest.padding ?? [0, 0, 0, 0],
      bg: finalBg,
      borderWidth: rest.borderWidth ?? (flat ? [0, 0, 0, 0] : [1, 1, 1, 1]),
      borderColor: rest.borderColor ?? "var(--border-secondary)",
      borderStyle: rest.borderStyle ?? "solid",
      borderRadius: finalBorderRadius,
      shadow: finalShadow,
      zIndex: rest.zIndex ?? 0,
      ...rest
    };
    return resolveProps(defaults);
  });
</script>

<div
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
  bind:this={ref}
  style={[
    processedProps.styles,
    `height: ${flat || maximized ? '100vh' : 'calc(100vh - 20px)'}`
  ].filter(Boolean).join('; ')}
  {...processedProps.filteredRest}
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
</div>

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
