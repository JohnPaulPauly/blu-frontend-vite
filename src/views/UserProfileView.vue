<template>
  <div class="profile-container">
    <!-- This contains the navigation bar at the top where the user can logout of account and access the dashboard -->
    <header class="header">
      <!-- Users can use the logout button to be redirected to login screen -->
      <button @click="goToLogin()" class="header-btn-logout"><img class="icon-logout" src="../assets/logout.png"></button>
      <!-- Users can return to dashboard using this button -->
      <button @click="goToDashboard()" class="header-btn-home"><img class="icon-home" src="../assets/homebutton.png"></button>
      <h1 class="title">Profile</h1>

    </header>

    <!-- Profile & Devices Section -->
    <div class="profile-content">
      <!-- Profile Card -->
      <div class="profile-card">
        <div><img src="../assets/usericon.png"></div>
        <div class="info">
          <label>Username</label>
          <p>user1036</p>
          <label>Email</label>
          <p>user1036@gmail.com</p>
        </div>
        <div class="buttons">
          <!-- These buttons allow the user to access path history, and also update or deactivate account -->
          <button @click="goToPathHistory()" class="btn path-btn">Path History</button>
          <button class="btn update-btn">Update Profile</button>
          <button class="btn delete-btn">Deactivate Profile</button>
        </div>
      </div>

      <!-- Devices Section -->
      <div class="devices-section">
        <h2>Devices</h2>
        <div class="devices-list">
          <label><input type="checkbox" checked /> Device 1</label>
          <label><input type="checkbox" checked /> Device 2</label>
        </div>
        <button class="btn new-device-btn">New Device</button>
      </div>
    </div>
  </div>
  <main>
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
    /* This function can be used by buttons to redirect to path history page */
    goToPathHistory() {
      this.$router.push({name: 'pathhistory'});
    },
    /* This function is used by buttons to redirect to login page */
    goToLogin() {
      this.$router.push({name: 'login'});
    },
    /* This function allows the user to return home or to the dashboard from wherever they find themselves on the site */
    goToDashboard() {
      this.$router.push({name: 'dashboard'});
    },
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
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    },
    async deleteProfile() {
      if (confirm("Are you sure you want to delete your profile?")) {
        try {
          // FETCH USER URL
          await axios.delete(`http://localhost:8080/users/${this.user.email}`);
          alert("Profile deleted successfully!");
        } catch (error) {
          console.error("Error deleting profile", error);
        }
      }
    }
  }
};
</script>
<style>
/* General Styling */
body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
}

/* Styling for buttons that appear on navigation bar */
/* Logout Button Styling */
.header-btn-logout {
  display: flex;
  align-items: flex-start;
  width: 75px;
  height: 70px;
  background-color: transparent;
  border: transparent;
}

/* Logout Icon Styling */
.icon-logout {
  width: 78px;
  height: 65px;
  margin-left: -30%;
  margin-top: 19%;
}

/* Home Button Styling */
.header-btn-home {
  display: flex;
  align-items: center;
  position: absolute;
  left: 93%;
  top: 8%;
  justify-content: center;
  width: 75px;
  height: 70px;
  background-color: transparent;
  border: transparent;
}

/* Home Icon Styling */
.icon-home {
  align-items: center;
  width: 78px;
  height: 65px;
}

/* Header */
.header {
  display: flex;
  background: #2a4dd0;
  color: white;
  padding: 15px 20px;
  position: relative;
}

.title {
  font-size: 36px;
  margin: 0 auto;
  text-align: center;
  margin-left: 40%;
}

/* Profile Content Styling */
.profile-container {
  margin: auto;
}

.profile-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-top: 20px;
}

.profile-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 40%;
  text-align: center;
}

.info {
  margin-top: 15px;
}

.info label {
  font-weight: bold;
  display: block;
}

.info p {
  margin: 5px 0 15px;
}

/* Button Styling*/
.btn {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.path-btn {
  background: #2a4dd0;
  color: white;
}

.update-btn {
  background: #008cba;
  color: white;
}

.delete-btn {
  background: #d9534f;
  color: white;
}

/* Devices List Styling */
.devices-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 50%;
}

.devices-section h2 {
  margin-top: 0;
}

.devices-list {
  background: #eef2ff;
  padding: 10px;
  border-radius: 5px;
}

.devices-list label {
  display: block;
  margin: 5px 0;
}

.new-device-btn {
  background: #2a4dd0;
  color: white;
  width: auto;
  margin-top: 15px;
}
</style>