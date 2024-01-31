<script lang="ts">
  import type { PageData } from "./$types";
  import { scaleBarHeight } from "$lib/utility/scaleHeight";
  import { flip } from "svelte/animate"; // Import flip transition
  import { writable } from "svelte/store";

  export let data: PageData;

  let uidCounter = 0;
  let isSorting = false;
  let arr = writable(
    Array.from({ length: 10 }, () => {
      return { id: uidCounter++, num: Math.floor(Math.random() * 100) };
    })
  );

  function randomize() {
    if (isSorting) return;
    arr.update((items) => {
      items.forEach((item) => {
        item.num = Math.floor(Math.random() * 120);
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
          class="bg-primary font-bold text-primary-content text-center align-bottom w-8 sm:w-10 lg:py-1"
          style="height: {scaleBarHeight(item.num)}px"
          animate:flip={{ duration: 500 }}
        >
          {item.num}
        </li>
      {/each}
    </ul>
    <hr class="w-full my-5" />
    <div
      class="fixed bottom-0 right-0 flex flex-row space-x-5 p-5 bg-base-200 bg-opacity-90 rounded-tl-lg"
    >
      <button
        class="btn btn-secondary btn-sm hover:bg-secondary-dark"
        id="sortBtn"
        on:click={sort}
        disabled={isSorting}
      >
        Sort
      </button>
      <button
        class="btn btn-accent btn-sm hover:bg-accent-dark"
        id="randomizeBtn"
        on:click={randomize}
        disabled={isSorting}
      >
        Randomize
      </button>
    </div>
  </div>
</main>
