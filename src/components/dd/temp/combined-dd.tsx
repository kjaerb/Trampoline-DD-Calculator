import { Label } from "@/components/ui/label";
import { Gender } from "@/schema/config-schema";
import { COPYears, SkillElement, codeOfPoints } from "@/utils/cop";
import { HTMLAttributes, useState } from "react";

interface CombinedDDProps extends HTMLAttributes<HTMLDivElement> {
  skillElements: SkillElement[];
  cop: COPYears;
  gender: Gender;
}

export function CombinedDD({
  skillElements,
  cop,
  gender,
  ...props
}: CombinedDDProps) {
  const [combinedDD, setCombinedDD] = useState<number>(0); // TODO

  const currentYear = codeOfPoints[cop];

  return (
    <div {...props} className="border-t py-4">
      <div className="space-y-2">
        {/* {exerciseBonus.map((bonus, i) => (
          <div className="flex justify-evenly space-x-2" key={i}>
            <Label className="">{bonus.label}</Label>
            <Separator orientation="vertical" className="h-auto" />
            <Label className="no-wrap pl-6">Bonus: {bonus.difficulity}</Label>
          </div>
        ))} */}
      </div>
      <Label className="font-bold">DD: {combinedDD.toFixed(1)}</Label>
    </div>
  );
}
