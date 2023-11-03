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
      <PopoverTrigger>
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          color="#606060"
        >
          <path d="M13 7.5a1 1 0 11-2 0 1 1 0 012 0zm-3 3.75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v4.25h.75a.75.75 0 010 1.5h-3a.75.75 0 010-1.5h.75V12h-.75a.75.75 0 01-.75-.75z"></path>
          <path
            fillRule="evenodd"
            d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"
          ></path>
        </svg>
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
