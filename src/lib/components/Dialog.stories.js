import _DialogDemo from "./_DialogDemo.svelte";
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
    Component: _DialogDemo,
    props: { ...args },
  }),
  args: {
    title: "Dialog",
    closeOnBackdrop: true,
    closeOnEscape: true,
  },
};

export const WithFooter = {
  render: (args) => ({
    Component: _DialogDemo,
    props: { ...args, withFooter: true },
  }),
  args: {
    title: "Confirm Action",
    closeOnBackdrop: true,
    closeOnEscape: true,
  },
};
