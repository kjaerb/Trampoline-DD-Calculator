"use client";

import useSkillStore from "@/store/use-skill-store";
import { HTMLAttributes, useEffect, useState } from "react";
import {
  ConditionReturnType,
  SkillElement,
  codeOfPoints,
} from "@/components/config/cop";
import useConfigStore from "@/store/use-config-store";
import { getDifficulity, getFullExerciseBonus } from "@/utils/difficulity";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface CombinedDDProps extends HTMLAttributes<HTMLDivElement> {}

export function CombinedDD({ ...props }: CombinedDDProps) {
  const { dd } = useSkillStore();
  const { cop, gender } = useConfigStore();
  const [combinedDD, setCombinedDD] = useState<number>(0);
  const [exerciseBonus, setExerciseBonus] = useState<ConditionReturnType[]>([]);

  useEffect(() => {
    const currentCOP = codeOfPoints[cop];

    setCombinedDD(
      dd
        .filter(Boolean)
        .map((d) => {
          return getDifficulity({
            conditions: currentCOP.conditions,
            bonus: currentCOP.bonuses,
            element: d as SkillElement,
            gender,
          });
        })
        .filter((d) => d.difficulity !== 0)
        .reduce((acc, curr) => acc + curr.difficulity, 0)
    );

    setExerciseBonus(
      getFullExerciseBonus({
        condition: currentCOP.exerciseBonus,
        gender,
        elements: dd.filter(Boolean) as SkillElement[],
      })
    );

    console.log(exerciseBonus);
  }, [dd, cop, gender]);

  return (
    <div {...props}>
      <div className="space-y-2">
        {exerciseBonus.map((bonus, i) => (
          <div className="flex justify-evenly space-x-2" key={i}>
            <Label className="flex-auto">{bonus.label}</Label>
            <Separator orientation="vertical" className="h-[32px]" />
            <Label className="flex-1">{bonus.difficulity}</Label>
          </div>
        ))}
      </div>
      <Label className="font-bold">DD: {combinedDD}</Label>
    </div>
  );
}
