<script>
  import { resolveProps } from "../system.js";

  const WIDTH_PRESETS = {
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1200,
    "2xl": 1400,
    mobile: 480,
    tablet: 768,
    desktop: 1200,
    wide: 1400,
    full: "100%",
  };

  let {
    size = "xl",
    maxWidth,
    children,
    class: className = "",
    ...rest
  } = $props();

  const resolvedMaxWidth = $derived.by(() => {
    if (maxWidth !== undefined) return maxWidth;
    if (typeof size === "number") return size;
    if (typeof size === "string") {
      const preset = WIDTH_PRESETS[size.toLowerCase()];
      return preset !== undefined ? preset : size;
    }
    return 1200;
  });

  const processedProps = $derived.by(() => {
    const defaults = {
      w: "100%",
      maxW: resolvedMaxWidth,
      ...rest
    };
    return resolveProps(defaults);
  });
</script>

<div
  class="Wrapper {className}"
  style="{processedProps.styles}; margin-left: auto; margin-right: auto;"
  {...processedProps.filteredRest}
>
  {@render children?.()}
</div>
