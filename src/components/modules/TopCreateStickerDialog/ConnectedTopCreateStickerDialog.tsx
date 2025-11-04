import { type FC, useCallback } from "react";
import { useDialogStore } from "@/state/dialog";
import { TopCreateStickerDialog } from "./TopCreateStickerDialog";

export const ConnectedTopCreateStickerDialog: FC = () => {
  const dialogStore = useDialogStore();

  const handleOnRequestClose = useCallback(() => {
    dialogStore.closeCreateStickerDialog();
  }, [dialogStore]);

  return <TopCreateStickerDialog open={dialogStore.isOpenCreateStickerDialog} onRequestClose={handleOnRequestClose} />;
};
