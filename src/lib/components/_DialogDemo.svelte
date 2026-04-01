<script>
  import Dialog from "./Dialog.svelte";
  import Button from "./Button.svelte";
  import VBox from "./VBox.svelte";
  import TextField from "./TextField.svelte";
  import Text from "./Text.svelte";

  let {
    title = "Dialog",
    closeOnBackdrop = true,
    closeOnEscape = true,
    withFooter = false,
    ...rest
  } = $props();

  let open = $state(true);
</script>

{#if open}
  <Dialog
    {title}
    {closeOnBackdrop}
    {closeOnEscape}
    onClose={() => (open = false)}
    {...rest}
  >
    <Text>Custom body content — forms, layouts, anything.</Text>
    {#if withFooter}
      {#snippet footer()}
        <Button label="Cancel" type="flat" onClick={() => (open = false)} />
        <Button label="Confirm" type="suggested" onClick={() => (open = false)} />
      {/snippet}
    {/if}
  </Dialog>
{:else}
  <Button label="Reopen Dialog" onClick={() => (open = true)} />
{/if}
