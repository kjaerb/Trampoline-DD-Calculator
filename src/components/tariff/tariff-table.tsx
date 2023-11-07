"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CombinedDD } from "./combined-dd";
import { TariffInput } from "./tariff-input";
import useSkillStore from "@/store/use-skill-store";
import { Explanation } from "./explanation";

interface DDTableProps {
  id: string;
}

export function TariffTable({ id }: DDTableProps) {
  const { skills } = useSkillStore();
  const currentSkills = skills[id];

  return (
    <div className="mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead className="pl-2">Skill</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Info</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }, (_, i) => {
            const currentSkill = currentSkills?.[i];

            return (
              <TableRow key={i}>
                <TableCell className="pr-0">{i + 1}</TableCell>
                <TableCell>
                  <TariffInput id={id} index={i} />
                </TableCell>
                <TableCell>{currentSkill?.difficulty ?? 0}</TableCell>
                <TableCell>
                  {currentSkill?.conditions?.length > 0 && (
                    <Explanation conditions={currentSkill?.conditions ?? []} />
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <CombinedDD id={id} />
    </div>
  );
}
