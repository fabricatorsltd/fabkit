<script>
  /**
   * @typedef {import("../../types/index.d.ts").BannerProps} BannerProps
   */

  import Skeleton from "./Skeleton.svelte";
  import Button from "./Button.svelte";
  import PhX from "../icons/components/X.svelte";
  import { ToastVariant } from "../propTypes.js";
  import { validateProp } from "../validator.js";

  /** @type {BannerProps} */
  let {
    title = "",
    subtitle = "",
    variant = ToastVariant.info,
    revealed = true,
    actionLabel = "",
    onAction,
    dismissible = false,
    onDismiss,
    icon = undefined,
    children,
    margin = [0, 0, 0, 0],
    padding = [10, 14, 10, 14],
    bg,
    borderWidth = [1, 1, 1, 1],
    borderColor,
    borderStyle = "solid",
    borderRadius = "var(--snt-border-radius, 12px)",
    shadow = "none",
    zIndex = 0,
    ref = $bindable(),
    class: className = "",
    ...rest
  } = $props();

  $derived.by(() => {
    validateProp("Banner", "variant", variant, ToastVariant);
  });

  if (rest.onclick !== undefined) delete rest.onclick;

  const variantConfig = $derived.by(() => {
    switch (variant) {
      case ToastVariant.neutral:
        return {
          accent: "var(--border-tertiary)",
          bg: "var(--background-elevated)",
          borderColor: "var(--border-primary)",
          color: "var(--text-primary)",
        };
      case ToastVariant.success:
        return {
          accent: "#16a34a",
          bg: "color-mix(in srgb, #16a34a 14%, var(--background-elevated))",
          borderColor: "color-mix(in srgb, #16a34a 26%, var(--border-primary))",
          color: "var(--text-primary)",
        };
      case ToastVariant.warning:
        return {
          accent: "#f59e0b",
          bg: "color-mix(in srgb, #f59e0b 14%, var(--background-elevated))",
          borderColor: "color-mix(in srgb, #f59e0b 26%, var(--border-primary))",
          color: "var(--text-primary)",
        };
      case ToastVariant.error:
        return {
          accent: "var(--action-destructive)",
          bg: "color-mix(in srgb, var(--action-destructive) 10%, var(--background-elevated))",
          borderColor: "color-mix(in srgb, var(--action-destructive) 20%, var(--border-primary))",
          color: "var(--text-primary)",
        };
      case ToastVariant.info:
      default:
        return {
          accent: "var(--action-suggested)",
          bg: "color-mix(in srgb, var(--action-suggested) 12%, var(--background-elevated))",
          borderColor: "color-mix(in srgb, var(--action-suggested) 24%, var(--border-primary))",
          color: "var(--text-primary)",
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

{#if revealed}
  <Skeleton
    class="Banner {className}"
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
    color={variantConfig.color}
    {...rest}
  >
    <div class="Banner-inner" style:--banner-accent={variantConfig.accent}>
      <div class="Banner-accent" aria-hidden="true"></div>

      {#if icon}
        {@const Component = icon}
        <div class="Banner-icon">
          <Component size={18} />
        </div>
      {/if}

      <div class="Banner-content">
        {#if children}
          {@render children()}
        {:else}
          {#if title}
            <div class="Banner-title">{title}</div>
          {/if}
          {#if subtitle}
            <div class="Banner-subtitle">{subtitle}</div>
          {/if}
        {/if}
      </div>

      <div class="Banner-actions">
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
{/if}

<style>
  :global(.Banner) {
    width: 100%;
  }

  .Banner-inner {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
  }

  .Banner-accent {
    width: 4px;
    border-radius: 999px;
    background: var(--banner-accent);
    flex-shrink: 0;
    align-self: stretch;
  }

  .Banner-icon {
    flex-shrink: 0;
    color: var(--banner-accent);
    display: flex;
    align-items: center;
    padding-top: 1px;
  }

  .Banner-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
    text-align: left;
  }

  .Banner-title {
    font-weight: 600;
    line-height: 1.2;
  }

  .Banner-subtitle {
    color: var(--text-secondary);
    font-size: 0.9em;
    line-height: 1.25;
  }

  .Banner-actions {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }
</style>
