import Toast from "./Toast.svelte";

const meta = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    variant: {
      control: { type: "select" },
      options: ["neutral", "success", "warning", "error", "info"],
    },
    actionLabel: { control: "text" },
    dismissible: { control: "boolean" },
    onAction: { action: "action" },
    onDismiss: { action: "dismiss" },
  },
};

export default meta;

export const Default = {
  args: {
    title: "File saved",
    subtitle: "Your changes have been saved.",
    variant: "neutral",
    dismissible: true,
  },
};

export const Success = {
  args: {
    title: "Success",
    subtitle: "Operation completed.",
    variant: "success",
    dismissible: true,
  },
};

export const Error = {
  args: {
    title: "Error",
    subtitle: "Something went wrong. Please try again.",
    variant: "error",
    dismissible: true,
  },
};

export const WithAction = {
  args: {
    title: "Update available",
    subtitle: "A new version is ready to install.",
    variant: "info",
    actionLabel: "Update now",
    dismissible: true,
  },
};
