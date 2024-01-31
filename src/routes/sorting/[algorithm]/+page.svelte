<script lang="ts">
  import type { PageData } from "./$types";
  import { scaleBarHeight } from "$lib/utility/scaleHeight";
  import { flip } from "svelte/animate"; // Import flip transition
  import { writable } from "svelte/store";

  export let data: PageData;

  let uidCounter = 0;
  let arr = writable(
    Array.from({ length: 10 }, () => {
      return { id: uidCounter++, num: Math.floor(Math.random() * 100) };
    })
  );

  function randomize() {
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
    await data.algorithm.func(arr);
  }
</script>

<main>
  <h1>{data.algorithm.title}</h1>
  <p>{data.algorithm.description}</p>
  <div class="mt-20 mx-auto flex flex-col items-center justify-center">
    <ul
      class="flex row-auto space-x-5 text-xl w-full justify-center items-end px-10"
      style="height: 500px"
    >
      {#each $arr as item (item.id)}
        <li
          class="bg-primary font-extrabold text-white text-center align-bottom duration-500 w-20"
          style="height: {scaleBarHeight(item.num)}px"
          animate:flip={{ duration: 500 }}
        >
          {item.num}
        </li>
      {/each}
    </ul>
    <hr class="w-full my-5" />
    <div class="fixed bottom-0 right-0 flex flex-row space-x-5 p-5">
      <button
        class="btn btn-secondary btn-sm"
        on:click={() => {
          sort();
        }}
      >
        Sort
      </button>
      <button
        class="btn btn-accent btn-sm"
        on:click={() => {
          randomize();
        }}
      >
        Randomize
      </button>
    </div>
  </div>
</main>
