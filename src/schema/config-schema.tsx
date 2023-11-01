import z from "zod";

export const genders = ["Male", "Female"] as const;

export const genderSchema = z.enum(genders);

export type Gender = z.infer<typeof genderSchema>;
