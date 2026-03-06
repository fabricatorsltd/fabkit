<script>
  import { getContext } from "svelte";
  import { CARD_RADIUS_CONTEXT_KEY } from "../context.js";
  import Skeleton from "./Skeleton.svelte";

  /**
   * @typedef {'cover' | 'contain' | 'fill' | 'none' | 'scale-down'} ObjectFit
   * @typedef {'lazy' | 'eager'} LoadingStrategy
   * @typedef {'async' | 'sync' | 'auto'} DecodingStrategy
   * @typedef {'auto' | 'high' | 'low'} FetchPriority
   */

  let {
    // Image source — required (src or srcset)
    src = "",
    srcset = "",
    sizes = "",
    alt = "",

    // Sizing
    width,
    height,
    aspectRatio,

    // Object fit & position
    fit = "cover",
    position = "center",

    // Placeholder shown while loading
    placeholder = "",        // URL or data URI
    placeholderColor = "var(--background-elevated)",

    // Fallback shown on error
    fallback = "",           // URL or data URI
    fallbackColor = "var(--background-elevated-2)",

    // Loading behavior
    loading = "lazy",
    decoding = "async",
    fetchpriority = "auto",

    // Blur-up effect
    blur = false,            // animate blur removal on load
    blurAmount = 12,         // px

    // Zoom on hover
    zoomOnHover = false,

    // Crossorigin
    crossorigin,

    // Rounded corners — pass directly or inherit from Skeleton
    borderRadius,

    // Overlay snippet rendered on top of the image
    overlay,

    // Custom error/placeholder snippets
    errorContent,
    placeholderContent,

    // Aspect ratio helpers
    square = false,          // forces 1:1 aspect ratio
    portrait = false,        // forces 3:4 aspect ratio
    landscape = false,       // forces 16:9 aspect ratio

    // Accessibility
    role = "img",
    draggable = false,

    // Interaction events
    onclick,
    onload,
    onerror,

    // Skeleton pass-through
    class: className = "",
    margin,
    padding,
    bg,
    bgHover,
    bgFocus,
    bgActive,
    borderWidth,
    borderColor,
    borderStyle,
    shadow,
    shadowSecondary,
    zIndex,
    opacity,
    overflow = "hidden",
    transformHover,
    transformFocus,
    transformActive,
    ref = $bindable(),
    ...rest
  } = $props();

  const getParentCardRadius = getContext(CARD_RADIUS_CONTEXT_KEY);
  const parentCardRadius = $derived(getParentCardRadius ? getParentCardRadius() : undefined);

  let loaded = $state(false);
  let errored = $state(false);
  let imgElement = $state();

  // Resolve aspect ratio from boolean helpers or explicit prop
  const resolvedAspectRatio = $derived(
    square ? "1 / 1"
    : portrait ? "3 / 4"
    : landscape ? "16 / 9"
    : aspectRatio ?? undefined
  );

  // Effective src: fallback on error, placeholder while loading
  const effectiveSrc = $derived(
    errored
      ? (fallback || placeholder || src)
      : src
  );

  const placeholderVisible = $derived(!loaded && !errored && placeholder);
  const bgColor = $derived(
    errored ? fallbackColor : placeholderColor
  );

  function handleLoad() {
    loaded = true;
    onload?.();
  }

  function handleError() {
    errored = true;
    onerror?.();
  }

  const containerStyle = $derived.by(() => {
    const parts = [];
    if (resolvedAspectRatio) parts.push(`aspect-ratio: ${resolvedAspectRatio}`);
    if (width !== undefined) parts.push(`width: ${typeof width === 'number' ? width + 'px' : width}`);
    if (height !== undefined) parts.push(`height: ${typeof height === 'number' ? height + 'px' : height}`);
    return parts.join('; ');
  });

  const imgStyle = $derived.by(() => {
    const parts = [
      `object-fit: ${fit}`,
      `object-position: ${position}`,
      `width: 100%`,
      `height: 100%`,
      `display: block`,
    ];
    if (blur && !loaded) {
      parts.push(`filter: blur(${blurAmount}px)`);
      parts.push(`transform: scale(1.05)`);
    } else if (blur && loaded) {
      parts.push(`filter: none`);
      parts.push(`transform: scale(1)`);
    }
    if (zoomOnHover) {
      parts.push(`transform-origin: center`);
    }
    if (!loaded && !errored) {
      parts.push(`opacity: 0`);
    }
    return parts.join('; ');
  });
