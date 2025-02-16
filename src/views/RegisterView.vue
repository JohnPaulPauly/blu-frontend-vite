<!--Page to register a new account.-->
<!--when account info is inputted successfully, an email will be sent to verify the account. WIP-->

<template>
  <h1>Register a new Account!</h1>
  <form name="register-form" >
<!--Full name-->
    <div class="mb-3">
      <label for="fullName">Full Name: </label>
      <input id="fullName" type="text" v-model="input.fullName"/>
    </div>
<!--email-->
    <div class="mb-3">
      <label for="email">Email: </label>
      <input id="email" type="text" v-model="input.email"/>
    </div>
<!--password-->
    <div class="mb-3">
      <label for="password">Password: </label>
      <input id="password" type="password" v-model="input.password"/>
    </div>
<!--    checks for conditions in register()-->
    <button class="btn btn-outline-dark" type="submit" v-on:click.prevent = "register()">
      Login
    </button>
  </form>
</template>

<style scoped>

</style>

<script>
import axios from 'axios';

export default {
  name: 'RegisterView',
  data() {
    return {
      input: {
        fullName: "",
        email: "",
        password: ""
      },
      output: "",
    }
  },
  methods: {
    register(){
      //registers new account with inputted information. sends email verification.

      //are email and password empty?
      if (this.input.email !== "" || this.input.password !== "") {
        // this.output = "Authentication complete"
        // stores true to the set_authentication and username to the set_username
        // this.$store.commit(`auth/${SET_AUTHENTICATION}`, true);
        // this.$store.commit(`auth/${SET_USERNAME}`, this.input.username
        console.log(this.input);

        //post data to backend
        axios.post("http://localhost:8080/auth/signup", this.input)
            .then(res => {
              this.output = "Registration complete."
              this.output = res.data.message;
              this.$router.push()
            })
            .catch(error => {
              if (error.response && error.response.status === 409) {
                this.output = error.response.data;
              } else {
                this.output = "An error occurred. Please try again.";
              }
            })
      } else {
        // this.$store.commit(`auth/${SET_AUTHENTICATION}`, false);
        this.output = "Username and password can not be empty"
      }
    },
  },
}
</script>