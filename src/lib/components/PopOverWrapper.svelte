<script>
  import PopOver from "./PopOver.svelte";
  import Button from "./Button.svelte";

  let { trigger, children, ref = $bindable(), ...props } = $props();

  let buttonElement = $state();
  let showPopover = $state(false);

  function togglePopover() {
    showPopover = !showPopover;
  }
</script>

<div class="PopOverWrapper" bind:this={ref}>
  {#if trigger}
    <div class="PopOverWrapper-trigger" bind:this={buttonElement} onclick={togglePopover}>
      {@render trigger()}
    </div>
  {:else}
    <Button label="Click me" onClick={togglePopover} bind:ref={buttonElement} />
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

  .PopOverWrapper-trigger {
    display: inline-block;
  }
</style>
