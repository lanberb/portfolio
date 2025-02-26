import { Box } from "@/components/unit/Box";
import { Stack } from "@/components/unit/Stack";
import { themeKeyMap } from "@/styles/theme";
import styled from "@emotion/styled";
import { type FC, type FormEvent, useCallback } from "react";

const Item = styled(Stack)`
  &:not(:last-of-type)::after {
    content: "";
    display: block;
    margin-left: 12px;
    height: 12px;
    width: 1px;
    background-color: var(${themeKeyMap.dark.surface.primaryDisabled});
  }
`;

const _HiddenInput = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
`;

const Label = styled.label<{ selected: boolean }>`
  color: var(${({ theme, selected }) => {
    return selected ? theme.text.primary : theme.text.primaryDisabled;
  }});
  display: inline-flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

interface Props {
  items: [JSX.Element, JSX.Element];
  name: string;
  defaultKey: string | undefined;
  onSelect: (key: string) => void;
}

export const SegmentControl: FC<Props> = ({
  items,
  name,
  defaultKey,
  onSelect,
}) => {
  const handleOnInput = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      onSelect(e.currentTarget.value);
    },
    [onSelect],
  );

  return (
    <Stack gap={12} alignItems="center" height="fit-content">
      {items.map((item) => {
        const value = item.key?.toString();

        return (
          <Item key={item.key} alignItems="center">
            <_HiddenInput
              type="radio"
              name={name}
              value={value}
              id={value}
              onInput={handleOnInput}
            />
            <Label selected={value === defaultKey} htmlFor={value}>
              {item}
            </Label>
          </Item>
        );
      })}
    </Stack>
  );
};
