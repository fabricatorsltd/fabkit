import PopOverWrapper from "./PopOverWrapper.svelte";
import PopOver from "./PopOver.svelte";

const meta = {
  title: "Components/PopOver",
  component: PopOver,
  tags: ["autodocs"],
  argTypes: {
    attachTo: { control: "object" },
    onClose: { action: "closed" },
  },
};

export default meta;

export const Default = {
  render: (args) => ({
    Component: PopOverWrapper,
    props: args,
    // children: SnippetContent
  }),
};

/*
{#snippet SnippetContent()}
	<p>This is a popover.</p>
{/snippet}
*/
