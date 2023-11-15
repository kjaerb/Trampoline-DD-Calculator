"use client";

import { Button } from "@/components/ui/button";
import useExerciseStore from "@/store/use-exercise-store";

interface DuplicateExerciseProps {
  id: string;
}

export function DuplicateExercise({ id }: DuplicateExerciseProps) {
  const { duplicateExerciseTab } = useExerciseStore();

  return (
    <Button
      className="w-full sm:w-auto"
      variant={"secondary"}
      onClick={() => duplicateExerciseTab(id)}
    >
      Duplicate exercise
    </Button>
  );
}
