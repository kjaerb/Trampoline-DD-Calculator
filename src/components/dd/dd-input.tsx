"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DD, ddSchema } from "@/schema/dd-schema";
import useConfigStore from "@/store/use-config-store";
import { getDifficulity, transformDDString } from "@/utils/difficulity";
import { useEffect, useState } from "react";
import { ConditionReturnType, codeOfPoints } from "@/components/config/cop";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface DDInputProps {
  skillNum: number;
}

export function DDInput({ skillNum }: DDInputProps) {
  const [ddInput, setDDInput] = useState<DD>("");
  const [dd, setDD] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [conditions, setConditions] = useState<ConditionReturnType[]>([]);
  const { gender, cop } = useConfigStore();

  useEffect(() => {
    if (ddInput !== "") {
      const parsedDD = ddSchema.safeParse(ddInput);
      if (parsedDD.success) {
        setError("");

        const element = transformDDString(parsedDD.data);

        const currentCOP = codeOfPoints[cop];

        const { conditions, difficulity } = getDifficulity({
          conditions: currentCOP.conditions,
          bonus: currentCOP.bonuses,
          element,
          gender,
        });

        setDD(difficulity);
        setConditions(conditions);
      } else {
        setError(parsedDD.error.errors[0].message);
        setDD(0);
        setConditions([]);
      }
    } else {
      setDD(0);
      setError("");
      setConditions([]);
    }
  }, [ddInput, cop, gender]);

  return (
    <div className="grid grid-cols-2 space-x-4">
      <div>
        <Input
          className={cn(
            error && "border-red-500 focus-visible:outline-red-500"
          )}
          value={ddInput}
          onChange={(e) => setDDInput(e.target.value)}
        />
        <Label className="text-red-500">{error}</Label>
      </div>
      <div className="flex justify-between">
        <Label className="py-3.5">{dd}</Label>
        {conditions.length > 0 && (
          <Popover>
            <PopoverTrigger className="text-sm md:text-base border shadow-md rounded-full py-2 px-4 text-gray-700">
              i
            </PopoverTrigger>
            <PopoverContent className="space-y-4">
              {conditions.map((condition, i) => (
                <div key={i}>
                  <Label className="font-bold">ID: {condition.id}</Label>
                  <div className="flex pb-2">
                    <Label className="flex-1 leading-5">
                      {condition.label}
                    </Label>
                    <Label className="font-bold">
                      {condition.difficulity.toFixed(1)}
                    </Label>
                  </div>
                  <Separator />
                </div>
              ))}
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
