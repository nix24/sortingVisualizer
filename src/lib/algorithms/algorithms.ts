import { type Writable } from "svelte/store";
import { type ArrayElement } from "../types";

// ------------------------------
// Bubble Sort Algorithm
/**
 * Sorts an array of ArrayElement objects using the bubble sort algorithm.
 *
 * @param arrStore - The writable store containing the array to be sorted.
 * @returns A Promise that resolves when the sorting is complete.
 */
export const bubbleSort = async (arrStore: Writable<ArrayElement[]>) => {
  let localArr: ArrayElement[] = [];
  const unsubscribe = arrStore.subscribe(($arr: ArrayElement[]) => {
    localArr = $arr;
  });

  let isSorted = false;
  let counter = 0;
  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < localArr.length - 1 - counter; i++) {
      if (localArr[i].num > localArr[i + 1].num) {
        swap(i, i + 1, localArr);
        arrStore.set([...localArr]); // Update the store to trigger reactivity
        await new Promise((resolve) => setTimeout(resolve, 300)); // Add delay
        isSorted = false;
      }
    }
    counter++;
  }

  unsubscribe(); // Unsubscribe when sorting is done
};

/**
 * Swaps two elements in an array.
 *
 * @param i - The index of the first element to swap.
 * @param j - The index of the second element to swap.
 * @param arr - The array containing the elements to swap.
 */
const swap = (i: number, j: number, arr: ArrayElement[]) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

// ------------------------------
//Insertion Sort Algorithm
/**
 * Sorts an array using the insertion sort algorithm.
 *
 * @param arrStore - The writable store containing the array to be sorted.
 */
export const insertionSort = async (arrStore: Writable<ArrayElement[]>) => {
  let localArr: ArrayElement[] = [];
  const unsubscribe = arrStore.subscribe(($arr: ArrayElement[]) => {
    localArr = $arr;
  });

  for (let i = 1; i < localArr.length; i++) {
    let j = i;
    while (j > 0 && localArr[j].num < localArr[j - 1].num) {
      swap(j, j - 1, localArr);
      arrStore.set([...localArr]); // Update the store to trigger reactivity
      await new Promise((resolve) => setTimeout(resolve, 300)); // Add delay
      j--;
    }
  }

  unsubscribe(); // Unsubscribe when sorting is done
};

// ------------------------------
// Quick Sort Algorithm
/**
 * Performs the Quick Sort algorithm on the given array.
 *
 * @param arrStore - The writable store containing the array to be sorted.
 */
export const quickSort = async (arrStore: Writable<ArrayElement[]>) => {
  let localArr: ArrayElement[] = [];
  const unsubscribe = arrStore.subscribe(($arr: ArrayElement[]) => {
    localArr = $arr;
  });

  quickSortHelper(localArr, 0, localArr.length - 1, arrStore);

  unsubscribe(); // Unsubscribe when sorting is done
};

/**
 * Helper function that recursively sorts an array using the quick sort algorithm.
 * @param arr - The array to be sorted.
 * @param start - The starting index of the subarray to be sorted.
 * @param end - The ending index of the subarray to be sorted.
 * @param arrStore - The writable store to update the sorted array.
 */
const quickSortHelper = async (
  arr: ArrayElement[],
  start: number,
  end: number,
  arrStore: Writable<ArrayElement[]>
) => {
  if (start >= end) return;
  let pivot = start;
  let left = start + 1;
  let right = end;
  while (right >= left) {
    if (arr[left].num > arr[pivot].num && arr[right].num < arr[pivot].num) {
      swap(left, right, arr);
      arrStore.set([...arr]); // Update the store to trigger reactivity
      await new Promise((resolve) => setTimeout(resolve, 300)); // Add delay
    }
    if (arr[left].num <= arr[pivot].num) left++;
    if (arr[right].num >= arr[pivot].num) right--;
  }
  swap(pivot, right, arr);
  arrStore.set([...arr]); // Update the store to trigger reactivity
  await new Promise((resolve) => setTimeout(resolve, 300)); // Add delay
  const leftSubarrayIsSmaller = right - 1 - start < end - (right + 1);
  if (leftSubarrayIsSmaller) {
    quickSortHelper(arr, start, right - 1, arrStore);
    quickSortHelper(arr, right + 1, end, arrStore);
  } else {
    quickSortHelper(arr, right + 1, end, arrStore);
    quickSortHelper(arr, start, right - 1, arrStore);
  }
};
// ------------------------------
// Merge Sort Algorithm
export const mergeSort = async (arrStore: Writable<ArrayElement[]>) => {
  let localArr: ArrayElement[] = [];
  const unsubscribe = arrStore.subscribe(($arr: ArrayElement[]) => {
    localArr = $arr;
  });

  await mergeSortHelper(localArr, 0, localArr.length - 1, arrStore);

  unsubscribe(); // Unsubscribe when sorting is done
};

