<script>
  import Paned from "./Paned.svelte";

  let { size = { left: 30, right: 70 }, minLeft = 100, ...rest } = $props();
</script>

<Paned {size} {minLeft} {...rest} style="height: 300px">
  {#snippet left()}
    <div style="background: var(--background-elevated); height: 100%; padding: 20px;">
      <strong>Left Pane</strong>
    </div>
  {/snippet}
  {#snippet right()}
    <div style="background: var(--background-base); height: 100%; padding: 20px;">
      <strong>Right Pane</strong>
    </div>
  {/snippet}
</Paned>
