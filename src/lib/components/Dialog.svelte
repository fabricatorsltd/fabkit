<script>
  import { resolveProps } from "../system.js";
  import Button from "./Button.svelte";

  let {
    title = "",
    messages = [],
    confirm,
    confirmText = "Confirm",
    confirmType = "suggested",
    cancel,
    cancelText = "Cancel",
    children,
  } = $props();

  function handleCancel() {
    if (cancel) cancel();
  }

  function handleConfirm() {
    if (confirm) confirm();
  }

  const dialogContentProps = $derived.by(() => {
    return resolveProps({
      padding: [20, 20, 20, 20],
      bg: "var(--background-elevated)",
      borderColor: "transparent",
      borderWidth: [0, 0, 0, 0],
      borderRadius: "var(--snt-border-radius, 12px)",
      shadow: "var(--shadow-top)"
    });
  });
</script>

<div
  class="Dialog"
  class:Dialog--confirm={!!confirm}
  class:Dialog--cancel={!!cancel}
>
  <div
    class="Dialog-content"
    style={dialogContentProps.styles}
    {...dialogContentProps.filteredRest}
  >
    <div class="Dialog-content-head">
      <h2 class="Dialog-head-title">{title}</h2>
      {#each messages as message}
        <p class="Dialog-head-message">{message}</p>
      {/each}
      {@render children?.()}
    </div>
    <div class="Dialog-actions">
      {#if cancel || !confirm}
        <Button label={cancelText} onclick={handleCancel} />
      {/if}
      {#if confirm}
        <Button
          label={confirmText}
          onclick={handleConfirm}
          type={confirmType}
        />
      {/if}
    </div>
  </div>
</div>

<style>
  .Dialog {
    display: flex;
    flex-direction: column;
    background-color: var(--background-translucent);
    border-radius: var(--snt-border-radius, 12px);
    overflow: hidden;
    margin: 10px 10px 8px 10px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    align-items: center;
    justify-content: center;
  }

  :global(.Dialog-content) {
    min-width: 300px;
    text-align: center;
  }

  .Dialog-content-head {
    margin-bottom: 20px;
  }

  .Dialog-head-title {
    margin: 0 0 10px;
    font-size: 24px;
    font-weight: 600;
  }

  .Dialog-head-message {
    margin: 0 0 10px;
    font-size: 14px;
  }

  .Dialog-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
  }
</style>
