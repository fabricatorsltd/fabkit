import TextField from "./TextField.svelte";

const meta = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    label: { control: "text" },
    placeholder: { control: "text" },
    type: {
      control: { type: "select" },
      options: ["text", "number", "email", "password"],
    },
    icon: { control: "text" },
    iconPosition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    readOnly: { control: "boolean" },
    flat: { control: "boolean" },
  },
};

export default meta;

export const Default = {
  args: {
    label: "Text Field",
    placeholder: "Enter text",
  },
};

export const WithLeftIcon = {
  args: {
    label: "Search",
    placeholder: "Search…",
    icon: "magnifying-glass",
    iconPosition: "left",
  },
};

export const Password = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    type: "password",
  },
};

export const ReadOnly = {
  args: {
    label: "Username",
    value: "alice_dev",
    readOnly: true,
  },
};

export const Flat = {
  args: {
    label: "Flat Field",
    placeholder: "No border",
    flat: true,
  },
};
