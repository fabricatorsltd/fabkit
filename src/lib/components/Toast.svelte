<script>
  /**
   * @typedef {import("../../types/index.d.ts").ToastProps} ToastProps
   */

  import Skeleton from "./Skeleton.svelte";
  import Button from "./Button.svelte";
  import PhX from "../icons/components/X.svelte";
  import { ToastVariant } from "../propTypes.js";
  import { validateProp } from "../validator.js";

  /** @type {ToastProps} */
  let {
    title = "",
    subtitle = "",
    variant = ToastVariant.neutral,
    actionLabel = "",
    onAction,
    dismissible = true,
    onDismiss,
    icon = undefined,
    children,
    margin = [0, 0, 0, 0],
    padding = [10, 12, 10, 12],
    bg,
    borderWidth = [1, 1, 1, 1],
    borderColor,
    borderStyle = "solid",
    borderRadius = "var(--snt-border-radius, 12px)",
    shadow = "var(--shadow-elevated)",
    zIndex = 0,
    ref = $bindable(),
    class: className = "",
    ...rest
  } = $props();

  $derived.by(() => {
    validateProp("Toast", "variant", variant, ToastVariant);
  });

  if (rest.onclick !== undefined) delete rest.onclick;

  const variantConfig = $derived.by(() => {
    switch (variant) {
      case ToastVariant.success:
        return {
          accent: "#16a34a",
          bg: "color-mix(in srgb, #16a34a 12%, var(--background-elevated))",
          borderColor: "color-mix(in srgb, #16a34a 22%, var(--border-primary))",
        };
      case ToastVariant.warning:
        return {
          accent: "#f59e0b",
          bg: "color-mix(in srgb, #f59e0b 12%, var(--background-elevated))",
          borderColor: "color-mix(in srgb, #f59e0b 22%, var(--border-primary))",
        };
      case ToastVariant.error:
        return {
          accent: "var(--action-destructive)",
          bg: "color-mix(in srgb, var(--action-destructive) 9%, var(--background-elevated))",
          borderColor: "color-mix(in srgb, var(--action-destructive) 18%, var(--border-primary))",
        };
      case ToastVariant.info:
        return {
          accent: "var(--action-suggested)",
          bg: "color-mix(in srgb, var(--action-suggested) 11%, var(--background-elevated))",
          borderColor: "color-mix(in srgb, var(--action-suggested) 20%, var(--border-primary))",
        };
      case ToastVariant.neutral:
      default:
        return {
          accent: "var(--border-tertiary)",
          bg: "var(--background-elevated)",
          borderColor: "var(--border-primary)",
        };
    }
  });

  const resolvedBg = $derived(bg ?? variantConfig.bg);
  const resolvedBorderColor = $derived(borderColor ?? variantConfig.borderColor);

  function handleAction(event) {
    onAction?.(event);
  }

  function handleDismiss(event) {
    onDismiss?.(event);
  }
</script>

<Skeleton
  class="Toast {className}"
  bind:ref
  {margin}
  {padding}
  bg={resolvedBg}
  borderWidth={borderWidth}
  borderColor={resolvedBorderColor}
  {borderStyle}
  {borderRadius}
  {shadow}
  {zIndex}
  {...rest}
>
  <div class="Toast-inner" style:--toast-accent={variantConfig.accent}>
    <div class="Toast-accent" aria-hidden="true"></div>

    {#if icon}
      {@const Component = icon}
      <div class="Toast-icon">
        <Component size={18} />
      </div>
    {/if}

    <div class="Toast-content">
      {#if children}
        {@render children()}
      {:else}
        {#if title}
          <div class="Toast-title">{title}</div>
        {/if}
        {#if subtitle}
          <div class="Toast-subtitle">{subtitle}</div>
        {/if}
      {/if}
    </div>

    <div class="Toast-actions">
      {#if actionLabel}
        <Button
          label={actionLabel}
          variant="flat"
          onClick={handleAction}
          color={variantConfig.accent}
          hover={{ bg: "color-mix(in srgb, var(--background-elevated-2) 65%, transparent)" }}
          active={{ bg: "color-mix(in srgb, var(--background-top) 70%, transparent)" }}
        />
      {/if}

      {#if dismissible}
        <Button
          icon={PhX}
          square
          variant="flat"
          onClick={handleDismiss}
          aria-label="Dismiss"
          hover={{ bg: "color-mix(in srgb, var(--background-elevated-2) 65%, transparent)" }}
          active={{ bg: "color-mix(in srgb, var(--background-top) 70%, transparent)" }}
        />
      {/if}
    </div>
  </div>
</Skeleton>

<style>
  :global(.Toast) {
    width: 100%;
  }

  .Toast-inner {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
  }

  .Toast-accent {
    width: 3px;
    border-radius: 999px;
    background: var(--toast-accent);
    flex-shrink: 0;
    align-self: stretch;
  }

  .Toast-icon {
    flex-shrink: 0;
    color: var(--toast-accent);
    display: flex;
    align-items: center;
    padding-top: 1px;
  }

  .Toast-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    text-align: left;
  }

  .Toast-title {
    font-weight: 600;
    line-height: 1.2;
  }

  .Toast-subtitle {
    color: var(--text-secondary);
    font-size: 0.9em;
    line-height: 1.25;
  }

  .Toast-actions {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }
</style>
