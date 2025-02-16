<template>
  <form name="login-form" >
    <div class="mb-3">
      <label for="username">Username: </label>
      <input id="username" type="text" v-model="input.username"/>
    </div>
    <div class="mb-3">
      <label for="password">Password: </label>
      <input id="password" type="password" v-model="input.password"/>
    </div>
    <button class="btn btn-outline-dark" type="submit" v-on:click.prevent = "login()">
      Login
    </button>
  </form>
</template>

<script>
import { SET_AUTHENTICATION, SET_USERNAME } from "@/store/storeconstants";

export default {
  name: 'LoginView',
  data() {
    return {
      input: {
        username: "",
        password: ""
      },
      output: "",
    }
  },
  methods: {
    login(){
      if (this.input.username !== "" || this.input.password !== "") {
        this.output = "Authentication complete"
        //stores true to the set_authentication and username to the set_username
        this.$store.commit(`auth/${SET_AUTHENTICATION}`, true);
        this.$store.commit(`auth/${SET_USERNAME}`, this.input.username);
        this.output = "Authentication complete."
        this.$router.push('/dashboard')
      } else {
        this.$store.commit(`auth/${SET_AUTHENTICATION}`, false);
        this.output = "Username and password can not be empty"
      }
    }
  },
}
</script>