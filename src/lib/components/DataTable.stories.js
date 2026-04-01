import _DataTableDemo from "./_DataTableDemo.svelte";
import DataTable from "./DataTable.svelte";

const meta = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  argTypes: {
    selectable: { control: "boolean" },
  },
};

export default meta;

export const Default = {
  render: (args) => ({
    Component: _DataTableDemo,
    props: args,
  }),
  args: {
    selectable: false,
  },
};

export const Selectable = {
  render: (args) => ({
    Component: _DataTableDemo,
    props: args,
  }),
  args: {
    selectable: true,
  },
};
