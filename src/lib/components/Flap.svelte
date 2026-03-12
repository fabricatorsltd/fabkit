<script>
  import Skeleton from "./Skeleton.svelte";

  let {
    sidebar,
    content,
    children,
    open = $bindable(false),
    width = 320,
    placement = "left",
    closeOnEscape = true,
    closeOnBackdrop = true,
    keepMounted = true,
    zIndex = 1000,
    class: className = "",
    ref = $bindable(),
    ...rest
  } = $props();

  const widthCss = $derived.by(() =>
    typeof width === "number" ? `${width}px` : width
  );

  function close() {
    open = false;
  }

  function handleBackdropClick(e) {
    if (!closeOnBackdrop) return;
    if (e.target !== e.currentTarget) return;
    close();
  }

  $effect(() => {
    if (!open) return;
    if (!closeOnEscape) return;
    if (typeof window === "undefined") return;

    const onKeydown = (e) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  });
</script>

<Skeleton
  class={[
    "Flap",
    placement === "right" ? "Flap--right" : "Flap--left",
    open ? "Flap--open" : "Flap--closed",
    className,
  ]
    .filter(Boolean)
    .join(" ")}
  bind:ref
  style={[`--flap-width: ${widthCss}`, `--flap-z: ${zIndex}`].join("; ")}
  {...rest}
>
  <div class="Flap-content">
    {@render content?.()}
    {@render children?.()}
  </div>

  {#if keepMounted}
    <div
      class="Flap-overlay"
      aria-hidden={!open}
      style:pointer-events={open ? "auto" : "none"}
      onclick={handleBackdropClick}
    >
      <div class="Flap-backdrop" />

      <div class="Flap-panel">
        {@render sidebar?.()}
      </div>
    </div>
  {:else}
    {#if open}
      <div class="Flap-overlay" onclick={handleBackdropClick}>
        <div class="Flap-backdrop" />
        <div class="Flap-panel">
          {@render sidebar?.()}
        </div>
      </div>
    {/if}
  {/if}
</Skeleton>

<style>
  :global(.Flap) {
    position: relative;
    display: flex;
    min-width: 0;
    min-height: 0;
    height: 100%;
    overflow: hidden;
  }

  .Flap-content {
    flex: 1 1 auto;
    min-width: 0;
    min-height: 0;
    overflow: auto;
  }

  .Flap-overlay {
    position: absolute;
    inset: 0;
    z-index: var(--flap-z, 1000);
  }

  .Flap-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.18);
    backdrop-filter: blur(3px);
    opacity: 0;
    transition: opacity 0.16s ease;
  }

  :global(.Flap--open) .Flap-backdrop {
    opacity: 1;
  }

  .Flap-panel {
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--flap-width, 320px);
    overflow: auto;
    background: var(--background-elevated);
    box-shadow: var(--shadow-elevated-2);
    transition: transform 0.2s ease;
  }

  :global(.Flap--left) .Flap-panel {
    left: 0;
    transform: translateX(-100%);
    border-right: 1px solid var(--border-primary);
  }

  :global(.Flap--right) .Flap-panel {
    right: 0;
    transform: translateX(100%);
    border-left: 1px solid var(--border-primary);
  }

  :global(.Flap--open) .Flap-panel {
    transform: translateX(0);
  }

</style>
