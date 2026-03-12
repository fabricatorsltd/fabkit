<script>
  let {
    label = "",
    help = "",
    children,
    class: className = "",
    ...rest
  } = $props();
</script>

<div class={["AdaptiveFormRow", className].filter(Boolean).join(" ")} {...rest}>
  <div class="AdaptiveFormRow-label">{label}</div>
  <div class="AdaptiveFormRow-field">
    {@render children?.()}
  </div>
  {#if help}
    <div class="AdaptiveFormRow-help">{help}</div>
  {/if}
</div>
