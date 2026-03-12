<script>
  import Skeleton from "./Skeleton.svelte";
  import SelectField from "./SelectField.svelte";

  let {
    views = [],
    activeId = $bindable(""),
    mode = "auto",
    tabsMinWidth = 520,
    segmentedMinWidth = 360,
    dropdownLabel = "",
    showIcons = false,
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

  let containerWidth = $state(0);

  const normalizedViews = $derived.by(() => {
    return Array.isArray(views) ? views.filter(Boolean) : [];
  });

  $effect(() => {
    if (normalizedViews.length === 0) return;
    const isValid = normalizedViews.some((v) => v?.id === activeId);
    if (!activeId || !isValid) activeId = normalizedViews[0]?.id ?? "";
  });

  let ro;
  $effect(() => {
    if (mode !== "auto") return;
    if (!ref) return;
    if (typeof ResizeObserver === "undefined") return;

    const update = () => {
      containerWidth = ref?.getBoundingClientRect()?.width ?? 0;
    };

    update();

    ro?.disconnect?.();
    ro = new ResizeObserver(() => update());
    ro.observe(ref);

    return () => ro?.disconnect?.();
  });

  const resolvedMode = $derived.by(() => {
    if (mode !== "auto") return mode;

    const w = Number(containerWidth) || 0;
    const count = normalizedViews.length;

    if (w >= Number(tabsMinWidth) && count <= 6) return "tabs";
    if (w >= Number(segmentedMinWidth) && count <= 5) return "segmented";
    return "dropdown";
  });

  const selectOptions = $derived.by(() => {
    return normalizedViews.map((v) => ({
      value: String(v.id ?? ""),
      text: String(v.title ?? ""),
    }));
  });

  function activate(id) {
    const target = String(id ?? "");
    const view = normalizedViews.find((v) => String(v.id) === target);
    if (view?.disabled) return;
    activeId = target;
  }
</script>

<Skeleton
  class="ViewSwitcher {className}"
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
  {#if resolvedMode === "dropdown"}
    <div class="ViewSwitcher-dropdown">
      <SelectField bind:value={activeId} label={dropdownLabel} options={selectOptions} />
    </div>
  {:else}
    <div
      class="ViewSwitcher-control"
      class:ViewSwitcher-control--tabs={resolvedMode === "tabs"}
      class:ViewSwitcher-control--segmented={resolvedMode === "segmented"}
      role={resolvedMode === "tabs" ? "tablist" : "radiogroup"}
    >
      {#each normalizedViews as view (view.id)}
        <button
          class="ViewSwitcher-item"
          class:active={String(view.id) === String(activeId)}
          disabled={!!view.disabled}
          role={resolvedMode === "tabs" ? "tab" : "radio"}
          aria-selected={String(view.id) === String(activeId)}
          aria-checked={String(view.id) === String(activeId)}
          tabindex={String(view.id) === String(activeId) ? 0 : -1}
          onclick={() => activate(view.id)}
          onkeydown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              activate(view.id);
            }
          }}
        >
          {#if showIcons && view.icon}
            {@const Icon = view.icon}
            <span class="ViewSwitcher-item-icon"><Icon size={16} /></span>
          {/if}
          <span class="ViewSwitcher-item-label">{view.title}</span>
        </button>
      {/each}
    </div>
  {/if}
</Skeleton>

<style>
  :global(.ViewSwitcher) {
    display: flex;
    align-items: center;
  }

  .ViewSwitcher-dropdown {
    width: 100%;
    min-width: 160px;
  }

  .ViewSwitcher-control {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px;
    border-radius: var(--snt-border-radius, 12px);
    border: 1px solid var(--border-primary);
    background: var(--background-elevated);
  }

  .ViewSwitcher-control--tabs {
    border-radius: var(--snt-border-radius, 12px);
  }

  .ViewSwitcher-control--segmented {
    border-radius: var(--snt-border-radius, 999px);
  }

  .ViewSwitcher-item {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 0;
    border-radius: inherit;
    background: transparent;
    color: var(--text-secondary);
    padding: 8px 12px;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
  }

  .ViewSwitcher-control--segmented .ViewSwitcher-item {
    padding: 6px 10px;
    border-radius: var(--snt-border-radius, 999px);
  }

  .ViewSwitcher-item:hover:not(:disabled) {
    background: var(--background-elevated-2-hover);
    color: var(--text-primary);
  }

  .ViewSwitcher-item:active:not(:disabled) {
    background: var(--background-top);
  }

  .ViewSwitcher-item.active {
    background: var(--background-top);
    color: var(--text-primary);
    box-shadow: var(--shadow-elevated);
  }

  .ViewSwitcher-item:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .ViewSwitcher-item-icon {
    display: inline-flex;
    align-items: center;
    color: var(--text-secondary);
  }

  .ViewSwitcher-item.active .ViewSwitcher-item-icon {
    color: var(--text-primary);
  }

  .ViewSwitcher-item-label {
    display: inline-flex;
    align-items: center;
  }
</style>
