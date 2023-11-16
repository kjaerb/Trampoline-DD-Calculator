"use client";

import { Input } from "@/components/ui/input";
import { tariffSchema } from "@/schema/tariff-schema";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { calculateTariff } from "@/utils/difficulity";
import { ZodError } from "zod";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import useExerciseStore, {
  saveExerciseToCache,
} from "@/store/use-exercise-store";

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
      const skill = calculateTariff(parsedTariff);
      setSkill(id, index, skill);
      saveExerciseToCache();
    } catch (e) {
      if (e instanceof ZodError) {
        setError(e.issues[0].message);
      } else {
        toast.error("Something went wrong");
      }
      resetSkill(id, index);
    }
  }, [skillString, currentCop, currentGender]);

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
