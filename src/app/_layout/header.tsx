import { NotationDialog } from "@/components/dd/notation-dialog";

export function Header() {
  return (
    <nav className="flex justify-between items-center py-4 mb-4 border-b mx-auto">
      <h1 className="font-bold text-xl">Trampoline Difficulty Calculator</h1>
      <NotationDialog />
    </nav>
  );
}
