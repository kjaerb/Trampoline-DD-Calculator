import z from "zod";

export const genderSchema = z.enum(["Male", "Female"]);

export type Gender = z.infer<typeof genderSchema>;
