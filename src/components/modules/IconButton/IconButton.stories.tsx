import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";

const meta = {
  title: "Modules/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: ["light", "dark", "footprint", "close"],
    },
    color: {
      control: "select",
      options: ["primary", "primaryInversed", "primaryDisabled"],
    },
    size: {
      control: { type: "number", min: 12, max: 48 },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    name: "light",
    size: 24,
    color: "primary",
    onClick: () => console.log("clicked"),
  },
};

export const Dark: Story = {
  args: {
    name: "dark",
    size: 24,
    color: "primary",
    onClick: () => console.log("clicked"),
  },
};

export const Footprint: Story = {
  args: {
    name: "footprint",
    size: 24,
    color: "primary",
    onClick: () => console.log("clicked"),
  },
};

export const Close: Story = {
  args: {
    name: "close",
    size: 24,
    color: "primary",
    onClick: () => console.log("clicked"),
  },
};

export const LargeSize: Story = {
  args: {
    name: "footprint",
    size: 48,
    color: "primary",
    onClick: () => console.log("clicked"),
  },
};

export const SmallSize: Story = {
  args: {
    name: "close",
    size: 16,
    color: "primary",
    onClick: () => console.log("clicked"),
  },
};

