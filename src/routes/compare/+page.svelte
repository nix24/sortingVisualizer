<script lang="ts">
  import { groupAlgo } from "$lib/utility/groupAlgo";
  import { algorithmsArr } from "$lib/algorithms/algorithmsArr";
  import type { Algorithm } from "$lib/types";
  //import iconify
  import Icon from "@iconify/svelte";

  let selectedAlgos: Algorithm[] = [];
  let isSorting = false;

  let elementCount = 5000;

  let arr1: number[] = [];
  let arr2: number[] = [];

  let arr1Time = 0;
  let arr2Time = 0;

  let arr1IsSorted = false;
  let arr2IsSorted = false;

  $: groupedAlgos = groupAlgo(algorithmsArr);
  $: canStart = selectedAlgos.length === 2;

  function toggleSelection(algo: Algorithm) {
    if (selectedAlgos.includes(algo)) {
      selectedAlgos = selectedAlgos.filter((a) => a !== algo);
    } else if (selectedAlgos.length < 2) {
      selectedAlgos = [...selectedAlgos, algo];
    } else {
      // If two algorithms are already selected, remove the first one and add the new one
      selectedAlgos = [selectedAlgos[1], algo];
    }
  }
  async function startComparison(): Promise<void> {
    console.log("starting comparison");
    if (selectedAlgos.length !== 2) {
      console.log("Please select exactly two algorithms.");
      return;
    }
    isSorting = true;
    arr1IsSorted = false;
    arr2IsSorted = false;
    arr1Time = 0;
    arr2Time = 0;

    console.log("generated random arrays");
    arr1 = generateRandomArray(elementCount);
    arr2 = [...arr1];

    console.log("called sortArray for the first algorithm");
    arr1Time = await sortArray(selectedAlgos[0], arr1);
    console.log(
      `${selectedAlgos[0].title} finished in ${arr1Time.toFixed(2)}ms`
    );
    arr1IsSorted = true;

    console.log("called sortArray for the second algorithm");
    arr2Time = await sortArray(selectedAlgos[1], arr2);
    console.log(
      `${selectedAlgos[1].title} finished in ${arr2Time.toFixed(2)}ms`
    );
    arr2IsSorted = true;

    isSorting = false;
    console.log("finished comparison");
  }
  async function sortArray(algo: Algorithm, arr: number[]): Promise<number> {
    const start = performance.now();
    await algo.comparisonFunc([...arr]);
    const end = performance.now();
    return end - start;
  }
  function generateRandomArray(count: number): number[] {
    return Array.from({ length: count }, () =>
      Math.floor(Math.random() * 1000)
    );
  }
</script>

<main class="container mx-auto px-4 md:px-6 lg:px-8 py-8 relative">
  <!-- Dimmed screen overlay -->
  <div
    class={isSorting
      ? "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      : "hidden"}
  >
    <div
      class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"
    ></div>
  </div>

  <h1 class="text-4xl font-bold mb-8 animated fadeInDown">
    Algorithms Sorting Race
  </h1>

  <div class="flex flex-col md:flex-row items-center mb-8 animated fadeInLeft">
    <label for="elementCount" class="mr-4 text-lg font-semibold"
      >Number of Elements:</label
    >
    <select
      class="select select-bordered select-primary w-full max-w-xs"
      name="elementCount"
      id="elementCount"
      bind:value={elementCount}
    >
      <option value={5000}>5,000</option>
      <option value={50000}>10,000</option>
      <option value={100000}>50,000</option>
    </select>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
    {#each Object.entries(groupedAlgos) as [groupName, algos]}
      <div class="bg-base-200 rounded-lg shadow-md p-6 animated fadeInUp">
        <h3 class="text-2xl font-bold mb-4">{groupName}</h3>
        <ul class="menu bg-base-100 rounded-box">
          {#each algos as algo}
            <li>
              <label class="label cursor-pointer">
                <input
                  class="checkbox checkbox-secondary mr-4"
                  type="checkbox"
                  checked={selectedAlgos.includes(algo)}
                  on:change={() => toggleSelection(algo)}
                  disabled={isSorting}
                />
                <span class="label-text">{algo.title}</span>
              </label>
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>

  <button
    class="btn btn-primary btn-lg mb-8 animated pulse"
    on:click={startComparison}
    disabled={!canStart || isSorting}
  >
    <Icon icon="akar-icons:play" class="w-6 h-6 mr-2" />
    Start Comparison
  </button>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    {#if selectedAlgos[0]}
      <div class="bg-base-200 rounded-lg shadow-md p-6 animated fadeInLeft">
        <h3 class="text-2xl font-bold mb-4">{selectedAlgos[0].title}</h3>
        <p class="text-lg mb-2">Time elapsed: {arr1Time.toFixed(2)}ms</p>
        <p class="text-lg mb-2">
          Status: {arr1IsSorted ? "Finished!" : "Idle..."}
        </p>
        <p
          class="text-xl font-bold {arr1Time < arr2Time
            ? 'text-success animated bounceIn'
            : 'text-warning animated bounceIn'}"
        >
          {arr1Time < arr2Time ? "1st" : "2nd"}
        </p>
      </div>
    {/if}
    {#if selectedAlgos[1]}
      <div class="bg-base-200 rounded-lg shadow-md p-6 animated fadeInRight">
        <h3 class="text-2xl font-bold mb-4">{selectedAlgos[1].title}</h3>
        <p class="text-lg mb-2">Time elapsed: {arr2Time.toFixed(2)}ms</p>
        <p class="text-lg mb-2">
          Status: {arr2IsSorted ? "Finished!" : "Idle..."}
        </p>
        <p
          class="text-xl font-bold {arr2Time < arr1Time
            ? 'text-success animated bounceIn'
            : 'text-warning animated bounceIn'}"
        >
          {arr2Time < arr1Time ? "1st" : "2nd"}
        </p>
      </div>
    {/if}
  </div>
</main>
