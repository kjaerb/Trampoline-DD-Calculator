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
import useConfigStore from "@/store/use-config-store";
import { Label } from "../ui/label";

export function SelectGender() {
  const { gender, setGender } = useConfigStore();

  return (
    <div className="flex flex-col w-full items-start space-y-2">
      <Label>Gender</Label>
      <Select value={gender} onValueChange={(e: Gender) => setGender(e)}>
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
