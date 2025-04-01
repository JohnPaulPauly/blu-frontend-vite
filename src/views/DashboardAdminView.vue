/* Dashboard Page code written by Samantha Preciado
<script>
export default {
  name: "DashboardView",
  methods: {
    /* This function is used by buttons to redirect to login page */
    goToLogin() {
      this.$router.push({ name: 'login' });
    },
    /* This function allows the user to return home or to the dashboard from wherever they find themselves on the site */
    goToDashboard() {
      this.$router.push({ name: 'dashboard'});
    },
    /* This function allows the user to access their profile page */
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
    },
    /* This function can be used by buttons to redirect to admin view page */
    goToAdminView() {
      this.$router.push({ name: 'admin'})
    }
  },
}
</script>

/* Contains 3 main buttons to navigate in-app features */
<template>
  <div class="divider">
    <!-- contains the navigation bar that appears at the top of the dashboard --->
    <!-- This button allows the user to logout returning them back to the login page -->
    <button @click="goToLogin()" class="header-btn-logout"><img class="icon-logout" src="../assets/logout.png"></button>
    <!-- This button allows the user to return to the dashboard from anywhere on the site -->
    <button @click="goToDashboard()" class="header-btn-home"><img class="icon-home" src="../assets/homebutton.png"></button>
    <!-- This button allows the user to access their profile page where they can modify their account information -->
    <button @click="goToUserProfile()" class="header-btn-profile"><img class="icon-profile" src="../assets/profilebutton.png"></button>
  </div>
  <div class="dashboard-buttons">
    <button @click='goToMapQueue()' :class="['btn', 'btn-map']">Join Map Queue</button>
    <button @click='goToPathHistory()' :class="['btn', 'btn-paths']">Access Previous Paths</button>
    <button @click='goToPairDevice()'  :class="['btn', 'btn-pairing']">Pair New Device</button>
</div>
  <!-- Button that redirects to admin access -->
  <div class="button-center">
    <button @click='goToAdminView()' class="adminbutton btn">Admin View</button>
  </div>


</template>

<style scoped>
/*Styles dashboard buttons*/
.dashboard-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 45px;
  margin-top: 50px;
}
.button-center{
  display: flex;
  justify-content: center
}

.header-btn-logout {
  display: flex;
  align-items: flex-start;
  width: 75px;
  height: 70px;
  background-color: transparent;
  border: transparent;
}
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
.icon-logout {
  align-items: flex-start;
  width: 78px;
  height: 65px;
  margin-left: -5%;
  margin-top: 4%;
}
.icon-home {
  align-items: center;
  width: 78px;
  height: 65px;
}
.icon-profile {
  align-items: flex-end;
  width: 78px;
  height: 65px;
}
.divider {
  display: flex;
  align-items: flex-end;
  width: 1500px;
  height: 70px;
  background-color: #2528CE;
  margin: 0 auto;
}
/* Styling for the admin button */
.adminbutton {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 45px;
  margin-top: -27%;
  background-color: #939dbb;
  margin-left: -100%;
}
/*Styles contents of dashboard buttons*/
.btn {
  color: white;
  padding: 25px 30px;
  border: none;
  border-radius: 10px;
  font-size: 40px;
  font-family: Avenir;
  cursor: pointer;
  width: 473px;
  height: 114px;
  margin-right: -50%;
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