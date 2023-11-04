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
import { TableCell } from "@/components/ui/table";

interface DDInputProps {
  skillNum: number;
}

export function DDInputTable({ skillNum }: DDInputProps) {
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
    <>
      <TableCell>
        <Input
          placeholder={`Enter skill${
            skillNum === 0 ? ". Example: 12 - - 3 V" : ""
          }`}
          className={cn(
            error && "border-red-500 focus-visible:outline-red-500"
          )}
          value={ddInput}
          onChange={(e) => setDDInput(e.target.value)}
        />
        <Label className="text-red-500">{error}</Label>
      </TableCell>
      <TableCell className="font-bold">{dd}</TableCell>
      <TableCell>
        {conditions.length > 0 && <Explanation conditions={conditions} />}
      </TableCell>
    </>
  );
}
