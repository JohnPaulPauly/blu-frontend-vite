<script setup>
import {ref, watch} from 'vue'
import {debounce} from 'lodash.debounce'


//Props -- these are variables we can change in any parent page that we call SearchBar in to.
//Each one has name and type
const props = defineProps({
  data: Array,
  searchKeys: Array,
  placeholder: {
    type: String,
    default: 'Search...'
  }
})

//Emits are how we send filtered results to parent pages. The logic lives here but the reaction to the logic
// is completed by the parent page
const emits = defineEmits(['update:results'])

// Set the reactive state for the query and results
const query = ref('')
const results = ref([])

//Set up a safe way to get deep values from objects. Uses dot path strings


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