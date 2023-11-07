"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";
import { cn } from "@/lib/utils";
import { SelectGender } from "@/components/selects/select-gender";
import { SelectCOP } from "@/components/selects/select-cop";
import { TariffTable } from "@/components/tariff/tariff-table";
import useSkillStore from "@/store/use-skill-store";

type Exercise = {
  id: string;
  index: number;
  exercise: any[];
};

export function ExerciseTabs() {
  const [tabs, setTabs] = useState<Exercise[]>([
    {
      id: nanoid(),
      index: 1,
      exercise: [],
    },
  ]);
  const [numTabs, setNumTabs] = useState<number>(1);

  const { resetSkills, duplicateSkills } = useSkillStore();

  function createNewTab() {
    const newId = nanoid();
    const newTab = { id: newId, exercise: [], index: numTabs + 1 };
    setTabs((prev) => [...prev, newTab]);
    setNumTabs((prev) => prev + 1);
    return newId;
  }

  function removeTab(id: string) {
    if (tabs.length === 1) return;
    setTabs(tabs.filter((tab) => tab.id !== id));
  }

  function createDuplicateTab(id: string) {
    const newId = createNewTab();
    duplicateSkills(id, newId);
  }

  return (
    <Tabs defaultValue={tabs[0].id} className="w-full max-w-[100vw]">
      <TabsList className="max-w-[100vw] overflow-x-scroll">
        {tabs.map((tab) => (
          <TabsTrigger
            value={tab.id}
            key={`${tab.index}:${tab.exercise}`}
            className="relative group"
          >
            <span>Exercise {tab.index}</span>
            <div
              className={cn(
                "opacity-0 group-hover:opacity-100 transition-opacity duration-300 group absolute z-100 bg-red-500 w-6 h-6 shadow-md rounded-full top-0 right-0 border border-red-600 dark:border-red-800 text-white"
              )}
              onClick={() => removeTab(tab.id)}
            >
              <p className="p-0 m-0">-</p>
            </div>
          </TabsTrigger>
        ))}

        <Button onClick={createNewTab} variant={"secondary"}>
          +
        </Button>
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent value={tab.id} key={tab.id} className="space-y-4">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 space-x-0 sm:space-x-2">
            <SelectGender id={tab.id} />
            <SelectCOP id={tab.id} />
          </div>
          <div className="space-x-4 flex justify-between sm:block">
            <Button
              className="w-full sm:w-auto"
              variant={"secondary"}
              onClick={() => resetSkills(tab.id)}
            >
              Reset exercise
            </Button>
            <Button
              className="w-full sm:w-auto"
              variant={"secondary"}
              onClick={() => createDuplicateTab(tab.id)}
            >
              Duplicate exercise
            </Button>
          </div>
          <TariffTable id={tab.id} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
