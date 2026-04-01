import _PanedDemo from "./_PanedDemo.svelte";
import Paned from "./Paned.svelte";

const meta = {
  title: "Components/Paned",
  component: Paned,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "object" },
    minLeft: { control: "number" },
    leftTrigger: { control: "number" },
    context: { control: "text" },
  },
};

export default meta;

export const Default = {
  render: (args) => ({
    Component: _PanedDemo,
    props: { size: { left: 30, right: 70 }, minLeft: 100, ...args },
  }),
  args: {
    size: { left: 30, right: 70 },
    minLeft: 100,
  },
};

export const EvenSplit = {
  render: () => ({
    Component: _PanedDemo,
    props: { size: { left: 50, right: 50 }, minLeft: 80 },
  }),
};
