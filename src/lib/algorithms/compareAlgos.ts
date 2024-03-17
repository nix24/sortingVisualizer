import { type Writable } from "svelte/store";
import { type ArrayElement } from "../types";

// ------------------------------
// Bubble Sort Algorithm
/**
 * Sorts an array of ArrayElement objects using the bubble sort algorithm.
 *
 * @param arr - The arr containing the array to be sorted.
 * @returns arr param sorted
 */
export const bubbleSortC = (arr: number[]): number[] => {
  let isSorted = false;
  let counter = 0;
  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < arr.length - 1 - counter; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(i, i + 1, arr);
        isSorted = false;
      }
    }
    counter++;
  }
  return arr;
};

/**
 * Swaps two elements in an array.
 *
 * @param i - The index of the first element to swap.
 * @param j - The index of the second element to swap.
 * @param arr - The array containing the elements to swap.
 */
const swap = (i: number, j: number, arr: number[]) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

// ------------------------------
//Insertion Sort Algorithm
/**
 * Sorts an array using the insertion sort algorithm.
 *
 * @param arr - The array to be sorted.
 */
export const insertionSortC = (arr: number[]): number[] => {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j] < arr[j - 1]) {
      swap(j, j - 1, arr);
      j--;
    }
  }

  return arr;
};

// ------------------------------
// Quick Sort Algorithm
/**
 * Performs the Quick Sort algorithm on the given array.
 *
 * @param arr - The array to be sorted.
 */
export const quickSortC = (arr: number[]): number[] => {
  quickSortHelper(arr, 0, arr.length - 1);
  return arr;
};

const quickSortHelper = (arr: number[], start: number, end: number) => {
  if (start >= end) return;
  let pivot = start;
  let left = start + 1;
  let right = end;
  while (right >= left) {
    if (arr[left] > arr[pivot] && arr[right] < arr[pivot]) {
      swap(left, right, arr);
    }
    if (arr[left] <= arr[pivot]) left++;
    if (arr[right] >= arr[pivot]) right--;
  }
  swap(pivot, right, arr);
  const leftSubarrayIsSmaller = right - 1 - start < end - (right + 1);
  if (leftSubarrayIsSmaller) {
    quickSortHelper(arr, start, right - 1);
    quickSortHelper(arr, right + 1, end);
  } else {
    quickSortHelper(arr, right + 1, end);
    quickSortHelper(arr, start, right - 1);
  }
};
// ------------------------------
// Merge Sort Algorithm
/**
 * Performs merge sort on the given array.
 * @param arr - The arr containing the array to be sorted.
 * @returns A promise that resolves when the sorting is complete.
 */
export const mergeSortC = (arr: number[]): number[] => {
  //call the helper function to start the merge sort
  return mergeSortHelper(arr);
};

/**
 * Helper function that recursively sorts an array using the merge sort algorithm.
 * @param arr - The array to be sorted.
 */
const mergeSortHelper = (arr: number[]): number[] => {
  if (arr.length <= 1) return arr;
  const middleIdx = Math.floor(arr.length / 2);
  const leftHalf = arr.slice(0, middleIdx);
  const rightHalf = arr.slice(middleIdx);
  return mergeSortedArrays(
    mergeSortHelper(leftHalf),
    mergeSortHelper(rightHalf)
  );
};

/**
 * Merges two sorted arrays into a single sorted array.
 * @param left - The left sorted array.
 * @param right - The right sorted array.
 * @returns The merged sorted array.
 */
const mergeSortedArrays = (left: number[], right: number[]): number[] => {
  let i = 0;
  let j = 0;
  const sortedArray: number[] = [];
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      sortedArray.push(left[i++]);
    } else {
      sortedArray.push(right[j++]);
    }
  }
  while (i < left.length) sortedArray.push(left[i++]);
  while (j < right.length) sortedArray.push(right[j++]);
  return sortedArray;
};

// ------------------------------
export const selectionSortC = (arr: number[]): number[] => {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      swap(i, minIndex, arr);
    }
  }
  return arr;
};
export const heapSortC = (arr: number[]): number[] => {
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Extract elements from the heap one by one
  for (let i = n - 1; i > 0; i--) {
    swap(0, i, arr);
    heapify(arr, i, 0);
  }

  return arr;
};

const heapify = (arr: number[], n: number, i: number) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    swap(i, largest, arr);
    heapify(arr, n, largest);
  }
};
