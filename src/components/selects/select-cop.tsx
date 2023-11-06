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
import useConfigStore from "@/store/use-config-store";
import { COPYear, copYears } from "@/schema/tariff-schema";

interface SelectCOPProps {
  id: string;
}

export function SelectCOP({ id }: SelectCOPProps) {
  const { cop, setCOP } = useConfigStore();

  const currentCOP = cop[id];

  return (
    <div className="flex flex-col w-full items-start space-y-2">
      <Label>Code of Points</Label>
      <Select
        value={currentCOP}
        onValueChange={(e: COPYear) => setCOP({ id, value: e })}
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
