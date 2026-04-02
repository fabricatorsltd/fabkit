<script>
  /**
   * @typedef {import("../../types/index.d.ts").NavigationSplitViewProps} NavigationSplitViewProps
   */

  import Leaflet from "./Leaflet.svelte";
  import { LeafletMode } from "../propTypes.js";
  import { validateProp } from "../validator.js";

  /** @type {NavigationSplitViewProps} */
  let {
    sidebar,
    content,
    children,
    mode = LeafletMode.auto,
    stackAt = 900,
    sidebarWidth = 320,
    revealContent = $bindable(false),
    keepMounted = true,
    class: className = "",
    ref = $bindable(),
    ...rest
  } = $props();

  $derived.by(() => {
    validateProp("NavigationSplitView", "mode", mode, LeafletMode);
  });
</script>

<Leaflet
  {sidebar}
  {content}
  {mode}
  {stackAt}
  {sidebarWidth}
  bind:revealContent
  {keepMounted}
  class={className}
  bind:ref
  {...rest}
>
  {@render children?.()}
</Leaflet>
