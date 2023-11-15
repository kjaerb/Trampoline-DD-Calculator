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
import { Gender, genders } from "@/schema/config-schema";
import { Label } from "@/components/ui/label";
import useExerciseStore from "@/store/use-exercise-store";

interface SelectGenderProps {
  id: string;
}

export function SelectGender({ id }: SelectGenderProps) {
  const { getExerciseTab, setGender } = useExerciseStore();

  const exerciseTab = getExerciseTab(id);
  const currentGender = exerciseTab?.gender;

  return (
    <div className="flex flex-col w-full items-start space-y-2">
      <Label>Gender</Label>
      <Select
        value={currentGender}
        defaultValue={currentGender}
        onValueChange={(e: Gender) => setGender(id, e)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Choose a gender</SelectLabel>
            {genders.map((gender) => (
              <SelectItem key={gender} value={gender}>
                {gender}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
