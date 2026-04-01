import TextArea from "./TextArea.svelte";

const meta = {
  title: "Components/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    label: { control: "text" },
    placeholder: { control: "text" },
    rows: { control: "number" },
    autoResize: { control: "boolean" },
    readOnly: { control: "boolean" },
    flat: { control: "boolean" },
  },
};

export default meta;

export const Default = {
  args: {
    label: "Message",
    placeholder: "Type your message…",
    rows: 4,
  },
};

export const AutoResize = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself…",
    autoResize: true,
  },
};

export const ReadOnly = {
  args: {
    label: "Notes",
    value: "These notes are read-only.",
    readOnly: true,
  },
};
