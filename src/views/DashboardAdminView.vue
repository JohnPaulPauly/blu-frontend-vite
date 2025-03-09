/* Dashboard Page code written by Samantha Preciado
<script>
import {ref} from  'vue';
import { Dialog, DialogPanel, DialogTitle, DialogDescription } from '@headlessui/vue';
export default {
  name: "DashboardView",
  components: {Dialog, DialogPanel, DialogTitle, DialogDescription},
  setup(){
    const showAdminError = ref(false);
    const triggerAdminPopup = () => {
      console.log("Triggering Admin Popup"); //  Debugging log
      showAdminError.value = true; // Properly setting ref value
    };

    return{
      showAdminError,
      triggerAdminPopup,
    };
  },
  methods: {
    /* This function is used by buttons to redirect to login page */
    goToLogin() {
      this.$router.push({name: 'login'});
    },
    goToDashboard() {
      this.$router.push({name: 'dashboard'});
    },
    goToUserProfile() {
      this.$router.push({name: 'profile'})
    },
    /* This function can be used by buttons to redirect to mapqueue page */
    goToMapQueue() {
      this.$router.push({name: 'mapqueue'});
    },
    /* This function can be used by buttons to redirect to path history page */
    goToPathHistory() {
      this.$router.push({name: 'pathhistory'});
    },
    /* This function can be used by buttons to redirect to pair device page */
    goToPairDevice() {
      this.$router.push({name: 'pairdevice'});
    },
    goToAdminView() {
      this.$router.push({name: 'admin'})
    },
  }
};

</script>
<script setup>
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const isOpen = ref(true)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
</script>


/* Contains 3 main buttons to navigate in-app features */
<template>
  <div class="divider">
    <button @click="goToLogin()" class="header-btn-logout"><img class="icon-logout" src="../assets/logout.png"></button>
    <button @click="goToDashboard()" class="header-btn-home"><img class="icon-home" src="../assets/homebutton.png"></button>
    <button @click="goToUserProfile()" class="header-btn-profile"><img class="icon-profile" src="../assets/profilebutton.png"></button>
  </div>
  <div class="dashboard-buttons">
    <button @click='goToMapQueue()' :class="['btn', 'btn-map']">Join Map Queue</button>
    <button @click='goToPathHistory()' :class="['btn', 'btn-paths']">Access Previous Paths</button>
    <button @click='goToPairDevice()'  :class="['btn', 'btn-pairing']">Pair New Device</button>
</div>
  <div class="button-center">
    <!--<button @click='goToAdminView()' class="adminbutton btn">Admin View</button>-->
    <button @click='openModal' class="adminbutton btn">Admin View</button>
  </div>

  <!-- Headless UI Dialog (Access Denied Popup) -->
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
            class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
          >
            <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
              >
                Access Denied
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  You do not have admin privileges to access this section.
                </p>
              </div>

              <div class="mt-4">
                <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="closeModal"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

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