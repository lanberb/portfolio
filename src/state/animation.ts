import { create } from "zustand";

type Store = {
  footprintDialogOpen: boolean;
  setFootprintDialogOpen: (open: boolean) => void;
};

export const useAnimationStore = create<Store>((set) => ({
  footprintDialogOpen: false,
  setFootprintDialogOpen: (open) => set({ footprintDialogOpen: open }),
}));
