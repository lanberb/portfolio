import { IconButton } from "@/components/modules/IconButton";
import styled from "@emotion/styled";
import { type FC, type MouseEvent, type PropsWithChildren, useCallback, useEffect, useRef } from "react";
import { Button } from "../Button";
import { Text } from "../Text";

const _Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 24px 12px;
  border-bottom: 1px solid var(${({ theme }) => theme.surface.primaryDisabled});
`;

interface _HeaderProps {
  title: string;
  onClose: () => void;
}

const Header: FC<_HeaderProps> = ({ title, onClose }) => {
  return (
    <_Header>
      <Text fz={14} fw={700} tt="capitalize" color="primary">
        {title}
      </Text>
      <IconButton name="close" size={24} onClick={onClose} />
    </_Header>
  );
};

const _Footer = styled.footer`
  display: flex;
  justify-content: center;
  padding: 12px 24px;
`;

interface _FooterProps {
  onClose: () => void;
}

const Footer: FC<_FooterProps> = ({ onClose }) => {
  return (
    <_Footer>
      <Button type="button" variant="outlined" onClick={onClose}>
        Close
      </Button>
    </_Footer>
  );
};

const _Frame = styled.dialog`
  position: fixed;
  width: 100%;
  min-width: 320px;
  max-width: 800px;
  height: 100%;
  max-height: 640px;
  margin: auto;
  background-color: var(${({ theme }) => theme.surface.primary});
  overflow: hidden;
  border-radius: 16px;

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.64);
  }
`;

interface _FrameProps {
  open: boolean;
  onRequestClose: () => void;
}

const Frame: FC<_FrameProps & PropsWithChildren> = ({ children, open, onRequestClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOnClickDialog = useCallback((event: MouseEvent<HTMLDialogElement>) => {
    event.stopPropagation();
  }, []);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  return (
    <_Frame aria-modal="true" role="dialog" ref={dialogRef} onClick={handleOnClickDialog} onClose={onRequestClose}>
      {children}
    </_Frame>
  );
};

export const Dialog = {
  Frame,
  Header,
  Footer,
};
