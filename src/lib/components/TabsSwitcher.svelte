<script>
  import Skeleton from "./Skeleton.svelte";
  import { onMount } from "svelte";
  import EventBus from "../EventBus.js";
  import PhPlus from "../icons/components/Plus.svelte";
  import PhX from "../icons/components/X.svelte";

  /**
   * @typedef {object} Tab
   * @property {number} id
   * @property {number} order
   * @property {string} title
   */

  let {
    context,
    allowNewTabs = false,
    class: className = "",
    // Skeleton Props Pass-through
    margin = [0, 0, 0, 0],
    padding = [0, 0, 0, 0],
    bg = "transparent",
    bgHover,
    bgFocus,
    bgActive,
    borderWidth = [0, 0, 0, 0],
    borderWidthHover,
    borderWidthFocus,
    borderWidthActive,
    borderColor = "transparent",
    borderStyle = "solid",
    borderRadius = [0, 0, 0, 0],
    shadow = "none",
    zIndex = 0,
    ref = $bindable(),
    ...rest
  } = $props();

  /** @type {Tab[]} */
  let tabs = $state([]);
  let activeTab = $state(1);
  /** @type {null | number} */
  let draggingIndex = $state(null);
  /** @type {null | number} */
  let hoveredIndex = $state(null);
  let tabsSwitcherItemsElement; // @type {HTMLElement | undefined}
  /** @type {Object.<number, HTMLElement | undefined>} */
  let tabElements = $state({}); // To store references to individual tab items

  let orderedTabs = $derived.by(() => {
    return [...tabs].sort((a, b) => a.order - b.order);
  });

  /**
   * @param {number} index
   * @param {DragEvent} event
   */
  function dragStart(index, event) {
    // console.log("dragStart", index);
    draggingIndex = index;
    hoveredIndex = null;
    if (event.dataTransfer) {
      event.dataTransfer.setData("text/plain", index.toString());
    }
  }

  /**
   * @param {number} index
   * @param {DragEvent} event
   */
  function dragOver(index, event) {
    event.preventDefault();
    if (hoveredIndex !== index) {
      hoveredIndex = index;
    }
  }

  /**
   * @param {number} targetIndex
   * @param {DragEvent} event
   */
  function drop(targetIndex, event) {
    event.preventDefault();
    if (draggingIndex === null || draggingIndex === targetIndex) {
      draggingIndex = null;
      hoveredIndex = null;
      return;
    }

    const itemToMove = orderedTabs[draggingIndex];
    const targetItem = orderedTabs[targetIndex];

    // Perform the reordering by swapping 'order' values
    const newTabs = tabs.map((tab) => {
      if (tab.id === itemToMove.id) {
        return { ...tab, order: targetItem.order };
      } else if (tab.id === targetItem.id) {
        return { ...tab, order: itemToMove.order };
      }
      return tab;
    });
    tabs = newTabs; // Trigger reactivity

    draggingIndex = null;
    hoveredIndex = null;
  }

  /**
   * @param {WheelEvent} event
   */
  function handleWheel(event) {
    if (tabsSwitcherItemsElement) {
      tabsSwitcherItemsElement.scrollLeft += event.deltaY;
    }
  }

  /**
   * @param {number} tabId
   */
  function closeTab(tabId) {
    const wasLastTab = tabs.length > 0 && tabs[tabs.length - 1].id === tabId;
    tabs = tabs.filter((tab) => tab.id !== tabId); // Trigger reactivity

    if (activeTab === tabId) {
      activeTab = tabs.length > 0 ? tabs[0].id : -1;
    }

    if (wasLastTab && tabs.length > 0) {
      requestAnimationFrame(() => {
        const lastTabId = tabs[tabs.length - 1].id;
        const lastTabRef = tabElements[lastTabId];
        if (lastTabRef) {
          lastTabRef.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "end",
          });
        }
      });
      activeTab = tabs[tabs.length - 1].id;
    }

    EventBus.emit(`${context}-closeTab`, tabId);
  }

  function createTab() {
    const newTabId =
      tabs.length > 0 ? Math.max(...tabs.map((tab) => tab.id)) + 1 : 1;
    const newTab = {
      id: newTabId,
      order: tabs.length + 1,
      title: "New tab",
    };
    tabs = [...tabs, newTab]; // Trigger reactivity
    activeTab = newTab.id;

    requestAnimationFrame(() => {
      const lastTabRef = tabElements[newTab.id];
      if (lastTabRef) {
        lastTabRef.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "end",
        });
      }
    });

    EventBus.emit(`${context}-createTab`, newTab.id);
  }

  /**
   * @param {number} tabId
   */
  function setActiveTab(tabId) {
    activeTab = tabId;
    EventBus.emit(`${context}-setActiveTab`, tabId);
  }

  /**
   * @param {{ tabId: number, title: string }} data
   */
  /**
   * @param {{ tabId: number, title: string }} data
   */
  function renameTab(data) {
    tabs = tabs.map((tab) => {
      if (tab.id === data.tabId && data.title.length > 0) {
        return { ...tab, title: data.title };
      }
      return tab;
    }); // Trigger reactivity
  }

  onMount(() => {
    // console.log("TabsSwitcher mounted");
    // Cast the handler to match EventBus's expected Handler<unknown>
    EventBus.on(
      `${context}-renameTab`,
      /** @type {import('mitt').Handler<any>} */ (renameTab),
    );

    return () => {
      EventBus.off(
        `${context}-renameTab`,
        /** @type {import('mitt').Handler<any>} */ (renameTab),
      );
    };
  });
