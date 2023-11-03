"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DD, ddSchema } from "@/schema/dd-schema";
import useConfigStore from "@/store/use-config-store";
import { getDifficulity, transformDDString } from "@/utils/difficulity";
import { useEffect, useState } from "react";
import { ConditionReturnType, codeOfPoints } from "@/components/config/cop";
import useSkillStore from "@/store/use-skill-store";
import { Explanation } from "./explanation";

interface DDInputProps {
  skillNum: number;
}

export function DDInput({ skillNum }: DDInputProps) {
  const [ddInput, setDDInput] = useState<DD>("");
  const [dd, setDD] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [conditions, setConditions] = useState<ConditionReturnType[]>([]);
  const { gender, cop } = useConfigStore();
  const { setDDValueAtIndex, setDDAtIndexToNull } = useSkillStore();

  useEffect(() => {
    if (ddInput !== "") {
      const parsedDD = ddSchema.safeParse(ddInput);
      if (parsedDD.success) {
        const element = transformDDString(parsedDD.data);

        const currentCOP = codeOfPoints[cop];

        const { conditions, difficulity } = getDifficulity({
          conditions: currentCOP.conditions,
          bonus: currentCOP.bonuses,
          element,
          gender,
        });

        setError("");
        setDD(difficulity);
        setConditions(conditions);
        setDDValueAtIndex(skillNum, element);
      } else {
        setError(parsedDD.error.errors[0].message);
        setDD(0);
        setConditions([]);
        setDDAtIndexToNull(skillNum);
      }
    } else {
      setDD(0);
      setError("");
      setConditions([]);
      setDDAtIndexToNull(skillNum);
    }
  }, [ddInput, cop, gender]);

  return (
    <div className="grid grid-cols-2 space-x-4">
      <div>
        <Input
          placeholder="Enter skill"
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
        {conditions.length > 0 && <Explanation conditions={conditions} />}
      </div>
    </div>
  );
}
