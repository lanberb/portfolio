import type { Meta, StoryObj } from "@storybook/react";
import { TopCreateStickerDialog } from "./TopCreateStickerDialog";

const meta = {
  title: "Modules/CreateStickerDialog",
  component: TopCreateStickerDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TopCreateStickerDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: false,
    onRequestClose: () => console.log("Dialog close requested"),
  },
};

export const OpenByDefault: Story = {
  args: {
    open: true,
    onRequestClose: () => console.log("Dialog close requested"),
  },
};

export const Closed: Story = {
  args: {
    open: false,
    onRequestClose: () => console.log("Dialog close requested"),
  },
};
