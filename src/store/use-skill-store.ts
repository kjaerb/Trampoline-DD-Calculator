import { create } from "zustand";

// Define the state and actions for the store
interface SkillStore {
  dd: number[];
  setDDValue: (index: number, value: number) => void;
  setDDToZero: (index: number) => void;
}

const useSkillStore = create<SkillStore>((set) => ({
  dd: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Initialize with 10 zeros, change this as needed

  // Function to set the value at a specific position in the array
  setDDValue: (index, value) =>
    set((state) => {
      const newDD = [...state.dd];
      newDD[index] = value;
      return { dd: newDD };
    }),

  // Function to set the value at a specific position to 0
  setDDToZero: (index) =>
    set((state) => {
      const newDD = [...state.dd];
      newDD[index] = 0;
      return { dd: newDD };
    }),
}));

export default useSkillStore;
