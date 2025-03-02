//This is where the Pair Device page will be, it successfully redirects to the dashboard page
<script>

export default {
  name: "PairDeviceView",
  methods: {
    /* This function allows users to return to dashboard */
    goToDashboard() {
      this.$router.push({ name: 'dashboard' });
    },

  },
}
</script>

<template>
  <h1>Pair New Device</h1>
  <div>
    <button @click="goToDashboard()">Go To Dashboard</button>
  </div>
</template>