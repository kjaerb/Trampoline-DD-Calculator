import {
  COPYear,
  Position,
  Tariff,
  positionSchema,
} from "@/schema/tariff-schema";
import { Gender } from "@/schema/config-schema";
import {
  Condition,
  ConditionReturnType,
  ExerciseBonus,
  codeOfPoints,
} from "@/utils/cop";
import { Skill, SkillTransformed } from "@/types/types";

export function transformTariffString(
  ddString: Tariff["skill"]
): SkillTransformed {
  const seperatedDD = ddString.toUpperCase().split(" ");

  const identifiers = seperatedDD.slice(0, seperatedDD.length - 1);

  const quarterRotations = parseInt(identifiers[0]);

  const twists: Record<number, number> = {};

  identifiers.slice(1).forEach((twist, i) => {
    twists[i] = parseInt(twist.replace(/[^0-9.]/, ""));
  });

  const position = positionSchema.parse(seperatedDD[seperatedDD.length - 1]);
  const parsedPosition = getPosition(position);

  return {
    quarterRotations,
    twists,
    position: parsedPosition,
  };
}

export function calculateTariff(data: Tariff): Skill {
  const parsedElement = transformTariffString(data.skill);

  const tariff = getDifficulty({
    gender: data.gender,
    copYear: data.cop,
    skill: parsedElement,
  });

  const skill: Skill = {
    ...parsedElement,
    conditions: tariff.conditions,
    tariff: tariff.difficulty,
  };

  return skill;
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

export function getPosition(position: Position): "/" | "<" | "O" {
  switch (position) {
    case "/":
      return "/";
    case "I":
      return "/";
    case "<":
      return "<";
    case "V":
      return "<";
    case "O":
      return "O";
    default:
      return "O";
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
  skill: SkillTransformed;
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
  skill: SkillTransformed;
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
  elements: Skill[];
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
