import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { COPYears, SkillElement } from "@/utils/cop";
import { SelectGender } from "@/components/selects/select-gender";
import { SelectCOP } from "@/components/selects/select-cop";
import { Gender } from "@/schema/config-schema";
import { CombinedDD } from "./temp/combined-dd";
import { nanoid } from "nanoid";

interface DDTableProps {
  id: string;
}

export function DDTable({ id }: DDTableProps) {
  const [cop, setCOP] = useState<COPYears>("2022-2024");
  const [gender, setGender] = useState<Gender>("Men");
  const [skills, setSkills] = useState<SkillElement[]>([]);

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
          {/* {Array.from({ length: 10 }, (_, i) => (
            <TableRow key={i}>
              <DDInputTable skillNum={i} />
            </TableRow>
          ))} */}

          {Array.from({ length: 10 }, (_, i) => (
            <TableRow key={nanoid()}>
              <TableCell className="pr-0">{i + 1}</TableCell>
              <TableCell>input</TableCell>
              <TableCell>dd</TableCell>
              <TableCell>e</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CombinedDD skillElements={skills} cop={cop} gender={gender} />
    </div>
  );
}
