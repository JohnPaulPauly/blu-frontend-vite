<!--Page for pairing devices. WIP -->
<template>
  <h1>Pair New Device</h1>
  <div>
    <button @click="goToDashboard()">Go To Dashboard</button>
  </div>
</template>

<script>

export default {
  name: "PairDeviceView",
  methods: {
    goToDashboard() {
      this.$router.push({ name: 'dashboard' });
    },

  },
}
</script>