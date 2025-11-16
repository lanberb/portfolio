import { type FC, useCallback } from "react";
import { useDialogStore } from "@/state/dialog";
import { Dialog } from "../../unit/Dialog";

export const GlobalFootprintDialog: FC = () => {
  const dialogStore = useDialogStore();

  const handleOnRequestClose = useCallback(() => {
    dialogStore.closeCreateStickerDialog();
  }, [dialogStore]);

  return (
    <Dialog.Frame open={dialogStore.isOpenCreateStickerDialog} onRequestClose={handleOnRequestClose}>
      <Dialog.Header onClose={handleOnRequestClose}>Let's get your footprint</Dialog.Header>
    </Dialog.Frame>
  );
};
