<script>
  import Skeleton from "./Skeleton.svelte";
  import Card from "./Card.svelte";
  import Checkbox from "./Checkbox.svelte";
  import PhCaretUp from "../icons/components/CaretUp.svelte";
  import PhCaretDown from "../icons/components/CaretDown.svelte";

  let {
    mode = "auto",
    stackAt = 720,
    columns = [],
    rows = [],
    selectable = false,
    selectedRows = $bindable([]),
    titleKey = "",
    onRowClick,
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

  let availableWidth = $state(undefined);

  const isCompact = $derived.by(() => {
    if (mode === "cards") return true;
    if (mode === "table") return false;

    const w = Number(availableWidth);
    const t = Number(stackAt);

    if (!Number.isFinite(w) || w <= 0) return false;
    if (!Number.isFinite(t) || t <= 0) return false;

    return w < t;
  });

  $effect(() => {
    if (!ref) return;
    if (typeof ResizeObserver === "undefined") return;

    const update = () => {
      availableWidth = ref.clientWidth;
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(ref);

    return () => ro.disconnect();
  });

  let sortKey = $state(null);
  let sortDir = $state("asc");

  const sortedRows = $derived.by(() => {
    if (!sortKey) return rows;
    return [...rows].sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (va === vb) return 0;
      const cmp = va < vb ? -1 : 1;
      return sortDir === "asc" ? cmp : -cmp;
    });
  });

  function sortBy(col) {
    if (!col.sortable) return;
    if (sortKey === col.key) {
      sortDir = sortDir === "asc" ? "desc" : "asc";
    } else {
      sortKey = col.key;
      sortDir = "asc";
    }
  }

  const allSelected = $derived(rows.length > 0 && selectedRows.length === rows.length);

  function toggleAll(checked) {
    selectedRows = checked ? [...rows] : [];
  }

  function toggleRow(row, checked) {
    if (checked) {
      selectedRows = [...selectedRows, row];
    } else {
      selectedRows = selectedRows.filter((r) => r !== row);
    }
  }

  function isSelected(row) {
    return selectedRows.includes(row);
  }
</script>

