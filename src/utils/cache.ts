import useExerciseStore from "@/store/use-exercise-store";
import { toast } from "sonner";

export function saveExerciseToCache() {
  const exercises = useExerciseStore.getState().exerciseTabs;
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem(
      "trampoline-exercises-cache",
      JSON.stringify(exercises)
    );
  }
}

export function removeExerciseCache() {
  if (window && window.localStorage) {
    window.localStorage.setItem(
      "trampoline-exercises-cache",
      JSON.stringify({})
    );
    toast.success("Cache cleared");
  }
}
