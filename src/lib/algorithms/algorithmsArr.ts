//arr storing algorithm title, function, and description
//only has bubbleSort for now
import {
  bubbleSort,
  heapSort,
  insertionSort,
  mergeSort,
  quickSort,
  selectionSort,
} from "./algorithms";
import {
  bubbleSortC,
  insertionSortC,
  quickSortC,
  mergeSortC,
  heapSortC,
  selectionSortC,
} from "./compareAlgos";
import type { Algorithm } from "$lib/types";
export const algorithmsArr: Algorithm[] = [
  {
    title: "Bubble Sort",
    func: bubbleSort,
    comparisonFunc: bubbleSortC,
    timeComplexity: "O(n^2)",
    description:
      "Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly compares adjacent elements and swaps them if they are in the wrong order. Simple for small datasets, but inefficient for large ones.",
    slug: "bubble-sort",
    algoType: "comparison",
    selected: true,
  },
  {
    title: "Insertion Sort",
    timeComplexity: "O(n^2)",
    func: insertionSort,
    comparisonFunc: insertionSortC,
    description:
      "Insertion Sort is a simple comparison-based sorting algorithm. It builds the final sorted array one item at a time by repeatedly inserting a selected element into the correct position. Simple for small datasets or nearly sorted datasets, but inefficient for large ones.",
    slug: "insertion-sort",
    algoType: "comparison",
    selected: false,
  },
  {
    title: "Quick Sort",
    timeComplexity: "O(n log n)",
    func: quickSort,
    comparisonFunc: quickSortC,
    description:
      "Quick Sort is a divide-and-conquer sorting algorithm. It picks an element as a pivot and partitions the array around the pivot, recursively sorting the sub-arrays.",
    slug: "quick-sort",
    algoType: "divide-and-conquer",
    selected: false,
  },
  {
    title: "Merge Sort",
    timeComplexity: "O(n log n)",
    func: mergeSort,
    comparisonFunc: mergeSortC,
    description:
      "Merge Sort is a divide-and-conquer sorting algorithm. It divides the array into halves, recursively sorts each half, and then merges the sorted halves back together.",
    slug: "merge-sort",
    algoType: "divide-and-conquer",
    selected: false,
  },
  {
    title: "Selection Sort",
    timeComplexity: "O(n^2)",
    func: selectionSort,
    comparisonFunc: selectionSortC,
    description:
      "Selection Sort is a simple comparison-based sorting algorithm. It repeatedly finds the minimum element from the unsorted part of the array and places it at the beginning of the sorted part.",
    slug: "selection-sort",
    algoType: "comparison",
    selected: false,
  },
  {
    title: "Heap Sort",
    timeComplexity: "O(n log n)",
    func: heapSort,
    comparisonFunc: heapSortC,
    description:
      "Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It builds a max-heap from the input array, repeatedly extracts the maximum element from the heap, and places it at the end of the sorted array.",
    slug: "heap-sort",
    algoType: "comparison",
    selected: false,
  },
];
