<script>
  import Carousel from "./Carousel.svelte";
</script>

<Carousel style="height: 200px">
  <div style="background: var(--accent-primary); color: #fff; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; font-weight: 600;">
    Slide 1
  </div>
  <div style="background: var(--background-elevated); height: 100%; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; font-weight: 600;">
    Slide 2
  </div>
  <div style="background: var(--background-base); height: 100%; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; font-weight: 600;">
    Slide 3
  </div>
</Carousel>
