import type { Meta, StoryObj } from "@storybook/react";
import { GlobalNavigation } from "./GlobalNavigation";

const meta = {
  title: "Modules/GlobalNavigation",
  component: GlobalNavigation,
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
} satisfies Meta<typeof GlobalNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAnimation: Story = {
  parameters: {
    docs: {
      description: {
        story: "Navigation with opening animation completed",
      },
    },
  },
};
