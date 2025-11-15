import { type FC, useCallback } from "react";
import { useDialogStore } from "@/state/dialog";
import { Dialog } from "../../unit/Dialog";

export const GlobalCreateStickerDialog: FC = () => {
  const dialogStore = useDialogStore();

  const handleOnRequestClose = useCallback(() => {
    dialogStore.closeCreateStickerDialog();
  }, [dialogStore]);

  return (
    <Dialog.Frame open={dialogStore.isOpenCreateStickerDialog} onRequestClose={handleOnRequestClose}>
      <Dialog.Header title="Let's get your footprint" onClose={handleOnRequestClose} />
      <Dialog.Footer onClose={handleOnRequestClose} />
    </Dialog.Frame>
  );
};
