<script>
  import Skeleton from "./Skeleton.svelte";

  let {
    attachTo,
    children,
    onclose,
    align = "start",
    offset = [0, 5],
    initialStyle = "",
    bg = "var(--background-base)",
    color,
    class: className = "",
    ref = $bindable(),
    ...rest
  } = $props();
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
      // Step 1: Set initial alignment base style
      const baseStyle =
        initialStyle ||
        (align === "center"
          ? "left: 50%; transform: translateX(-50%);"
          : align === "end"
            ? "left: auto; right: 0;"
            : "left: 0;");

      // Hide and set initial to measure
      smartStyle = `${baseStyle} opacity: 0;`;

      requestAnimationFrame(() => {
        if (!ref || !ref.parentElement) return;

        const rect = ref.getBoundingClientRect();
        const parentRect = ref.parentElement.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const margin = 20;

        const [offX, offY] = offset;
        let newStyle = baseStyle + ` margin-top: ${offY}px;`;

        // Check for viewport overflows
        const isClippingLeft = rect.left < margin;
        const isClippingRight = rect.right > viewportWidth - margin;

        if (isClippingLeft && !isClippingRight) {
          // Snap to left edge: margin - parent.left
          const targetLeft = margin - parentRect.left;
          newStyle = `left: ${targetLeft}px; right: auto; transform: translateX(${offX}px); margin-top: ${offY}px;`;
        } else if (isClippingRight && !isClippingLeft) {
          // Snap to right edge: (parent.right - (viewportWidth - margin))
          const targetRight = parentRect.right - (viewportWidth - margin);
          newStyle = `left: auto; right: ${targetRight}px; transform: translateX(${offX}px); margin-top: ${offY}px;`;
        } else if (offX !== 0) {
          if (align === "center") {
            newStyle = `left: 50%; right: auto; transform: translateX(calc(-50% + ${offX}px)); margin-top: ${offY}px;`;
          } else {
            newStyle += ` transform: translateX(${offX}px);`;
          }
        }

        smartStyle = newStyle + " opacity: 1;";
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  });
</script>

<Skeleton
  class="PopOver {className}"
  bind:ref
  padding={[0]}
  {bg}
  {color}
  borderColor="var(--border-primary)"
  borderWidth={[1, 1, 1, 1]}
  borderRadius="var(--snt-border-radius, 12px)"
  shadow="var(--shadow-elevated)"
  zIndex={1000}
  style="{smartStyle} {rest.style || ''}"
  {...rest}
>
  <div class="PopOver-content">
    {@render children?.()}
  </div>
</Skeleton>

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
