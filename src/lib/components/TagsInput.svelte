<script>
  import Skeleton from "./Skeleton.svelte";
  import PhX from "../icons/components/X.svelte";

  let {
    tags = $bindable([]),
    placeholder = "Add tag…",
    maxTags = undefined,
    flat = false,
    // Skeleton pass-through
    margin = [0, 0, 0, 0],
    padding = [0, 0, 0, 0],
    bg = "transparent",
    bgHover,
    bgFocus,
    bgActive,
    borderWidth = [0, 0, 0, 0],
    borderColor = "transparent",
    borderStyle = "solid",
    borderRadius = [0, 0, 0, 0],
    shadow = "none",
    zIndex = 0,
    ref = $bindable(),
    class: className = "",
    ...rest
  } = $props();

  let inputValue = $state("");

  function addTag(raw) {
    const tag = raw.trim();
    if (!tag) return;
    if (maxTags !== undefined && tags.length >= maxTags) return;
    if (!tags.includes(tag)) {
      tags = [...tags, tag];
    }
    inputValue = "";
  }

  function removeTag(index) {
    tags = tags.filter((_, i) => i !== index);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(inputValue);
    } else if (event.key === "Backspace" && inputValue === "" && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  }
</script>

<Skeleton
  class="TagsInput {className}"
  bind:ref
  {margin}
  {padding}
  {bg}
  {bgHover}
  {bgFocus}
  {bgActive}
  {borderWidth}
  {borderColor}
  {borderStyle}
  {borderRadius}
  {shadow}
  {zIndex}
  {...rest}
>
  <div
    class="TagsInput-container"
    class:TagsInput-container--flat={flat}
  >
    {#each tags as tag, i}
      <div class="TagsInput-tag">
        <span>{tag}</span>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="TagsInput-remove" onclick={() => removeTag(i)} type="button">
          <PhX size={12} />
        </button>
      </div>
    {/each}
    <input
      class="TagsInput-input"
      bind:value={inputValue}
      {placeholder}
      onkeydown={handleKeyDown}
    />
  </div>
</Skeleton>

<style>
  .TagsInput-container {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
    border-bottom: 1px solid var(--border-tertiary);
    padding: 6px 0;
    min-height: 40px;
  }

  .TagsInput-container:focus-within:not(.TagsInput-container--flat) {
    border-bottom: 2px solid var(--action-suggested);
  }

  .TagsInput-container--flat {
    border-bottom: none;
  }

  .TagsInput-tag {
    display: flex;
    align-items: center;
    gap: 4px;
    background: var(--background-elevated);
    border: 1px solid var(--border-primary);
    border-radius: 20px;
    padding: 2px 8px 2px 10px;
    font-size: 0.85rem;
    color: var(--text-primary);
  }

  .TagsInput-remove {
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: var(--text-secondary);
    padding: 0;
  }

  .TagsInput-remove:hover {
    color: var(--action-destructive);
  }

  .TagsInput-input {
    flex: 1;
    min-width: 80px;
    border: none;
    background: transparent;
    color: var(--text-primary);
    font-size: 0.95rem;
    outline: none;
    padding: 2px 0;
  }
</style>
