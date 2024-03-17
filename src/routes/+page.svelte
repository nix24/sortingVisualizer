<script lang="ts">
  import { algorithmsArr } from "$lib/algorithms/algorithmsArr";
</script>

<main class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-lgd space-y-10">
      <!-- Header with a catchy title -->
      <h1 class="text-5xl font-bold text-primary">
        Sorting Algorithm Visualizer
      </h1>

      <!-- Description paragraph -->
      <p class="">
        Explore the fascinating world of sorting algorithms. Watch how different
        algorithms like Quick Sort, Merge Sort, and Bubble Sort tackle data
        sorting in real-time. An interactive way to learn and understand the
        efficiency and logic behind each algorithm.
      </p>

      <!-- Interactive Elements -->
      <div class="">
        <a class="btn btn-primary" href={`/sorting/${algorithmsArr[0].slug}`}
          >Visualize Algorithms</a
        >
        <div class="py-4">
          <a href="/compare" class="btn btn-secondary mx-2">Compare Speeds </a>
        </div>
      </div>
    </div>
  </div>
</main>
