<script>

export default {
  name: "UserVerificationView",
  methods: {

  },
}
</script>

<template>
  <img class="blu-logo" src="../assets/BLUPotentialLogo.png" alt="BLU logo" />
  <div class="header"></div>
  <img class="mail" src="../assets/mail.png" alt="Email Logo">
  <p class="heading-verification">Thank you for registering!<br>Verify Your Email:</p>
  <p class="plaintext">Please check your email inbox for a verification email to confirm your identity. Once you have <br>verified, follow the instructions on the page displayed in the link contained the email we sent.</p>


</template>

<style>

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

.mail{
  width: 150px;
  height: 150px;
  margin: 0 auto;
}

.heading-verification{
  font-size: 35px
}

.plaintext{
  color: #757575
}
</style>
