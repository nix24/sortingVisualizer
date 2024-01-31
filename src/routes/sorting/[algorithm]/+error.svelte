<script>
  import { page } from "$app/stores";
</script>

<main class=" h-screen flex flex-col justify-center items-center">
  <div class="bg-base-300 p-8 rounded-lg shadow-lg">
    <h1 class="text-3xl text-error mb-4">Oops! Something Went Wrong</h1>
    <p class="text-lg text-warning">Error Code: {$page.status}</p>
    <p class="text-lg text-warning">{$page.error?.message}</p>
    <p class="text-warning mt-4">
      This page possibly doesn't exist. Please use the navigation to go to a
      valid page link.
    </p>
    <a
      href="/"
      class="mt-6 bg-error text-error-content hover:bg-error btn transition duration-300 ease-in-out transform hover:scale-105"
      >Go Back</a
    >
  </div>
</main>
