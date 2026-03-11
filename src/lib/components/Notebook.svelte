<script>
  import Skeleton from "./Skeleton.svelte";
  import { onMount, setContext } from "svelte";
  import { writable } from "svelte/store";
  import EventBus from "../EventBus.js";

  let {
    context,
    newPageContent = undefined,
    children,
    class: className = "",
    // Skeleton Props Pass-through
    margin = [0, 0, 0, 0],
    padding = [0, 0, 0, 0],
    bg,
    bgHover,
    bgFocus,
    bgActive,
    borderWidth = [1, 1, 1, 1],
    borderWidthHover,
    borderWidthFocus,
    borderWidthActive,
    borderColor = "var(--border-primary)",
    borderStyle = "solid",
    borderRadius = [8, 8, 8, 8],
    shadow = "none",
    zIndex = 0,
    ref = $bindable(),
    ...rest
  } = $props();

  let pages = $state([]);
  let activePage = $state(null);

  $effect(() => {
    if (activePage === null && context) {
      activePage = 1;
    }
  });

  let declarativeTabs = $state([]);
  let activeTabId = writable(null);

  setContext("STN_NOTEBOOK_REGISTER", (tab) => {
    declarativeTabs = [...declarativeTabs, tab];
    if (!$activeTabId) $activeTabId = tab.id;

    return () => {
      declarativeTabs = declarativeTabs.filter((t) => t.id !== tab.id);
      if ($activeTabId === tab.id) {
        $activeTabId = declarativeTabs[0]?.id || null;
      }
    };
  });

  setContext("STN_NOTEBOOK_ACTIVE_ID", activeTabId);

  let orderedPages = $derived.by(() => {
    return pages.slice().sort((a, b) => a.id - b.id);
  });

  function createPage(pageId) {
    if (!newPageContent) return;
    const newContentData = newPageContent();
    if (newContentData) {
      let pageProps = newContentData.props || {};
      pageProps.tabId = pageId;
      pages.push({
        id: pageId,
        content: newContentData.component,
        props: pageProps,
      });
      activePage = pages.length > 0 ? pages[pages.length - 1].id : 1;
      EventBus.emit(`${context}-pageCreated`, activePage);
    }
  }

  function setActivePage(pageId) {
    activePage = pageId;
    EventBus.emit(`${context}-pageChanged`, activePage);
  }

  function closePage(pageId) {
    const pageIndex = pages.findIndex((page) => page.id === pageId);
    if (pageIndex === -1) return;
    pages.splice(pageIndex, 1);
    if (activePage === pageId) {
      activePage = pages.length > 0 ? pages[pages.length - 1].id : 1;
    }
    EventBus.emit(`${context}-pageClosed`, pageId);
  }

  onMount(() => {
    if (context) {
      EventBus.on(`${context}-createTab`, createPage);
      EventBus.on(`${context}-setActiveTab`, setActivePage);
      EventBus.on(`${context}-closeTab`, closePage);
      return () => {
        EventBus.off(`${context}-createTab`, createPage);
        EventBus.off(`${context}-setActiveTab`, setActivePage);
        EventBus.off(`${context}-closeTab`, closePage);
      };
    }
  });

  const finalBg = $derived(bg !== undefined ? bg : "var(--background-base)");
</script>

<Skeleton
  class="Notebook {className}"
  bind:ref
  {margin}
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
  {borderRadius}
  {shadow}
  {zIndex}
  {...rest}
>
  {#if declarativeTabs.length > 0}
    <div class="Notebook-tabs">
      {#each declarativeTabs as tab}
        <button
          class="Notebook-tabs-item"
          class:active={$activeTabId === tab.id}
          onclick={() => ($activeTabId = tab.id)}
        >
          {tab.label}
        </button>
      {/each}
    </div>
  {/if}

  <div class="Notebook-content">
    {#if children}
      {@render children()}
    {:else}
      {#each orderedPages as page (page.id)}
        <div class="Notebook-items-item" class:active={activePage === page.id}>
          {#if page.content}
            {@const Content = page.content}
            <Content {...page.props} />
          {/if}
        </div>
      {/each}
    {/if}
  </div>
</Skeleton>

<style>
  :global(.Notebook) {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .Notebook-tabs {
    display: flex;
    background: var(--background-elevated);
    border-bottom: 1px solid var(--border-primary);
    padding: 4px 8px 0;
    gap: 4px;
  }

  .Notebook-tabs-item {
    padding: 8px 16px;
    border: none;
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    font-size: 13px;
    border-radius: 6px 6px 0 0;
    transition: all 0.2s;
  }

  .Notebook-tabs-item:hover {
    background: rgba(0, 0, 0, 0.05);
    color: var(--text-primary);
  }

  .Notebook-tabs-item.active {
    background: var(--background-base);
    color: var(--action-suggested);
    font-weight: 600;
    box-shadow: 0 -2px 0 var(--action-suggested) inset;
  }

  .Notebook-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .Notebook-items-item {
    flex: 1;
    display: none;
    flex-direction: column;
  }

  .Notebook-items-item.active {
    display: flex;
  }
</style>
