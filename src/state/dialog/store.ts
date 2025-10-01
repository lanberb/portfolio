import { create } from "zustand";

type Store = {
  footprintDialogOpen: boolean;
  setFootprintDialogOpen: (open: boolean) => void;
};

export const useDialogStore = create<Store>((set) => ({
  footprintDialogOpen: false,
  setFootprintDialogOpen: (open) => set({ footprintDialogOpen: open }),
}));
