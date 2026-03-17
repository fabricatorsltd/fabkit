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
      padding: [16, 20, 16, 20],
      bg: "var(--background-elevated)",
      borderColor: "transparent",
      borderWidth: [0, 0, 0, 0],
      borderRadius: "10px",
      shadow: "var(--shadow-top)",
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
        <Button label={cancelText} onClick={handleCancel} />
      {/if}
      {#if confirm}
        <Button
          label={confirmText}
          onClick={handleConfirm}
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
    border-radius: 10px;
    overflow: hidden;
    margin: 8px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    align-items: center;
    justify-content: center;
  }

  .Dialog-content {
    min-width: 240px;
    max-width: 90vw;
    padding: 16px 20px 16px 20px;
    border-radius: 10px;
    text-align: center;
    background: var(--background-elevated);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.10);
  }

  .Dialog-content-head {
    margin-bottom: 14px;
  }

  .Dialog-head-title {
    margin: 0 0 8px;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  .Dialog-head-message {
    margin: 0 0 8px;
    font-size: 13px;
    color: #666;
  }

  .Dialog-actions {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 14px;
  }
</style>
