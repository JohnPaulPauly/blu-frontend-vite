<script>

export default {
  name: "VerificationConfirmedView",
  methods: {
    goToLogin() {
      this.$router.push({ name: 'login' });
    },
  },
  }
</script>

<template>
  <div class="header"></div>
  <p class="confirmed-verification">Thank you for verifying your account!<br>Your account has been created and verified successfully.<br>Welcome to BLU!</p>
  <p class="plaintext">Click the button below to be redirected to our login page and to access your new BLU account!</p>
  <div class="button-center">
    <button @click='goToLogin()' class="loginbutton btn">Return to Login </button></div>


</template>

<style scoped>

.header {
  display: flex;
  align-items: flex-end;
  width: 1500px;
  height: 50px;
  background-color: #2528CE;
  margin: 0 auto;
}
.button-center{
  display: flex;
  justify-content: center
}
.confirmed-verification {
  font-size: 35px
}

.loginbutton {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 45px;
  margin-top: 45px;
  background-color: #3659F5
}
.btn {
  color: white;
  padding: 20px 30px;
  border: none;
  border-radius: 10px;
  font-size: 40px;
  font-family: Avenir;
  cursor: pointer;
  width: 473px;
  height: 114px;
}

.plaintext{
  color: #757575
}
</style>
