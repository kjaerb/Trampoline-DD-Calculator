import { Gender } from "@/schema/config-schema";
import { exerciseCacheSchema } from "@/schema/exercise-schema";
import { COPYear } from "@/schema/tariff-schema";
import { ExerciseTab, Skill } from "@/types/types";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { create } from "zustand";

interface ExerciseTabStore {
  exerciseTabs: ExerciseTab[];
  getExerciseTab: (tabId: string) => ExerciseTab | undefined;
  setExerciseTabs: (tabId: string, updatedTab: ExerciseTab) => void;
  addExerciseTab: (tab: ExerciseTab) => void;
  removeExerciseTab: (tabId: string) => void;
  resetExerciseTab: (tabId: string) => void;
  setAllExerciseTabs: (tabs: ExerciseTab[]) => void;
  duplicateExerciseTab: (tabId: string) => void;
  setGender: (tabId: string, gender: Gender) => void;
  setCOP: (tabId: string, cop: COPYear) => void;
  getSkillString: (tabId: string, index: number) => string;
  setSkillString: (tabId: string, index: number, skill: string) => void;
  setSkill: (tabId: string, index: number, skill: Skill) => void;
  resetSkill: (tabId: string, index: number) => void;
}

const useExerciseStore = create<ExerciseTabStore>((set, get) => ({
  exerciseTabs: [],
  getExerciseTab: (tabId) => {
    return get().exerciseTabs.find((t) => t.id === tabId);
  },
  addExerciseTab: (tab) => {
    set((state) => ({ exerciseTabs: [...state.exerciseTabs, tab] }));
  },
  setExerciseTabs: (tabId, updatedTab) => {
    set((state) => {
      const index = state.exerciseTabs.findIndex((t) => t.id === tabId);
      if (index !== -1) {
        const newTabs = [...state.exerciseTabs];
        newTabs[index] = updatedTab;
        return { exerciseTabs: newTabs };
      }
      return state;
    });
  },
  setAllExerciseTabs: (tabs) => {
    set(() => ({ exerciseTabs: tabs }));
  },
  removeExerciseTab: (tabId) => {
    set((state) => {
      const index = state.exerciseTabs.findIndex((t) => t.id === tabId);
      if (index !== -1) {
        const newTabs = [...state.exerciseTabs];
        newTabs.splice(index, 1);
        return { exerciseTabs: newTabs };
      }
      return state;
    });
  },
  resetExerciseTab: (tabId) => {
    set((state) => {
      const index = state.exerciseTabs.findIndex((t) => t.id === tabId);
      if (index !== -1) {
        const newTabs = [...state.exerciseTabs];
        newTabs[index] = createNewExercise(); // might change, such that gender and cop aren't reset
        return { exerciseTabs: newTabs };
      }
      return state;
    });
  },
  duplicateExerciseTab: (tabId) => {
    set((state) => {
      const index = state.exerciseTabs.findIndex((t) => t.id === tabId);
      if (index !== -1) {
        const newTabs = [...state.exerciseTabs];
        const newTab = { ...newTabs[index], id: nanoid() };
        newTabs.splice(index + 1, 0, newTab);
        return { exerciseTabs: newTabs };
      }
      return state;
    });
  },
  setGender: (tabId, gender) => {
    set((state) => {
      const index = state.exerciseTabs.findIndex((t) => t.id === tabId);
      if (index !== -1) {
        const newTabs = [...state.exerciseTabs];
        newTabs[index] = { ...newTabs[index], gender };
        return { exerciseTabs: newTabs };
      }
      return state;
    });
  },
  setCOP: (tabId, cop) => {
    set((state) => {
      const index = state.exerciseTabs.findIndex((t) => t.id === tabId);
      if (index !== -1) {
        const newTabs = [...state.exerciseTabs];
        newTabs[index] = { ...newTabs[index], cop };
        return { exerciseTabs: newTabs };
      }
      return state;
    });
  },
  getSkillString: (tabId, index) => {
    const tab = get().getExerciseTab(tabId);
    if (!tab) return "";
    return tab.skillStrings?.[index] || "";
  },
  setSkillString: (tabId, index, skillString) => {
    set((state) => {
      const tab = state.exerciseTabs.find((t) => t.id === tabId);

      if (!tab) {
        return state;
      }

      const newTabs = [...state.exerciseTabs];
      const updatedTab = { ...tab };
      updatedTab.skillStrings[index] = skillString;
      const tabIndex = newTabs.findIndex((t) => t.id === tabId);

      if (tabIndex !== -1) {
        newTabs[tabIndex] = updatedTab;
      }

      return { exerciseTabs: newTabs };
    });
  },
  setSkill: (tabId, index, skill) => {
    set((state) => {
      const tab = state.exerciseTabs.find((t) => t.id === tabId);

      if (!tab) {
        return state;
      }

      const newTabs = [...state.exerciseTabs];
      const updatedTab = { ...tab };
      updatedTab.skills[index] = skill;
      const tabIndex = newTabs.findIndex((t) => t.id === tabId);

      if (tabIndex !== -1) {
        newTabs[tabIndex] = updatedTab;
      }

      return { exerciseTabs: newTabs };
    });
  },
  resetSkill: (tabId, index) => {
    set((state) => {
      const tab = state.exerciseTabs.find((t) => t.id === tabId);
      if (!tab) return state;
      const newTabs = [...state.exerciseTabs];
      tab.skills[index] = undefined;
      return { exerciseTabs: newTabs };
    });
  },
}));

export function createNewExercise(): ExerciseTab {
  return {
    apperatus: "trampoline",
    cop: "2022-2024",
    skills: [],
    skillStrings: [],
    gender: "Men",
    id: nanoid(),
    name: "New exercise",
  };
}

export function saveExerciseToCache() {
  const exercises = useExerciseStore.getState().exerciseTabs;
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem(
      "trampoline-exercises-cache",
      JSON.stringify(exercises)
    );
  }
}

export default useExerciseStore;
