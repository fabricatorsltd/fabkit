<script>
    import { resolveProps } from "../system.js";

    let {
        label = "",
        icon = "",
        children,
        disabled = false,
        variant = "secondary", // primary, secondary, destructive, flat
        square = false,
        onclick,
        class: className = "",
        // Collect expressive syntax props
        ...rest
    } = $props();

    const variants = {
        primary: {
            bg: "var(--action-suggested)",
            color: "var(--text-primary-alt)",
            hover: {
                bg: "var(--action-suggested-hover)",
            },
            active: {
                bg: "var(--action-suggested-active)",
            },
        },
        secondary: {
            bg: "var(--background-top)",
            color: "var(--text-primary)",
            hover: {
                bg: "var(--background-elevated)",
            },
            active: {
                bg: "var(--background-base)",
            },
        },
        destructive: {
            bg: "var(--action-destructive)",
            color: "var(--text-primary-alt)",
            hover: {
                bg: "var(--action-destructive-hover)",
            },
            active: {
                bg: "var(--action-destructive-active)",
            },
        },
        flat: {
            bg: "transparent",
            color: "var(--text-primary)",
            hover: {
                bg: "var(--background-elevated)",
            },
            active: {
                bg: "var(--background-base)",
            },
        },
    };

    const selectedVariant = $derived(variants[variant] || variants.secondary);

    // Local derived values for fallbacks
    const finalPadding = $derived(
        rest.padding !== undefined
            ? rest.padding
            : square
                ? [10, 10, 10, 10]
                : icon && !label
                    ? [10, 10, 10, 10]
                    : [10, 15, 10, 15],
    );

    const finalBorderRadius = $derived(
        rest.borderRadius !== undefined || rest.radius !== undefined
            ? rest.borderRadius ?? rest.radius
            : "var(--snt-border-radius, 20px)",
    );

    let classes = $derived.by(() => {
        const klasses = [];
        if (icon && label) klasses.push("Button--with-icon");
        if (disabled) klasses.push("Button--disabled");
        if (square) klasses.push("Button--square");
        return klasses.join(" ");
    });

    const processedProps = $derived.by(() => {
        const defaults = {
            padding: finalPadding,
            bg: rest.bg ?? selectedVariant.bg,
            hover: rest.hover ?? selectedVariant.hover,
            focus: rest.focus ?? selectedVariant.active,
            active: rest.active ?? selectedVariant.active,
            borderWidth: rest.borderWidth ?? [0,0,0,0],
            borderColor: rest.borderColor ?? 'transparent',
            borderStyle: rest.borderStyle ?? "solid",
            borderRadius: finalBorderRadius,
            shadow: rest.shadow ?? "none",
            color: rest.color ?? selectedVariant.color,
            zIndex: rest.zIndex ?? 0,
            ...rest
        };
        return resolveProps(defaults);
    });
</script>

<button
    class="Button {classes} {className}"
    {disabled}
    {onclick}
    style={processedProps.styles}
    {...processedProps.filteredRest}
>
    {#if children}
        {@render children()}
    {:else}
        {#if icon}
            {#if typeof icon === "function" && icon.length <= 1}
                {@render icon()}
            {:else}
                {@const Component = icon}
                <Component />
            {/if}
        {/if}
        {#if label}
            <span class="Button-label">{label}</span>
        {/if}
    {/if}
</button>

<style>
    :global(.Button) {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s,
        color 0.2s;
        border: 0;
        font-size: 15px;
        gap: 5px;
    }

    :global(.Button--square) {
        border-radius: var(--snt-border-radius, 12px);
    }

    :global(.Button--with-icon) {
        padding-right: 20px;
    }

    :global(.Button--disabled) {
        cursor: not-allowed;
        opacity: 0.5;
    }

    .Button-label {
        font-weight: 600;
        position: relative;
        top: -1px;
    }
</style>
