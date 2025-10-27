import { useDialogStore } from "@/state/dialog";
import { type FC, useCallback } from "react";
import { CreateStickerDialog } from "./CreateStickerDialog";

export const ConnectedCreateStickerDialog: FC = () => {
  const dialogStore = useDialogStore();

  const handleOnRequestClose = useCallback(() => {
    dialogStore.setCreateStickerDialogOpen(false);
  }, [dialogStore]);

  return <CreateStickerDialog open={dialogStore.createStickerDialogOpen} onRequestClose={handleOnRequestClose} />;
};
