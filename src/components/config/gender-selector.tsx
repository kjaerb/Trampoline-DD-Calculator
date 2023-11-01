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

export function SelectGender() {
  const { gender, setGender } = useConfigStore();

  return (
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
  );
}
