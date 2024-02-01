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
      "Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly compares adjacent elements and swaps them if they are in the wrong order.",
    slug: "bubble-sort",
  },
  {
    title: "Insertion Sort",
    timeComplexity: "O(n^2)",
    func: insertionSort,
    description:
      "Insertion Sort is a simple comparison-based sorting algorithm. It builds the final sorted array one item at a time by repeatedly inserting a selected element into the correct position.",
    slug: "insertion-sort",
  },
  {
    title: "Quick Sort",
    timeComplexity: "O(n log n)",
    func: quickSort,
    description:
      "Quick Sort is a divide-and-conquer sorting algorithm. It picks an element as a pivot and partitions the array around the pivot, recursively sorting the sub-arrays.",
    slug: "quick-sort",
  },
];
