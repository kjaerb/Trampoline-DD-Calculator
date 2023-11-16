import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function countDuplicates(arr: any[], key: string | number): number {
  const countMap: Record<string, number> = {};

  arr.forEach((item) => {
    const keyValue = item[key];

    if (keyValue in countMap) {
      countMap[keyValue as string]++;
    } else {
      countMap[keyValue as string] = 1;
    }
  });

  // Sum the counts of items with count greater than 1
  const totalDuplicates = Object.values(countMap).reduce(
    (total, count) => total + (count > 1 ? count : 0),
    0
  );

  return totalDuplicates;
}
