
<template>
  <img alt="Vue logo" src="./assets/BLUPotentialLogo.png" style="width: 200px; height: 200px;">
  <main>
    <h1>Hello</h1>
    <RouterView />
  </main>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
      },
    };
  },
  created() {
    this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      try {
        // FETCH USER URL
        const response = await axios.post("http://localhost:8080/auth/profile")
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    },
    async updateProfile() {
      try {
        // FETCH USER URL
        await axios.post("http://localhost:8080/auth/profile");
        alert("Profile updated successfully!");
      } catch(error) {
        console.error("Error updating profile:", error);
      }
    },
    async deleteProfile(){
      if (confirm("Are you sure you want to delete your profile?")){
        try {
          // FETCH USER URL
          await axios.delete(`http://localhost:8080/users/${this.user.email}`);
          alert("Profile deleted successfully!");
        } catch(error) {
          console.error("Error deleting profile", error);
        }
      }
    }
  }
};
</script>