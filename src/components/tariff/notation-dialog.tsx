import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function NotationDialog() {
  return (
    <Dialog>
      <DialogTrigger className="px-3 py-2 shadow-md rounded-md bg-black text-white dark:bg-gray-800">
        Notation
      </DialogTrigger>
      <DialogContent className="p-8">
        <p>
          The notation follows the same notation as described in the Code of
          Points
        </p>
        <p>
          Start by defining number of quarter rotations, then the number of
          twists for each rotation, seperated by a space, ending with the
          position. If there is no twist, leave it blank or type &apos;-&apos;
        </p>
        <p>Valid positions are:</p>
        <ul className="list-disc list-inside">
          <li>O - Tuck</li>
          <li>{"<"} or V - Pike</li>
          <li>/ or I - Straight</li>
        </ul>
        <p className="font-bold">Examples:</p>
        <p>12 - - 3 V</p>
        <p>8 4 4 I</p>
        <p>8 3 1 /</p>
        <p>4 1 O</p>
        <p>4 - {"<"}</p>
      </DialogContent>
    </Dialog>
  );
}
