import Menu from "./Menu.svelte";
import { Bell } from '../icons/components';

const meta = {
  title: "Components/Menu",
  component: Menu,
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: "object",
      description: "An array of menu items. Each item can have `label` (string), `action` (function), `href` (string), and `icon` (Svelte component) properties.",
    },
  },
};

export default meta;

export const Default = {
  args: {
    items: [
      { label: "Item 1", action: () => alert("Item 1 clicked") },
      { label: "Item 2", action: () => alert("Item 2 clicked") },
      { label: "Item 3", action: () => alert("Item 3 clicked") },
    ],
  },
};

export const WithIcons = {
  args: {
    items: [
      { label: "Notifications", icon: Bell, action: () => alert("Notifications clicked") },
      { label: "Settings", action: () => alert("Settings clicked") },
      { label: "Logout", action: () => alert("Logout clicked") },
    ],
  },
};
