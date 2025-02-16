<!--Displays home page. has 2 buttons, each going to a different page.-->
<template>
  <h2>DashboardView</h2>
  <button @click="goToLogin">Go to Login</button>
  <button @click="goToRegisterAccount">Register an Account</button>
</template>

<script>
export default {
  name: "DashboardView",
  methods: {
    goToLogin() {
      //sets router to change the current page to LoginView
      this.$router.push({ name: 'login' });
    },
    goToRegisterAccount() {
      //sets router to change the current page to RegisterView
      this.$router.push({ name: 'register' });
    },
  },
}
</script>