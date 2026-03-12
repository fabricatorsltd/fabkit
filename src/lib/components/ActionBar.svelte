<script>
  import { tick } from "svelte";
  import Skeleton from "./Skeleton.svelte";
  import HBox from "./HBox.svelte";
  import Button from "./Button.svelte";
  import PopOverWrapper from "./PopOverWrapper.svelte";
  import Menu from "./Menu.svelte";
  import PhDotsThreeVertical from "../icons/components/DotsThreeVertical.svelte";

  let {
    items = [],
    mode = "auto",
    spacing = 8,
    moreLabel = "More",
    moreIcon = PhDotsThreeVertical,
    moreVariant = "flat",
    class: className = "",
    margin = [0, 0, 0, 0],
    padding = [0, 0, 0, 0],
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
    ...rest
  } = $props();

  let measureRef = $state();
  let availableWidth = $state(undefined);

  let itemWidths = $state([]);
  let moreWidth = $state(0);
  let visibleCount = $state(0);

  const hasOverflow = $derived(visibleCount < items.length);

  const effectiveVisibleCount = $derived.by(() => {
    if (mode === "all") return items.length;
    if (mode === "overflow") return visibleCount;
    return visibleCount;
  });

  const visibleItems = $derived(items.slice(0, effectiveVisibleCount));
  const overflowItems = $derived(items.slice(effectiveVisibleCount));

  async function measure() {
    await tick();

    if (!measureRef) return;

    const btns = Array.from(
      measureRef.querySelectorAll("[data-actionbar-measure-item]")
    );

    itemWidths = btns.map((el) => el.getBoundingClientRect().width);

    const more = measureRef.querySelector("[data-actionbar-measure-more]");
    moreWidth = more ? more.getBoundingClientRect().width : 0;
  }

  function computeVisible() {
    const w = Number(availableWidth);
    const gap = Number(spacing);

    if (!Number.isFinite(w) || w <= 0) {
      visibleCount = items.length;
      return;
    }

    if (!Array.isArray(itemWidths) || itemWidths.length === 0) {
      visibleCount = items.length;
      return;
    }

    const g = Number.isFinite(gap) ? gap : 0;

    const sum = (arr) => arr.reduce((acc, v) => acc + (Number(v) || 0), 0);
    const totalFor = (count) => {
      if (count <= 0) return 0;
      const widths = itemWidths.slice(0, count);
      return sum(widths) + g * (count - 1);
    };

    let count = Math.min(items.length, itemWidths.length);

    while (count >= 0) {
      const overflow = count < items.length;
      const morePart =
        overflow && moreWidth
          ? (count > 0 ? g : 0) + moreWidth
          : 0;

      if (totalFor(count) + morePart <= w) {
        visibleCount = count;
        return;
      }

      count -= 1;
    }

    visibleCount = 0;
  }

  $effect(() => {
    if (!ref) return;
    if (typeof ResizeObserver === "undefined") return;

    const update = () => {
      availableWidth = ref.clientWidth;
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(ref);

    return () => ro.disconnect();
  });

  $effect(() => {
    items;
    spacing;
    mode;
    measure();
  });

  $effect(() => {
    availableWidth;
    itemWidths;
    moreWidth;
    items;
    spacing;
    mode;

    if (mode === "all") {
      visibleCount = items.length;
      return;
    }

    computeVisible();
  });

  const menuItems = $derived.by(() =>
    overflowItems
      .map((it) => {
        const action = it.onClick ?? it.action;
        const disabled = Boolean(it.disabled);
        return {
          label: it.label,
          icon: it.icon,
          href: it.href,
          action: disabled ? undefined : action,
        };
      })
      .filter((it) => it.label)
  );
</script>

<Skeleton
  class={["ActionBar", className].filter(Boolean).join(" ")}
  bind:ref
  {margin}
  {padding}
  {bg}
  {bgHover}
  {bgFocus}
  {bgActive}
  {borderWidth}
  {borderColor}
  {borderStyle}
  {borderRadius}
  {shadow}
  {zIndex}
  {...rest}
>
  <div class="ActionBar-measure" bind:this={measureRef} aria-hidden="true">
    <HBox spacing={spacing}>
      {#each items as item}
        <Button
          class="ActionBar-measure-item"
          data-actionbar-measure-item
          label={item.label}
          icon={item.icon}
          variant={item.variant ?? "secondary"}
          disabled={item.disabled}
        />
      {/each}
      <Button
        class="ActionBar-measure-more"
        data-actionbar-measure-more
        label={moreLabel}
        icon={moreIcon}
        square
        variant={moreVariant}
      />
    </HBox>
  </div>

  <HBox class="ActionBar-row" spacing={spacing}>
    {#each visibleItems as item, i (item.key ?? item.label ?? i)}
      <Button
        label={item.label}
        icon={item.icon}
        variant={item.variant ?? "secondary"}
        disabled={item.disabled}
        onClick={item.onClick ?? item.action}
      />
    {/each}

    {#if hasOverflow && menuItems.length > 0}
      <PopOverWrapper align="end">
        {#snippet trigger()}
          <Button
            label={moreLabel}
            icon={moreIcon}
            square
            variant={moreVariant}
          />
        {/snippet}
        <Menu items={menuItems} />
      </PopOverWrapper>
    {/if}
  </HBox>
</Skeleton>

<style>
  :global(.ActionBar) {
    width: 100%;
  }

  .ActionBar-measure {
    position: absolute;
    visibility: hidden;
    pointer-events: none;
    height: 0;
    overflow: hidden;
  }

  :global(.ActionBar-row) {
    width: 100%;
    overflow: hidden;
  }

  :global(.ActionBar-row > *) {
    flex: 0 0 auto;
  }
</style>
