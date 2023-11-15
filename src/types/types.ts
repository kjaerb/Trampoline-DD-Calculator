import { Gender } from "@/schema/config-schema";
import { COPYear, Position } from "@/schema/tariff-schema";
import { ConditionReturnType } from "@/utils/cop";

export type ExerciseTab = {
  id: string;
  name: string;
  skills: (Skill | undefined)[];
  skillStrings: string[];
  gender: Gender;
  cop: COPYear;
  apperatus: Apperatus;
};

export type Apperatus = "trampoline" | "tumbling" | "dmt";

export type SkillTransformed = {
  quarterRotations: number;
  twists: Record<number, number>;
  position?: Position;
};

export type Skill = {
  tariff: number;
  conditions: ConditionReturnType[];
  quarterRotations: number;
  twists: Record<number, number>;
  position?: Position;
};
