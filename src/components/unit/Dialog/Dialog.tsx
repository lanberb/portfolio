import styled from "@emotion/styled";
import { type FC, type MouseEvent, type PropsWithChildren, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "@/components/modules/IconButton";
import { MediaQuery } from "@/components/styles/media";
import { GLOBAL_TRANSITION_DURATION } from "@/components/styles/mixins/transition";

const _Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px 12px;
  border-bottom: 1px solid var(${({ theme }) => theme.surface.primaryDisabled});
`;

interface _HeaderProps {
  onClose: () => void;
}

const Header: FC<PropsWithChildren<_HeaderProps>> = ({ children, onClose }) => {
  return (
    <_Header>
      {children}
      <IconButton name="close" size={24} onClick={onClose} />
    </_Header>
  );
};

const _Content = styled.div`
  background-color: var(${({ theme }) => theme.surface.primary});
  border-radius: 12px;
  height: 100%;
  overflow: scroll;
`;

const _Frame = styled.dialog`
  position: fixed;
  width: auto;
  min-width: 320px;
  max-width: 800px;
  height: 100%;
  max-height: min(640px, 100svh - 32px);
  margin: auto;

  @media ${MediaQuery.sp} {
    margin: auto 16px;
  }

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.64);
    opacity: 0;
    transition: 
      opacity ${GLOBAL_TRANSITION_DURATION}ms ease-in-out,
      overlay ${GLOBAL_TRANSITION_DURATION}ms allow-discrete,
      display ${GLOBAL_TRANSITION_DURATION}ms allow-discrete;
  }

  &[open]{
    &::backdrop {
      opacity: 1;
      @starting-style {
        opacity: 0;
      }
    }
  }
`;

interface _FrameProps {
  open: boolean;
  onRequestClose: () => void;
}

const Frame: FC<_FrameProps & PropsWithChildren> = ({ children, open, onRequestClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const stopPropagation = useCallback((event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  }, []);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  return createPortal(
    <_Frame aria-modal="true" role="dialog" ref={dialogRef} onClick={onRequestClose} onClose={onRequestClose}>
      <_Content onClick={stopPropagation}>{children}</_Content>
    </_Frame>,
    document.body,
  );
};

export const Dialog = {
  Frame,
  Header,
};
