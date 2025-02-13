<script>

export default {
  name: "PathHistoryView",
  methods: {
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