import { z } from "zod";
import { Gender } from "./config-schema";

export const copYears = ["2022-2024", "2025-2028"] as const;
export type COPYear = (typeof copYears)[number];

export const tariffSchema = z.object({
  skill: z
    .string()
    .regex(/^(?:[\d|-]+\s+)*[OoVvIi]$/, { message: "Skill not recognized" }),
  gender: z.custom<Gender>(),
  cop: z.enum(copYears),
});

export type Tariff = z.infer<typeof tariffSchema>;

export const positionSchema = z.enum(["O", "V", "I"]);

export type Position = z.infer<typeof positionSchema>;
