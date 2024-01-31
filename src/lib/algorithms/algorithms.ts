import { type Writable } from "svelte/store";
import { type ArrayElement } from "../types";

// ------------------------------
// Bubble Sort Algorithm
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
        await new Promise((resolve) => setTimeout(resolve, 500)); // Add delay
        isSorted = false;
      }
    }
    counter++;
  }

  unsubscribe(); // Unsubscribe when sorting is done
};

const swap = (i: number, j: number, arr: ArrayElement[]) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

// ------------------------------
//Insertion Sort Algorithm
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
      await new Promise((resolve) => setTimeout(resolve, 500)); // Add delay
      j--;
    }
  }

  unsubscribe(); // Unsubscribe when sorting is done
};

// ------------------------------
// Quick Sort Algorithm
export const quickSort = async (arrStore: Writable<ArrayElement[]>) => {
  let localArr: ArrayElement[] = [];
  const unsubscribe = arrStore.subscribe(($arr: ArrayElement[]) => {
    localArr = $arr;
  });

  quickSortHelper(localArr, 0, localArr.length - 1, arrStore);

  unsubscribe(); // Unsubscribe when sorting is done
};

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
      await new Promise((resolve) => setTimeout(resolve, 500)); // Add delay
    }
    if (arr[left].num <= arr[pivot].num) left++;
    if (arr[right].num >= arr[pivot].num) right--;
  }
  swap(pivot, right, arr);
  arrStore.set([...arr]); // Update the store to trigger reactivity
  await new Promise((resolve) => setTimeout(resolve, 500)); // Add delay
  const leftSubarrayIsSmaller = right - 1 - start < end - (right + 1);
  if (leftSubarrayIsSmaller) {
    quickSortHelper(arr, start, right - 1, arrStore);
    quickSortHelper(arr, right + 1, end, arrStore);
  } else {
    quickSortHelper(arr, right + 1, end, arrStore);
    quickSortHelper(arr, start, right - 1, arrStore);
  }
};
