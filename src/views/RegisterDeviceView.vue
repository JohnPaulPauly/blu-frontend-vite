<script>
// File Created by Luke Trinh
import axios from 'axios';
import bluLogo from "@/assets/images/BluCombinedLogo.svg";
export default{
  data() {
    return {
      activeDevice: null,
      devices: [],
      newDevicename: "",
      newDeviceIP: "",
      message: "",
      messageType: ""
    };
  },
  computed: {
    activeDeviceIp: {
      get() {
        return this.activeDevice ? this.activeDevice.ipAddress : null;
      },
    },
  },
  // Load all the devices and the active device
  async mounted() {
    this.loadActiveDevice();
    await this.listDevices();
  },
  methods: {
    // Lists all devices
    async listDevices() {
      // Fetches all devices from backend
      try {
        const response = await axios.get("http://localhost:8080/devices/ntsimerekis@yahoo.com");
        this.devices = response.data;
        console.log("Fetched devices:", this.devices);
      }catch(error) {
        console.error("No Devices Registered")
      }
    },
    // Sets active device
    async setActiveDevice(device) {
      const payload = {
        name: device.name,
        ipAddress: device.ipAddress,
        active: true,
      };
      await axios.post("http://localhost:8080/devices/ntsimerekis@yahoo.com", payload)
      this.activeDevice = device;
      localStorage.setItem("activeDevice", JSON.stringify(device));
      console.log(`${device.name}, " is now the active device. with IP: ", ${device.ipAddress}`);
    },
    // Stores active device to save
    loadActiveDevice() {
      const storedDevice = localStorage.getItem("activeDevice");
      if (storedDevice) {
        this.activeDevice = JSON.parse(storedDevice);
      }
    },
    // Add device, this is hardcoded for now, but we will be adding features to actually connect to a device later
    async validateAndAddDevice() {
      if (!this.newDeviceName || !this.newDeviceIp) {
        this.message = "Please enter both a device name and an IPv6 address.";
        this.messageType = "error";
        return;
      }

      try {
        const payload = {
          name: this.newDeviceName,
          ipAddress: this.newDeviceIp,
          active: false,
        };

        await axios.post("http://localhost:8080/devices/ntsimerekis@yahoo.com", payload);

        const response = await axios.get("http://localhost:8080/devices/ntsimerekis@yahoo.com");
        this.devices = response.data;
        console.log("Fetched devices:", this.devices);

        this.message = "Device successfully added.";
        this.messageType = "success";
        this.newDeviceName = "";
        this.newDeviceIp = "";

      } catch (error) {
        console.error("Error adding device:", error);
        this.message = "Error validating IPv6 address.";
        this.messageType = "error";
      }
    },
    async deleteDevice(index) {
      const device = this.devices[index];

      try {
        const strippedIP = device.ipAddress.replace(/[\[\]]/g, '');
        await axios.delete(`http://localhost:8080/devices/ntsimerekis@yahoo.com/${strippedIP}`);

        this.devices.splice(index, 1);
        this.message = "Device deleted successfully.";
        this.messageType = "success";
      } catch (error) {
        console.error("Error deleting device:", error);
        this.message = "Failed to delete device.";
        this.messageType = "error";
      }
    }
  }
};
</script>

<template>
  <div class="flex justify-center items-start min-h-screen p-4">
    <div class="w-3/4 max-w-4xl flex flex-col">
      <h2 class="text-xl font-bold mb-4 text-center">Device List</h2>

      <div class="mb-4">
        <input v-model="newDeviceName" placeholder="Device Name" class="border px-3 py-2 mr-2" />
        <input v-model="newDeviceIp" placeholder="IPv6 Address" class="border px-3 py-2 mr-2" />
        <button @click="validateAndAddDevice" class="bg-green-500 text-white px-4 py-2 rounded">Add Device</button>
      </div>
      <p v-if="message" :class="{'text-green-600': messageType === 'success', 'text-red-600': messageType === 'error'}">{{ message }}</p>

      <div class="overflow-y-auto max-h-[500px] border border-gray-300">
        <table class="min-w-full text-center">
          <thead class="bg-gray-100 sticky top-0">
          <tr>
            <th class="border px-6 py-2">Name</th>
            <th class="border px-6 py-2">IPv6 Address</th>
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
            <td class="border px-6 py-2">{{ device.name }}</td>
            <td class="border px-6 py-2">{{ device.ipAddress }}</td>
            <td class="border px-6 py-2">
              <input
                  type="radio"
                  name="activeDevice"
                  :value="device.ipAddress"
                  @change="setActiveDevice(device)"
                  :checked="device.ipAddress === activeDeviceIp"
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
    </div>
  </div>
</template>

<style scoped>
thead {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>