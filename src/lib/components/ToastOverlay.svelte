<script>
  import { fly, fade } from "svelte/transition";
  import Toast from "./Toast.svelte";

  let {
    children,
    toasts,
    limit = 3,
    timeout = 4000,
    placement = "bottom",
    width = 420,
    gap = 10,
    offset = 16,
    class: className = "",
    ref = $bindable(),
    ...rest
  } = $props();

  let internalToasts = $state([]);
  let timers = new Map();

  function createId() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
    return Math.random().toString(36).slice(2);
  }

  function normalizeToast(input) {
    const id = input?.id ?? createId();

    return {
      id,
      title: input?.title ?? "",
      subtitle: input?.subtitle ?? "",
      variant: input?.variant ?? "neutral",
      actionLabel: input?.actionLabel ?? "",
      onAction: input?.onAction,
      dismissible: input?.dismissible ?? true,
      timeout: input?.timeout,
      icon: input?.icon,
    };
  }

  function scheduleDismiss(t) {
    const duration = Number.isFinite(Number(t.timeout)) ? Number(t.timeout) : timeout;
    if (!Number.isFinite(duration) || duration <= 0) return;

    clearDismissTimer(t.id);
    const timerId = setTimeout(() => dismissToast(t.id), duration);
    timers.set(t.id, timerId);
  }

  function clearDismissTimer(id) {
    const timerId = timers.get(id);
    if (timerId) {
      clearTimeout(timerId);
      timers.delete(id);
    }
  }

  function getList() {
    return Array.isArray(toasts) ? toasts : internalToasts;
  }

  export function addToast(input) {
    if (Array.isArray(toasts)) return undefined;

    const t = normalizeToast(input);
    internalToasts = [t, ...internalToasts].slice(0, Math.max(1, Number(limit) || 1));
    scheduleDismiss(t);
    return t.id;
  }

  export function dismissToast(id) {
    clearDismissTimer(id);

    if (Array.isArray(toasts)) return;
    internalToasts = internalToasts.filter((t) => t.id !== id);
  }

  export function clearToasts() {
    if (Array.isArray(toasts)) return;

    for (const t of internalToasts) {
      clearDismissTimer(t.id);
    }
    internalToasts = [];
  }

  let visibleToasts = $derived.by(() => {
    const list = getList();
    if (!Array.isArray(list)) return [];
    return list.slice(0, Math.max(1, Number(limit) || 1));
  });

  const containerStyle = $derived.by(() => {
    const w = Number(width);
    const maxWidth = Number.isFinite(w) ? `${w}px` : "420px";
    const g = Number(gap);
    const gapPx = Number.isFinite(g) ? `${g}px` : "10px";
    const o = Number(offset);
    const offsetPx = Number.isFinite(o) ? `${o}px` : "16px";

    return [
      `max-width: ${maxWidth}`,
      `gap: ${gapPx}`,
      placement === "top" ? `top: ${offsetPx}` : `bottom: ${offsetPx}`,
    ].join("; ");
  });
</script>

<div class="ToastOverlay {className}" bind:this={ref} {...rest}>
  <div class="ToastOverlay-content">
    {@render children?.()}
  </div>

  <div class="ToastOverlay-layer" aria-live="polite" aria-relevant="additions removals">
    <div class="ToastOverlay-stack" style={containerStyle}>
      {#each visibleToasts as t (t.id)}
        <div
          class="ToastOverlay-item"
          in:fly={{ y: placement === "top" ? -12 : 12, duration: 160 }}
          out:fade={{ duration: 120 }}
        >
          <Toast
            title={t.title}
            subtitle={t.subtitle}
            variant={t.variant}
            actionLabel={t.actionLabel}
            onAction={t.onAction}
            dismissible={t.dismissible}
            icon={t.icon}
            onDismiss={() => dismissToast(t.id)}
          />
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  :global(.ToastOverlay) {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .ToastOverlay-content {
    width: 100%;
    height: 100%;
  }

  .ToastOverlay-layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .ToastOverlay-stack {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    width: calc(100% - 32px);
    pointer-events: none;
  }

  .ToastOverlay-item {
    pointer-events: auto;
  }
</style>
