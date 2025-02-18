// About Page
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from "@/components/NavBar.vue";

const router = useRouter()
const route = useRoute()

const search = computed({
  get() {
    return route.query.search ?? ''
  },
  set(search) {
    router.replace({ query: { search } })
  }
})
</script>

<!--we will import the navbar for every page and add anything that is unique to the about page-->
<template>
  <NavBar/>
  <h3 class = 'mt-4'>Under Construction!!! </h3>
  <label>
    Search: <input v-model.trim="search" maxlength="20">
  </label>
</template>