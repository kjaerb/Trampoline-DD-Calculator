import { COPYear, Tariff, positionSchema } from "@/schema/tariff-schema";
import { Gender } from "@/schema/config-schema";
import {
  Condition,
  ConditionReturnType,
  ExerciseBonus,
  SkillElement,
  codeOfPoints,
} from "@/utils/cop";

export function transformTariffString(ddString: Tariff["skill"]): SkillElement {
  const seperatedDD = ddString.toUpperCase().split(" ");

  const identifiers = seperatedDD.slice(0, seperatedDD.length - 1);

  const quarterRotations = parseInt(identifiers[0]);

  const twists: Record<number, number> = {};

  identifiers.slice(1).forEach((twist, i) => {
    twists[i] = parseInt(twist.replace(/[^0-9.]/, ""));
  });

  const position = positionSchema.parse(seperatedDD[seperatedDD.length - 1]);

  return {
    quarterRotations,
    twists,
    position,
  };
}

export function findDuplicateSkill(
  skills: string[],
  skill: string
): { duplicate: boolean; index: number | undefined } {
  const hasElement = skills.includes(skill);

  if (!hasElement) {
    return {
      duplicate: hasElement,
      index: undefined,
    };
  } else {
    var indices: number[] = [];

    skills.filter(function (arr, index) {
      if (arr == skill) {
        indices.push(index);
      }
    });

    return {
      duplicate: hasElement,
      index: indices[0],
    };
  }
}

export function getIsBackwards(twists: number): boolean {
  return twists % 2 === 0;
}

export function getFullRotations(rotations: number): number {
  return Math.floor(rotations / 4);
}

export function getNumTwists(twists: Record<number, number>): number {
  return Object.entries(twists)
    .filter((twist) => !Number.isNaN(twist[1]))
    .reduce((acc, twists) => acc + twists[1], 0);
}

interface ConditionBonusArgs {
  conditions: Condition[];
  gender: Gender;
  skill: SkillElement;
}

export function getConditionBonuses({
  conditions,
  gender,
  skill,
}: ConditionBonusArgs) {
  return conditions
    .map((condition) => condition({ gender, element: skill }))
    .filter((condition) => condition.difficulity !== 0);
}

type DifficulityReturnType = {
  conditions: ConditionReturnType[];
  difficulty: number;
};

type DifficulityArgs = {
  copYear: COPYear;
  gender: Gender;
  skill: SkillElement;
};

export function getDifficulty({
  copYear,
  gender,
  skill,
}: DifficulityArgs): DifficulityReturnType {
  const currentCOP = codeOfPoints[copYear];

  const conditionsBonuses = getConditionBonuses({
    conditions: currentCOP.conditions,
    gender,
    skill,
  });

  const bonusBonuses = getConditionBonuses({
    conditions: currentCOP.bonuses,
    gender,
    skill,
  });

  const bonuses = [...conditionsBonuses, ...bonusBonuses].filter(Boolean);

  const difficulity = bonuses.reduce(
    (acc, condition) => acc + condition.difficulity,
    0
  );

  return {
    conditions: bonuses,
    difficulty: parseFloat(difficulity.toFixed(1)),
  };
}

interface FullDifficulityArgs {
  elements: SkillElement[];
  condition: ExerciseBonus[];
  gender: Gender;
}

export function getFullExerciseBonus({
  elements = [],
  condition,
  gender,
}: FullDifficulityArgs) {
  return condition
    ?.filter(Boolean)
    ?.map((bonus) => bonus({ elements, gender }))
    ?.filter((bonus) => bonus.difficulity !== 0);
}
