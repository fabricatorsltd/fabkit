import Dialog from "./Dialog.svelte";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    closeOnBackdrop: { control: "boolean" },
    closeOnEscape: { control: "boolean" },
  },
};

export default meta;

export const Default = {
  render: (args) => ({
    Component: Dialog,
    props: args,
    slots: {
      default: `
        <p>Custom body content (form, layout, etc.).</p>
      `,
    },
  }),
  args: {
    title: "Dialog",
    onClose: () => alert("Closed"),
    closeOnBackdrop: true,
    closeOnEscape: true,
  },
};
