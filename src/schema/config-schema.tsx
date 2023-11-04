import z from "zod";

export const genders = ["Men", "Women"] as const;

export const genderSchema = z.enum(genders);

export type Gender = z.infer<typeof genderSchema>;
