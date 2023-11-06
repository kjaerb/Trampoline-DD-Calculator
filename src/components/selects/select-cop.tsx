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
import { COPYears, COPs } from "@/utils/cop";
import { Dispatch, SetStateAction } from "react";

interface SelectCOPProps {
  id: string;
}

export function SelectCOP({ id }: SelectCOPProps) {
  return (
    <div className="flex flex-col w-full items-start space-y-2">
      <Label>Code of Points</Label>
      {/* <Select value={cop} onValueChange={(e: COPYears) => setCOP(e)}>
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
      </Select> */}
    </div>
  );
}
