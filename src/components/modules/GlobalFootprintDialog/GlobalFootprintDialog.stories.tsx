import type { Meta, StoryObj } from "@storybook/react";
import { GlobalFootprintDialog } from "./GlobalFootprintDialog";

const meta = {
  title: "Modules/GlobalFootprintDialog",
  component: GlobalFootprintDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof GlobalFootprintDialog>;

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
