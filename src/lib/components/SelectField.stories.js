import SelectField from "./SelectField.svelte";

const meta = {
  title: "Components/SelectField",
  component: SelectField,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    label: { control: "text" },
    options: { control: "object" },
    flat: { control: "boolean" },
    icon: { control: "text" },
    iconPosition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
  },
};

export default meta;

const fruitOptions = [
  { value: "apple",  text: "Apple" },
  { value: "banana", text: "Banana" },
  { value: "cherry", text: "Cherry" },
];

export const Default = {
  args: {
    label: "Fruit",
    options: fruitOptions,
  },
};

export const WithPreselected = {
  args: {
    label: "Fruit",
    value: "banana",
    options: fruitOptions,
  },
};

export const Flat = {
  args: {
    label: "Theme",
    flat: true,
    options: [
      { value: "light", text: "Light" },
      { value: "dark",  text: "Dark" },
      { value: "auto",  text: "System" },
    ],
  },
};
