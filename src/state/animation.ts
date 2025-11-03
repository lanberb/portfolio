import { create } from "zustand";

type Store = {
  isEndedOpeningAnimation: boolean;
  isPlayedOnce: boolean;
  setIsEndedOpeningAnimation: () => void;
  setIsPlayedOnce: () => void;
};

export const useAnimationStore = create<Store>((set) => ({
  isEndedOpeningAnimation: false,
  isPlayedOnce: false,
  setIsEndedOpeningAnimation: () => set({ isEndedOpeningAnimation: true }),
  setIsPlayedOnce: () => set({ isPlayedOnce: true }),
}));
