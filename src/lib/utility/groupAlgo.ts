import type { Algorithm } from "$lib/types";
import { algorithmsArr } from "$lib/algorithms/algorithmsArr";

export function groupAlgo(
  algorithms: Algorithm[]
): Record<string, Algorithm[]> {
  return algorithms.reduce((grouped, algorithm) => {
    const key: string = algorithm.algoType!;
    if (!(key in grouped)) {
      grouped[key] = [];
    }
    grouped[key].push(algorithm);
    return grouped;
  }, {} as Record<string, Algorithm[]>);
}
