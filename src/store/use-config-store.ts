import { COPYears } from "@/utils/cop";
import { Gender } from "@/schema/config-schema";
import { create } from "zustand";

interface ConfigStore {
  gender: Gender;
  setGender: (gender: Gender) => void;
  cop: COPYears;
  setCOP: (cop: COPYears) => void;
}

const useConfigStore = create<ConfigStore>((set) => ({
  gender: "Men",
  setGender: (gender: Gender) => set({ gender }),
  cop: "2022-2024",
  setCOP: (cop: COPYears) => set({ cop }),
}));

export default useConfigStore;
