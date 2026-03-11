<script lang="ts">
  import Skeleton from "./Skeleton.svelte";
  import { onMount } from "svelte";
  import PhCaretLeft from "../icons/components/CaretLeft.svelte";
  import PhCaretRight from "../icons/components/CaretRight.svelte";

  let {
    children,
    class: className = "",
    // Skeleton Props Pass-through
    margin = [0, 0, 0, 0],
    padding = [0, 0, 0, 0],
    bg,
    borderWidth = [0, 0, 0, 0],
    borderColor = "transparent",
    borderStyle = "solid",
    borderRadius = "0px",
    shadow = "none",
    zIndex = 0,
    ref = $bindable(),
    ...rest
  } = $props();

  let currentSlide = $state(0);
  let carouselSlidesElement: HTMLElement | undefined = $state();
  let slideCount = $state(0);

  $effect(() => {
    if (carouselSlidesElement) {
      slideCount = carouselSlidesElement.children.length;
    }
  });

  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
    }
  }

  function nextSlide() {
    if (currentSlide < slideCount - 1) {
      currentSlide++;
    }
  }

  let transformStyle = $derived(
    `transform: translateX(-${currentSlide * 100}%)`,
  );

  const finalBg = $derived(
    bg !== undefined ? bg : "var(--background-elevated)",
  );
</script>

<Skeleton
  class="Carousel {className}"
  bind:ref
  {margin}
  {padding}
  bg={finalBg}
  {borderWidth}
  {borderColor}
  {borderStyle}
  {borderRadius}
  {shadow}
  {zIndex}
  {...rest}
>
  <div class="Carousel-leftControl">
    {#if currentSlide > 0}
      <button onclick={prevSlide} aria-label="Previous Slide">
        <PhCaretLeft size={24} />
      </button>
    {/if}
  </div>

  <div
    class="Carousel-slides"
    style={transformStyle}
    bind:this={carouselSlidesElement}
  >
    {@render children?.()}
  </div>

  <div class="Carousel-rightControl">
    {#if currentSlide < slideCount - 1}
      <button onclick={nextSlide} aria-label="Next Slide">
        <PhCaretRight size={24} />
      </button>
    {/if}
  </div>
</Skeleton>

<style>
  :global(.Carousel) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 200px;
    position: relative;
    overflow: hidden;
  }

  .Carousel-leftControl,
  .Carousel-rightControl {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .Carousel-leftControl button,
  .Carousel-rightControl button {
    background-color: transparent;
    border: none;
    color: var(--text-secondary);
    font-size: 24px;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    border-radius: 100%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .Carousel-leftControl button:hover,
  .Carousel-rightControl button:hover {
    color: var(--text-secondary);
    background-color: var(--background-elevated-2);
  }

  .Carousel-leftControl button:active,
  .Carousel-rightControl button:active {
    background-color: var(--background-top);
  }

  .Carousel-leftControl {
    left: 0;
  }

  .Carousel-rightControl {
    right: 0;
  }

  .Carousel-slides {
    display: flex;
    width: 100%;
    transition: transform 0.5s;
  }

  /* IMPORTANTE: In Svelte scoped styles, per colpire i figli passati
       tramite {@render children} devi usare :global()
    */
  .Carousel-slides > :global(*) {
    flex: 0 0 100%;
    width: 100%;
  }
</style>
