<script>
  import Skeleton from "./Skeleton.svelte";

  let {
    label = "",
    icon = "",
    children,
    disabled = false,
    type = "button",
    flat = false,
    square = false,
    onclick,
    class: className = "",
    // Skeleton Props Pass-through
    margin = [0, 0, 0, 0],
    padding,
    bg,
    bgHover,
    bgFocus,
    bgActive,
    borderWidth = [0, 0, 0, 0],
    borderWidthHover,
    borderWidthFocus,
    borderWidthActive,
    borderColor = "transparent",
    borderStyle = "solid",
    borderRadius,
    shadow = "none",
    shadowSecondary,
    transformHover,
    transformFocus,
    transformActive,
    color,
    colorHover,
    colorFocus,
    colorActive,
    zIndex = 0,
    ref = $bindable(),
    ...rest
  
if (flat) type = \"flat\";
} = $props();

  // Local derived values for fallbacks
  const finalPadding = $derived(
    padding !== undefined
      ? padding
      : square
        ? [10, 10, 10, 10]
        : icon && !label
          ? [10, 10, 10, 10]
          : [10, 15, 10, 15],
  );

  const finalBg = $derived(
    bg !== undefined
      ? bg
      : type === "suggested"
        ? "var(--action-suggested)"
        : type === "destructive"
          ? "var(--action-destructive)"
          : type === "flat"
            ? "transparent"
            : "var(--background-top)",
  );

  const finalBgHover = $derived(
    bgHover !== undefined
      ? bgHover
      : type === "suggested"
        ? "var(--action-suggested-hover)"
        : type === "destructive"
          ? "var(--action-destructive-hover)"
          : "var(--background-elevated)",
  );

  const finalBgFocus = $derived(
    bgFocus !== undefined
      ? bgFocus
      : type === "suggested"
        ? "var(--action-suggested-active)"
        : type === "destructive"
          ? "var(--action-destructive-active)"
          : "var(--background-base)",
  );

  const finalBgActive = $derived(
    bgActive !== undefined
      ? bgActive
      : type === "suggested"
        ? "var(--action-suggested-active)"
        : type === "destructive"
          ? "var(--action-destructive-active)"
          : "var(--background-base)",
  );

  const finalBorderRadius = $derived(
    borderRadius !== undefined
      ? borderRadius
      : "var(--snt-border-radius, 20px)",
  );

  let classes = $derived.by(() => {
    const classes = [];

    if (icon) {
      if (label) {
        classes.push("Button--withIcon");
      } else {
        classes.push("Button--iconOnly");
      }
    }
    if (disabled) {
      classes.push("Button--disabled");
    }
    // We keep these for non-color styling if any (none really left besides transition)
    classes.push(`Button--${type}`);

    if (square) {
      classes.push("Button--square");
    }

    return classes.join(" ");
  });
</script>

<Skeleton
  element="button"
  bind:ref
  class="Button {classes} {className}"
  {disabled}
  {onclick}
  {margin}
  padding={finalPadding}
  bg={finalBg}
  bgHover={finalBgHover}
  bgFocus={finalBgFocus}
  bgActive={finalBgActive}
  {borderWidth}
  {borderWidthHover}
  {borderWidthFocus}
  {borderWidthActive}
  {borderColor}
  {borderStyle}
  borderRadius={finalBorderRadius}
  {shadow}
  {shadowSecondary}
  {transformHover}
  {transformFocus}
  {transformActive}
  {color}
  {colorHover}
  {colorFocus}
  {colorActive}
  {zIndex}
  {...rest}
>
  {#if children}
    {@render children()}
  {:else}
    {#if icon}
      {#if typeof icon === "function" && icon.length <= 1}
        {@render icon()}
      {:else}
        <svelte:component this={icon} />
      {/if}
    {/if}
    {#if label}
      <span class="Button-label">{label}</span>
    {/if}
  {/if}
</Skeleton>

<style>
  :global(.Button) {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--background-top);
    color: var(--text-primary);
    transition:
      background-color 0.2s,
      color 0.2s;
    border-radius: 20px;
    border: 0;
    font-size: 15px;
    gap: 5px;
    padding: 10px 15px;
  }

  .Button.Button--square {
    border-radius: var(--snt-border-radius, 12px);
  }

  .Button.Button--withIcon {
    padding-right: 20px;
  }

  .Button.Button--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .Button:hover {
    background-color: var(--background-elevated);
  }

  .Button:active {
    background-color: var(--background-base);
  }

  .Button.Button--suggested {
    background-color: var(--action-suggested);
    color: var(--text-primary-alt);
  }

  .Button.Button--suggested:hover {
    background-color: var(--action-suggested-hover);
  }

  .Button.Button--suggested:active {
    background-color: var(--action-suggested-active);
  }

  .Button.Button--destructive {
    background-color: var(--action-destructive);
    color: var(--text-primary-alt);
  }

  .Button.Button--destructive:hover {
    background-color: var(--action-destructive-hover);
  }

  .Button.Button--destructive:active {
    background-color: var(--action-destructive-active);
  }

  .Button.Button--flat {
    background-color: transparent;
    color: var(--text-primary);
    padding: 10px;
  }

  .Button.Button--flat:hover {
    background-color: var(--background-elevated);
  }

  .Button.Button--flat:active {
    background-color: var(--background-base);
  }

  .Button-label {
    font-weight: 600;
    position: relative;
    top: -1px;
  }
</style>
