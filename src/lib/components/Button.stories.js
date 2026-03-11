import Button from "./Button.svelte";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    icon: { control: "text" },
    disabled: { control: "boolean" },
    type: {
      control: { type: "select" },
      options: ["button", "suggested", "destructive", "flat"],
    },
    square: { control: "boolean" },
    onClick: { action: "clicked" },
  },
};

export default meta;

export const Default = {
  args: {
    label: "Button",
  },
};

export const WithIcon = {
  args: {
    label: "Settings",
    icon: "cog",
  },
};

export const Suggested = {
  args: {
    label: "Save",
    type: "suggested",
  },
};

export const Destructive = {
  args: {
    label: "Delete",
    type: "destructive",
  },
};

export const Flat = {
  args: {
    label: "Cancel",
    type: "flat",
  },
};
