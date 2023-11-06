"use client";

import useSkillStore from "@/store/use-skill-store";
import { HTMLAttributes, useEffect, useState } from "react";
import { ConditionReturnType, SkillElement, codeOfPoints } from "@/utils/cop";
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

    const fullExerciseBonus = getFullExerciseBonus({
      condition: currentCOP.exerciseBonus,
      gender,
      elements: dd.filter(Boolean) as SkillElement[],
    });

    setExerciseBonus(fullExerciseBonus);

    const exerciseDDBonus = fullExerciseBonus.reduce(
      (acc, curr) => acc + curr.difficulity,
      0
    );

    const currentDD = dd
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
      .reduce((acc, curr) => acc + curr.difficulity, 0);

    setCombinedDD(currentDD + exerciseDDBonus);
  }, [dd, cop, gender]);

  return (
    <div {...props} className="border-t py-4">
      <div className="space-y-2">
        {exerciseBonus.map((bonus, i) => (
          <div className="flex justify-evenly space-x-2" key={i}>
            <Label className="">{bonus.label}</Label>
            <Separator orientation="vertical" className="h-auto" />
            <Label className="no-wrap pl-6">Bonus: {bonus.difficulity}</Label>
          </div>
        ))}
      </div>
      <Label className="font-bold">DD: {combinedDD.toFixed(1)}</Label>
    </div>
  );
}
