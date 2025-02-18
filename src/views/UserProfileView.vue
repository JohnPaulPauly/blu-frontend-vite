<script>
import axios from 'axios';
export default {
  data() {
    return {
      user: {
        "fullName": "cool guy",
        "email": "coolguy@gmail.com",
        "password": "$2a$10$/8X5IWxM2RDoXuhg3crLiuQPOBahjRf2gEq4XU9NR3CApQ1O/4kUW",
        "emailVerified": false,
        "authorities": [],
        "username": "coolguy@gmail.com",
        "credentialsNonExpired": true,
        "accountNonExpired": true,
        "accountNonLocked": false,
        "enabled": true
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
        const response = await axios.get("http://localhost:8080/auth/fetch")
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

<template>
  <div v-if="user" class="profile-container">
    <h2>User Profile</h2>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Username:</strong> {{ user.fullName }}</p>
  </div>
</template>

<style scoped>
.profile-container {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 5px;
  width: 300px;
  text-align: center;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
button {
  margin-top: 10px;
  cursor: pointer;
}
</style>