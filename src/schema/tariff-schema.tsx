import { z } from "zod";
import { Gender, genderSchema } from "./config-schema";

export const copYears = ["2022-2024", "2025-2028"] as const;
export type COPYear = (typeof copYears)[number];

export const tariffSchema = z.object({
  skill: z
    .string()
    .regex(/^(?:[\d|-]+\s+)*[OoVvIi]$/, { message: "Skill not recognized" }),
  gender: genderSchema,
  cop: z.enum(copYears, {
    required_error: "Please choose a valid CoP",
  }),
});

export type Tariff = z.infer<typeof tariffSchema>;

export const positionSchema = z.enum(["O", "V", "I"]);

export type Position = z.infer<typeof positionSchema>;
