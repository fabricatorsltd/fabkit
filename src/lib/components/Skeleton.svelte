<script>
  /**
   * @typedef {Object} SkeletonProps
   * @property {number[]} [margin=[0,0,0,0]] - [top, right, bottom, left]
   * @property {number[]} [padding=[0,0,0,0]] - [top, right, bottom, left]
   * @property {number|string} [spacing] - CSS gap (works with flex/grid layouts)
   * @property {string} [bg="transparent"]
   * @property {string} [bgHover]
   * @property {string} [bgFocus]
   * @property {string} [bgActive]
   * @property {number[]} [borderWidth=[0,0,0,0]]
   * @property {number[]} [borderWidthHover]
   * @property {number[]} [borderWidthFocus]
   * @property {number[]} [borderWidthActive]
   * @property {string|string[]} [borderColor="transparent"]
   * @property {string|string[]} [borderColorHover]
   * @property {string|string[]} [borderColorFocus]
   * @property {string|string[]} [borderColorActive]
   * @property {string} [borderStyle="solid"]
   * @property {string} [shadow="none"]
   * @property {string} [shadowSecondary]
   * @property {string} [shadowActive]
   * @property {string} [transformHover]
   * @property {string} [transformFocus]
   * @property {string} [transformActive]
   * @property {number} [zIndex=0]
   * @property {string} [class=""]
   * @property {import('svelte').Snippet} [children]
   * @property {string} [color]
   * @property {string} [colorHover]
   * @property {string} [colorFocus]
   * @property {string} [colorActive]
   */

  let {
    element = "div",
    ref = $bindable(),
    margin = [0, 0, 0, 0],
    padding = [0, 0, 0, 0],
    spacing = undefined,
    bg = "transparent",
    bgHover = undefined,
    bgFocus = undefined,
    bgActive = undefined,
    borderWidth = [0, 0, 0, 0],
    borderWidthHover = undefined,
    borderWidthFocus = undefined,
    borderWidthActive = undefined,
    borderColor = "transparent",
    borderColorHover = undefined,
    borderColorFocus = undefined,
    borderColorActive = undefined,
    borderStyle = "solid",
    borderRadius = [0, 0, 0, 0],
    shadow = "none",
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
    children = undefined,
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
    if (!Array.isArray(val)) return val;
    return val.join(" ");
  }

  function formatValue(val) {
    if (typeof val === "number") return `${val}px`;
    return val;
  }

  let derivedStyle = $derived.by(() => {
    const styles = [
      `margin: ${formatBox(margin)}`,
      `padding: ${formatBox(padding)}`,
      `background-color: ${bg}`,
      `border-width: ${formatBox(borderWidth)}`,
      `border-color: ${formatBorderColor(borderColor)}`,
      `border-style: ${borderStyle}`,
      `border-radius: ${formatBox(borderRadius)}`,
      `box-shadow: ${shadow}`,
      `z-index: ${zIndex}`,
      `--snt-bg-hover: ${bgHover || bg}`,
      `--snt-bg-focus: ${bgFocus || bgHover || bg}`,
      `--snt-bg-active: ${bgActive || bgHover || bg}`,
      `--snt-bc-hover: ${formatBorderColor(borderColorHover || borderColor)}`,
      `--snt-bc-focus: ${formatBorderColor(borderColorFocus || borderColorHover || borderColor)}`,
      `--snt-bc-active: ${formatBorderColor(borderColorActive || borderColorHover || borderColor)}`,
      `--snt-bw-hover: ${formatBox(borderWidthHover || borderWidth)}`,
      `--snt-bw-focus: ${formatBox(borderWidthFocus || borderWidthHover || borderWidth)}`,
      `--snt-bw-active: ${formatBox(borderWidthActive || borderWidthHover || borderWidth)}`,
      `--snt-sh-hover: ${shadowSecondary || shadow}`,
      `--snt-sh-focus: ${shadowSecondary || shadow}`,
      `--snt-sh-active: ${shadowActive || shadowSecondary || shadow}`,
      `--snt-tr-hover: ${transformHover || rest.transform || "none"}`,
      `--snt-tr-focus: ${transformFocus || rest.transform || "none"}`,
      `--snt-tr-active: ${transformActive || rest.transform || "none"}`,
      `--snt-color-hover: ${colorHover || color || "inherit"}`,
      `--snt-color-focus: ${colorFocus || colorHover || color || "inherit"}`,
      `--snt-color-active: ${colorActive || colorHover || color || "inherit"}`,
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
    if (spacing !== undefined) styles.push(`gap: ${formatValue(spacing)}`);
    if (color !== undefined) styles.push(`color: ${color}`);
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
