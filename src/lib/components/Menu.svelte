<script>
  import Skeleton from "./Skeleton.svelte";
  import MenuItem from "./MenuItem.svelte";
  let {
    items = [],
    children,
    class: className = "",
    // Skeleton Props Pass-through
    margin = [0, 0, 0, 0],
    padding,
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

  const finalPadding = $derived(padding !== undefined ? padding : [2, 2, 2, 2]);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<Skeleton
  class="Menu {className}"
  bind:ref
  {margin}
  padding={finalPadding}
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
  <div class="Menu-items">
    {#if children}
      {@render children()}
    {:else}
      {#each items as item}
        <MenuItem
          label={item.label}
          action={item.action}
          href={item.link || item.href}
          icon={item.icon}
        />
      {/each}
    {/if}
  </div>
</Skeleton>

<style>
  :global(.Menu) {
  }

  .Menu-items {
    display: flex;
    flex-direction: column;
    min-width: 160px;
  }

  .Menu-item {
    align-items: center;
    display: flex;
    gap: 8px;
    padding: 10px 16px;
    transition: background-color 0.2s;
    background-color: transparent;
    color: var(--text-primary);
    border-radius: var(--snt-border-radius, 12px);
    cursor: pointer;
  }

  .Menu-item:hover {
    background-color: var(--background-elevated-2-hover);
  }

  .Menu-item:active {
    background-color: var(--background-top);
  }

  .Menu-item-label {
    flex-grow: 1;
  }
</style>
