<script>
export default {
  name: "LandingView",
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
  <button @click="goToLogin">Go to Login</button>
  <button @click="goToRegisterAccount">Register an Account</button>

</template>

