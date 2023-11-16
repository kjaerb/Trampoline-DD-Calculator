"use client";

import { TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import useExerciseStore from "@/store/use-exercise-store";
import { ExerciseTab } from "@/types/types";
import { TabsTriggerProps } from "@radix-ui/react-tabs";

interface ExerciseTabTriggerProps extends TabsTriggerProps {
  tab: ExerciseTab;
}

export function ExerciseTabTrigger({ tab, ...props }: ExerciseTabTriggerProps) {
  const { removeExerciseTab, exerciseTabs } = useExerciseStore();

  return (
    <TabsTrigger {...props} className="relative group">
      <span>{tab.name}</span>
      {/* {exerciseTabs.length > 1 && (
        <div
          className={cn(
            "hidden sm:block opacity-0 group-hover:opacity-100 -translate-y-1/5 transition-opacity duration-300 group absolute z-100 bg-red-500 w-6 h-6 shadow-md rounded-full top-0 right-0 border border-red-600 dark:border-red-800 text-white"
          )}
          onClick={() => removeExerciseTab(tab.id)}
        >
          <p className="p-0 m-0">-</p>
        </div>
      )} */}
    </TabsTrigger>
  );
}
