// Dashboard Page code written by Samantha Preciado
<script setup>
import bluLogo from '@/assets/images/BLUHorizontalLogo.svg';
import bluLogoAlone from '@/assets/images/BluLogoAlone.svg';
import NavBar from "@/components/NavBar.vue";
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';


import { ref, onMounted, onUnmounted } from "vue";

//Define sidebar state , ref makes it relative
const isSidebarOpen = ref(false);

//Top NavBar opens from hamburger menu on small screens and closes when clicked outside of hamburger
const toggleSidebar =  () => {
  console.log("Hamburger button clicked, previous state:", isSidebarOpen.value);
  isSidebarOpen.value = !isSidebarOpen.value;
  //await nextTick(); // Ensures Vue updates the DOM before logging
  console.log("New sidebar state:", isSidebarOpen.value);
};

// Close sidebar when clicking outside
const closeSidebarOnOutsideClick = (event) => {
  const sidebar = document.getElementById("logo-sidebar");
  if (sidebar && !sidebar.contains(event.target) && !event.target.closest('[aria-controls="logo-sidebar"]')) {
    isSidebarOpen.value = false;
  }
};

// Attach event listener when the component mounts
onMounted(() => {
  document.addEventListener("click", closeSidebarOnOutsideClick);
});

// Remove event listener when the component unmounts
onUnmounted(() => {
  document.removeEventListener("click", closeSidebarOnOutsideClick);
});

</script>

<script>
import navBar from "@/components/NavBar.vue";
export default {
  name: "DashboardView",
  methods: {
    goToLogin() {
      this.$router.push({ name: 'login' });
    },
    goToMapQueue() {
      this.$router.push({ name: 'mapqueue' });
    },
    goToPathHistory() {
      this.$router.push({ name: 'pathhistory'});
    },
    goToPairDevice() {
      this.$router.push({ name: 'pairdevice' });
    }
  },

  components: {
    navBar
  }
}
</script>

//Contains 3 main buttons to navigate in-app features
<template>
  <!--
  <button @click="goToLogin">Go to Login</button>
  <div class="dashboard-buttons">
    <button @click='goToMapQueue()' :class="['btn', 'btn-map']">Join Map Queue</button>
    <button @click='goToPathHistory()' :class="['btn', 'btn-paths']">Access Previous Paths</button>
    <button @click='goToPairDevice()'  :class="['btn', 'btn-pairing']">Pair New Device</button>
</div> -->

  <!-- TOP NAVBAR: navBar styling defined in NavBar.vue -->
  <navBar :isSidebarOpen ="isSidebarOpen" @toggle-sidebar = "toggleSidebar"/> <!--Component called and event logged-->

  <div class="flex min-h-screen text-gray-900">
    <!-- Sidebar for Dashboard-->
    <aside  id = "logo-sidebar" :class="{'-translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen, 'sm:translate-x-0': true}" class="w-64 sm:pr-4 sm:pt-20 pr-4 xl:pr-8 2xl:pr-12 bg-gray-50  space-y-4 fixed  pt-20 top-0 h-screen transition-transform" aria-label="Sidebar">
      <div class="h-full pt-10 px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul class="space-y-2 roboto-bold">
          <li>
            <a href="#" class="flex items-center  p-2 text-gray-800 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <span class="ms-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center  p-2 text-gray-800 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <span class="ms-3">Users</span>
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center  p-2 text-gray-800 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <span class="ms-3">Sign Out</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1  ml-64 p-6 ">
      <!-- Header -->
      <div class="flex fixed pt-8 justify-between items-center mb-6">
        <div class ="flex items-center gap-4">
          <h1 class="text-2xl roboto-bold">Welcome to BLU Dashboard</h1>
          <div class="flex items-center gap-3 relative">
            <input
                type="text"
                placeholder="Search..."
                class="px-4 py-2 rounded bg-gray-300 text-white outline-none"
            />
            <Search class="text-white" />
          </div>
          <div class="relative">
            <button @click="toggleDropdown">
              <Settings class="text-white" />
            </button>
            <div v-if="showDropdown" class="absolute right-0 mt-2 w-40 bg-gray-800 rounded shadow-lg p-2">
              <a href="/profile" class="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
                <User class="text-white" size="16" /> Profile
              </a>
              <a href="/settings" class="block p-2 hover:bg-gray-700 rounded">Settings</a>
            </div>
          </div>
        </div>
      </div>
      <!-- Content Area with Gradient -->
      <div class="flex-1 ml-64 relative px-6 pt-4 lg:px-8">
        <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div class="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#9cc6ff] to-[#243daf] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.dashboard-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 45px;
  margin-top: 50px;
}
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