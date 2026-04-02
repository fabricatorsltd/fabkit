<script>
	let { data } = $props();
	const MarkdownComponent = data.component;
</script>

{#if MarkdownComponent}
	<MarkdownComponent />
{/if}
