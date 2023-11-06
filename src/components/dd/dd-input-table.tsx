"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DD, ddSchema } from "@/schema/dd-schema";
import useConfigStore from "@/store/use-config-store";
import {
  findDuplicateSkill,
  getDifficulity,
  transformDDString,
} from "@/utils/difficulity";
import { useEffect, useState } from "react";
import { ConditionReturnType, codeOfPoints } from "@/components/config/cop";
import useSkillStore from "@/store/use-skill-store";
import { Explanation } from "./explanation";
import { TableCell } from "@/components/ui/table";
import { toast } from "sonner";
import { ZodError } from "zod";

interface DDInputProps {
  skillNum: number;
}

export function DDInputTable({ skillNum }: DDInputProps) {
  const [ddInput, setDDInput] = useState<DD>("");
  const [dd, setDD] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [conditions, setConditions] = useState<ConditionReturnType[]>([]);
  const { gender, cop } = useConfigStore();
  const {
    setDDValueAtIndex,
    setDDAtIndexToNull,
    setSkillAtIndex,
    setSkillAtIndexToEmpty,
    skills,
  } = useSkillStore();

  useEffect(() => {
    try {
      if (ddInput !== "") {
        const parsedDD = ddSchema.parse(ddInput);
        const element = transformDDString(parsedDD);
        const elementString = JSON.stringify(element);
        setSkillAtIndex(skillNum, elementString);

        // Issue with backpropagation. Can't detect previouss duplicates
        const duplicates = findDuplicateSkill(
          skills.slice(0, skillNum),
          elementString
        );

        if (duplicates.duplicate) {
          setParams({
            dd: 0,
            conditions: [],
            error: `Routine already contains element at ${
              duplicates.index! + 1
            }`,
          });

          setDDAtIndexToNull(skillNum);
        } else {
          const currentCOP = codeOfPoints[cop];

          const { conditions, difficulity } = getDifficulity({
            conditions: currentCOP.conditions,
            bonus: currentCOP.bonuses,
            element,
            gender,
          });
          setParams({
            dd: difficulity,
            conditions,
            error: "",
          });

          setDDValueAtIndex(skillNum, element);
        }
      } else {
        setParams({
          dd: 0,
          error: "",
          conditions: [],
        });
        setDDAtIndexToNull(skillNum);
        setSkillAtIndexToEmpty(skillNum);
      }
    } catch (ex) {
      if (ex instanceof ZodError) {
        setParams({
          dd: 0,
          conditions: [],
          error: ex.errors[0].message,
        });
        setDDAtIndexToNull(skillNum);
        setSkillAtIndexToEmpty(skillNum);
      } else {
        toast.error("Something went wrong");
        setParams({
          dd: 0,
          error: "",
          conditions: [],
        });
        setDDAtIndexToNull(skillNum);
      }
    }
  }, [ddInput, cop, gender]);

  return (
    <>
      <TableCell className="pr-0">{skillNum + 1}</TableCell>
      <TableCell className="pl-2 pr-0">
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

  function setParams({
    dd,
    error,
    conditions,
  }: {
    dd: number;
    error: string;
    conditions: ConditionReturnType[];
  }) {
    setError(error), setDD(dd), setConditions(conditions);
  }
}
