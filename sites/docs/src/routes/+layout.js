export const load = async () => {
	// Path from sites/docs/src/routes/+layout.js to root docs/components
	const modules = import.meta.glob('../../../../docs/components/*.md');
	const components = Object.keys(modules).map((path) => {
		const slug = path.split('/').pop().replace('.md', '');
		const name = slug
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
		return {
			slug,
			name,
			path
		};
	});

	return {
		components: components.sort((a, b) => a.name.localeCompare(b.name))
	};
};