</script>

<Skeleton
  bind:ref
  class="Image {onclick ? 'Image--clickable' : ''} {className}"
  bg={errored ? fallbackColor : (bg ?? (loaded ? 'transparent' : placeholderColor))}
  {bgHover}
  {bgFocus}
  {bgActive}
  {borderWidth}
  {borderColor}
  {borderStyle}
  borderRadius={borderRadius ?? parentCardRadius ?? [0,0,0,0]}
  {shadow}
  {shadowSecondary}
  {zIndex}
  {opacity}
  {overflow}
  {margin}
  {padding}
  {transformHover}
  {transformFocus}
  {transformActive}
  {onclick}
  position="relative"
  style={containerStyle}
  {role}
  {...rest}
>
  <!-- Placeholder background layer -->
  {#if placeholderVisible}
    <div class="Image-placeholder">
      {#if placeholderContent}
        <div class="Image-placeholder-content">
          {@render placeholderContent()}
        </div>
      {:else if placeholder}
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          style="width:100%;height:100%;object-fit:{fit};object-position:{position};display:block;filter:blur(6px);transform:scale(1.05)"
          draggable={false}
        />
      {/if}
    </div>
  {/if}

  <!-- Main image or error state -->
  {#if errored}
    <div class="Image-error">
      {#if errorContent}
        {@render errorContent()}
      {:else if fallback}
        <img
          src={fallback}
          {alt}
          style="width:100%;height:100%;object-fit:{fit};object-position:{position};display:block;"
          draggable={false}
        />
      {:else}
        <!-- Default broken image icon (Phosphor ImageBroken) -->
        <div class="Image-error-default" title={alt || 'Image failed to load'}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40" fill="currentColor" aria-hidden="true">
            <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,200V172l52-52,44,44a8,8,0,0,0,11.31,0l24-24L216,194.63V200Z"/>
          </svg>
        </div>
      {/if}
    </div>
  {:else if effectiveSrc}
    <img
      bind:this={imgElement}
      src={effectiveSrc}
      {srcset}
      {sizes}
      {alt}
      {loading}
      {decoding}
      fetchpriority={fetchpriority}
      draggable={draggable}
      crossorigin={crossorigin}
      onload={handleLoad}
      onerror={handleError}
      style={imgStyle}
      class="Image-img"
      class:Image-img--loaded={loaded}
      class:Image-img--blur={blur}
      class:Image-img--zoom={zoomOnHover}
    />
  {:else}
    <!-- No src: show colored placeholder -->
    <div class="Image-empty" style="background:{fallbackColor}"></div>
  {/if}

  <!-- Overlay slot -->
  {#if overlay}
    <div class="Image-overlay">
      {@render overlay()}
    </div>
  {/if}
</Skeleton>

<style>
  :global(.Image) {
    position: relative;
    display: block;
    overflow: hidden;
  }

  :global(.Image--clickable) {
    cursor: pointer;
  }

  .Image-placeholder {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .Image-img {
    position: absolute;
    inset: 0;
    transition:
      opacity 0.3s ease,
      filter 0.4s ease,
      transform 0.4s ease;
    opacity: 0;
  }

  .Image-img--loaded {
    opacity: 1;
  }

  .Image-img--blur {
    transition:
      opacity 0.3s ease,
      filter 0.6s ease,
      transform 0.6s ease;
  }

  .Image-img--zoom {
    transition:
      opacity 0.3s ease,
      filter 0.4s ease,
      transform 0.4s ease;
  }

  :global(.Image:hover) .Image-img--zoom {
    transform: scale(1.06);
  }

  .Image-placeholder-content {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .Image-error {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .Image-error-default {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--text-secondary, #888);
    background: var(--background-elevated, #f5f5f5);
  }

  .Image-empty {
    position: absolute;
    inset: 0;
  }

  .Image-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
  }

  .Image-overlay > :global(*) {
    pointer-events: auto;
  }
</style>
