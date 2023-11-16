"use client";

import { Tabs, TabsList } from "@/components/ui/tabs";
import useExerciseStore from "@/store/use-exercise-store";
import { AddNewExerciseTab } from "@/components/buttons";
import { useLoadExercises } from "@/hooks/useExercise";
import { ExerciseTab } from "./tab/exercise-tab";
import { ExerciseTabTrigger } from "./trigger/exercise-tab-trigger";
import { Button } from "@/components/ui/button";
import { TabSkeleton } from "@/components/skeletons/tab";
import { removeExerciseCache } from "@/utils/cache";

export function ExerciseTabs() {
  const { exerciseTabs, lastActiveTab, setLastActiveTab } = useExerciseStore();
  useLoadExercises();

  if (exerciseTabs.length < 1) return <TabSkeleton />;

  return (
    <Tabs
      defaultValue={exerciseTabs[0]?.id}
      value={lastActiveTab || exerciseTabs[0]?.id}
      onValueChange={(e) => setLastActiveTab(e)}
    >
      <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <TabsList className="max-w-full overflow-x-scroll py-0 flex justify-start w-fit">
          {exerciseTabs.map((tab) => (
            <ExerciseTabTrigger
              tab={tab}
              value={tab.id}
              key={`${tab.id}:tab-trigger`}
            />
          ))}

          <AddNewExerciseTab />
        </TabsList>
        <Button onClick={removeExerciseCache}>Clear storage</Button>
      </div>

      {exerciseTabs.map((tab) => (
        <ExerciseTab tab={tab} value={tab.id} key={`${tab.id}-tab`} />
      ))}
    </Tabs>
  );
}
