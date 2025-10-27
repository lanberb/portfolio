import { create } from "zustand";

type Store = {
  createStickerDialogOpen: boolean;
  setCreateStickerDialogOpen: (open: boolean) => void;
};

export const useDialogStore = create<Store>((set) => ({
  createStickerDialogOpen: false,
  setCreateStickerDialogOpen: (open) => set({ createStickerDialogOpen: open }),
}));
