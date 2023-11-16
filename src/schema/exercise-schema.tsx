import { ExerciseTab } from "@/types/types";
import { z } from "zod";

const exerciseCacheSchema = z.array(z.custom<ExerciseTab>());

type ExerciseCache = z.infer<typeof exerciseCacheSchema>;

export type { ExerciseCache };

export { exerciseCacheSchema };
