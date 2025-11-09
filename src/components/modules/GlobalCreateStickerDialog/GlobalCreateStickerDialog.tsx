import { type FC, useCallback } from "react";
import { createPortal } from "react-dom";
import { useDialogStore } from "@/state/dialog";
import { Dialog } from "../../unit/Dialog";

export const GlobalCreateStickerDialog: FC = () => {
  const dialogStore = useDialogStore();

  const handleOnRequestClose = useCallback(() => {
    dialogStore.closeCreateStickerDialog();
  }, [dialogStore]);

  return createPortal(
    <Dialog.Frame open={dialogStore.isOpenCreateStickerDialog} onRequestClose={handleOnRequestClose}>
      <Dialog.Header title="Let's get your footprint" onClose={handleOnRequestClose} />
      <Dialog.Footer onClose={handleOnRequestClose} />
    </Dialog.Frame>,
    document.body,
  );
};
