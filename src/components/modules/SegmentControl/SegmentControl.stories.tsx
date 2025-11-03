import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
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
  render: () => {
    const [selected, setSelected] = useState("ja");
    return (
      <SegmentControl
        name="language"
        defaultKey={selected}
        items={[<span key="ja">JA</span>, <span key="en">EN</span>]}
        onSelect={(key) => setSelected(key)}
      />
    );
  },
};

export const Theme: Story = {
  render: () => {
    const [selected, setSelected] = useState("light");
    return (
      <SegmentControl
        name="theme"
        defaultKey={selected}
        items={[<Icon key="light" name="light" size={16} />, <Icon key="dark" name="dark" size={16} />]}
        onSelect={(key) => setSelected(key)}
      />
    );
  },
};

export const CustomOptions: Story = {
  render: () => {
    const [selected, setSelected] = useState("option1");
    return (
      <SegmentControl
        name="custom"
        defaultKey={selected}
        items={[<span key="option1">Option 1</span>, <span key="option2">Option 2</span>]}
        onSelect={(key) => setSelected(key)}
      />
    );
  },
};
