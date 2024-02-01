<script lang="ts">
  import "../app.pcss";
  import { algorithmsArr } from "$lib/algorithms/algorithmsArr";
  import type { PageData } from "./$types";
  import { fly } from "svelte/transition";

  export let data: PageData;
  // Define the action
  function closeDrawer(node: HTMLElement) {
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
</script>

<div class="drawer" use:closeDrawer>
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
    <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"
    ></label>
    <ul class="menu p-4 w-80 min-h-full bg-base-200">
      {#each algorithmsArr as algorithm}
        <li><a href={`/sorting/${algorithm.slug}`}>{algorithm.title}</a></li>
      {/each}
    </ul>
  </div>
</div>
