import { create } from "zustand";

type Store = {
  isEndedOpeningAnimation: boolean;
  setIsEndedOpeningAnimation: () => void;
};

export const useAnimationStore = create<Store>((set) => ({
  isEndedOpeningAnimation: false,
  setIsEndedOpeningAnimation: () => set({ isEndedOpeningAnimation: true }),
}));
