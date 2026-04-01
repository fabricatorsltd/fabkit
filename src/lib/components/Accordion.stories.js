import _AccordionDemo from "./_AccordionDemo.svelte";
import Accordion from "./Accordion.svelte";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => ({
    Component: _AccordionDemo,
    props: {},
  }),
};
