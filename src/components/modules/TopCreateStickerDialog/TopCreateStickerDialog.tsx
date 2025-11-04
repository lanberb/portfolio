import type { FC } from "react";
import { createPortal } from "react-dom";
import { Dialog } from "../../unit/Dialog";

interface Props {
  open: boolean;
  onRequestClose: () => void;
}

export const TopCreateStickerDialog: FC<Props> = ({ open, onRequestClose }) => {
  return createPortal(
    <Dialog.Frame open={open} onRequestClose={onRequestClose}>
      <Dialog.Header title="Let's get your footprint" onClose={onRequestClose} />
      <Dialog.Footer onClose={onRequestClose} />
    </Dialog.Frame>,
    document.body,
  );
};
