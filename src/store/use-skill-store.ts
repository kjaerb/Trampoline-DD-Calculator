import { ConditionReturnType, SkillElement } from "@/utils/cop";
import { create } from "zustand";

type TariffArgs = {
  skill: SkillElement;
  skillString: string;
  difficulty: number;
  conditions: ConditionReturnType[];
  index: number;
  id: string;
};

type Tariff = {
  skill: SkillElement | undefined;
  skillString?: string;
  conditions: ConditionReturnType[];
  difficulty: number;
};
// Define the state and actions for the store
interface SkillStore {
  skills: Record<string, Tariff[]>;
  setTariffAtIndex: (args: TariffArgs) => void;
}

const useSkillStore = create<SkillStore>((set) => ({
  skills: {},
  setTariffAtIndex: ({
    skill,
    skillString,
    difficulty,
    conditions,
    index,
    id,
  }) => {
    set((state) => {
      const newSkills = { ...state.skills };
      if (!newSkills[id]) {
        newSkills[id] = [];
      }
      newSkills[id][index] = {
        skill,
        skillString,
        difficulty,
        conditions,
      };
      return {
        skills: newSkills,
      };
    });
  },
}));

export default useSkillStore;
