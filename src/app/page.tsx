import { CombinedDD } from "@/components/dd/combined-dd";
import { DDInput } from "@/components/dd/dd-input";
import { SelectGender } from "@/components/config/gender-selector";
import { IntroText } from "@/components/text/intro-text";
import { Card } from "@/components/ui/card";
import { SelectCOP } from "@/components/config/cop-selector";

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className="mx-auto flex flex-col items-center justify-center space-y-2 text-center">
        <h1 className="font-bold text-xl">Trampoline Difficulity Calculator</h1>
        <IntroText />
        <div className="flex space-x-0 sm:space-x-2 space-y-2 sm:space-y-0 flex-col sm:flex-row w-full sm:w-[400px]">
          <SelectGender />
          <SelectCOP />
        </div>
      </div>
      <div className="space-y-4 mt-4">
        <Card className="mx-auto p-4 space-y-4 w-full md:w-2/3">
          <div className="grid grid-cols-1 space-y-4 w-content">
            {Array.from({ length: 10 }, (_, i) => (
              <DDInput skillNum={i} key={i} />
            ))}
          </div>
          <CombinedDD className="mt-4" />
        </Card>
      </div>
    </main>
  );
}
