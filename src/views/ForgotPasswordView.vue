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
        <input id="username" type="text" v-model="input.email"
               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" placeholder="Enter your email"/>
      </div>

      <!-- Submit Button -->
      <button @click="displayText()" v-if="!showText" class="w-full py-3 bg-blu800 border-[#2c2c2c] text-white text-base rounded-lg hover:bg-blue-700 transition font-primary">
        Submit
      </button>

      <p v-if="showText">Please check your email address for further instructions to reset your password. You can now close this window.</p>

      <!-- Return to Login Button !-->
      <button @click="goToLogin()" class="w-full py-3 bg-blu800 border-[#2c2c2c] text-white text-base rounded-lg hover:bg-blue-700 transition font-primary">
        Return to Login
      </button>

    </form>
  </div>
</template>

<script>
import {SET_AUTHENTICATION, SET_TOKEN, SET_USERNAME} from "@/store/storeconstants";
import axios from "axios";

export default {
  name: 'ForgotPasswordView',
  data() {
    return {
      input: {
        email: "",
        password: ""
      },
      output: "",
      showText: false,
    }
  },
  methods: {
    /* This function is used by buttons to redirect to login page */
    goToLogin() {
      this.$router.push({ name: 'login' });
    },
    displayText() {
      this.showText = true;
    }
  },
}
</script>