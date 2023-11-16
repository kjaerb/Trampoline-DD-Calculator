"use client";

import { Button } from "@/components/ui/button";
import useExerciseStore from "@/store/use-exercise-store";

interface RemoveExerciseProps {
  id: string;
}

export function RemoveExercise({ id }: RemoveExerciseProps) {
  const { removeExerciseTab, exerciseTabs, setLastActiveTab } =
    useExerciseStore();

  return (
    <Button
      className="w-full sm:w-auto"
      variant={"destructive"}
      disabled={exerciseTabs.length <= 1}
      onClick={() => {
        removeExerciseTab(id);
        const exerciseIndex = exerciseTabs.findIndex((e) => e.id === id);
        if (exerciseIndex === exerciseTabs.length - 1) {
          setLastActiveTab(exerciseTabs[exerciseTabs.length - 2].id);
        } else {
          setLastActiveTab(exerciseTabs[exerciseTabs.length - 1].id);
        }
      }}
    >
      Delete exercise
    </Button>
  );
}
