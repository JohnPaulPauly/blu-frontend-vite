<script>

export default {
  name: "UserVerificationView",
  methods: {
    goToLogin() {
      this.$router.push({ name: 'login' });
    },

  },
}
</script>

<template>
  <h1>User Verification Page</h1>
  <div>
    <button @click="goToLogin()">Return to Login</button>
  </div>
</template>