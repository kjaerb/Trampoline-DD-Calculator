import { Gender } from "@/schema/config-schema";
import { COPYear } from "@/schema/tariff-schema";
import { create } from "zustand";

type SetArgs<T> = {
  id: string;
  value: T;
};

interface ConfigStore {
  gender: Record<string, Gender>;
  setGender: ({ id, value }: SetArgs<Gender>) => void;
  cop: Record<string, COPYear>;
  setCOP: ({ id, value }: SetArgs<COPYear>) => void;
}

const useConfigStore = create<ConfigStore>((set) => ({
  gender: {},
  setGender: ({ id, value }) =>
    set((state) => ({
      gender: { ...state.gender, [id]: value },
    })),
  cop: {},
  setCOP: ({ id, value }) =>
    set((state) => ({ cop: { ...state.cop, [id]: value } })),
}));

export default useConfigStore;
