<script>
  import { useSpacing, resolveToken } from "../style/index.js";

  /**
   * @typedef {Object} InteractionStateProps
   * @property {string} [bg]
   * @property {string} [shadow]
   * @property {string} [transform]
   * @property {string} [color]
   * @property {number[]} [borderWidth]
   * @property {string|string[]} [borderColor]
   */

  /**
   * @typedef {Object} SkeletonProps
   * @property {number[]} [margin] - [top, right, bottom, left]
   * @property {number[]} [padding] - [top, right, bottom, left]
   * @property {string} [bg="var(--background-base)"]
   * @property {string} [bgHover] - Deprecated, use `hover.bg`
   * @property {string} [bgFocus] - Deprecated, use `focus.bg`
   * @property {string} [bgActive] - Deprecated, use `active.bg`
   * @property {InteractionStateProps} [hover]
   * @property {InteractionStateProps} [focus]
   * @property {InteractionStateProps} [active]
   * @property {number[]} [borderWidth=[0,0,0,0]]
   * @property {number[]} [borderWidthHover] - Deprecated, use `hover.borderWidth`
   * @property {number[]} [borderWidthFocus] - Deprecated, use `focus.borderWidth`
   * @property {number[]} [borderWidthActive] - Deprecated, use `active.borderWidth`
   * @property {string|string[]} [borderColor="var(--border-primary)"]
   * @property {string|string[]} [borderColorHover] - Deprecated, use `hover.borderColor`
   * @property {string|string[]} [borderColorFocus] - Deprecated, use `focus.borderColor`
   * @property {string|string[]} [borderColorActive] - Deprecated, use `active.borderColor`
   * @property {string} [borderStyle="solid"]
   * @property {string} [shadow="var(--shadow-base)"]
   * @property {string} [shadowSecondary] - Deprecated, use `hover.shadow`
   * @property {string} [shadowActive] - Deprecated, use `active.shadow`
   * @property {string} [transformHover] - Deprecated, use `hover.transform`
   * @property {string} [transformFocus] - Deprecated, use `focus.transform`
   * @property {string} [transformActive] - Deprecated, use `active.transform`
   * @property {number} [zIndex=0]
   * @property {string} [class=""]
   * @property {import('svelte').Snippet} [children]
   * @property {string} [color]
   * @property {string} [colorHover] - Deprecated, use `hover.color`
   * @property {string} [colorFocus] - Deprecated, use `focus.color`
   * @property {string} [colorActive] - Deprecated, use `active.color`
   */

  let {
    element = "div",
    ref = $bindable(),
    margin = undefined,
    padding = undefined,
    bg = "surface",
    bgHover = undefined,
    bgFocus = undefined,
    bgActive = undefined,
    hover = undefined,
    focus = undefined,
    active = undefined,
    borderWidth = [0, 0, 0, 0],
    borderWidthHover = undefined,
    borderWidthFocus = undefined,
    borderWidthActive = undefined,
    borderColor = "border-primary",
    borderColorHover = undefined,
    borderColorFocus = undefined,
    borderColorActive = undefined,
    borderStyle = "solid",
    borderRadius = "var(--snt-border-radius)",
    shadow = "shadow-base",
    shadowSecondary = undefined,
    shadowActive = undefined,
    transformHover = undefined,
    transformFocus = undefined,
    transformActive = undefined,
    zIndex = 0,
    width = undefined,
    height = undefined,
    minWidth = undefined,
    minHeight = undefined,
    maxWidth = undefined,
    maxHeight = undefined,
    display = undefined,
    position = undefined,
    opacity = undefined,
    overflow = undefined,
    flex = undefined,
    color = undefined,
    colorHover = undefined,
    colorFocus = undefined,
    colorActive = undefined,
    fontSize = undefined,
    fontWeight = undefined,
    textAlign = undefined,
    class: className = "",
    children,
    ...rest
  } = $props();

  function formatBox(vals) {
    if (Array.isArray(vals)) {
      return vals.map((v) => (typeof v === "number" ? `${v}px` : v)).join(" ");
    }
    if (typeof vals === "number") return `${vals}px`;
    return vals;
  }

  function formatBorderColor(val) {
    if (!Array.isArray(val)) return resolveToken(val);
    return val.map(resolveToken).join(" ");
  }

  function formatValue(val) {
    if (typeof val === "number") return `${val}px`;
    return resolveToken(val);
  }

  let derivedStyle = $derived.by(() => {
    const resolvedBg = resolveToken(bg);
    const resolvedBorderColor = formatBorderColor(borderColor);
    const resolvedShadow = resolveToken(shadow);
    const resolvedColor = resolveToken(color);

    const styles = [
      ...useSpacing({ margin, padding, ...rest }),
      `background-color: ${resolvedBg}`,
      `border-width: ${formatBox(borderWidth)}`,
      `border-color: ${resolvedBorderColor}`,
      `border-style: ${borderStyle}`,
      `border-radius: ${formatBox(borderRadius)}`,
      `box-shadow: ${resolvedShadow}`,
      `z-index: ${zIndex}`,
      `--snt-bg-hover: ${resolveToken(hover?.bg || bgHover || bg)}`,
      `--snt-bg-focus: ${resolveToken(focus?.bg || bgFocus || hover?.bg || bgHover || bg)}`,
      `--snt-bg-active: ${resolveToken(active?.bg || bgActive || hover?.bg || bgHover || bg)}`,
      `--snt-bc-hover: ${formatBorderColor(hover?.borderColor || borderColorHover || borderColor)}`,
      `--snt-bc-focus: ${formatBorderColor(focus?.borderColor || borderColorFocus || hover?.borderColor || borderColorHover || borderColor)}`,
      `--snt-bc-active: ${formatBorderColor(active?.borderColor || borderColorActive || hover?.borderColor || borderColorHover || borderColor)}`,
      `--snt-bw-hover: ${formatBox(hover?.borderWidth || borderWidthHover || borderWidth)}`,
      `--snt-bw-focus: ${formatBox(focus?.borderWidth || borderWidthFocus || hover?.borderWidth || borderWidthHover || borderWidth)}`,
      `--snt-bw-active: ${formatBox(active?.borderWidth || borderWidthActive || hover?.borderWidth || borderWidthHover || borderWidth)}`,
      `--snt-sh-hover: ${resolveToken(hover?.shadow || shadowSecondary || shadow)}`,
      `--snt-sh-focus: ${resolveToken(focus?.shadow || shadowSecondary || shadow)}`,
      `--snt-sh-active: ${resolveToken(active?.shadow || shadowActive || shadowSecondary || shadow)}`,
      `--snt-tr-hover: ${hover?.transform || transformHover || rest.transform || "none"}`,
      `--snt-tr-focus: ${focus?.transform || transformFocus || hover?.transform || transformHover || rest.transform || "none"}`,
      `--snt-tr-active: ${active?.transform || transformActive || hover?.transform || transformHover || rest.transform || "none"}`,
      `--snt-color-hover: ${resolveToken(hover?.color || colorHover || color || "inherit")}`,
      `--snt-color-focus: ${resolveToken(focus?.color || colorFocus || hover?.color || colorHover || color || "inherit")}`,
      `--snt-color-active: ${resolveToken(active?.color || colorActive || hover?.color || colorHover || color || "inherit")}`,
    ];

    if (width !== undefined) styles.push(`width: ${formatValue(width)}`);
    if (height !== undefined) styles.push(`height: ${formatValue(height)}`);
    if (minWidth !== undefined)
      styles.push(`min-width: ${formatValue(minWidth)}`);
    if (minHeight !== undefined)
      styles.push(`min-height: ${formatValue(minHeight)}`);
    if (maxWidth !== undefined)
      styles.push(`max-width: ${formatValue(maxWidth)}`);
    if (maxHeight !== undefined)
      styles.push(`max-height: ${formatValue(maxHeight)}`);
    if (display !== undefined) styles.push(`display: ${display}`);
    if (position !== undefined) styles.push(`position: ${position}`);
    if (rest.top !== undefined) styles.push(`top: ${formatValue(rest.top)}`);
    if (rest.bottom !== undefined)
      styles.push(`bottom: ${formatValue(rest.bottom)}`);
    if (rest.left !== undefined) styles.push(`left: ${formatValue(rest.left)}`);
    if (rest.right !== undefined)
      styles.push(`right: ${formatValue(rest.right)}`);
    if (rest.transform !== undefined)
      styles.push(`transform: ${rest.transform}`);
    if (rest.textTransform !== undefined)
      styles.push(`text-transform: ${rest.textTransform}`);
    if (rest.letterSpacing !== undefined)
      styles.push(`letter-spacing: ${formatValue(rest.letterSpacing)}`);
    if (rest.whiteSpace !== undefined)
      styles.push(`white-space: ${rest.whiteSpace}`);
    if (rest.textOverflow !== undefined)
      styles.push(`text-overflow: ${rest.textOverflow}`);
    if (rest.cursor !== undefined) styles.push(`cursor: ${rest.cursor}`);
    if (rest.pointerEvents !== undefined)
      styles.push(`pointer-events: ${rest.pointerEvents}`);
    if (opacity !== undefined) styles.push(`opacity: ${opacity}`);
    if (overflow !== undefined) styles.push(`overflow: ${overflow}`);
    if (flex !== undefined) styles.push(`flex: ${flex}`);
    if (rest.flexWrap !== undefined) styles.push(`flex-wrap: ${rest.flexWrap}`);
    if (color !== undefined) styles.push(`color: ${resolvedColor}`);
    if (fontSize !== undefined)
      styles.push(`font-size: ${formatValue(fontSize)}`);
    if (fontWeight !== undefined) styles.push(`font-weight: ${fontWeight}`);
    if (textAlign !== undefined) styles.push(`text-align: ${textAlign}`);

    // Merge with style from rest if it exists
    if (rest.style) {
      styles.push(rest.style);
    }
    return styles.join("; ");
  });
