import _CarouselDemo from "./_CarouselDemo.svelte";
import Carousel from "./Carousel.svelte";

const meta = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  argTypes: {
    borderRadius: { control: "text" },
    bg: { control: "color" },
  },
};

export default meta;

export const Default = {
  render: () => ({
    Component: _CarouselDemo,
    props: {},
  }),
};
