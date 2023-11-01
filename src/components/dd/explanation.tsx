import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ConditionReturnType } from "@/components/config/cop";
import { Label } from "@/components/ui/label";

interface ExplanationProps {
  conditions: ConditionReturnType[];
}

export function Explanation({ conditions }: ExplanationProps) {
  return (
    <Popover>
      <PopoverTrigger className="text-sm md:text-base border shadow-md rounded-full w-8 h-8 text-gray-500">
        i
      </PopoverTrigger>
      <PopoverContent className="space-y-4">
        {conditions.map((condition, i) => (
          <div key={i}>
            <Label className="font-bold">ID: {condition.id}</Label>
            <div className="flex pb-2">
              <Label className="flex-1 leading-5">{condition.label}</Label>
              <Label className="font-bold">
                {condition.difficulity.toFixed(1)}
              </Label>
            </div>
            <Separator />
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
