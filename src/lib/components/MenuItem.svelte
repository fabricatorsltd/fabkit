<script>
  import { resolveProps } from "../system.js";

  let {
    label,
    action,
    children,
    class: className = "",
    // Collect expressive syntax props
    href,
    target,
    ...rest
  } = $props();

  const element = $derived(href ? "a" : "div");

  function handleClick() {
    if (action) action();
  }

  const finalPadding = $derived(
    rest.padding !== undefined ? rest.padding : [10, 16, 10, 16],
  );
  const finalBgHover = $derived(
    rest.bgHover !== undefined ? rest.bgHover : "var(--background-elevated-2-hover)",
  );
  const finalBgActive = $derived(
    rest.bgActive !== undefined ? rest.bgActive : "var(--background-top)",
  );
  const finalBorderRadius = $derived(
    rest.borderRadius !== undefined
      ? rest.borderRadius
      : "var(--snt-border-radius, 12px)",
  );

  const processedProps = $derived.by(() => {
    const defaults = {
      margin: rest.margin ?? [0, 0, 0, 0],
      padding: finalPadding,
      bg: rest.bg ?? "transparent",
      bgHover: finalBgHover,
      bgFocus: rest.bgFocus,
      bgActive: finalBgActive,
      borderWidth: rest.borderWidth ?? [0, 0, 0, 0],
      borderColor: rest.borderColor ?? "transparent",
      borderStyle: rest.borderStyle ?? "solid",
      borderRadius: finalBorderRadius,
      shadow: rest.shadow ?? "none",
      zIndex: rest.zIndex ?? 0,
      ...rest
    };
    return resolveProps(defaults);
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<svelte:element
  this={element}
  class="Menu-item {className}"
  {href}
  {target}
  onclick={handleClick}
  style={[
    'text-decoration: none;',
    processedProps.styles
  ].filter(Boolean).join('; ')}
  {...processedProps.filteredRest}
>
  {#if children}
    {@render children()}
  {:else}
    {label}
  {/if}
</svelte:element>

<style>
  :global(.Menu-item) {
    align-items: center;
    display: flex;
    gap: 8px;
    cursor: pointer;
  }

  .Menu-item-label {
    flex-grow: 1;
    color: var(--text-primary);
  }
</style>
