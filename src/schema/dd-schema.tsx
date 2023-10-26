import { z } from "zod";

export const ddSchema = z.object({
  dd: z
    .string()
    .regex(/^(?:[\d|-]+\s+)*[OoVvIi]$/, { message: "Skill not recognized" }),
});

export type DD = z.infer<typeof ddSchema>;

export const positionSchema = z.enum(["O", "V", "I"]);

export type Position = z.infer<typeof positionSchema>;
