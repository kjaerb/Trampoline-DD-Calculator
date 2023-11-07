"use client";

import { Input } from "@/components/ui/input";
import { Tariff, tariffSchema } from "@/schema/tariff-schema";
import useConfigStore from "@/store/use-config-store";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getDifficulty, transformTariffString } from "@/utils/difficulity";
import useSkillStore from "@/store/use-skill-store";
import { ZodError } from "zod";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TariffInputProps {
  index: number;
  id: string;
}

export function TariffInput({ id, index }: TariffInputProps) {
  const {
    setTariffAtIndex,
    setTariffAtIndexToEmpty,
    setSkillString,
    getSkillStr,
    skills,
  } = useSkillStore();

  const { cop, gender } = useConfigStore();

  const [error, setError] = useState<string>("");

  const currentCop = cop[id];
  const currentGender = gender[id];

  useEffect(() => {
    try {
      if (getSkillStr(id, index) === "") return;

      // setSkillString({
      //   id,
      //   index,
      //   skillString: tariffInput,
      // });

      const parsedTariff = tariffSchema.parse({
        skill: getSkillStr(id, index),
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
      // setTariffAtIndexToEmpty({ id, index });
    }
  }, [getSkillStr(id, index), currentCop, currentGender]);

  function calculateTariff(data: Tariff) {
    const parsedElement = transformTariffString(data.skill);

    const tariff = getDifficulty({
      gender: data.gender,
      copYear: data.cop,
      skill: parsedElement,
    });

    setTariffAtIndex({
      conditions: tariff.conditions,
      difficulty: tariff.difficulty,
      index,
      id,
      skill: parsedElement,
      skillString: data.skill,
    });
  }

  return (
    <div>
      <Input
        placeholder="Enter skill"
        value={getSkillStr(id, index)}
        onChange={(e) =>
          setSkillString({ id, index, skillString: e.target.value })
        }
        className={cn(error && "border-red-500 focus-visible:outline-red-500")}
      />
      <Label className="text-red-500">{error}</Label>
    </div>
  );
}
