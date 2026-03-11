<script>
  import Skeleton from "./Skeleton.svelte";
  import { onMount } from "svelte";
  import PhCaretRight from "../icons/components/CaretRight.svelte";

  /**
   * @typedef {object} ContextMenuItem
   * @property {number} id
   * @property {string} text
   * @property {string} shortcut
   * @property {any} icon - Svelte component or null
   * @property {() => void} action
   * @property {ContextMenuItem[]} submenu
   */

  let menuVisible = $state(false);
  let menuPos = $state({ x: 0, y: 0 });
  let menuElement = $state();

  let {
    items = [], // @type {ContextMenuItem[]}
    area = () => null,
    ref = $bindable(),
  } = $props();

  /**
   * @param {MouseEvent} event
   */
  function showMenu(event) {
    event.preventDefault();
    menuPos = { x: event.clientX, y: event.clientY };
    menuVisible = true;
    event.stopPropagation();
  }

  /**
   * @param {MouseEvent} event
   */
  function handleClickOutside(event) {
    if (
      menuElement &&
      !menuElement.contains(/** @type {Node} */ (event.target))
    ) {
      menuVisible = false;
    }
  }

  let smartStyle = $state("");

  $effect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  $effect(() => {
    if (!menuVisible || !menuElement) {
      smartStyle = "display: none; opacity: 0;";
      return;
    }

    const updatePosition = () => {
      // Step 1: Set initial position to measure
      smartStyle = `display: flex; opacity: 0; top: ${menuPos.y}px; left: ${menuPos.x}px;`;

      requestAnimationFrame(() => {
        if (!menuElement) return;
        const rect = menuElement.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const margin = 10;

        let finalX = menuPos.x;
        let finalY = menuPos.y;

        // Check horizontal overflow
        if (finalX + rect.width > viewportWidth - margin) {
          finalX = viewportWidth - rect.width - margin;
        }
        if (finalX < margin) {
          finalX = margin;
        }

        // Check vertical overflow
        if (finalY + rect.height > viewportHeight - margin) {
          finalY = viewportHeight - rect.height - margin;
        }
        if (finalY < margin) {
          finalY = margin;
        }

        smartStyle = `display: flex; opacity: 1; top: ${finalY}px; left: ${finalX}px;`;
      });
    };

    updatePosition();
  });
</script>

<div class="ContextArea" bind:this={ref}>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div class="ContextArea-safeArea" oncontextmenu={showMenu}>
    {@render area?.()}
  </div>
  <Skeleton
    class="ContextArea-menu"
    bind:ref={menuElement}
    style={smartStyle}
    bg="var(--background-base)"
    borderColor="var(--border-primary)"
    borderWidth={[1, 1, 1, 1]}
    borderRadius="var(--snt-border-radius, 12px)"
    shadow="var(--shadow-elevated)"
    padding={[0, 0, 0, 0]}
    zIndex={1000}
  >
    {#each items as item (item.id)}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="ContextArea-menu-item" onclick={item.action}>
        <div class="ContextArea-menu-item-icon">
          {#if item.icon}
            {@const Component = icon}
            <Component size={16} />
          {:else}
            <span class="mdi-placeholder"></span>
          {/if}
        </div>
        <div class="ContextArea-menu-item-text">{item.text}</div>
        <div class="ContextArea-menu-item-shortcut">
          {item.shortcut}
        </div>
        {#if item.submenu && item.submenu.length > 0}
          <div class="ContextArea-menu-item-submenu">
            <PhCaretRight size={14} />
          </div>
        {/if}
      </div>
    {/each}
  </Skeleton>
</div>

<style>
  .ContextArea {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
    min-height: 300px;
  }

  .ContextArea-safeArea {
    flex-grow: 1;
    overflow: auto;
    position: relative;
  }

  :global(.ContextArea-menu) {
    position: fixed;
    top: 100%;
    left: 0;
    display: none;
    flex-direction: column;
    font-size: 16px;
  }

  .ContextArea-menu-item {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    transition: background-color 0.2s;
    color: var(--text-secondary);
    gap: 9px;
  }

  .ContextArea-menu-item:hover {
    background-color: var(--background-elevated-2);
  }

  .ContextArea-menu-item:active {
    background-color: var(--background-top);
  }

  .ContextArea-menu-item-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ContextArea-menu-item-icon,
  .ContextArea-menu-item-submenu {
    font-size: 18px;
    display: flex;
    align-items: center;
  }

  .mdi-placeholder {
    display: inline-block;
    width: 16px;
    height: 16px;
  }

  .ContextArea-menu-item-text {
    flex-grow: 1;
  }

  .ContextArea-menu-item-shortcut {
    margin-left: auto;
    font-size: 14px;
    background-color: var(--background-elevated);
    padding: 4px 6px;
    border-radius: var(--snt-border-radius, 12px);
    font-weight: 900;
  }

  .ContextArea-menu-item-submenu {
    margin-left: auto;
  }

  .ContextArea-menu-item-submenu:hover {
    background-color: transparent;
  }
</style>
