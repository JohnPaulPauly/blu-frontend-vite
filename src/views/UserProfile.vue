<script>
import axios from 'axios';
export default {
  name: 'UserProfile',
  data() {
    return {
      user: [],
    };
  },
  async mounted() {
    await this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      try {
          const response = await axios.get("https://localhost:8080/users/fetch")
          this.user = response.data;
      }catch(error) {
        console.error("Error fetching profile information", error);
      }
    },
    async updateUser() {

    }
  }
}
</script>

<template>

</template>

<style scoped>

</style>