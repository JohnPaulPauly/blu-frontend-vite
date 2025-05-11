// About Page
<script setup>
import {computed, ref} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from "@/components/NavBar.vue";
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon, MagnifyingGlassCircleIcon, BoltIcon, MapPinIcon } from '@heroicons/vue/24/outline'
import bluLogo from "@/assets/images/BluHorizontalLogo.svg";
import bluLogoAlone from "@/assets/images/BluLogoAlone.svg";
import {Dialog, DialogPanel} from "@headlessui/vue";
import {Bars3Icon, XMarkIcon} from "@heroicons/vue/24/outline/index.js";

const router = useRouter()
const route = useRoute()

const search = computed({
  get() {
    return route.query.search ?? ''
  },
  set(search) {
    router.replace({ query: { search } })
  }
})

//The four features displayed on the page held in a list
const features = [
  {
    name: 'Real-Time Tracking',
    description:
        'We’ve developed a cutting-edge BLE network that continuously monitors device locations. Helping organizations track assets, personnel, and IoT devices with unparalleled efficiency.',
    icon: MagnifyingGlassCircleIcon,
  },
  {
    name: 'Easy Setup',
    description:
        'Our BLE tracking system works right out of the box, with an intuitive interface that makes monitoring locations simple for anyone, no technical expertise required.',
    icon: MapPinIcon,
  },
  {
    name: 'Built-In Security',
    description:
        'Traditional tracking systems drain power and require expensive infrastructure. BLU leverages low-power BLE technology to provide scalable tracking solutions without excessive battery consumption.',
    icon: BoltIcon,
  },
  {
    name: 'Energy-efficient',
    description:
        'Security isn’t an afterthought, it’s at the core of BLU. Our encrypted data transmission ensures that location data remains private.',
    icon: LockClosedIcon,
  },
]

const navigation = [
  { name: 'About', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Contact', href: '#' },
]

const mobileMenuOpen = ref(false)

</script>

<!--we will import the navbar for every page and add anything that is unique to the about page-->
<template>
  <!-- NavBar from landing page included in the about page for same styling-->
  <div class="bg-white">
    <header class="absolute inset-x-0 top-0 z-50">
      <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">BLU</span>
            <img class="sm:h-18 h-16 w-auto " :src="bluLogo" alt="Blu Logo" />
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="size-8" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-lg/6 roboto-bold text-gray-900 px-3 py-2 rounded-md transition duration-300 hover:bg-gray-100">{{ item.name }}</a>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" class="text-sm/6 font-semibold text-gray-900" v-on:click.prevent="LoginRoute">Log in <span aria-hidden="true">&rarr;</span></a>
        </div>
      </nav>
      <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-50" />
        <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-10 w-auto" :src="bluLogoAlone" alt="Blu Logo"  />
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="size-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <a v-for="item in navigation" :key="item.name" :href="item.href" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 roboto-semibold text-gray-900 hover:bg-gray-50">{{ item.name }}</a>
              </div>
              <div class="py-6">
                <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 roboto-bold text-gray-900 hover:bg-gray-50" v-on:click.prevent="LoginRoute">Log in</a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  </div>

    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">

        <!-- About Blu-->
        <div class="mx-auto max-w-4xl lg:text-center">
          <h2 class="sm:text-8xl  text-6xl roboto-bold text-blu800">About BLU</h2>
          <p class="mt-2 text-2xl roboto-semibold tracking-tight text-pretty text-gray-900 sm:text-3xl lg:text-balance">Innovating Indoor Tracking with Bluetooth Low Energy
          </p>
          <p class="mt-6 text-lg/6 font-primary text-gray-500">At <span class ="text-blu800 roboto-bold">BLU</span>, we’re a team of engineers, innovators, and problem-solvers passionate about redefining location tracking. We built BLU as an <span class = 'text-blu800 roboto-bold'>affordable, scalable, and secure </span>tracking solution powered by Bluetooth Low Energy and advanced trilateration algorithms.</p>
        </div>

        <!--Line divider for sections-->
        <hr class="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />

        <!-- What is Bluetooth Low Energy section-->

        <div class="mx-auto max-w-4xl lg:text-left mt-10">
          <p class="mt-2 text-2xl roboto-semibold tracking-tight text-pretty text-gray-900 sm:text-3xl lg:text-balance">What is Bluetooth Low Energy?
          </p>
          <p class="mt-6 text-lg/6 font-primary text-gray-500">Bluetooth Low Energy (BLE) is a wireless communication technology designed for low-power, high-efficiency data transmission. BLE is optimized for short, energy-efficient bursts of data, making it perfect for IoT devices, smart sensors, and real-time tracking systems.
            At BLU, we use BLE beaconing and trilateration to determine precise locations indoors, where GPS is unreliable. Our system works by placing BLE-enabled devices in key locations, which communicate with sensors and analyze signal strength to calculate positions in real time.</p>
        </div>


        <!--Why trust Blu?-->
        <div class="mx-auto max-w-4xl lg:text-left mt-10">
          <p class="mt-2 text-2xl roboto-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl lg:text-balance">Why <span class = "roboto-bold text-blu800">BLU?</span></p>
        </div>
        <div class="mx-auto mt-10 max-w-2xl sm:mt-20 lg:mt-12 lg:max-w-4xl">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div v-for="feature in features" :key="feature.name" class="relative pl-16">
              <dt class="text-base/7 roboto-bold text-gray-900">
                <div class="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-blu700">
                  <component :is="feature.icon" class="size-6 text-white" aria-hidden="true" />
                </div>
                {{ feature.name }}
              </dt>
              <dd class="mt-2 text-base/7 text-gray-600 font-primary">{{ feature.description }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- fOOTER-->
      <footer class="bg-white dark:bg-gray-900">
        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:pt-12">
          <div class="md:flex md:justify-between ">

            <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">


            </div>
          </div>
          <!-- Line divider and then icons and trademark on footer-->
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div class="flex items-center sm:justify-between justify-between flex-row flex-nowrap mt-4 sm:mx-10">
          <span class="sm:text-sm lg:text-base text-sm text-gray-500 sm:text-center dark:text-gray-400 leading-none">© 2025 <a href="#" class="hover:underline">BLU™</a>. All Rights Reserved.
          </span>
            <div class="flex mt-1 sm:mt-3 sm:justify-center ms-5 ">
              <a href="https://github.com/JohnPaulPauly/blu-frontend-vite" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5 inline-flex">
                <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
                </svg>
                <span class="sr-only">GitHub account</span>
              </a>
              <a href="https://discord.com/" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                  <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"/>
                </svg>
                <span class="sr-only">Discord community</span>
              </a>
              <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                  <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd"/>
                </svg>
                <span class="sr-only">Twitter page</span>
              </a>

            </div>
          </div>
        </div>
      </footer>

    </div>


</template>