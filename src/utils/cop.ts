import { Gender } from "@/schema/config-schema";
import { COPYear, Position } from "@/schema/tariff-schema";
import {
  getFullRotations,
  getIsBackwards,
  getNumTwists,
} from "@/utils/difficulity";

export type ConditionReturnType = {
  id: string;
  label: string;
  labelPoints: number;
  difficulity: number;
};

export type SkillElement = {
  quarterRotations: number;
  twists: Record<number, number>;
  position: Position;
};

interface ConditionArgs {
  element: SkillElement;
  gender: Gender;
}

export type Condition = (args: ConditionArgs) => ConditionReturnType;

export type ExerciseBonus = (args: {
  elements: SkillElement[];
  gender: Gender;
}) => ConditionReturnType;

type COP = {
  conditions: Condition[];
  bonuses: Condition[];
  exerciseBonus: ExerciseBonus[];
};

export const codeOfPoints: Record<COPYear, COP> = {
  "2022-2024": {
    conditions: [
      (args) => {
        const {
          element: { quarterRotations },
        } = args;

        let dd = 0;

        const numRotations = getFullRotations(quarterRotations);

        if (numRotations < 1) {
          dd = quarterRotations;
        } else if (numRotations > 4) {
          dd = quarterRotations;
        }

        return {
          id: "18.1.1.1",
          labelPoints: 0.1,
          label: "per ¼ somersault (90°)",
          difficulity: dd * 0.1,
        };
      },
      (args) => {
        const {
          element: { quarterRotations },
        } = args;

        const numRotations = getFullRotations(quarterRotations);

        return {
          id: "18.1.1.2",
          labelPoints: 0.5,
          label: "for complete single somersaults (360°)",
          difficulity: numRotations === 1 ? 0.5 : 0,
        };
      },
      (args) => {
        const {
          element: { quarterRotations },
        } = args;

        const numRotations = getFullRotations(quarterRotations);

        return {
          id: "18.1.1.3",
          labelPoints: 1.0,
          label: "for complete double somersaults (720°)",
          difficulity: numRotations === 2 ? 1.0 : 0,
        };
      },
      (args) => {
        const {
          element: { quarterRotations },
        } = args;

        const numRotations = getFullRotations(quarterRotations);

        return {
          id: "18.1.1.4",
          labelPoints: 1.6,
          label: "for complete triple somersaults (1080°)",
          difficulity: numRotations === 3 ? 1.6 : 0,
        };
      },
      (args) => {
        const {
          element: { quarterRotations },
        } = args;

        const numRotations = getFullRotations(quarterRotations);

        return {
          id: "18.1.1.5",
          labelPoints: 2.2,
          label: "for complete quadruple somersaults (1440°)",
          difficulity: numRotations === 4 ? 2.2 : 0,
        };
      },
      (args) => {
        const {
          element: { twists },
        } = args;

        const numTwists = getNumTwists(twists);

        return {
          id: "18.1.1.6",
          labelPoints: 0.1,
          label: "per ½ twist (180°) ",
          difficulity: numTwists * 0.1,
        };
      },
      (args) => {
        const {
          element: { quarterRotations, twists, position },
        } = args;
        let dd = 0;

        const numRotations = getFullRotations(quarterRotations);
        const numTwists = getNumTwists(twists);

        if (
          numTwists === 0 &&
          numRotations === 1 &&
          (position === "I" || position === "V")
        ) {
          dd = 0.1;
        }

        return {
          id: "18.1.4",
          labelPoints: 0.1,
          label:
            "Single somersaults of 360 - 630° without twists, executed in the straight or pike position, will be awarded an extra 0.1 points.",
          difficulity: dd,
        };
      },
      (args) => {
        const {
          element: { quarterRotations, position },
        } = args;
        let dd = 0;

        const numRotations = getFullRotations(quarterRotations);

        if (position !== "O" && numRotations >= 2) {
          dd = numRotations * 0.1;
        }

        return {
          id: "18.1.5",
          labelPoints: 0.1,
          label:
            "Multiple somersaults of 720° or more, with or without twists, executed in the straight or pike position, will be awarded an extra 0.1 points per somersault.",
          difficulity: dd,
        };
      },
    ],
    bonuses: [],
    exerciseBonus: [],
  },
  "2025-2028": {
    conditions: [
      ({ element: { quarterRotations } }) => {
        let dd = 0;

        const numRotations = getFullRotations(quarterRotations);

        if (numRotations < 1) {
          dd = quarterRotations;
        } else if (numRotations > 4) {
          dd = quarterRotations;
        }

        return {
          id: "17.1.1.1",
          labelPoints: 0.1,
          label: "Each 1/4 somersault (90°)",
          difficulity: dd * 0.1,
        };
      },
      ({ element: { quarterRotations } }) => {
        const numRotations = getFullRotations(quarterRotations);

        return {
          id: "17.1.1.2",
          labelPoints: 0.5,
          label: "Each complete single somersaults (360°)",
          difficulity: numRotations === 1 ? 0.5 : 0,
        };
      },
      ({ element: { quarterRotations } }) => {
        const numRotations = getFullRotations(quarterRotations);

        return {
          id: "17.1.1.3",
          labelPoints: 1.0,
          label: "Each complete double somersaults (720°)",
          difficulity: numRotations === 2 ? 1.0 : 0,
        };
      },
      ({ element: { quarterRotations } }) => {
        const numRotations = getFullRotations(quarterRotations);

        return {
          id: "17.1.1.4",
          labelPoints: 1.6,
          label: "Each complete triple somersaults (1080°)",
          difficulity: numRotations === 3 ? 1.6 : 0,
        };
      },
      ({ element: { quarterRotations } }) => {
        const numRotations = getFullRotations(quarterRotations);

        return {
          id: "17.1.1.5",
          labelPoints: 2.2,
          label: "Each complete quadruple somersaults (1440°)",
          difficulity: numRotations === 4 ? 2.2 : 0,
        };
      },
      ({ element: { twists } }) => {
        const numTwists = getNumTwists(twists);

        return {
          id: "17.1.1.6",
          labelPoints: 0.1,
          label: "Each ½ twist (180°)",
          difficulity: numTwists * 0.1,
        };
      },
      ({ element: { quarterRotations, twists } }) => {
        const numRotations = getFullRotations(quarterRotations);
        const numTwists = getNumTwists(twists);

        return {
          id: "17.1.1.7",
          labelPoints: 0.2,
          label: "Each ½ twist (180°) in quadruple somersault (1440°)",
          difficulity: numRotations === 4 ? numTwists * 0.2 : 0,
        };
      },
      ({ element: { quarterRotations } }) => {
        let isNoRotations =
          quarterRotations === 0 || Number.isNaN(quarterRotations);

        return {
          id: "17.1.2",
          labelPoints: 0.1,
          label:
            "Elements without twist or somersault rotation (tuck jump, pike jump, straddle jump, seat drop, hands & knees drop) will have a difficulty value of 0.1 pts.",
          difficulity: isNoRotations ? 0.1 : 0,
        };
      },
      ({}) => {
        return {
          id: "17.1.3",
          labelPoints: 0.0,
          label:
            "Elements combining somersault and twist, the difficulty values of the somersault and twist are added together.",
          difficulity: 0,
        };
      },
      ({ element: { quarterRotations, twists, position } }) => {
        let dd = 0;

        const numRotations = getFullRotations(quarterRotations);
        const numTwists = getNumTwists(twists);

        if (
          numTwists === 0 &&
          numRotations === 1 &&
          (position === "I" || position === "V")
        ) {
          dd = 0.1;
        }

        return {
          id: "17.1.4",
          labelPoints: 0.1,
          label:
            "Single somersaults of 360 - 630° without twists, executed in the straight or pike position, will be awarded an additional 0.1 points.",
          difficulity: dd,
        };
      },
      ({ element: { quarterRotations, position } }) => {
        const numRotations = getFullRotations(quarterRotations);
        // will probably give errors

        return {
          id: "17.1.5",
          labelPoints: 0.1,
          label:
            "Multiple somersaults of 720° or more, with or without twists, executed in the straight or pike position, will be awarded an additional 0.1 points",
          difficulity:
            numRotations >= 2 && position !== "O" ? numRotations * 0.1 : 0,
        };
      },
    ],
    bonuses: [
      ({ element: { quarterRotations, twists } }) => {
        let dd = 0;
        let labelAfterFix = "";

        const numRotations = getFullRotations(quarterRotations);
        const numTwists = getNumTwists(twists);
        const isBackwards = getIsBackwards(numTwists);

        if (isBackwards) {
          switch (numRotations) {
            case 1:
              dd = 0.0;
              labelAfterFix = "Single somersaults of 360 - 630 degrees";
              break;
            case 2:
              dd = 0.1;
              labelAfterFix = "Double somersaults of 720 - 900 degrees";
              break;
            case 3:
              dd = 0.2;
              labelAfterFix = "Triple somersaults of 1080 - 1260 degrees";
              break;
            case 4:
              dd = 0.3;
              labelAfterFix = "Quadruple somersaults of  - 1440 degrees";
              break;
            default:
              dd = 0;
              break;
          }
        }

        return {
          id: "17.1.6.1",
          labelPoints: dd,
          label:
            "Backward elements will receive a bonus as follows: " +
            labelAfterFix,
          difficulity: dd,
        };
      },
      ({ gender, element: { twists, quarterRotations } }) => {
        const labelPrefix =
          "Twisting double somersaults will receive a bonus as follows: ";
        const numRotations = getFullRotations(quarterRotations);

        if (numRotations !== 2) {
          return {
            id: "17.1.6.2",
            labelPoints: 0.1,
            label: "Error value",
            difficulity: 0,
          };
        }

        const numTwists = getNumTwists(twists);

        if (gender === "Men") {
          const subtraction = 1080 / 180;
          const dd = (numTwists - subtraction) * 0.1;

          return {
            id: "17.1.6.2",
            labelPoints: 0.1,
            label:
              labelPrefix +
              "Men - Element with more than 1080 degrees of twist, each additional 180 degrees of twist is 0.1pts",
            difficulity: dd > 0 ? dd : 0,
          };
        } else if (gender === "Women") {
          const subtraction = 720 / 180;
          const dd = (numTwists - subtraction) * 0.1;

          return {
            id: "17.1.6.2",
            labelPoints: 0.1,
            label:
              labelPrefix +
              "Women - Element with more than 720 degrees of twist, each additional 180 degrees of twist is 0.1pts",
            difficulity: dd > 0 ? dd : 0,
          };
        }

        return {
          id: "17.1.6.2",
          labelPoints: 0.1,
          label: "Error value",
          difficulity: 0,
        };
      },
      ({ gender, element: { quarterRotations, twists } }) => {
        const labelPrefix =
          "Twisting Triple somersault will receive a bonus as follows: ";
        const numRotations = getFullRotations(quarterRotations);

        const numTwists = getNumTwists(twists);

        if (numRotations !== 3) {
          return {
            id: "17.1.6.3",
            labelPoints: 0.2,
            label: "Error value",
            difficulity: 0,
          };
        }

        if (gender === "Men") {
          const subtraction = 540 / 180;

          const dd = (numTwists - subtraction) * 0.2;

          return {
            id: "17.1.6.3",
            labelPoints: 0.2,
            label:
              labelPrefix +
              "Men - Element with more than 540 degrees of twist, each additional 180 degrees of twist is 0.2pts",
            difficulity: dd > 0 ? dd : 0,
          };
        } else if (gender === "Women") {
          const subtraction = 180 / 180;

          const dd = (numTwists - subtraction) * 0.2;

          return {
            id: "17.1.6.3",
            labelPoints: 0.2,
            label:
              labelPrefix +
              "Women - Element with more than 180 degrees of twist, each additional 180 degrees of twist is 0.2pts",
            difficulity: dd > 0 ? dd : 0,
          };
        }

        return {
          id: "17.1.6.3",
          labelPoints: 0.2,
          label: "Error value",
          difficulity: 0,
        };
      },
    ],
    exerciseBonus: [
      ({ gender, elements }) => {
        const labelPrefix =
          "Triple or quadruple somersaults in the exercise will receive a bonus: ";
        const rotations = elements.flatMap(
          (element) => element.quarterRotations
        );

        const trippleOrMoreRotations = rotations.filter(
          (rotation) => getFullRotations(rotation) >= 3
        );

        if (gender === "Men") {
          const subtraction = 5;

          const dd = (trippleOrMoreRotations.length - subtraction) * 0.3;

          return {
            id: "17.1.6.4",
            labelPoints: 0.3,
            label:
              labelPrefix +
              "Men - Exercise with more than 5 elements of 1080 degrees of somersaults rotation, each additional element of 1080 degrees of somersault rotation or more is 0.3pts",
            difficulity: dd > 0 ? dd : 0,
          };
        } else if (gender === "Women") {
          const subtraction = 2;

          const dd = (trippleOrMoreRotations.length - subtraction) * 0.3;

          return {
            id: "17.1.6.4",
            labelPoints: 0.3,
            label:
              "Women - Exercise with more than 2 elements of 1080 degrees of somersaults rotation, each additional element of 1080 degrees of somersault rotation or more is 0.3pts",
            difficulity: dd > 0 ? dd : 0,
          };
        }

        return {
          id: "17.1.6.4",
          labelPoints: 0.3,
          label: "",
          difficulity: 0,
        };
      },
    ],
  },
};
