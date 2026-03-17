import ConfirmDialog from "./ConfirmDialog.svelte";

const meta = {
  title: "Components/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    messages: { control: "object" },
    confirmText: { control: "text" },
    confirmType: {
      control: { type: "select" },
      options: ["button", "suggested", "destructive", "flat"],
    },
    cancelText: { control: "text" },
  },
};

export default meta;

export const Default = {
  args: {
    title: "Confirmation",
    messages: ["Are you sure you want to proceed?"],
    confirm: () => alert("Confirmed"),
    cancel: () => alert("Cancelled"),
  },
};
