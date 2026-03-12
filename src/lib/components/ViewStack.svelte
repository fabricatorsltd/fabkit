<script>
  import Skeleton from "./Skeleton.svelte";

  let {
    views = [],
    activeId = $bindable(""),
    keepMounted = true,
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

  const normalizedViews = $derived.by(() => {
    return Array.isArray(views) ? views.filter(Boolean) : [];
  });

  $effect(() => {
    if (normalizedViews.length === 0) return;
    const isValid = normalizedViews.some((v) => v?.id === activeId);
    if (!activeId || !isValid) activeId = normalizedViews[0]?.id ?? "";
  });

  const activeView = $derived.by(() => {
    return normalizedViews.find((v) => v?.id === activeId) ?? normalizedViews[0];
  });
</script>

<Skeleton
  class="ViewStack {className}"
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
  {#if normalizedViews.length === 0}
    {@render children?.()}
  {:else}
    {#if keepMounted}
      {#each normalizedViews as view (view.id)}
        <div class="ViewStack-item" class:active={view.id === activeId}>
          {#if view.component}
            {@const Component = view.component}
            <Component {...(view.props ?? {})} />
          {/if}
        </div>
      {/each}
    {:else}
      {#if activeView?.component}
        {@const Component = activeView.component}
        <Component {...(activeView.props ?? {})} />
      {/if}
    {/if}
  {/if}
</Skeleton>

<style>
  :global(.ViewStack) {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    width: 100%;
  }

  .ViewStack-item {
    flex: 1;
    min-height: 0;
    display: none;
    flex-direction: column;
    width: 100%;
  }

  .ViewStack-item.active {
    display: flex;
  }
</style>
