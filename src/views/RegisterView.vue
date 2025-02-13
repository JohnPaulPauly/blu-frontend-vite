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
      if (this.input.email !== "" || this.input.password !== "") {
        // this.output = "Authentication complete"
        // stores true to the set_authentication and username to the set_username
        // this.$store.commit(`auth/${SET_AUTHENTICATION}`, true);
        // this.$store.commit(`auth/${SET_USERNAME}`, this.input.username
        console.log(this.input);
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

<template>
  <h1>Register a new Account!</h1>
  <form name="register-form" >
    <div class="mb-3">
      <label for="fullName">Full Name: </label>
      <input id="fullName" type="text" v-model="input.fullName"/>
    </div>
    <div class="mb-3">
      <label for="email">Email: </label>
      <input id="email" type="text" v-model="input.email"/>
    </div>
    <div class="mb-3">
      <label for="password">Password: </label>
      <input id="password" type="password" v-model="input.password"/>
    </div>
    <button class="btn btn-outline-dark" type="submit" v-on:click.prevent = "register()">
      Login
    </button>
  </form>
</template>

<style scoped>

</style>