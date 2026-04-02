<script>
  /**
   * @typedef {import("../../types/index.d.ts").TextProps} TextProps
   */

  import { resolveProps } from "../system.js";
  import { TextAlign, TextTransform } from "../propTypes.js";
  import { validateProp } from "../validator.js";

  /** @type {TextProps} */
  let {
    element = "span",
    children,
    bold = false,
    italic = false,
    dimmed = false,
    size,
    weight,
    color,
    align,
    transform,
    wrapping, // whiteSpace
    ...rest
  } = $props();

  $derived.by(() => {
    validateProp("Text", "align", align, TextAlign);
    validateProp("Text", "transform", transform, TextTransform);
  });

  let finalColor = $derived.by(() => {
    if (color) return color;
    if (dimmed) return "var(--text-secondary)";
    return "var(--text-primary)";
  });

  let finalWeight = $derived.by(() => {
    if (weight) return weight;
    if (bold) return "700";
    return "400";
  });

  let finalStyle = $derived(italic ? "italic" : "normal");

  const processedProps = $derived.by(() => {
    const defaults = {
      color: finalColor,
      ...rest
    };
    return resolveProps(defaults);
  });
</script>

<svelte:element
  this={element}
  style={[
    processedProps.styles,
    `font-weight: ${finalWeight}`,
    size ? `font-size: ${size}` : '',
    transform ? `text-transform: ${transform}` : '',
    align ? `text-align: ${align}` : '',
    wrapping ? `white-space: ${wrapping}` : '',
    `font-style: ${finalStyle}`
  ].filter(Boolean).join('; ')}
  {...processedProps.filteredRest}
>
  {@render children?.()}
</svelte:element>
