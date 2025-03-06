// Dashboard Page code written by Samantha Preciado
<script setup>
import bluLogo from '@/assets/images/BLUHorizontalLogo.svg';
import bluLogoAlone from '@/assets/images/BluLogoAlone.svg';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';


import { ref, onMounted, onUnmounted } from "vue";

const isSidebarOpen = ref(false);

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
  <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">
          <button @click ="toggleSidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none  dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="size-8" aria-hidden="true" />
          </button>
          <a href="#" class="flex ms-2 md:me-24">
            <span class="sr-only">BLU</span>
            <img class="sm:h-12 h-8 w-auto " :src="bluLogo" alt="Blu Logo" />
          </a>
        </div>
        <div class="flex items-center">
          <div class="flex items-center justify-between w-full">
            <form class=" flex-1 max-w-md ">
              <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>
            </form>
            <div class ="ml-10">
              <button type="button" class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span class="sr-only">Open user menu</span>
                <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo">
              </button>
            </div>

            <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
              <div class="px-4 py-3" role="none">
                <p class="text-sm text-gray-900 dark:text-white" role="none">
                  Neil Sims
                </p>
                <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                  neil.sims@flowbite.com
                </p>
              </div>
              <ul class="py-1" role="none">
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <div class="flex min-h-screen text-gray-900">
    <!-- Sidebar -->
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