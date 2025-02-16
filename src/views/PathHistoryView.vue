<!--Page to view path history as table information. WIP-->
<template>
  <h1>Path History</h1>
  <div>
    <button @click="goToDashboard()">Go To Dashboard</button>
  </div>
</template>

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