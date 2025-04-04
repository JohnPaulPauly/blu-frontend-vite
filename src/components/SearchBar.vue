<script setup>

</script>

<template>

  <form
      class="w-full max-w-sm mx-auto flex items-center border border-gray-300 rounded-md bg-white shadow-sm overflow-hidden mb-4"
      @submit.prevent
  >
    <!-- Search input box styling-->
    <input
        v-model="query"
        @input="debouncedSearch"
        type="search"
        id="default-search"
        class="flex-1 px-3 py-2 text-sm text-gray-900 focus:outline-none dark:bg-gray-700 dark:text-white"
        :placeholder="placeholder"
    />

    <!-- Submit Button as an Icon -->
    <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white p-2 h-full flex items-center justify-center rounded-none"
    >
      <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
      </svg>
    </button>
  </form>


</template>


<script>

export default{
  name: "SearchBar"
}
</script>