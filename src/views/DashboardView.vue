// Dashboard Page code written by Samantha Preciado
<script>
export default {
  name: "DashboardView",
  methods: {
    /* This function is used by buttons to redirect to login page */
    goToLogin() {
      this.$router.push({ name: 'login' });
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

  <button @click="goToLogin">Go to Login</button>
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