<Skeleton
  class={["AdaptiveTable", isCompact ? "AdaptiveTable--cards" : "AdaptiveTable--table", className]
    .filter(Boolean)
    .join(" ")}
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
  {#if isCompact}
    <div class="AdaptiveTable-cards">
      {#each sortedRows as row, i (row?.id ?? i)}
        <Card
          class={[
            "AdaptiveTable-card",
            onRowClick ? "AdaptiveTable-card--clickable" : "",
            isSelected(row) ? "AdaptiveTable-card--selected" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          padding={[12, 12, 12, 12]}
          bg="var(--background-elevated)"
          borderWidth={[1, 1, 1, 1]}
          borderColor="var(--border-primary)"
          shadow="none"
          onclick={() => onRowClick?.(row)}
        >
          {#if selectable}
            <div class="AdaptiveTable-card-select" onclick={(e) => e.stopPropagation()}>
              <Checkbox
                checked={isSelected(row)}
                onChange={(v) => toggleRow(row, v)}
              />
            </div>
          {/if}

          {#if titleKey}
            <div class="AdaptiveTable-card-title">{row?.[titleKey] ?? ""}</div>
          {/if}

          <div class="AdaptiveTable-card-body">
            {#each columns as col}
              <div class="AdaptiveTable-card-row">
                <div class="AdaptiveTable-card-label">{col.label}</div>
                <div class="AdaptiveTable-card-value">{row?.[col.key] ?? ""}</div>
              </div>
            {/each}
          </div>
        </Card>
      {/each}
    </div>
  {:else}
    <div class="AdaptiveTable-scroll">
      <table class="AdaptiveTable-table">
        <thead class="AdaptiveTable-head">
          <tr>
            {#if selectable}
              <th class="AdaptiveTable-th AdaptiveTable-th--check">
                <Checkbox checked={allSelected} onChange={(v) => toggleAll(v)} />
              </th>
            {/if}
            {#each columns as col}
              <th
                class="AdaptiveTable-th"
                class:AdaptiveTable-th--sortable={col.sortable}
                style:width={col.width}
                onclick={() => sortBy(col)}
              >
                <span class="AdaptiveTable-th-inner">
                  {col.label}
                  {#if col.sortable}
                    <span class="AdaptiveTable-sort-icon">
                      {#if sortKey === col.key && sortDir === "asc"}
                        <PhCaretUp size={12} />
                      {:else if sortKey === col.key && sortDir === "desc"}
                        <PhCaretDown size={12} />
                      {:else}
                        <PhCaretDown size={12} />
                      {/if}
                    </span>
                  {/if}
                </span>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each sortedRows as row, i}
            <tr
              class="AdaptiveTable-row"
              class:AdaptiveTable-row--odd={i % 2 !== 0}
              class:AdaptiveTable-row--selected={isSelected(row)}
              onclick={() => onRowClick?.(row)}
            >
              {#if selectable}
                <td class="AdaptiveTable-td AdaptiveTable-td--check" onclick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={isSelected(row)}
                    onChange={(v) => toggleRow(row, v)}
                  />
                </td>
              {/if}
              {#each columns as col}
                <td class="AdaptiveTable-td">{row?.[col.key] ?? ""}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</Skeleton>

<style>
  :global(.AdaptiveTable) {
    overflow: hidden;
  }

  .AdaptiveTable-scroll {
    overflow-x: auto;
    width: 100%;
  }

  .AdaptiveTable-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.92rem;
    color: var(--text-primary);
  }

  .AdaptiveTable-head {
    position: sticky;
    top: 0;
    background: var(--background-elevated);
    z-index: 1;
  }

  .AdaptiveTable-th {
    text-align: left;
    padding: 10px 12px;
    border-bottom: 2px solid var(--border-secondary);
    font-weight: 600;
    color: var(--text-secondary);
    white-space: nowrap;
  }

  .AdaptiveTable-th--sortable {
    cursor: pointer;
    user-select: none;
  }

  .AdaptiveTable-th--sortable:hover {
    color: var(--text-primary);
  }

  .AdaptiveTable-th-inner {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .AdaptiveTable-sort-icon {
    display: flex;
    align-items: center;
    opacity: 0.6;
  }

  .AdaptiveTable-th--check,
  .AdaptiveTable-td--check {
    width: 40px;
    padding: 10px 8px;
  }

  .AdaptiveTable-td {
    padding: 10px 12px;
    border-bottom: 1px solid var(--border-primary);
  }

  .AdaptiveTable-row:hover .AdaptiveTable-td {
    background: var(--background-elevated);
  }

  .AdaptiveTable-row--odd .AdaptiveTable-td {
    background: var(--background-elevated-2);
  }

  .AdaptiveTable-row--selected .AdaptiveTable-td {
    background: color-mix(in srgb, var(--action-suggested) 12%, transparent);
  }

  .AdaptiveTable-cards {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  :global(.AdaptiveTable-card) {
    position: relative;
  }

  :global(.AdaptiveTable-card--clickable) {
    cursor: pointer;
  }

  :global(.AdaptiveTable-card--selected) {
    outline: 2px solid color-mix(in srgb, var(--action-suggested) 40%, transparent);
    outline-offset: 0;
  }

  .AdaptiveTable-card-select {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .AdaptiveTable-card-title {
    font-weight: 700;
    margin-bottom: 10px;
    padding-right: 34px;
  }

  .AdaptiveTable-card-body {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .AdaptiveTable-card-row {
    display: grid;
    grid-template-columns: 140px minmax(0, 1fr);
    gap: 10px;
    align-items: start;
  }

  .AdaptiveTable-card-label {
    color: var(--text-secondary);
    font-size: 0.85rem;
  }

  .AdaptiveTable-card-value {
    min-width: 0;
    word-break: break-word;
  }
</style>
