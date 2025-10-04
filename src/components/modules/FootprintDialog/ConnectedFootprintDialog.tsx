import { useDialogStore } from "@/state/dialog/store";
import { type FC, useCallback } from "react";
import { FootprintDialog } from "./FootprintDialog";

export const ConnectedFootprintDialog: FC = () => {
  const dialogStore = useDialogStore();

  const handleOnRequestClose = useCallback(() => {
    dialogStore.setFootprintDialogOpen(false);
  }, [dialogStore]);

  return <FootprintDialog open={dialogStore.footprintDialogOpen} onRequestClose={handleOnRequestClose} />;
};
