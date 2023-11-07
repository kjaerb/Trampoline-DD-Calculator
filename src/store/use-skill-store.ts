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
  getSkillStr: (id: string, index: number) => string;
  setSkillString: (args: {
    id: string;
    index: number;
    skillString: string;
  }) => void;
  resetSkills: (id: string) => void;
  duplicateSkills: (id: string, newId: string) => void;
  setTariffAtIndex: (args: TariffArgs) => void;
  setTariffAtIndexToEmpty(args: { index: number; id: string }): void;
}

const useSkillStore = create<SkillStore>((set, get) => ({
  skills: {},
  getSkillStr: (id, index) => {
    const skills = get().skills;
    if (!skills[id]) {
      return "";
    }
    return skills[id][index]?.skillString || "";
  },
  setSkillString: ({ id, index, skillString }) => {
    set((state) => {
      const newSkills = { ...state.skills };
      if (!newSkills[id]) {
        newSkills[id] = [];
      }
      newSkills[id][index] = {
        ...newSkills[id][index],
        skillString,
      };
      return {
        skills: newSkills,
      };
    });
  },
  resetSkills: (id) => {
    set((state) => {
      const newSkills = { ...state.skills };
      newSkills[id] = [];
      return {
        skills: newSkills,
      };
    });
  },
  duplicateSkills: (id, newId) => {
    set((state) => {
      const newSkills = { ...state.skills };
      newSkills[newId] = newSkills[id];
      return {
        skills: newSkills,
      };
    });
  },
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
  setTariffAtIndexToEmpty: ({ index, id }) => {
    set((state) => {
      const newSkills = { ...state.skills };
      if (!newSkills[id]) {
        newSkills[id] = [];
      }
      newSkills[id][index] = {
        ...newSkills[id][index],
        difficulty: 0,
        conditions: [],
      };
      return {
        skills: newSkills,
      };
    });
  },
}));

export default useSkillStore;
