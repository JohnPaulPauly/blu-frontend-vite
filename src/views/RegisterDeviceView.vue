<script>
import axios from 'axios';
import bluLogo from "@/assets/images/BluCombinedLogo.svg";
export default{
  data() {
    return {
      devices: [
        {
          "deviceName": "Device1",
          "ipAddress": "0000:0000:0000:0000:0000:0000:0000:0000",
          "macAddress": "1a:2b:3c:4d:5e:6f",
        },
        {
          "deviceName": "Device2",
          "ipAddress": "0000:0000:0000:0000:0000:0000:0000:0000",
          "macAddress": "1a:2b:3c:4d:5e:6f",
        },
      ],
    };
  },
  async mounted() {
    this.loadActiveDevice();
    await this.listDevices();
  },
  methods: {
    async listDevices() {
      try {
        const response = await axios.get("http://localhost:8080/device/");
        this.devices = response.data;
      }catch(error) {
        console.error("No Devices Registered")
      }
    },
    setActiveDevice(device) {
      if (this.activeDevice && this.activeDevice.ipAddress === device.ipAddress) {
        this.activeDevice = null;
        localStorage.removeItem("activeDevice");
      } else {
        this.activeDevice = device;
        localStorage.setItem("activeDevice", JSON.stringify(device));
        console.log(device.deviceName, " is now the active device. with IP: ", device.ipAddress);
      }
    },
    loadActiveDevice() {
      const storedDevice = localStorage.getItem("activeDevice");
      if (storedDevice) {
        this.activeDevice = JSON.parse(storedDevice);
      }
    },
    addDevice() {
      const newDevice = {
        deviceName: `Device${this.devices.length + 1}`,
        ipAddress: "0000:0000:0000:0000:0000:0000:0000:0000",
        macAddress: "aa:bb:cc:dd:ee:ff",
      };
      this.devices.push(newDevice);
    },
    deleteDevice(index){
      this.devices.splice(index, 1);
    }
  }
};
</script>

<template>
  <div class="flex justify-center items-start min-h-screen p-4">
    <div class="w-3/4 max-w-4xl flex flex-col">
      <h2 class="text-xl font-bold mb-4 text-center">Device List</h2>

      <!-- Table container with fixed height and proper width -->
      <div class="overflow-y-auto max-h-[500px] border border-gray-300">
        <table class="min-w-full text-center">
          <thead class="bg-gray-100 sticky top-0">
          <tr>
            <th class="border px-6 py-2">Name</th>
            <th class="border px-6 py-2">IPv6 Address</th>
            <th class="border px-6 py-2">MAC Address</th>
            <th class="border px-6 py-2">Active</th>
            <th class="border px-6 py-2">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="(device, index) in devices"
              :key="device.ipAddress"
              class="hover:bg-gray-50"
          >
            <td class="border px-6 py-2">{{ device.deviceName }}</td>
            <td class="border px-6 py-2">{{ device.ipAddress }}</td>
            <td class="border px-6 py-2">{{ device.macAddress }}</td>
            <td class="border px-6 py-2">
              <input
                  type="checkbox"
                  :checked="device === activeDevice"
                  @change="setActiveDevice(device)"
              />
            </td>
            <td class="border px-6 py-2">
              <button
                  @click="deleteDevice(index)"
                  class="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- Add Device Button -->
      <div class="flex justify-center mt-4">
        <button
            @click="addDevice"
            class="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Add Device
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure the table header remains fixed */
thead {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>