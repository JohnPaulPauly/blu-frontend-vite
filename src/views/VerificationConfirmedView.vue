<script>
import axios from "axios";
import {useRoute} from "vue-router";

export default {
  name: "VerificationConfirmedView",
  methods: {
    login() {
      this.$router.push({ path: "/login" });
    },
    verify() {
      console.log("http:/localhost:8080/auth/confirm/" + this.$route.params.token );
      axios.get("http://localhost:8080/auth/confirm/" + this.$route.params.token );
    }
  },
  created() {
    useRoute().params.token = this.$route.query.token;
    this.verify();
    console.log("Verification Confirmed View");
  }
}
</script>

<template>
  <div class="header"></div>
  <p class="confirmed-verification">Thank you for verifying your account!<br>Your account has been created and verified successfully.<br>Welcome to BLU!</p>
  <p class="plaintext">Click the button below to be redirected to our login page and to access your new BLU account!</p>
  <div class="button-center">
    <button class="loginbutton btn" v-on:click.prevent = "login()" >Return to Login </button></div>


</template>

<style scoped>

.blu-logo{
  width: 200px;
  height: 200px;
  margin: 0 auto;
}
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
  margin-top: 50px;
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
