import Checkbox from "./Checkbox.svelte";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    label: { control: "text" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    onChange: { action: "changed" },
  },
};

export default meta;

export const Default = {
  args: {
    label: "Accept terms",
    checked: false,
  },
};

export const Checked = {
  args: {
    label: "Enabled option",
    checked: true,
  },
};

export const Indeterminate = {
  args: {
    label: "Select all",
    indeterminate: true,
  },
};

export const Disabled = {
  args: {
    label: "Unavailable option",
    disabled: true,
  },
};
