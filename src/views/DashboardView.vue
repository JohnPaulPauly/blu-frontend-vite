// Dashboard Page code written by Samantha Preciado
<script>
export default {
  name: "DashboardView",
  methods: {
    /* This function is used by buttons to redirect to login page */
    goToLogin() {
      this.$router.push({ name: 'login' });
    },
    goToUserProfile() {
      this.$router.push({name: 'profile'})
    },
    /* This function can be used by buttons to redirect to mapqueue page */
    goToMapQueue() {
      this.$router.push({ name: 'mapqueue' });
    },
    /* This function can be used by buttons to redirect to path history page */
    goToPathHistory() {
      this.$router.push({ name: 'pathhistory'});
    },
    /* This function can be used by buttons to redirect to pair device page */
    goToPairDevice() {
      this.$router.push({ name: 'pairdevice' });
    }
  },
}
</script>

/* Contains 3 main buttons to navigate in-app features */
<template>
  <!-- contains the navigation bar that appears at the top of the dashboard --->
  <div class="divider">
    <button @click="goToLogin()" class="header-btn-logout"><img class="icon-logout" src="../assets/logout.png"></button>
    <button class="header-btn-home"><img class="icon-home" src="../assets/homebutton.png"></button>
    <button @click="goToUserProfile()" class="header-btn-profile"><img class="icon-profile" src="../assets/profilebutton.png"></button>
  </div>
  <div class="dashboard-buttons">
    <button @click='goToMapQueue()' :class="['btn', 'btn-map']">Join Map Queue</button>
    <button @click='goToPathHistory()' :class="['btn', 'btn-paths']">Access Previous Paths</button>
    <button @click='goToPairDevice()'  :class="['btn', 'btn-pairing']">Pair New Device</button>
  </div>



</template>

<style scoped>
/*Styles dashboard buttons*/
.dashboard-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 45px;
  margin-top: 50px
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
/* Home Button Styling */
.header-btn-home {
  display: flex;
  align-items: center;
  position: absolute;
  left: 47.5%;
  top: 31%;
  justify-content: center;
  width: 75px;
  height: 70px;
  background-color: transparent;
  border: transparent;
}
/* Profile Button Styling */
.header-btn-profile {
  display: flex;
  align-items: flex-end;
  position: absolute;
  left: 95%;
  width: 75px;
  height: 70px;
  background-color: transparent;
  border: transparent;
}
/* Logout Icon Styling */
.icon-logout {
  align-items: flex-start;
  width: 78px;
  height: 65px;
  margin-left: -5%;
  margin-top: 4%;
}
/* Home Icon Styling */
.icon-home {
  align-items: center;
  width: 78px;
  height: 65px;
}
/* Profile Icon Styling */
.icon-profile {
  align-items: flex-end;
  width: 78px;
  height: 65px;
}
/* Divider Styling for Navigation Bar */
.divider {
  display: flex;
  align-items: flex-end;
  width: 1500px;
  height: 70px;
  background-color: #2528CE;
  margin: 0 auto;
}
/*Styles contents of dashboard buttons*/
.btn {
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 10px;
  font-size: 40px;
  font-family: Avenir;
  cursor: pointer;
  width: 473px;
  height: 114px;
}

/* Styles coloring for each respective button on dashboard */
.btn-map {
  background-color: #3659F5;
}

.btn-paths {
  background-color: #5581FF;
}

.btn-pairing {
  background-color: #75A3FF;
}
</style>