import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function NotationDialog() {
  return (
    <Dialog>
      <DialogTrigger className="px-3 py-2 bg-black text-white shadow-md rounded-md">
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
  );
}
