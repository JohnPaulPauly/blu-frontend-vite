<script setup>
import bluLogo from '@/assets/images/BluCombinedLogo.svg';
</script>
<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-white px-4">
    <!-- Logo -->
    <img class="w-40 h-40 md:w-64 md:h-64 mb-6" :src='bluLogo' alt=" Blu Logo ">

    <!-- Login Form Container -->
    <form name="login-form" class="w-full max-w-md p-6 bg-white rounded-lg border border-gray-300 shadow-md flex flex-col space-y-6 mb-12">

      <!-- Email Input -->
      <div class="flex flex-col space-y-2 text-left">
        <label for="username" class="text-gray-800 text-base font-primary">Email</label>
        <input id="username" type="text" v-model="input.username"
               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" placeholder="Enter your email"/>
      </div>

      <!-- Password Input -->
      <div class="flex flex-col space-y-2 text-left">
        <label for="password" class="text-gray-800 text-base font-primary">Password</label>
        <input id="password" type="password" v-model="input.password"
               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" placeholder="Enter your password"/>
      </div>

      <!-- Sign In Button -->
      <button type="submit" v-on:click.prevent="login()"
              class="w-full py-3 bg-blu800 border-[#2c2c2c] text-white text-base rounded-lg hover:bg-blue-700 transition font-primary">
        Sign In
      </button>

      <!-- Forgot Password -->
      <div class="text-left">
        <a href="#" class="text-#1e1e1e text-sm underline leading-snug font-primary">Forgot Password?</a>
      </div>

      <!-- Create an Account Link -->
      <div class="text-left">
        <a href="#/register" class="text-#1e1e1e text-sm underline leading-snug font-primary">Create an Account</a>
      </div>
    </form>


  </div>

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