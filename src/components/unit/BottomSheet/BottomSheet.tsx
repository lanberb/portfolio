import styled from "@emotion/styled";
import type { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { MediaQuery } from "@/components/styles/media";

const _Frame = styled.div`
  position: fixed;
  inset: auto 0 0;
  height: 0;
  display: flex;
  justify-content: center;
`;

const _Content = styled.div<{ open: boolean }>`
  height: fit-content;
  padding-bottom: 16px;
  max-width: 480px;
  width: 100%;
  transform: translateY(${({ open }) => (open ? -100 : 0)}%);

  @media ${MediaQuery.sp} {
    padding-bottom: 0;
  }
`;

const _Inner = styled.div`
  margin-inline: 8px;
  padding: 16px;
  border-radius: 12px;
  background-color: var(${({ theme }) => theme.surface.primary});
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.16);

  @media ${MediaQuery.sp} {
    margin-inline: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

type Props = {
  open: boolean;
};

export const BottomSheet: FC<PropsWithChildren<Props>> = ({ open, children }) => {
  return createPortal(
    <_Frame>
      <_Content open={open}>
        <_Inner>{children}</_Inner>
      </_Content>
    </_Frame>,
    document.body,
  );
};
