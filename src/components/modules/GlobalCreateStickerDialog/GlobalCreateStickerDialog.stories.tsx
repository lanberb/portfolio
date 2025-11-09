import type { Meta, StoryObj } from "@storybook/react";
import { GlobalCreateStickerDialog } from "./GlobalCreateStickerDialog";

const meta = {
  title: "Modules/GlobalCreateStickerDialog",
  component: GlobalCreateStickerDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GlobalCreateStickerDialog>;

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
