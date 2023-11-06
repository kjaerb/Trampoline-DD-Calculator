"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CombinedDD } from "./temp/combined-dd";
import { nanoid } from "nanoid";
import { TariffInput } from "./temp/tariff-input";
import useSkillStore from "@/store/use-skill-store";

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
          {Array.from({ length: 10 }, (_, i) => (
            <TableRow key={nanoid()}>
              <TableCell className="pr-0">{i + 1}</TableCell>
              <TableCell>
                <TariffInput id={id} index={i} />
              </TableCell>
              <TableCell>{currentSkills?.[i]?.difficulty || 0}</TableCell>
              <TableCell>e</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CombinedDD skillElements={[]} id={id} />
    </div>
  );
}
