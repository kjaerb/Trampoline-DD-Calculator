"use client";

import { Button } from "@/components/ui/button";
import useExerciseStore from "@/store/use-exercise-store";

interface RemoveExerciseProps {
  id: string;
}

export function RemoveExercise({ id }: RemoveExerciseProps) {
  const { removeExerciseTab } = useExerciseStore();

  return (
    <Button
      className="w-full sm:w-auto"
      variant={"destructive"}
      onClick={() => removeExerciseTab(id)}
    >
      Delete exercise
    </Button>
  );
}
