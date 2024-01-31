//arr storing algorithm title, function, and description
//only has bubbleSort for now
import { bubbleSort, insertionSort, quickSort } from "./algorithms";
import type { Algorithm } from "$lib/types";
export const algorithmsArr: Algorithm[] = [
  {
    title: "Bubble Sort",
    func: bubbleSort,
    timeComplexity: "O(n^2)",
    description:
      "A simple comparison-based sorting algorithm. It works by repeatedly swapping adjacent elements if they are in the wrong order.",
    slug: "bubble-sort",
  },
  {
    title: "Insertion Sort",
    timeComplexity: "O(n^2)",
    func: insertionSort,
    description:
      "A simple comparison-based sorting algorithm. It works by repeatedly swapping adjacent elements if they are in the wrong order.",
    slug: "insertion-sort",
  },
  {
    title: "Quick Sort",
    timeComplexity: "O(n log n)",
    func: quickSort,
    description:
      "A simple comparison-based sorting algorithm. It works by repeatedly swapping adjacent elements if they are in the wrong order.",
    slug: "quick-sort",
  },
];
