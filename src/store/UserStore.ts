import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateUsername } from "../utils/generateUsername";

type UserState = {
  username: string;
  setUsername: (name: string) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      username: get()?.username || generateUsername(),
      setUsername: (name) => set({ username: name }),
    }),
    {
      name: "user-storage",
    }
  )
);
