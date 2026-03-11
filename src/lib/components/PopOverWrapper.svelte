<script>
  import PopOver from "./PopOver.svelte";
  import Button from "./Button.svelte";

  let { children, trigger, ref = $bindable(), ...props } = $props();

  let buttonElement = $state();
  let showPopover = $state(false);

  function togglePopover() {
    showPopover = !showPopover;
  }
</script>

<div class="PopOverWrapper" bind:this={ref}>
  {@render trigger?.()}
  {#if !trigger}
    <Button label="Click me" onclick={togglePopover} bind:ref={buttonElement} />
  {/if}

  {#if showPopover && buttonElement}
    <PopOver
      attachTo={buttonElement}
      onclose={() => (showPopover = false)}
      {...props}
    >
      {@render children?.()}
    </PopOver>
  {/if}
</div>

<style>
  .PopOverWrapper {
    position: relative;
    display: inline-block;
  }
</style>
