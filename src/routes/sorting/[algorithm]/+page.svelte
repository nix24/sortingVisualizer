<script lang="ts">
  import type { PageData } from "./$types";
  import { scaleBarHeight } from "$lib/utility/scaleHeight";
  import { flip } from "svelte/animate"; // Import flip transition
  import { writable } from "svelte/store";
  import { onMount } from "svelte";

  export let data: PageData;

  let uidCounter = 0;
  let isSorting = false;
  let inputValues = Array(10).fill(""); // This will hold the user inputs
  let dialog: HTMLElement | null;
  onMount(() => {
    dialog = document.getElementById("modal");
  });

  let arr = writable(
    Array.from({ length: 10 }, () => {
      return { id: uidCounter++, num: Math.floor(Math.random() * 150) };
    })
  );

  function randomize() {
    if (isSorting) return;
    arr.update((items) => {
      items.forEach((item) => {
        item.num = Math.floor(Math.random() * 150);
      });
      return items;
    });
  }
  //randomize array
  randomize();

  async function sort() {
    isSorting = true;
    await data.algorithm.func(arr);
    //wait for sorting to finish
    isSorting = false;
  }

  function updateValues() {
    //if all numbers are 1, show error toast
    const valueChecker = inputValues.map((num, index) => {
      // Parse the input as an integer, and use 1 if the parse fails.
      const parsedNum = parseInt(num) || 1;
      return { id: index, num: parsedNum };
    });

    if (valueChecker.every((item) => item.num === 1)) {
      showToastError();
      randomize();
      return;
    } else {
      showToastSuccess();
    }
    arr.set(
      valueChecker.map((item) => {
        return { id: uidCounter++, num: item.num };
      })
    );
    //close the modal
    closeModal();
  }

  const openModal = () => (dialog as HTMLDialogElement)?.showModal();
  const closeModal = () => (dialog as HTMLDialogElement)?.close();

  //adding functions for success toast & error toast
  //error occurs when all numbers are 1
  function showToastSuccess() {
    const toast = document.querySelector("#successToast");
    toast?.classList.add("active");
    toast?.classList.remove("hidden");
    setTimeout(() => {
      toast?.classList.remove("active");
      toast?.classList.add("hidden");
    }, 3000);
  }
  function showToastError() {
    const toast = document.querySelector("#errorToast");
    toast?.classList.add("active");
    toast?.classList.remove("hidden");
    setTimeout(() => {
      toast?.classList.remove("active");
      toast?.classList.add("hidden");
    }, 3000);
  }
</script>

<main class="container mx-auto px-4 md:px-6 lg:px-8">
  <div class="my-10">
    <h1 class="text-3xl md:text-4xl font-bold my-4">{data.algorithm.title}</h1>
    <p class="text-xl text-secondary font-semibold">
      {data.algorithm.timeComplexity}
    </p>
    <p class="text-md md:text-lg leading-relaxed mt-2">
      {data.algorithm.description}
    </p>
  </div>
  <div class="flex flex-col items-center justify-center">
    <ul
      class=" mt-52 lg:space-x-16 md:space-x-8 sm:space-x-4 space-x-1 flex text-xl justify-center items-end"
      style="height: 500px"
    >
      {#each $arr as item (item.id)}
        <li
          class="bg-primary font-bold text-center align-bottom w-8 sm:w-10 lg:py-1"
          style="height: {scaleBarHeight(item.num)}px"
          animate:flip={{ duration: 500 }}
        >
          {item.num}
        </li>
      {/each}
    </ul>
    <hr class="w-full my-5" />
    <div
      class=" flex flex-row space-x-5 p-5 bg-base-200 bg-opacity-90 rounded-tl-lg"
    >
      <button
        class="btn btn-secondary btn-sm"
        id="sortBtn"
        on:click={sort}
        disabled={isSorting}
      >
        Sort
      </button>
      <button
        class="btn btn-accent btn-sm"
        id="randomizeBtn"
        on:click={randomize}
        disabled={isSorting}
      >
        Randomize
      </button>
      <!-- Open the modal using ID.showModal() method -->
      <button class="btn btn-sm" on:click={openModal}
        >Enter custom numbers</button
      >
      <dialog id="modal" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="font-bold text-lg">Enter 10 Numbers</h3>
          <form on:submit|preventDefault={updateValues}>
            <div class="grid grid-cols-2 gap-4 py-4">
              {#each inputValues as value, index (index)}
                <input
                  type="number"
                  bind:value={inputValues[index]}
                  class="input input-bordered w-full max-w-xs"
                  placeholder={`Number ${index + 1}`}
                  max="150"
                />
              {/each}
            </div>
            <div class="modal-action">
              <button type="button" on:click={closeModal} class="btn"
                >Cancel</button
              >
              <button type="submit" class="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>

    <!--toast notifications-->
    <div class="toast toast-top toast-end hidden" id="successToast">
      <div class="alert alert-success">
        <span class="font-semibold">Arr updated sucessfully.</span>
      </div>
    </div>
    <div class="toast toast-top toast-end hidden" id="errorToast">
      <div class="alert alert-error">
        <span class="font-semibold"
          >All numbers left blank, randomizing Arr instead.</span
        >
      </div>
    </div>
  </div>
</main>
