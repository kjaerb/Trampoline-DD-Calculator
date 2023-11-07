import z from "zod";

export const genders = ["Men", "Women"] as const;

export const genderSchema = z.enum(genders, {
  required_error: "Please choose a valid gender",
});

export type Gender = z.infer<typeof genderSchema>;
