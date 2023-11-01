import { DD, positionSchema } from "@/schema/dd-schema";
import { Gender } from "@/schema/config-schema";
import {
  Condition,
  ConditionReturnType,
  SkillElement,
} from "@/components/config/cop";

export function transformDDString(ddString: DD): SkillElement {
  const seperatedDD = ddString.toUpperCase().split(" ");

  const identifiers = seperatedDD.slice(0, seperatedDD.length - 1);

  const quarterRotations = parseInt(identifiers[0]);

  const twists = identifiers
    .slice(1)
    .map((twist) => twist.replace(/[^0-9.]/, ""))
    .map((twist) => parseInt(twist))
    .filter((twist) => !isNaN(twist));

  const position = positionSchema.parse(seperatedDD[seperatedDD.length - 1]);

  return {
    quarterRotations,
    twists,
    position,
  };
}

export function getIsBackwards(twists: number): boolean {
  return twists % 2 === 0;
}

export function getFullRotations(rotations: number): number {
  return Math.floor(rotations / 4);
}

export function getNumTwists(twists: number[]): number {
  return twists.reduce((acc, twists) => acc + twists, 0);
}

interface ConditionBonusArgs {
  conditions: Condition[];
  gender: Gender;
  element: SkillElement;
}

export function getConditionBonuses({
  conditions,
  gender,
  element,
}: ConditionBonusArgs) {
  return conditions
    .map((condition) => condition({ gender, element: element }))
    .filter((condition) => condition.difficulity !== 0);
}

interface DifficulityArgs extends ConditionBonusArgs {
  bonus: Condition[];
}

type DifficulityReturnType = {
  conditions: ConditionReturnType[];
  difficulity: number;
};

export function getDifficulity({
  conditions,
  bonus,
  gender,
  element,
}: DifficulityArgs): DifficulityReturnType {
  const conditionsBonuses = getConditionBonuses({
    conditions,
    gender,
    element,
  });

  const bonusBonuses = getConditionBonuses({
    conditions: bonus,
    gender,
    element,
  });

  const bonuses = conditionsBonuses
    .map((condition, index) => [condition, bonusBonuses[index]])
    .flat()
    .filter(Boolean);

  const difficulity = bonuses.reduce(
    (acc, condition) => acc + condition.difficulity,
    0
  );

  return {
    conditions: bonuses,
    difficulity: parseFloat(difficulity.toFixed(1)),
  };
}
