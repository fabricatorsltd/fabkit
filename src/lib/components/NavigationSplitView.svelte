<script>
  import Leaflet from "./Leaflet.svelte";

  let {
    sidebar,
    content,
    children,
    mode = "auto",
    stackAt = 900,
    sidebarWidth = 320,
    revealContent = $bindable(false),
    keepMounted = true,
    class: className = "",
    ref = $bindable(),
    ...rest
  } = $props();
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
