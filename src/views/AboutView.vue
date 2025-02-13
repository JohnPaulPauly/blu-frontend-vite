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

<template>
  <NavBar/>
  <h3>About Page</h3>
  <label>
    Search: <input v-model.trim="search" maxlength="20">
  </label>
</template>