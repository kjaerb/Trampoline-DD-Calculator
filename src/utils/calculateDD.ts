import { DD, Position, positionSchema } from "@/schema/dd-schema";
import { Gender } from "@/schema/gender-schema";

export function calculateDD(ddString: string): number {
  const seperatedDD = ddString.toUpperCase().split(" ");

  const identifiers = seperatedDD.slice(0, seperatedDD.length - 1);
  const position = positionSchema.parse(seperatedDD[seperatedDD.length - 1]);

  const numRotations = parseInt(identifiers[0]);

  const twists = identifiers.slice(1);

  if (twists.length !== getFullRotations(numRotations)) {
    console.log("Something suspicious. Not enough twists");
  }

  const twistsDD = calculateTwists({ twists, gender: "Male" });
  const rotationsDD = calculateRotations({ rotations: numRotations, position });

  return Number(((twistsDD + rotationsDD) / 10).toFixed(1));
}

interface PositionMultiplier {
  position: Position;
  rotations: number;
}

function getFullRotations(rotations: number): number {
  return Math.floor(rotations / 4);
}

interface Twists {
  twists: string[];
  gender: Gender;
}

function calculateTwists({ twists, gender = "Male" }: Twists): number {
  const numQuarterTwists = twists
    .map((twist) => twist.replace(/[^0-9.]/, ""))
    .map((twist) => parseInt(twist))
    .filter((twist) => !isNaN(twist))
    .reduce((acc, twist) => acc + twist, 0);

  const bonus = calculateTwistBonus({ twists: numQuarterTwists, gender });

  return numQuarterTwists + bonus;
}

interface TwistBonus {
  twists: number;
  gender: Gender;
}

function calculateTwistBonus({ twists, gender }: TwistBonus): number {
  // TODO calculate extra twist bonus for both genders
  if (gender === "Female") {
    return 0;
  } else if (gender === "Male") {
    return 0;
  }
  throw new Error("Unknown gender for calculating twists bonus");
}

interface Rotations {
  rotations: number;
  position: Position;
}

function calculateRotations({ rotations, position }: Rotations): number {
  const bonus = calculateTriffBonus(rotations);
  const positionMultiplier = applyPositionMultiplier({ position, rotations });
  const rotationsBonus = calculateRotationBonus(rotations);
  return bonus + positionMultiplier + rotations + rotationsBonus;
}

function calculateTriffBonus(rotations: number): number {
  const fullRotations = getFullRotations(rotations);
  const rotationsToBonus = 2;

  if (fullRotations > rotationsToBonus) {
    return fullRotations - rotationsToBonus;
  }
  return 0;
}

function calculateRotationBonus(rotations: number): number {
  return getFullRotations(rotations);
}

function applyPositionMultiplier({
  position,
  rotations,
}: PositionMultiplier): number {
  switch (position) {
    case "O":
      return 0;
    case "I":
      return getFullRotations(rotations);
    case "V":
      return getFullRotations(rotations);
    default:
      throw new Error(`Invalid position ${position}`);
  }
}
