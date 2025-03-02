
//This is where the Map Queue page will be, it successfully redirects to the dashboard page
<script>

export default {
  name: "MapQueueView",
  methods: {
    /* This function allows users to return to dashboard */
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