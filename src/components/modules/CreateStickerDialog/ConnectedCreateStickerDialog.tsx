import { type FC, useCallback } from "react";
import { useDialogStore } from "@/state/dialog";
import { CreateStickerDialog } from "./CreateStickerDialog";

export const ConnectedCreateStickerDialog: FC = () => {
  const dialogStore = useDialogStore();

  const handleOnRequestClose = useCallback(() => {
    dialogStore.closeCreateStickerDialog();
  }, [dialogStore]);

  return <CreateStickerDialog open={dialogStore.isOpenCreateStickerDialog} onRequestClose={handleOnRequestClose} />;
};
