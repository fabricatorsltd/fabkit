import NumberField from "./NumberField.svelte";

const meta = {
  title: "Components/NumberField",
  component: NumberField,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "number" },
    label: { control: "text" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    icon: { control: "text" },
    iconPosition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
  },
};

export default meta;

export const Default = {
  args: {
    label: "Quantity",
    value: 0,
  },
};

export const WithRange = {
  args: {
    label: "Age",
    value: 25,
    min: 0,
    max: 120,
    step: 1,
  },
};

export const WithStep = {
  args: {
    label: "Price",
    value: 9.99,
    step: 0.01,
    min: 0,
  },
};
