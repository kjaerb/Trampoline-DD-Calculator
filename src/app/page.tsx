import { CombinedDD } from "@/components/dd/combined-dd";
import { DDForm } from "@/components/form/dd-form";
import { IntroText } from "@/components/text/intro-text";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className="mx-auto flex flex-col items-center justify-center space-y-2 text-center">
        <h1 className="font-bold text-xl">Trampoline Difficulity Calculator</h1>
        <IntroText />
      </div>
      <div className="space-y-4 mt-4">
        <Card className=" mx-auto p-4 space-y-4">
          <div className="grid grid-cols-1 space-y-4 w-content">
            {Array.from({ length: 10 }, (_, i) => (
              <DDForm key={i} skillNum={i} />
            ))}
          </div>
          <CombinedDD className="mt-4" />
        </Card>
      </div>
    </main>
  );
}
