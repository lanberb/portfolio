import { useCallback, type FC } from "react";
import { FootprintDialog } from "./FootprintDialog";
import { useDialogStore } from "@/state/dialog/store";

export const ConnectedFootprintDialog: FC = () => {
  const dialogStore = useDialogStore();

  const handleOnRequestClose = useCallback(() => {
    dialogStore.setFootprintDialogOpen(false);
  }, [dialogStore]);

  return (
    <FootprintDialog
      open={dialogStore.footprintDialogOpen}
      onRequestClose={handleOnRequestClose}
    />
  );
};
