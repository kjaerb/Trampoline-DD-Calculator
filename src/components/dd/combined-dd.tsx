"use client";

import useSkillStore from "@/store/use-skill-store";
import { HTMLAttributes, useMemo } from "react";

interface CombinedDDProps extends HTMLAttributes<HTMLDivElement> {}

export function CombinedDD({ ...props }: CombinedDDProps) {
  const { dd } = useSkillStore();

  const calculatedDD = useMemo(() => {
    return Number(dd.reduce((acc, index) => acc + index, 0).toFixed(1));
  }, [dd]);

  return <div {...props}>DD: {calculatedDD}</div>;
}
