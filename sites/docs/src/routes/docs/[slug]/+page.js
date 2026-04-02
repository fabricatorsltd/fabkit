import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { slug } = params;
	// Path from sites/docs/src/routes/docs/[slug]/+page.js to root docs/components
	const modules = import.meta.glob('../../../../../../docs/components/*.md');
	
	const path = `../../../../../../docs/components/${slug}.md`;
	
	if (!modules[path]) {
		throw error(404, `Component not found: ${slug}`);
	}
	
	const component = await modules[path]();
	
	return {
		component: component.default,
		metadata: component.metadata
	};
};
