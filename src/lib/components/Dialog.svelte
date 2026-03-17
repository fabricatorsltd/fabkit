<script>
  import { resolveProps } from "../system.js";
  import { onMount } from "svelte";

  let {
    title = "",
    onClose,
    closeOnBackdrop = true,
    closeOnEscape = true,
    footer,
    children,
    class: className = "",
    ...rest
  } = $props();

  function handleBackdropClick(event) {
    if (!closeOnBackdrop) return;
    if (event.target === event.currentTarget) onClose?.();
  }

  function handleBackdropKeydown(event) {
    if (event.key === "Escape" && closeOnEscape) onClose?.();
    if ((event.key === "Enter" || event.key === " ") && closeOnBackdrop) onClose?.();
  }

  onMount(() => {
    if (!onClose || !closeOnEscape) return;
    const handler = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const processedProps = $derived.by(() => {
    const defaults = {
      padding: rest.padding ?? [16, 20, 16, 20],
      bg: rest.bg ?? "var(--background-elevated)",
      borderColor: rest.borderColor ?? "transparent",
      borderWidth: rest.borderWidth ?? [0, 0, 0, 0],
      borderRadius: rest.borderRadius ?? "10px",
      shadow: rest.shadow ?? "var(--shadow-top)",
      ...rest,
    };
    return resolveProps(defaults);
  });
</script>

<div
  class="Dialog-backdrop"
  onclick={handleBackdropClick}
  onkeydown={handleBackdropKeydown}
  tabindex="0"
  role="button"
  aria-label="Close dialog"
>
  <div class="Dialog {className}" aria-modal="true" role="dialog">
    <div class="Dialog-content" style={processedProps.styles} {...processedProps.filteredRest}>
      {#if title}
        <div class="Dialog-head">
          <h2 class="Dialog-head-title">{title}</h2>
        </div>
      {/if}

      <div class="Dialog-body">
        {@render children?.()}
      </div>

      {#if footer}
        <div class="Dialog-footer">
          {@render footer?.()}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .Dialog-backdrop {
    position: fixed;
    inset: 0;
    z-index: var(--z-dialog, 1000);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    background-color: var(--background-translucent);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
  }

  .Dialog {
    display: flex;
    flex-direction: column;
  }

  .Dialog-content {
    min-width: 240px;
    max-width: 90vw;
    border-radius: 10px;
    background: var(--background-elevated);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.10);
  }

  .Dialog-head {
    text-align: center;
    margin-bottom: 14px;
  }

  .Dialog-head-title {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  .Dialog-footer {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 14px;
  }
</style>
