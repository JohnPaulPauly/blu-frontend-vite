<script setup>
import bluLogo from '@/assets/images/BluHorizontalLogo.svg';
import {Bars3Icon, UserCircleIcon, Cog6ToothIcon, ArrowRightStartOnRectangleIcon} from "@heroicons/vue/24/outline/index.js";
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  isSidebarOpen: Boolean
});

const emit = defineEmits(["toggle-sidebar"]);

//dropdown trigger
const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const closeDropdown = (e) => {
  if (
      !e.target.closest('#dropdown-user') &&
      !e.target.closest('#profile-button')
  ) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<template>

  <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">
          <button @click = "emit('toggle-sidebar')" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none  dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
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

          <!-- Profile Photo & Dropdown -->
            <div class ="ml-10">
              <button id="profile-button" type = "button" class="flex items-center text-sm  bg-gray-800 rounded-full space-x-2 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" @click = "toggleDropdown">
                <span class="sr-only">Open user menu</span>
                <img class="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="user photo">
              </button>
            </div>

            <!-- Drop Down-->
            <div
                v-if="showDropdown"
                id="dropdown-user"
                class="absolute top-[90%] left-auto right-2 w-48 bg-white dark:bg-gray-700 rounded shadow-lg z-50 text-sm"
            >
              <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                <p class="text-gray-800 dark:text-white font-semibold">Raquel Hernandez</p>
                <p class="text-gray-500 dark:text-gray-300 truncate">raquel@blu.com</p>
              </div>
              <ul class="py-2">
                <li>
                  <a href="/profile" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white">
                    <UserCircleIcon class="h-5 w-5" /> Profile
                  </a>
                </li>
                <li>
                  <a href="/settings" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white">
                    <Cog6ToothIcon class="h-5 w-5" /> Settings
                  </a>
                </li>
                <li>
                  <button
                      @click="$emit('sign-out')"
                      class="flex w-full items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-400"
                  >
                    <ArrowRightStartOnRectangleIcon class="h-5 w-5" /> Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
          </div>
        </div>
      </div>
  </nav>


</template>

<!-- export name -->
<script>
import '@/assets/tailwind.css';
export default{
  name: "NavBar"
}
</script> 