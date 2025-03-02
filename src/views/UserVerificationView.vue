// This page prompts users to check their email inbox for a verification link
<script>

export default {
  name: "UserVerificationView",
}
</script>

<template>
  <div class="header"></div> // Divider that is found at the top of the page
  <img class="mail" src="../assets/mail.png" alt="Email Logo">
  <p class="heading-verification">Thank you for registering!<br>Verify Your Email:</p>
  <p class="plaintext">Please check your email inbox for a verification email to confirm your identity. Once you have <br>verified,
    follow the instructions on the page displayed in the link contained the email we sent.</p>
</template>
<style>
/* Styling for the divider at the top of the screen */
.header {
  display: flex;
  align-items: flex-end;
  width: 1500px;
  height: 50px;
  background-color: #2528CE;
  margin: 0 auto;
}
/* Sizes email icon*/
.mail{
  width: 150px;
  height: 150px;
  margin: 0 auto;
}
/* Styling for the headings of the page */
.heading-verification{
  font-size: 35px
}
/* Styling for any plain text found on the page */
.plaintext{
  color: #757575
}
</style>
