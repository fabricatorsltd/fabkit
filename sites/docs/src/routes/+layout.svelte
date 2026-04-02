<script>
	import { SideLayout, Menu, MenuItem, VBox, HBox, Text, Button, PhHouse, PhFileText } from '@fabricatorsltd/fabkit';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let { children, data } = $props();

	const components = data.components || [];

	const navItems = components.map(c => ({
		label: c.name,
		id: c.slug,
		icon: PhFileText,
		href: `/docs/${c.slug}`
	}));

</script>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: system-ui, -apple-system, sans-serif;
		height: 100vh;
	}

	.sidebar-header {
		padding: 1rem;
		border-bottom: 1px solid #ddd;
	}

	.content-wrapper {
		padding: 2rem;
		max-width: 800px;
		margin: 0 auto;
	}
</style>

<SideLayout size={{ left: 20, right: 80 }}>
	{#snippet sidebar()}
		<VBox gap="none" style="height: 100%; border-right: 1px solid #ddd; background: #f9f9f9;">
			<div class="sidebar-header">
				<Text weight="bold" size="lg">Fabkit Docs</Text>
			</div>
			<Menu>
				<MenuItem 
					label="Home" 
					icon={PhHouse} 
					active={$page.url.pathname === '/'} 
					href="/"
				/>
				<div style="padding: 0.5rem 1rem;">
					<Text size="sm" weight="bold" color="secondary">COMPONENTS</Text>
				</div>
				{#each navItems as item}
					<MenuItem 
						label={item.label} 
						icon={item.icon} 
						active={$page.url.pathname === item.href} 
						href={item.href}
					/>
				{/each}
			</Menu>
		</VBox>
	{/snippet}

	{#snippet content()}
		<div class="content-wrapper">
			{@render children()}
		</div>
	{#/snippet}
</SideLayout>
