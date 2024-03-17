<script lang="ts">
  import "../app.pcss";
  import { algorithmsArr } from "$lib/algorithms/algorithmsArr";
  import { groupAlgo } from "$lib/utility/groupAlgo";
  import type { PageData } from "./$types";
  import { fly } from "svelte/transition";

  export let data: PageData;
  let groupedAlgorithms = groupAlgo(algorithmsArr);

  // Define the action
  function closeDrawer(node: HTMLElement): { destroy(): void } {
    // Get all links within the drawer
    const links = node.querySelectorAll("a");

    // Add the event listener to each link
    links.forEach((link) => {
      link.addEventListener("click", () => {
        (document.getElementById("my-drawer-3") as HTMLInputElement).checked =
          false;
      });
    });

    // Cleanup function
    return {
      destroy() {
        // Remove the event listener from each link
        links.forEach((link) => {
          link.removeEventListener("click", () => {
            (
              document.getElementById("my-drawer-3") as HTMLInputElement
            ).checked = false;
          });
        });
      },
    };
  }
  //svelte action to close dropdown when user clicks elsewhere
  function closeDropdown(node: HTMLElement): { destroy(): void } {
    const handler = (event: MouseEvent) => {
      if (!node.contains(event.target as Node)) {
        node.removeAttribute("open");
      }
    };

    document.addEventListener("click", handler);

    return {
      destroy() {
        document.removeEventListener("click", handler);
      },
    };
  }
</script>

<nav class="drawer" use:closeDrawer>
  <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="w-full navbar bg-base-300">
      <div class="flex-none lg:hidden">
        <label
          for="my-drawer-3"
          aria-label="open sidebar"
          class="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-6 h-6 stroke-current"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path></svg
          >
        </label>
      </div>
      <a href="/" class="flex-1 px-2 mx-2 font-bold">AlgoVis 2.0</a>
      <div class="flex-none hidden lg:block">
        <ul class="menu menu-horizontal">
          <!-- Navbar menu content here -->
          {#each algorithmsArr as algorithm}
            <li>
              <a href={`/sorting/${algorithm.slug}`}>{algorithm.title}</a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
    <!-- Page content here -->
    {#key data.url}
      <div
        in:fly={{ y: -200, duration: 400, delay: 400 }}
        out:fly={{ y: 200, duration: 400 }}
        class="overflow-x-hidden"
      >
        <slot />
      </div>
    {/key}
  </div>
  <div class="drawer-side">
    <label for="my-drawer-3" class="drawer-overlay" aria-label="Close sidebar"
    ></label>
    <ul class="menu p-4 w-80 min-h-full bg-base-200 overflow-y-auto">
      <!-- Sidebar Title -->
      <li class="text-primary mb-4">
        <a href="/" class="text-lg font-bold">Sorting Algorithms</a>
      </li>

      <!-- Sidebar Items: Improved format with hover and focus states -->
      <!-- {#each algorithmsArr as algorithm}
        <li class="rounded-lg">
          <a
            href={`/sorting/${algorithm.slug}`}
            class="items-center p-2 transition-colors duration-200 relative block text-secondary hover:bg-primary hover:text-white focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
          >
            <span class="ml-3">{algorithm.title}</span>
          </a>
        </li>
      {/each} -->
      {#each Object.keys(groupedAlgorithms) as algoType}
        <li>
          <details class="dropdown" use:closeDropdown>
            <summary class="btn m-1">{algoType}</summary>
            <ul
              class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
            >
              {#each groupedAlgorithms[algoType] as algorithm}
                <li class="rounded-lg">
                  <a
                    class="items-center p-2 transition-colors duration-200 relative block text-secondary hover:bg-primary hover:text-primary-content focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50"
                    href={`/sorting/${algorithm.slug}`}>{algorithm.title}</a
                  >
                </li>
              {/each}
            </ul>
          </details>
        </li>
      {/each}
      <hr class="my-4 border-base-300" />
      <!-- Additional Links or Info -->
      <li class="mt-4 pt-4 border-base-300">
        <a
          href="/about"
          class="items-center p-2 transition-colors duration-200 relative block text-accent hover:bg-secondary hover:text-white focus:outline-none focus:ring focus:ring-secondary focus:ring-opacity-50"
        >
          <span class="ml-3">About Visualizer</span>
        </a>
      </li>
    </ul>
  </div>
</nav>
