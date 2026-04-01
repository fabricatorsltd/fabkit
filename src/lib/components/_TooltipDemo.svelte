<script>
  import Tooltip from "./Tooltip.svelte";
  import Button from "./Button.svelte";

  let {
    text = "Tooltip text",
    position = "top",
    delay = 300,
    ...rest
  } = $props();
</script>

<div style="display: flex; align-items: center; justify-content: center; padding: 48px;">
  <Tooltip {text} {position} {delay} {...rest}>
    <Button label="Hover me" />
  </Tooltip>
</div>
