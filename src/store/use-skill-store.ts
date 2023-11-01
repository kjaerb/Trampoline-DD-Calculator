import { SkillElement } from "@/components/config/cop";
import { create } from "zustand";

// Define the state and actions for the store
interface SkillStore {
  dd: (SkillElement | undefined)[];
  setDDValueAtIndex: (index: number, value: SkillElement | undefined) => void;
  setDDAtIndexToNull: (index: number) => void;
}

const useSkillStore = create<SkillStore>((set) => ({
  dd: [],
  setDDValueAtIndex: (index, value) =>
    set((state) => {
      const dd = [...state.dd];
      dd[index] = value;
      return { dd };
    }),
  setDDAtIndexToNull: (index) =>
    set((state) => {
      const dd = [...state.dd];
      dd[index] = undefined;
      return { dd };
    }),
}));

export default useSkillStore;
