"use client";

import { Button } from "@/components/ui/button";
import useExerciseStore, {
  createNewExercise,
} from "@/store/use-exercise-store";

export function AddNewExerciseTab() {
  const { addExerciseTab } = useExerciseStore();

  return (
    <Button
      onClick={() => addExerciseTab(createNewExercise())}
      variant={"secondary"}
    >
      +
    </Button>
  );
}
