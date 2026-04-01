import SearchField from "./SearchField.svelte";

const meta = {
  title: "Components/SearchField",
  component: SearchField,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "text" },
    placeholder: { control: "text" },
    onSearch: { action: "search" },
  },
};

export default meta;

export const Default = {
  args: {
    placeholder: "Search…",
  },
};

export const WithValue = {
  args: {
    value: "fabkit",
    placeholder: "Search…",
  },
};
