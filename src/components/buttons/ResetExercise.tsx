"use client";

import { Button } from "@/components/ui/button";
import useExerciseStore from "@/store/use-exercise-store";

interface ResetExerciseProps {
  id: string;
}

export function ResetExercise({ id }: ResetExerciseProps) {
  const { resetExerciseTab } = useExerciseStore();

  return (
    <Button
      className="w-full sm:w-auto"
      variant={"destructive"}
      onClick={() => resetExerciseTab(id)}
    >
      Reset exercise
    </Button>
  );
}
