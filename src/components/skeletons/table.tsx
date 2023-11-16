import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <div className="flex flex-row space-x-4" key={i}>
          <Skeleton className="w-1/2 h-8" />
          <Skeleton className="w-1/4 h-8" />
          <Skeleton className="w-1/4 h-8" />
        </div>
      ))}
    </>
  );
}
