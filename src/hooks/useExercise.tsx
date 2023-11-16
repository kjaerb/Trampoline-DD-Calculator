import { exerciseCacheSchema } from "@/schema/exercise-schema";
import useExerciseStore, {
  createNewExercise,
} from "@/store/use-exercise-store";
import { useEffect } from "react";
import { toast } from "sonner";

export function useLoadExercises() {
  const { setAllExerciseTabs } = useExerciseStore();
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const ttCache = localStorage.getItem("trampoline-exercises-cache");
        if (ttCache) {
          const parsedCache = exerciseCacheSchema.parse(JSON.parse(ttCache));
          if (Object.keys(parsedCache).length === 0) {
            setAllExerciseTabs([createNewExercise()]);
          } else {
            setAllExerciseTabs(parsedCache);
          }
        } else {
          setAllExerciseTabs([createNewExercise()]);
        }
      } catch (ex) {
        setAllExerciseTabs([createNewExercise()]);
        toast.error("Failed to load exercises from cache");
      }
    } else {
      setAllExerciseTabs([createNewExercise()]);
    }
  }, []);
}
