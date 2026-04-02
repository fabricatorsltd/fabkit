<script>
  /**
   * @typedef {import("../../types/index.d.ts").ButtonProps} ButtonProps
   */

  import { getContext } from "svelte";
  import { ADAPTIVE_LAYOUT_CONTEXT_KEY } from "../context.js";
  import { resolveProps } from "../system.js";
  import { ButtonVariant } from "../propTypes.js";
  import { validateProp } from "../validator.js";

  /** @type {ButtonProps} */
  let {
    label = "",
    icon = "",
    labelBehavior = "always",
    children,
    disabled = false,
    variant = ButtonVariant.secondary,
    square = false,
    onClick,
    class: className = "",
    ref = $bindable(),
    // Collect expressive syntax props
    ...rest
  } = $props();

  $derived.by(() => {
    validateProp("Button", "variant", variant, ButtonVariant);
  });

  const adaptiveCtx = getContext(ADAPTIVE_LAYOUT_CONTEXT_KEY);

  let containerWidth = $state(undefined);

  $effect(() => {
    if (labelBehavior !== "auto") return;
    if (!ref) return;
    if (typeof ResizeObserver === "undefined") return;

    const target = ref.closest(".AdaptiveLayout") ?? ref.parentElement ?? ref;

    const update = () => {
      containerWidth = target.clientWidth;
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(target);

    return () => ro.disconnect();
  });

  const isCompact = $derived.by(() => {
    const fromCtx = adaptiveCtx?.state?.activeBreakpoint === "compact";
    if (fromCtx) return true;

    const w = Number(containerWidth);
    if (!Number.isFinite(w) || w <= 0) return false;

    return w <= 640;
  });

  const hideLabel = $derived.by(() => {
    if (children) return false;

    if (labelBehavior === "always") return false;

    const canHide = !!icon && !!label;
    if (!canHide) return false;

    if (labelBehavior === "never") return true;

    return isCompact;
  });

  const showLabel = $derived.by(() => !!label && !hideLabel);

  const computedAriaLabel = $derived.by(() => {
    if (children) return undefined;

    if (rest["aria-label"] !== undefined) return undefined;
    if (rest["aria-labelledby"] !== undefined) return undefined;

    if (hideLabel && label) return label;

    return undefined;
  });

  if (rest.onclick !== undefined) delete rest.onclick;

  const variants = {
    primary: {
      bg: "var(--action-suggested)",
      color: "var(--text-primary-alt)",
      hover: {
        bg: "var(--action-suggested-hover)",
      },
      active: {
        bg: "var(--action-suggested-active)",
      },
    },
    secondary: {
      bg: "var(--background-top)",
      color: "var(--text-primary)",
      hover: {
        bg: "var(--background-elevated)",
      },
      active: {
        bg: "var(--background-base)",
      },
    },
    destructive: {
      bg: "var(--action-destructive)",
      color: "var(--text-primary-alt)",
      hover: {
        bg: "var(--action-destructive-hover)",
      },
      active: {
        bg: "var(--action-destructive-active)",
      },
    },
    flat: {
      bg: "transparent",
      color: "var(--text-primary)",
      hover: {
        bg: "var(--background-elevated)",
      },
      active: {
        bg: "var(--background-base)",
      },
    },
  };

  const selectedVariant = $derived(variants[variant] || variants.secondary);

  const finalPadding = $derived(
    rest.padding !== undefined
      ? rest.padding
      : square
        ? [10, 10, 10, 10]
        : icon && (!label || hideLabel)
          ? [10, 10, 10, 10]
          : [10, 15, 10, 15],
  );

  const finalBorderRadius = $derived(
    rest.borderRadius !== undefined || rest.radius !== undefined
      ? rest.borderRadius ?? rest.radius
      : "var(--snt-border-radius, 20px)",
  );

  let classes = $derived.by(() => {
    const klasses = [];
    if (icon && showLabel) klasses.push("Button--with-icon");
    if (disabled) klasses.push("Button--disabled");
    if (square) klasses.push("Button--square");
    return klasses.join(" ");
  });

  const processedProps = $derived.by(() => {
    const defaults = {
      padding: finalPadding,
      bg: rest.bg ?? selectedVariant.bg,
      hover: rest.hover ?? selectedVariant.hover,
      focus: rest.focus ?? selectedVariant.active,
      active: rest.active ?? selectedVariant.active,
      borderWidth: rest.borderWidth ?? [0, 0, 0, 0],
      borderColor: rest.borderColor ?? "transparent",
      borderStyle: rest.borderStyle ?? "solid",
      borderRadius: finalBorderRadius,
      shadow: rest.shadow ?? "none",
      color: rest.color ?? selectedVariant.color,
      zIndex: rest.zIndex ?? 0,
      ...rest
    };
    return resolveProps(defaults);
  });
</script>

<button
  class="Button {classes} {className}"
  bind:this={ref}
  {disabled}
  onclick={onClick}
  style={processedProps.styles}
  {...processedProps.filteredRest}
  aria-label={computedAriaLabel}
>
  {#if children}
    {@render children()}
  {:else}
    {#if icon}
      {#if typeof icon === "function" && icon.length <= 1}
        {@render icon()}
      {:else}
        {@const Component = icon}
        <Component />
      {/if}
    {/if}
    {#if showLabel}
      <span class="Button-label">{label}</span>
    {/if}
  {/if}
</button>

<style>
  :global(.Button) {
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background-color 0.2s,
      color 0.2s;
    border: 0;
    font-size: 15px;
    gap: 5px;
  }

  :global(.Button--square) {
    border-radius: var(--snt-border-radius, 12px);
  }

  :global(.Button--with-icon) {
    padding-right: 20px;
  }

  :global(.Button--disabled) {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .Button-label {
    font-weight: 600;
    position: relative;
    top: -1px;
  }
</style>
