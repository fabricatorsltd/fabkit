import _CardDemo from "./_CardDemo.svelte";
import Card from "./Card.svelte";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    clip: { control: "boolean" },
  },
};

export default meta;

export const Default = {
  render: (args) => ({
    Component: _CardDemo,
    props: { title: "Card Title", body: "Card body content.", ...args },
  }),
};

export const Clipped = {
  render: () => ({
    Component: _CardDemo,
    props: { title: "Clipped Card", body: "Overflow is hidden.", clip: true },
  }),
};
