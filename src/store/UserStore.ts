import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { generateUsername } from "../utils/generateUsername";

type UserState = {
  username: string;
  setUsername: (name: string) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: "",
      setUsername: (name) => set({ username: name }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (!state?.username) {
          const newName = generateUsername();
          state?.setUsername?.(newName);
        }
      },
    }
  )
);
