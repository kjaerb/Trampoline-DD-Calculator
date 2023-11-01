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
import useConfigStore from "@/store/use-config-store";
import { COPYears, COPs } from "./cop";
import { Label } from "@/components/ui/label";

export function SelectCOP() {
  const { cop, setCOP } = useConfigStore();

  return (
    <>
      <Select value={cop} onValueChange={(e: COPYears) => setCOP(e)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="COP" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>COP</SelectLabel>
            {COPs.map((cop) => (
              <SelectItem key={cop} value={cop}>
                {cop}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
