<script>
  import { fade } from "svelte/transition";
  import Card from "./Card.svelte";
  import VBox from "./VBox.svelte";
  import HBox from "./HBox.svelte";
  import Button from "./Button.svelte";
  import TextRich from "./TextRich.svelte";

  let {
    children,
    title,
    description,
    close,
    enterFunction,
    enter,
    height = 50,
    closeLabel = "Chiudi",
    disabled = false,
    hideCancel = false,
    /**
     * When true the popup is displayed as a centered modal instead
     * of the default bottom sheet variant.
     */
    modal = false,
    allowOverflow = false,
  } = $props();

  let popupHeight = $state(height);
  let isVisible = $state(true);
  let container = $state(null);
  let isDragging = $state(false);

  // Sync popupHeight with prop when it changes
  $effect(() => {
    popupHeight = height;
  });

  let startY = 0;
  let startHeight = 0;

  function handleDragStart(event) {
    if (modal) return;
    isDragging = true;
    startY =
      event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    startHeight = popupHeight;
    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchmove", handleDragMove);
    window.addEventListener("touchend", handleDragEnd);
  }

  function handleDragMove(event) {
    if (modal || !isDragging) return;

    const currentY =
      event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    const deltaY = startY - currentY;
    const newHeight = Math.min(
      85,
      Math.max(0, startHeight + (deltaY / window.innerHeight) * 100),
    );
    popupHeight = newHeight;

    // Close if dragged down by 20vh or more relative to start
    if (newHeight <= startHeight - 20) {
      handleClose();
    }
  }

  let ignoreBackdropClick = false;

  function handleDragEnd() {
    if (modal) return;
    window.removeEventListener("mousemove", handleDragMove);
    window.removeEventListener("mouseup", handleDragEnd);
    window.removeEventListener("touchmove", handleDragMove);
    window.removeEventListener("touchend", handleDragEnd);
    isDragging = false;

    // Prevent immediate backdrop click after drag
    ignoreBackdropClick = true;
    setTimeout(() => {
      ignoreBackdropClick = false;
    }, 50);
  }

  function handleClose() {
    isVisible = false;
    setTimeout(() => close(), 300);
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget && !ignoreBackdropClick) {
      handleClose();
    }
  }
</script>

{#if isVisible}
  <!-- Overlay Backdrop -->
<div
  class="SlideOver-backdrop"
  style="
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.18);
    display: flex;
    justify-content: center;
    align-items: {modal ? 'center' : 'flex-end'};
    z-index: 9999;
    {modal ? 'backdrop-filter: blur(3px);' : ''}
  "
  onclick={handleBackdropClick}
  onkeydown={(e) => e.key === 'Escape' && handleClose()}
  role="button"
  tabindex="0"
  aria-modal="true"
  transition:fade={{ duration: 300 }}
>
    <Card
      bind:ref={container}
      padding={[18, 24, 0, 24]}
      bg="white"
      borderColor="transparent"
      borderRadius={modal ? [12, 12, 12, 12] : [16, 16, 0, 0]}
      shadow="0 8px 24px rgba(0,0,0,0.10)"
      style="
        width: {modal ? '92%' : '100%'};
        max-width: {modal ? '420px' : 'none'};
        height: {modal ? 'auto' : `${popupHeight}vh`};
        transition: {isDragging ? 'none' : 'height 0.3s ease-out, transform 0.3s ease-out'};
        position: relative;
        user-select: {isDragging ? 'none' : 'auto'};
        overflow: {allowOverflow ? 'visible' : 'hidden'};
      "
    >
      <VBox spacing={10} align="fill" style="height: 100%; max-height: 100%;">
        <!-- Drag Handle -->
        {#if !modal}
          <div
            class="SlideOver-handle-container"
            style="
              width: 100%;
              display: flex;
              justify-content: center;
              cursor: {isDragging ? 'grabbing' : 'grab'};
              padding: 6px 0;
              margin-top: -10px;
              flex-shrink: 0;
            "
            onmousedown={handleDragStart}
            role="button"
            tabindex="0"
            aria-label="Drag to resize or close"
            ontouchstart={handleDragStart}
          >
            <div
              style="width: 64px; height: 4px; background: #e5e7eb; border-radius: 999px;"
            ></div>
          </div>
        {/if}

        <!-- Header Section -->
        <div style="flex-shrink: 0;">
          <HBox justify="space-between" align="start">
            <VBox spacing={3} align="start">
              <h2
                style="font-size: 18px; font-weight: 700; text-transform: none; margin: 0; letter-spacing: -0.01em; padding-bottom: 3px; padding-top: 3px;"
              >
                {title}
              </h2>
              {#if description}
                <p style="font-size: 14px; color: #71717a; margin: 0;">
                  {description}
                </p>
              {/if}
            </VBox>

            <HBox spacing={10}>
              {#if !hideCancel}
                <Button
                  label={closeLabel}
                  onclick={handleClose}
                  bg="#f4f4f5"
                  bgHover="#e4e4e7"
                  bgFocus="#e4e4e7"
                  padding={[8, 18, 8, 18]}
                  style="font-weight: 600; border-radius: 8px; color: black;"
                />
              {/if}
              <Button
                label={enter}
                onclick={enterFunction}
                {disabled}
                bg="var(--snt-color-primary)"
                bgHover="var(--snt-color-primary-hover)"
                bgFocus="var(--snt-color-primary-hover)"
                padding={[8, 22, 8, 22]}
                style="font-weight: 700; border-radius: 8px; color: white;"
                class="slideover-action-btn"
              />
            </HBox>
          </HBox>
        </div>

        <!-- Content Section -->
        <div
          class="SlideOver-content"
          style="
            flex: 1;
            overflow-y: {allowOverflow ? 'visible' : 'auto'};
            padding-right: 6px;
            margin-right: -6px;
            padding-top: 14px;
          "
        >
          {@render children?.()}
        </div>
      </VBox>
    </Card>
  </div>
{/if}

<style>
  :global(body) {
    overflow: hidden;
  }

  .SlideOver-content {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }

  .SlideOver-content::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }

  :global(.slideover-action-btn) {
    box-shadow: 0 4px 12px -2px #e9a57173, 0 2px 4px -2px #e9a57173 !important;
    border-bottom: 1px solid #c46854 !important;
    transition: all 0.1s ease-in-out;
  }

  :global(.slideover-action-btn:active) {
    box-shadow: 0 1px 2px 0 #e9a57173, 0 1px 1px -1px #e9a57173 !important;
    border-bottom: none !important;
    border-bottom-width: 0 !important;
    transform: translateY(1px);
  }
</style>
