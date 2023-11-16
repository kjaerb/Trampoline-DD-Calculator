import {
  DuplicateExercise,
  RemoveExercise,
  ResetExercise,
} from "@/components/buttons";
import { SelectCOP } from "@/components/selects/select-cop";
import { SelectGender } from "@/components/selects/select-gender";
import { TariffTable } from "@/components/tariff/tariff-table";
import { TabsContent } from "@/components/ui/tabs";
import { ExerciseTab } from "@/types/types";
import { TabsContentProps } from "@radix-ui/react-tabs";

interface ExerciseTabProps extends TabsContentProps {
  tab: ExerciseTab;
}

export function ExerciseTab({ tab, ...props }: ExerciseTabProps) {
  return (
    <TabsContent {...props} className="space-y-4">
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
  );
}
