<script>
export default {
  name: "DashboardView",
  methods: {
    goToLogin() {
      this.$router.push({ name: 'login' });
    },
    goToRegisterAccount() {
      this.$router.push({ name: 'register' });
    },
  },
}
</script>

<template>
  <h2>DashboardView</h2>
  <button @click="goToLogin">Go to Login</button>
  <button @click="goToRegisterAccount">Register an Account</button>
</template>