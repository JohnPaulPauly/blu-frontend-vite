<!--displays website for user profile-->
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
    //fetches user data when the view is created in the site.
    this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      //fetch the profile info of the current user
      try {
        // FETCH USER URL
        const response = await axios.post("http://localhost:8080/auth/profile")
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    },
    async updateProfile() {
      //updates user information
      try {

        // FETCH USER URL
        await axios.post("http://localhost:8080/auth/profile");
        alert("Profile updated successfully!");
      } catch(error) {
        console.error("Error updating profile:", error);
      }
    },
    async deleteProfile(){
      //deletes user in database

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