import { ButtonSkeleton } from "./button";
import { TableSkeleton } from "./table";

export function TabSkeleton() {
  return (
    <>
      <div className="flex justify-between">
        <div className="space-x-2 flex">
          <ButtonSkeleton />
          <ButtonSkeleton />
        </div>
        <ButtonSkeleton />
      </div>
      <TableSkeleton />
    </>
  );
}