const mergeSortHelper = async (
  arr: ArrayElement[],
  left: number,
  right: number,
  arrStore: Writable<ArrayElement[]>
) => {
  if (left >= right) return;
  const mid = left + Math.floor((right - left) / 2);
  await mergeSortHelper(arr, left, mid, arrStore);
  await mergeSortHelper(arr, mid + 1, right, arrStore);
  await merge(arr, left, mid, right, arrStore);
};

const merge = async (
  arr: ArrayElement[],
  left: number,
  mid: number,
  right: number,
  arrStore: Writable<ArrayElement[]>
) => {
  const n1 = mid - left + 1;
  const n2 = right - mid;
  const L: ArrayElement[] = [];
  const R: ArrayElement[] = [];
  for (let i = 0; i < n1; i++) L.push(arr[left + i]);
  for (let j = 0; j < n2; j++) R.push(arr[mid + 1 + j]);
  let i = 0,
    j = 0,
    k = left;
  while (i < n1 && j < n2) {
    if (L[i].num <= R[j].num) {
      arr[k] = { ...L[i], id: arr[k].id }; // Assign the existing id to the merged element
      i++;
    } else {
      arr[k] = { ...R[j], id: arr[k].id }; // Assign the existing id to the merged element
      j++;
    }
    k++;
    arrStore.set([...arr]); // Update the store to trigger reactivity
    await new Promise((resolve) => setTimeout(resolve, 300)); // Add delay
  }
  while (i < n1) {
    arr[k] = { ...L[i], id: arr[k].id }; // Assign the existing id to the merged element
    i++;
    k++;
    arrStore.set([...arr]); // Update the store to trigger reactivity
    await new Promise((resolve) => setTimeout(resolve, 300)); // Add delay
  }
  while (j < n2) {
    arr[k] = { ...R[j], id: arr[k].id }; // Assign the existing id to the merged element
    j++;
    k++;
    arrStore.set([...arr]); // Update the store to trigger reactivity
    await new Promise((resolve) => setTimeout(resolve, 300)); // Add delay
  }
};
// ------------------------------
export const selectionSort = async (arrStore: Writable<ArrayElement[]>) => {
  let localArr: ArrayElement[] = [];
  const unsubscribe = arrStore.subscribe(($arr: ArrayElement[]) => {
    localArr = $arr;
  });

  const n = localArr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (localArr[j].num < localArr[minIndex].num) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      swap(i, minIndex, localArr);
      arrStore.set([...localArr]); // Update the store to trigger reactivity
      await new Promise((resolve) => setTimeout(resolve, 300)); // Add delay
    }
  }

  unsubscribe(); // Unsubscribe when sorting is done
};
export const heapSort = async (arrStore: Writable<ArrayElement[]>) => {
  let localArr: ArrayElement[] = [];
  const unsubscribe = arrStore.subscribe(($arr: ArrayElement[]) => {
    localArr = $arr;
  });

  const n = localArr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(localArr, n, i, arrStore);
  }

  // Extract elements from the heap one by one
  for (let i = n - 1; i > 0; i--) {
    swap(0, i, localArr);
    arrStore.set([...localArr]); // Update the store to trigger reactivity
    await new Promise((resolve) => setTimeout(resolve, 300)); // Add delay
    await heapify(localArr, i, 0, arrStore);
  }

  unsubscribe(); // Unsubscribe when sorting is done
};

const heapify = async (
  arr: ArrayElement[],
  n: number,
  i: number,
  arrStore: Writable<ArrayElement[]>
) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left].num > arr[largest].num) {
    largest = left;
  }

  if (right < n && arr[right].num > arr[largest].num) {
    largest = right;
  }

  if (largest !== i) {
    swap(i, largest, arr);
    arrStore.set([...arr]); // Update the store to trigger reactivity
    await new Promise((resolve) => setTimeout(resolve, 300)); // Add delay
    await heapify(arr, n, largest, arrStore);
  }
};
