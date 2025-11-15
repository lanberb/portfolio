import styled from "@emotion/styled";
import type { FC } from "react";
import { MediaQuery } from "@/components/styles/media";
import { Text } from "@/components/unit/Text";

const _Item = styled.div`
  position: relative;
  width: 36px;
  height: 36px;
  cursor: pointer;
  
  p, &::before {
    content: "";
    display: block;
    padding: 4px;
    border-radius: 8px;
    border-width: 2px;
    border-style: solid;
    border-color: var(${({ theme }) => theme.surface.primaryInversed});
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
    transform: translate(0px, 2px);
  }
  &:hover {
    cursor: pointer;

    p {
      transform: translate(0px, 1px);
    }
  }

  @media ${MediaQuery.sp} {
    p, &::before {
      border-radius: 6px;
      border-width: 1px;
    }
  }
`;

interface Props {
  label: string;
}

export const KeyboardKey: FC<Props> = ({ label }) => {
  return (
    <_Item>
      <Text fz={12} fw={800}>
        {label}
      </Text>
    </_Item>
  );
};
