import { SkillElement } from "@/utils/cop";
import { create } from "zustand";

// Define the state and actions for the store
interface SkillStore {
  dd: (SkillElement | undefined)[];
  setDDValueAtIndex: (index: number, value: SkillElement | undefined) => void;
  setDDAtIndexToNull: (index: number) => void;
  skills: string[];
  setSkillAtIndex: (index: number, value: string) => void;
  setSkillAtIndexToEmpty: (index: number) => void;
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
  skills: [],
  setSkillAtIndex: (index, value) =>
    set((state) => {
      const skills = [...state.skills];
      skills[index] = value;
      return { skills };
    }),
  setSkillAtIndexToEmpty: (index) =>
    set((state) => {
      const skills = [...state.skills];
      skills[index] = "";
      return { skills };
    }),
}));

export default useSkillStore;
