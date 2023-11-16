"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { SelectGender } from "@/components/selects/select-gender";
import { SelectCOP } from "@/components/selects/select-cop";
import { TariffTable } from "@/components/tariff/tariff-table";
import useExerciseStore from "@/store/use-exercise-store";
import {
  AddNewExerciseTab,
  DuplicateExercise,
  RemoveExercise,
  ResetExercise,
} from "@/components/buttons";
import { useLoadExercises } from "@/hooks/useExercise";

export function ExerciseTabs() {
  const { exerciseTabs, removeExerciseTab } = useExerciseStore();
  useLoadExercises();

  if (exerciseTabs.length === 0) return null; // Should maybe be a skeleton

  return (
    <Tabs defaultValue={exerciseTabs[0]?.id}>
      <TabsList className="max-w-full overflow-x-scroll py-0 flex justify-start w-fit">
        {exerciseTabs.map((tab) => (
          <TabsTrigger
            value={tab.id}
            key={`${tab.id}:tab-trigger`}
            className="relative group"
          >
            <span>{tab.name}</span>
            <div
              className={cn(
                "hidden sm:block opacity-0 group-hover:opacity-100 -translate-y-1/5 transition-opacity duration-300 group absolute z-100 bg-red-500 w-6 h-6 shadow-md rounded-full top-0 right-0 border border-red-600 dark:border-red-800 text-white"
              )}
              onClick={() => removeExerciseTab(tab.id)}
            >
              <p className="p-0 m-0">-</p>
            </div>
          </TabsTrigger>
        ))}

        <AddNewExerciseTab />
      </TabsList>

      {exerciseTabs.map((tab) => (
        <TabsContent value={tab.id} key={`${tab.id}-tab`} className="space-y-4">
          <div className="flex space-x-0 space-y-2 sm:space-y-0 flex-wrap sm:space-x-2">
            <DuplicateExercise id={tab.id} />
            <ResetExercise id={tab.id} />
            <RemoveExercise id={tab.id} />
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 space-x-0 sm:space-x-2">
            <SelectGender id={tab.id} />
            <SelectCOP id={tab.id} />
          </div>

          <TariffTable id={tab.id} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
