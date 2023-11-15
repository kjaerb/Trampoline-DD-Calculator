"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { COPYear, copYears } from "@/schema/tariff-schema";
import useExerciseStore from "@/store/use-exercise-store";

interface SelectCOPProps {
  id: string;
}

export function SelectCOP({ id }: SelectCOPProps) {
  const { getExerciseTab, setCOP } = useExerciseStore();

  const currentCOP = getExerciseTab(id)?.cop;

  return (
    <div className="flex flex-col w-full items-start space-y-2">
      <Label>Code of Points</Label>
      <Select
        value={currentCOP}
        defaultValue={currentCOP}
        onValueChange={(e: COPYear) => setCOP(id, e)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a Code of Points" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Code of Points</SelectLabel>
            {copYears.map((cop) => (
              <SelectItem key={cop} value={cop}>
                {cop}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
