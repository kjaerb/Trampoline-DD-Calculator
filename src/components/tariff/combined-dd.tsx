import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import useSkillStore from "@/store/use-skill-store";
import { codeOfPoints } from "@/utils/cop";
import { getFullExerciseBonus } from "@/utils/difficulity";
import { HTMLAttributes } from "react";

interface CombinedDDProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
}

export function CombinedDD({ id, ...props }: CombinedDDProps) {
  // const { gender, cop } = useConfigStore();
  // const { skills } = useSkillStore();

  // const currentSkills = skills[id];
  // const currentCOP = cop[id];
  // const currentGender = gender[id];

  // const exerciseBonus = getFullExerciseBonus({
  //   condition: codeOfPoints[currentCOP]?.exerciseBonus ?? [],
  //   gender: currentGender,
  //   elements: currentSkills
  //     ?.filter(Boolean)
  //     .map((skill) => skill?.skill as Skill),
  // });

  // const combinedDD =
  //   currentSkills?.reduce((acc, curr) => acc + curr?.difficulty ?? 0, 0) +
  //   exerciseBonus?.reduce((acc, curr) => acc + curr.difficulity, 0);

  return (
    <div {...props} className="border-t py-4">
      <div className="space-y-2">
        {/* {exerciseBonus.map((bonus, i) => (
          <div className="flex justify-evenly space-x-2" key={i}>
            <Label className="">{bonus.label}</Label>
            <Separator orientation="vertical" className="h-auto" />
            <Label className="no-wrap pl-6">
              Bonus: {bonus.difficulity.toFixed(1)}
            </Label>
          </div>
        ))} */}
      </div>
      {/* <Label className="font-bold">DD: {combinedDD?.toFixed(1) || 0}</Label> */}
    </div>
  );
}
