"use client";

import { DD, ddSchema } from "@/schema/dd-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { calculateDD } from "@/utils/calculateDD";
import useSkillStore from "@/store/use-skill-store";

interface DDFormProps {
  skillNum: number;
}

export function DDForm({ skillNum }: DDFormProps) {
  const [skillDD, setSkillDD] = useState<number>(0);
  const { dd, setDDValue, setDDToZero } = useSkillStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const ddForm = useForm<DD>({
    resolver: zodResolver(ddSchema),
    defaultValues: {
      dd: "",
    },
  });

  useEffect(() => {
    if (inputRef.current) {
      const parsedInput = ddSchema.safeParse({ dd: inputRef.current.value });
      if (!parsedInput.success) {
        setDDToZero(skillNum);
      }
    }
  }, [inputRef?.current?.value]);

  const { control, handleSubmit } = ddForm;

  function handleCalculateDD(data: DD) {
    try {
      const dd = calculateDD(data.dd);
      setSkillDD(dd);
      setDDValue(skillNum, dd);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form {...ddForm}>
      <form
        // onSubmit={handleSubmit(handleCalculateDD)}
        onChange={handleSubmit(handleCalculateDD)}
      >
        <FormField
          control={control}
          name="dd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill {skillNum + 1}</FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 space-x-4 items-center">
                  <Input {...field} ref={inputRef} placeholder="Input skill" />
                  <Label className="">{skillDD}</Label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
