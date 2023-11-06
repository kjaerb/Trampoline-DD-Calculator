"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tariff, tariffSchema } from "@/schema/tariff-schema";
import useConfigStore from "@/store/use-config-store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "sonner";
import { getDifficulty, transformTariffString } from "@/utils/difficulity";
import useSkillStore from "@/store/use-skill-store";

interface TariffInputProps {
  index: number;
  id: string;
}

export function TariffInput({ id, index }: TariffInputProps) {
  const { cop, gender } = useConfigStore();
  const { setTariffAtIndex, skills } = useSkillStore();
  const currentCop = cop[id];
  const currentGender = gender[id];
  const currentSkill = skills[id];

  const tariffForm = useForm<Tariff>({
    resolver: zodResolver(tariffSchema),
    defaultValues: {
      skill: currentSkill?.[index]?.skillString || "",
      cop: currentCop,
      gender: currentGender,
    },
  });

  const { control, handleSubmit, watch, setValue } = tariffForm;

  useEffect(() => {
    setValue("gender", currentGender);
    setValue("cop", currentCop);
  }, [setValue, currentCop, currentGender]);

  useEffect(() => {
    toast.dismiss();
    if (watch("skill") === "") return;

    if (watch("gender") === undefined) {
      toast.info("Please select a gender");
      return;
    }
    if (watch("cop") === undefined) {
      toast.info("Please select a COP");
      return;
    }

    const subscription = watch(() => handleSubmit(calculateTariff)());
    return () => subscription.unsubscribe();
  }, [handleSubmit, watch(), cop[id], gender[id]]);

  function calculateTariff(data: Tariff) {
    const parsedElement = transformTariffString(data.skill);
    const elementJSONString = JSON.stringify(parsedElement);

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
    <Form {...tariffForm}>
      <form onSubmit={handleSubmit(calculateTariff)}>
        <FormField
          control={control}
          name="skill"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter skill" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
