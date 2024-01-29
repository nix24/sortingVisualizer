<script lang="ts">
  import { bubbleSort } from "$lib/algorithms/bubbleSort";
  import { scaleBarHeight } from "$lib/utility/scaleHeight";
  import { flip } from "svelte/animate"; // Import flip transition
  import { writable } from "svelte/store";

  let uidCounter = 0;
  let arr = writable(
    Array.from({ length: 10 }, () => {
      return { id: uidCounter++, num: Math.floor(Math.random() * 100) };
    })
  );

  function randomize() {
    arr.update((items) => {
      items.forEach((item) => {
        item.num = Math.floor(Math.random() * 100);
      });
      return items;
    });
  }
  //randomize array
  randomize();

  async function sort() {
    await bubbleSort(arr);
  }
</script>

<main>
  <div class="mt-20 mx-auto flex flex-col items-center justify-center">
    <ul
      class="flex row-auto space-x-5 text-xl w-full justify-center items-end"
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
    <div class="flex flex-row space-x-5">
      <button
        class="btn btn-ghost"
        on:click={() => {
          sort();
        }}
      >
        Click to sort
      </button>
      <button
        class="btn btn-ghost"
        on:click={() => {
          randomize();
        }}
      >
        Click to randomize
      </button>
    </div>
  </div>
</main>
