import styled from "@emotion/styled";
import type { FC } from "react";
import { Box } from "@/components/unit/Box";
import { Text } from "@/components/unit/Text";

const _Item = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  cursor: pointer;
  
  p, &::before {
    content: "";
    display: block;
    padding: 4px;
    border-radius: 8px;
    border: 2px solid var(${({ theme }) => theme.surface.primaryInversed});
    position: absolute;
    inset: 0;
    transition: 0ms;
  }
  p {
    background-color: var(${({ theme }) => theme.surface.primary});
  }
  &::before {
    background-color: var(${({ theme }) => theme.surface.primaryInversed});
    transform-origin: inherit;
    transform: translate(2px, 2px);
  }
  
  &:hover {
    &[data-key="W"] {
      cursor: n-resize;
    }
    &[data-key="A"] {
      cursor: w-resize;
    }
    &[data-key="S"] {
      cursor: s-resize;
    }
    &[data-key="D"] {
      cursor: e-resize;
    }

    p {
      transform: translate(1px, 1px);
    }
  }
`;

const _Container = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 8px;
  transform-origin: center center;
  transform: rotate(30deg) skewX(-30deg);

  & > ${_Item.name} {
    &[data-key="W"] {
      grid-area: 1 / 2;
    }
    &[data-key="A"] {
      grid-area: 2 / 1;
    }
    &[data-key="S"] {
      grid-area: 3 / 2;
    }
    &[data-key="D"] {
      grid-area: 2 / 3;
    }
  }
`;

export const TopKeyboardWasdHint: FC = () => {
  return (
    <_Container>
      <_Item data-key="W">
        <Text fz={16} fw={800}>
          W
        </Text>
      </_Item>
      <_Item data-key="A">
        <Text fz={16} fw={800}>
          A
        </Text>
      </_Item>
      <_Item data-key="S">
        <Text fz={16} fw={800}>
          S
        </Text>
      </_Item>
      <_Item data-key="D">
        <Text fz={16} fw={800}>
          D
        </Text>
      </_Item>
    </_Container>
  );
};