</script>

<Skeleton
  class="TabsSwitcher {className}"
  bind:ref
  {margin}
  {padding}
  {bg}
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
  {#if allowNewTabs}
    <div class="TabsSwitcher-add">
      <button class="TabsSwitcher-add-button" onclick={createTab}>
        <PhPlus size={16} />
      </button>
    </div>
  {/if}
  <div
    class="TabsSwitcher-items"
    onwheel={handleWheel}
    bind:this={tabsSwitcherItemsElement}
    role="tablist"
  >
    {#each orderedTabs as tab, index (tab.id)}
      <div
        class="TabsSwitcher-items-item"
        class:TabsSwitcher-items-item--active={activeTab === tab.id}
        class:TabsSwitcher-items-item--hovered={hoveredIndex === index}
        draggable="true"
        ondragstart={(e) => dragStart(index, e)}
        ondragover={(e) => {
          e.preventDefault();
          dragOver(index, e);
        }}
        ondrop={(e) => {
          e.preventDefault();
          drop(index, e);
        }}
        bind:this={tabElements[tab.id]}
        role="tab"
        tabindex={activeTab === tab.id ? 0 : -1}
        aria-selected={activeTab === tab.id}
        onkeydown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setActiveTab(tab.id);
          }
        }}
      >
        <div
          class="TabsSwitcher-items-item-title"
          title={tab.title}
          onclick={() => setActiveTab(tab.id)}
          onmouseup={(e) => {
            if (e.button === 1) closeTab(tab.id);
          }}
          role="button"
          tabindex="0"
          onkeydown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setActiveTab(tab.id);
            }
          }}
        >
          {tab.title.length > 20 ? tab.title.slice(0, 20) + "…" : tab.title}
        </div>
        <div class="TabsSwitcher-items-item-actions">
          <button
            class="TabsSwitcher-items-item-actions-item"
            title="Close tab"
            onclick={() => closeTab(tab.id)}
          >
            <PhX size={12} />
          </button>
        </div>
      </div>
    {/each}
  </div>
</Skeleton>

<style>
  .TabsSwitcher-items::-webkit-scrollbar {
    display: none;
  }

  :global(.TabsSwitcher) {
    display: inline-flex;
    flex-wrap: nowrap;
    gap: 5px;
  }

  .TabsSwitcher-items {
    display: inline-flex;
    flex-wrap: nowrap;
    gap: 5px;
    margin: 5px;
    overflow-x: auto;
    max-width: calc(100vw - 250px); /* Adjust based on your layout needs */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .TabsSwitcher-items-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 12px;
    border-radius: var(--snt-border-radius, 12px);
    cursor: default;
    white-space: nowrap;
    background-color: transparent;
    transition: background-color 0.2s;
    color: var(--text-primary);
  }

  .TabsSwitcher-items-item--hovered {
    background-color: var(--background-elevated-2);
  }

  .TabsSwitcher-items-item-title {
    flex-grow: 1;
    padding: 10px 0 10px 10px;
  }

  /* Styles for the separator between tabs (Vue used ::after, Svelte might differ) */
  .TabsSwitcher-items-item:not(:last-child)::after {
    content: "";
    display: block;
    width: 1px;
    height: 100%;
    background-color: var(--border-primary);
    opacity: 1;
    transition: opacity 0.2s;
  }

  .TabsSwitcher-items-item.TabsSwitcher-items-item--active::after {
    opacity: 0;
  }

  .TabsSwitcher-items-item-actions {
    display: flex;
    gap: 5px;
    overflow: hidden;
    position: relative;
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none;
  }

  .TabsSwitcher-items-item-actions-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: var(--text-primary);
    border: 0;
    background-color: transparent;
    padding: 3px;
    cursor: pointer;
  }

  .TabsSwitcher-items-item-actions-item:hover {
    background-color: var(--background-elevated-2-hover);
  }

  .TabsSwitcher-items-item.TabsSwitcher-items-item--active {
    background-color: var(--background-top);
  }

  .TabsSwitcher-items-item:hover {
    background-color: var(--background-elevated-2-hover);
  }

  .TabsSwitcher-items-item:active {
    background-color: var(--background-top);
  }

  .TabsSwitcher-items-item.TabsSwitcher-items-item--active
    .TabsSwitcher-items-item-actions,
  .TabsSwitcher-items-item:hover .TabsSwitcher-items-item-actions {
    opacity: 1;
    pointer-events: auto;
  }

  .TabsSwitcher-items-item:not(:last-child):not(
      .TabsSwitcher-items-item--active
    ):hover::after {
    opacity: 0;
  }

  .TabsSwitcher-add {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px;
  }

  .TabsSwitcher-add-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: 0;
    border-radius: 50%;
    background-color: transparent;
    color: var(--text-primary);
  }

  .TabsSwitcher-add-button:hover {
    background-color: var(--background-elevated-2-hover);
  }

  .TabsSwitcher-add-button:active {
    background-color: var(--background-top);
  }
</style>
