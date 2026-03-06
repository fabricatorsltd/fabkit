<script>
  import { resolveProps } from "../system.js";

  let {
    attachTo,
    children,
    onclose,
    align = "start",
    offset = [0, 5],
    initialStyle = "",
    class: className = "",
    ...rest
  } = $props();

  let ref = $state(null);

  function handleClickOutside(event) {
    if (
      ref &&
      !ref.contains(/** @type {Node} */ (event.target)) &&
      (!attachTo || !attachTo.contains(/** @type {Node} */ (event.target)))
    ) {
      if (onclose) onclose();
    }
  }

  let smartStyle = $state("");

  $effect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  $effect(() => {
    if (!ref) return;

    const updatePosition = () => {
      const [offX, offY] = offset;
      const baseStyle =
              initialStyle ||
              (align === "center"
                      ? `left: 50%; transform: translateX(calc(-50% + ${offX}px));`
                      : align === "end"
                              ? `left: auto; right: 0; transform: translateX(${offX}px);`
                              : `left: 0; transform: translateX(${offX}px);`);

      smartStyle = `${baseStyle} margin-top: ${offY}px; opacity: 0;`;

      requestAnimationFrame(() => {
        if (!ref || !ref.parentElement) return;

        const rect = ref.getBoundingClientRect();
        const parentRect = ref.parentElement.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const margin = 20;

        let newStyle = baseStyle + ` margin-top: ${offY}px;`;

        const isClippingLeft = rect.left < margin;
        const isClippingRight = rect.right > viewportWidth - margin;

        if (isClippingLeft && !isClippingRight) {
          const targetLeft = margin - parentRect.left;
          newStyle = `left: ${targetLeft}px; right: auto; transform: translateX(${offX}px); margin-top: ${offY}px;`;
        } else if (isClippingRight && !isClippingLeft) {
          const targetRight = parentRect.right - (viewportWidth - margin);
          newStyle = `left: auto; right: ${targetRight}px; transform: translateX(${offX}px); margin-top: ${offY}px;`;
        }

        smartStyle = newStyle + " opacity: 1;";
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  });

  const processedProps = $derived.by(() => {
    const defaults = {
      padding: [0],
      bg: "var(--background-base)",
      borderColor: "var(--border-primary)",
      borderWidth: [1, 1, 1, 1],
      borderRadius: "var(--snt-border-radius, 12px)",
      shadow: "var(--shadow-elevated)",
      zIndex: 1000,
      ...rest
    };
    return resolveProps(defaults);
  });
</script>

<div
  class="PopOver {className}"
  bind:this={ref}
  style={[smartStyle, processedProps.styles].filter(Boolean).join('; ')}
  {...processedProps.filteredRest}
>
  <div class="PopOver-content">
    {@render children?.()}
  </div>
</div>

<style>
  :global(.PopOver) {
    position: absolute;
    top: 100%;
    text-align: left;
    transition: opacity 0.1s ease-out;
  }

  .PopOver-content {
    max-width: 300px;
  }
</style>
