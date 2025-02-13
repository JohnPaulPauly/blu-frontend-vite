<script>

export default {
  name: "MapQueueView",
  methods: {
    goToDashboard() {
      this.$router.push({ name: 'dashboard' });
    },
  },
}
</script>

<template>
  <h1>Map Queue</h1>
  <div>
    <button @click="goToDashboard()">Go To Dashboard</button>
  </div>
</template>