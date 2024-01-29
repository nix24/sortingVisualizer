import { type Writable } from "svelte/store";
//importing ArrayElement from types.ts
import { type ArrayElement } from "../types";
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
