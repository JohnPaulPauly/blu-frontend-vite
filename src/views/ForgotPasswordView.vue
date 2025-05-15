<script>
import axios from 'axios';
import bluLogo from "@/assets/images/BluCombinedLogo.svg";

export default {
  name: 'RegisterView',
  computed: {
    bluLogo() {
      return bluLogo
    }
  },
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
    register() {
      if (this.input.email !== "") {
        // this.output = "Authentication complete"
        // stores true to the set_authentication and username to the set_username
        // this.$store.commit(`auth/${SET_AUTHENTICATION}`, true);
        // this.$store.commit(`auth/${SET_USERNAME}`, this.input.username
        console.log(this.input);
        axios.get(`http://localhost:8080/auth/forgot/${this.input.email}`)
            .then(res => {
              this.output = res.data.message || "Check your email!";
              this.$router.push('#/login')
            })
            .catch(error => {
              this.$router.push('#/login')
              if (error.response && error.response.status === 409) {
                this.output = error.response.data || "This email is not registered!";
              } else {
                this.output = "An error occurred. Please try again.";
              }
            })
      } else {
        // this.$store.commit(`auth/${SET_AUTHENTICATION}`, false);
        this.output = "Email can not be empty"
      }

      return this.output;
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-white px-4">
    <!-- Logo -->
    <!-- img class="w-40 h-40 md:w-64 md:h-64 mb-6" :src='bluLogo' alt=" Blu Logo "-->
    <div class="content-center mb-14" >
      <p class="text-5xl roboto-bold tracking-tight text-balance text-blu800 sm:text-5xl">Reset your account password</p>
    </div>
    <form name="register-form" class="w-full max-w-md p-6 bg-white rounded-lg border border-gray-300 shadow-md flex flex-col space-y-6 mb-12">

      <!-- Email Input -->
      <div class="flex flex-col space-y-2 text-left">
        <label for="username" class="text-gray-800 text-base font-primary">Email</label>
        <input id="username" type="text" v-model="input.email"
               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" placeholder="Enter your email"/>
      </div>

      <!-- Sign Up Button -->
      <button type="submit" v-on:click.prevent="register()"
              class="w-full py-3 bg-blu800 border-[#2c2c2c] text-white text-base rounded-lg hover:bg-blue-700 transition font-primary">
        Reset Password
      </button>

      <p class="text-red-500" v-if="this.output">{{this.output}}</p>

    </form>
  </div>
</template>

<style scoped>

</style>
