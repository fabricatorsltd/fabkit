<script>
  import { onMount, setContext, untrack } from "svelte";
  import Skeleton from "./Skeleton.svelte";
  import EventBus from "../EventBus.js";

  let {
    context,
    stack = $bindable([0]),
    children,
    class: className = "",
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

  let pagesElement = $state();
  let pages = $state([]);

  function showTop() {
    const top = stack?.length ? stack[stack.length - 1] : 0;

    pages.forEach((page) => {
      if (page) page.style.display = "none";
    });

    if (pages[top]) pages[top].style.display = "block";
  }

  function push(pageId) {
    const id = Number(pageId);
    if (!Number.isFinite(id)) return;

    stack = [...stack, id];
    if (context) EventBus.emit(`${context}-pushed`, id);
  }

  function pop() {
    if (!Array.isArray(stack) || stack.length <= 1) return;

    const next = stack.slice(0, -1);
    const popped = stack[stack.length - 1];
    stack = next;
    if (context) EventBus.emit(`${context}-popped`, popped);
  }

  setContext("FABKIT_NAVIGATION_VIEW", { push, pop });

  onMount(() => {
    if (context) {
      const onPush = (id) => push(id);
      const onPop = () => pop();

      EventBus.on(`${context}-push`, onPush);
      EventBus.on(`${context}-pop`, onPop);

      return () => {
        EventBus.off(`${context}-push`, onPush);
        EventBus.off(`${context}-pop`, onPop);
      };
    }
  });

  onMount(() => {
    $effect(() => {
      children;

      untrack(() => {
        if (!pagesElement) return;
        pages = Array.from(pagesElement.children);

        pages.forEach((page, index) => {
          page.dataset.pageId = `${index}`;
        });

        showTop();
      });
    });

    $effect(() => {
      stack;
      pages;
      showTop();
    });
  });
</script>

<Skeleton
  class="NavigationView {className}"
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
  <div class="NavigationView-pages" bind:this={pagesElement}>
    {@render children?.()}
  </div>
</Skeleton>

<style>
  :global(.NavigationView) {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
  }

  .NavigationView-pages {
    flex: 1;
    min-height: 0;
  }
</style>
