import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "@/components/unit/Icon";
import { SegmentControl } from "./SegmentControl";

const meta = {
  title: "Modules/SegmentControl",
  component: SegmentControl,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SegmentControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Language: Story = {
  args: {
    name: "language",
    defaultKey: "ja",
    items: [<span key="ja">JA</span>, <span key="en">EN</span>],
    onSelect: (key) => console.log(key),
  },
};

export const Theme: Story = {
  args: {
    name: "theme",
    defaultKey: "light",
    items: [<Icon key="light" name="modeLight" size={16} />, <Icon key="dark" name="modeDark" size={16} />],
    onSelect: (key) => console.log(key),
  },
};

export const CustomOptions: Story = {
  args: {
    name: "custom",
    defaultKey: "option1",
    items: [<span key="option1">Option 1</span>, <span key="option2">Option 2</span>],
    onSelect: (key) => console.log(key),
  },
};
