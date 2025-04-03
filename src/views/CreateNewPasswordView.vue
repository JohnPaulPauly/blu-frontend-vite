<script setup>
import bluLogo from '@/assets/images/BluCombinedLogo.svg';
</script>
<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-white px-4">
    <!-- Logo -->
    <img class="w-40 h-40 md:w-64 md:h-64 mb-6" :src='bluLogo' alt=" Blu Logo ">

    <!-- Reset Form Container -->
    <form name="login-form" class="w-full max-w-md p-6 bg-white rounded-lg border border-gray-300 shadow-md flex flex-col space-y-6 mb-12">

      <!-- New Password Input -->
      <div class="flex flex-col space-y-2 text-left">
        <label for="password" class="text-gray-800 text-base font-primary">New Password</label>
        <input id="newPassword" type="password" v-model="newPassword"
               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" placeholder="Enter your new password"/>
      </div>

      <!-- Email Input -->
      <div class="flex flex-col space-y-2 text-left">
        <label for="password" class="text-gray-800 text-base font-primary">Confirm Password</label>
        <input id="newPassword" type="password" v-model="confirmPassword"
               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" placeholder="Re-enter your new password"/>
      </div>

      <!-- Error Message -->
      <p v-if="errorMessage" class="text-red-500 mb-2">{{ errorMessage }}</p>

      <!-- Submit Button -->
      <button @click="submitPassword()" class="w-full py-3 bg-blu800 border-[#2c2c2c] text-white text-base rounded-lg hover:bg-blue-700 transition font-primary">
        Submit
      </button>

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
      newPassword: "",
      confirmPassword: "",
      errorMessage: "",
    }
  },
  methods: {
    /* This function is used by buttons to redirect to login page */
    goToLogin() {
      this.$router.push({ name: 'login' });
    },
    submitPassword() {
    if (!this.newPassword || !this.confirmPassword) {
      this.errorMessage = "Please make sure to fill out all fields"
    } else if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match.";
    } else {
      this.errorMessage = "",
          alert("New Password Saved Successfully, you may now return back to the login page.")
    }
    }
  },
}
</script>