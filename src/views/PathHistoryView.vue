//This is where the Path History page will be, it successfully redirects to the dashboard page
<script>

export default {
  name: "PathHistoryView",
  methods: {
    /* This function allows users to return to dashboard */
    goToDashboard() {
      this.$router.push({ name: 'dashboard' });
    },

  },
}
</script>

<template>
  <h1>Path History</h1>
  <div>
    <button @click="goToDashboard()">Go To Dashboard</button>
  </div>
</template>