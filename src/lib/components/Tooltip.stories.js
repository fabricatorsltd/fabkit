import _TooltipDemo from "./_TooltipDemo.svelte";
import Tooltip from "./Tooltip.svelte";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    position: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
    },
    delay: { control: "number" },
  },
};

export default meta;

export const Default = {
  render: (args) => ({
    Component: _TooltipDemo,
    props: args,
  }),
  args: {
    text: "Helpful tooltip",
    position: "top",
    delay: 300,
  },
};

export const Bottom = {
  render: (args) => ({
    Component: _TooltipDemo,
    props: args,
  }),
  args: {
    text: "Tooltip below",
    position: "bottom",
    delay: 0,
  },
};
