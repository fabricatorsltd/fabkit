<script>
  import Skeleton from "./Skeleton.svelte";
  import PhCaretRight from "../icons/components/CaretRight.svelte";

  let {
    title = "",
    subtitle = "",
    icon = undefined,
    widget,
    onclick,
    activatable = false,
    // Skeleton pass-through
    margin = [0, 0, 0, 0],
    padding = [12, 16, 12, 16],
    bg = "transparent",
    bgHover,
    bgFocus,
    bgActive,
    borderWidth = [0, 0, 0, 0],
    borderColor = "transparent",
    borderStyle = "solid",
    borderRadius = [0, 0, 0, 0],
    shadow = "none",
    zIndex = 0,
    ref = $bindable(),
    class: className = "",
    ...rest
  } = $props();
</script>

<Skeleton
  class="ActionRow {activatable ? 'ActionRow--activatable' : ''} {className}"
  bind:ref
  {margin}
  {padding}
  {bg}
  bgHover={bgHover !== undefined ? bgHover : activatable ? "var(--background-elevated)" : undefined}
  {bgFocus}
  {bgActive}
  {borderWidth}
  {borderColor}
  {borderStyle}
  {borderRadius}
  {shadow}
  {zIndex}
  onclick={activatable ? onclick : undefined}
  cursor={activatable ? "pointer" : undefined}
  {...rest}
>
  <div class="ActionRow-inner">
    {#if icon}
      {@const Component = icon}
      <span class="ActionRow-icon">
        <Component size={20} />
      </span>
    {/if}
    <div class="ActionRow-text">
      {#if title}
        <span class="ActionRow-title">{title}</span>
      {/if}
      {#if subtitle}
        <span class="ActionRow-subtitle">{subtitle}</span>
      {/if}
    </div>
    {#if widget}
      <div class="ActionRow-widget">
        {@render widget()}
      </div>
    {/if}
    {#if activatable}
      <span class="ActionRow-caret">
        <PhCaretRight size={16} />
      </span>
    {/if}
  </div>
</Skeleton>

<style>
  :global(.ActionRow) {
    width: 100%;
  }

  :global(.ActionRow--activatable) {
    cursor: pointer;
  }

  .ActionRow-inner {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 48px;
  }

  .ActionRow-icon {
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .ActionRow-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .ActionRow-title {
    color: var(--text-primary);
    font-size: 0.95rem;
    font-weight: 500;
  }

  .ActionRow-subtitle {
    color: var(--text-secondary);
    font-size: 0.82rem;
  }

  .ActionRow-widget {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .ActionRow-caret {
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
</style>
