import { CombinedDD } from "@/components/dd/combined-dd";
import { DDInput } from "@/components/dd/dd-input";
import { SelectGender } from "@/components/config/gender-selector";
import { IntroText } from "@/components/text/intro-text";
import { Card } from "@/components/ui/card";
import { SelectCOP } from "@/components/config/cop-selector";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Home() {
  return (
    <main className="min-h-screen p-4 w-full md:w-2/3 mx-auto">
      <nav className="flex justify-between items-center py-4 mb-4 border-b mx-auto">
        <h1 className="font-bold text-xl">Trampoline Difficulity Calculator</h1>
        <Dialog>
          <DialogTrigger className="px-3 py-2 bg-black text-white shadow-md rounded-md">
            Notation
          </DialogTrigger>
          <DialogContent className="p-8 text-center md:text-left">
            <p>
              The notation follows the same notation as described in the Code of
              Points
            </p>
            <p>
              Start by defining number of quarter rotations, then the number of
              twists for each rotation, seperated by a space, ending with the
              position. If there is no twist, leave it blank or type
              &apos;-&apos;
            </p>
            <p>Valid positions are:</p>
            <ul className="list-disc list-inside">
              <li>O - Tuck</li>
              <li>V - Pike</li>
              <li>I - Straight</li>
            </ul>
            <p>
              <span className="font-bold">Example:</span> 12 - - 3 V
            </p>
            <p>
              <span className="font-bold">Example:</span> 8 4 4 I
            </p>
            <p>
              <span className="font-bold">Example:</span> 4 1 O
            </p>
          </DialogContent>
        </Dialog>
      </nav>
      <div className="mx-auto flex flex-col items-center justify-center space-y-2 text-center">
        <IntroText />
        <div className="flex space-x-0 pt-4 sm:space-x-2 space-y-2 sm:space-y-0 flex-col sm:flex-row w-full">
          <SelectGender />
          <SelectCOP />
        </div>
      </div>
      <div className="space-y-4 mt-4">
        <Card className="mx-auto p-4 space-y-4">
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
