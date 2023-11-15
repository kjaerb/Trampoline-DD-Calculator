"use client";

import { Input } from "@/components/ui/input";
import { Tariff, tariffSchema } from "@/schema/tariff-schema";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getDifficulty, transformTariffString } from "@/utils/difficulity";
import { ZodError } from "zod";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import useExerciseStore from "@/store/use-exercise-store";
import { Skill } from "@/types/types";
import { parse } from "path";

interface TariffInputProps {
  index: number;
  id: string;
}

export function TariffInput({ id, index }: TariffInputProps) {
  const {
    getExerciseTab,
    getSkillString,
    setSkillString,
    setSkill,
    resetSkill,
  } = useExerciseStore();
  const [error, setError] = useState<string>("");

  const skillString = getSkillString(id, index);

  const exerciseTab = getExerciseTab(id);
  const currentCop = exerciseTab?.cop;
  const currentGender = exerciseTab?.gender;

  useEffect(() => {
    try {
      if (skillString === "") return;

      const parsedTariff = tariffSchema.parse({
        skill: skillString,
        gender: currentGender,
        cop: currentCop,
      });
      setError("");
      calculateTariff(parsedTariff);
    } catch (e) {
      if (e instanceof ZodError) {
        setError(e.issues[0].message);
      } else {
        toast.error("Something went wrong");
      }
      resetSkill(id, index);
    }
  }, [skillString, currentCop, currentGender]);

  function calculateTariff(data: Tariff) {
    const parsedElement = transformTariffString(data.skill);

    const tariff = getDifficulty({
      gender: data.gender,
      copYear: data.cop,
      skill: parsedElement,
    });

    const skill: Skill = {
      ...parsedElement,
      conditions: tariff.conditions,
      tariff: tariff.difficulty,
    };

    setSkill(id, index, skill);
  }

  return (
    <div>
      <Input
        placeholder="Enter skill"
        value={skillString}
        onChange={(e) => setSkillString(id, index, e.target.value)}
        className={cn(error && "border-red-500 focus-visible:outline-red-500")}
      />
      <Label className="text-red-500">{error}</Label>
    </div>
  );
}
