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
import { Explanation } from "./explanation";
import { apperatusExerciseLength } from "@/utils/cop";
import useExerciseStore from "@/store/use-exercise-store";

interface DDTableProps {
  id: string;
}

export function TariffTable({ id }: DDTableProps) {
  const { getExerciseTab } = useExerciseStore();
  const currentExerciseTab = getExerciseTab(id);
  const skillLength =
    apperatusExerciseLength[currentExerciseTab?.apperatus || "trampoline"];

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
          {Array.from({ length: skillLength }, (_, i) => {
            const currentExercise = currentExerciseTab?.skills[i];

            return (
              <TableRow key={i}>
                <TableCell className="pr-0">{i + 1}</TableCell>
                <TableCell>
                  <TariffInput id={id} index={i} />
                </TableCell>
                <TableCell>{currentExercise?.tariff || 0}</TableCell>
                <TableCell>
                  {currentExercise?.conditions &&
                    currentExercise.conditions.length > 0 && (
                      <Explanation
                        conditions={currentExercise?.conditions ?? []}
                      />
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