</script>

<svelte:element
  this={element}
  bind:this={ref}
  {...rest}
  class="snt-skeleton {className}"
  style={derivedStyle}
>
  {#if children}
    {@render children()}
  {/if}
</svelte:element>

<style>
  .snt-skeleton {
    box-sizing: border-box;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      opacity 0.2s ease,
      transform 0.2s ease;
  }

  .snt-skeleton:hover {
    background-color: var(--snt-bg-hover) !important;
    border-width: var(--snt-bw-hover) !important;
    border-color: var(--snt-bc-hover) !important;
    box-shadow: var(--snt-sh-hover) !important;
    transform: var(--snt-tr-hover) !important;
    color: var(--snt-color-hover) !important;
  }

  /* Show focus styles only for keyboard (and similar) navigation */
  .snt-skeleton:focus-visible,
  .snt-skeleton:focus-within:has(:focus-visible) {
    background-color: var(--snt-bg-focus) !important;
    border-width: var(--snt-bw-focus) !important;
    border-color: var(--snt-bc-focus) !important;
    box-shadow: var(--snt-sh-focus) !important;
    transform: var(--snt-tr-focus) !important;
    color: var(--snt-color-focus) !important;
    outline: none;
  }

  .snt-skeleton:active {
    background-color: var(--snt-bg-active) !important;
    border-width: var(--snt-bw-active) !important;
    border-color: var(--snt-bc-active) !important;
    box-shadow: var(--snt-sh-active) !important;
    transform: var(--snt-tr-active) !important;
    color: var(--snt-color-active) !important;
  }
</style>
