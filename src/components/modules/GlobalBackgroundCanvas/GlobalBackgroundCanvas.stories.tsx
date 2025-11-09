import type { Meta, StoryObj } from "@storybook/react";
import { GlobalBackgroundCanvas } from "./GlobalBackgroundCanvas";

const meta = {
  title: "Modules/GlobalBackgroundCanvas",
  component: GlobalBackgroundCanvas,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GlobalBackgroundCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story: "Drag on the canvas to move the grid and stickers",
      },
    },
  },
};
