<script>
import axios from 'axios';
import bluLogo from "@/assets/images/BluCombinedLogo.svg";
export default{
  data() {
    return {
      devices: [
        {
          "ipAddress": "0000:0000:0000:0000:0000:0000:0000:0000",
          "macAddress": "1a:2b:3c:4d:5e:6f",
        },
        {
          "ipAddress": "0000:0000:0000:0000:0000:0000:0000:0000",
          "macAddress": "1a:2b:3c:4d:5e:6f",
        },
      ],
    };
  },
  async mounted() {
    await this.fetchUsers();
  },
  methods: {
    async listDevices() {
      try {
        const response = await axios.get("http://localhost:8080/users/");
      }catch(error) {
        console.error("No Devices Registered")
      }
    }
  }
};
</script>

<template>
  <div class="p-4">
    <h1>Registered Devices</h1>
    <h2 class="text-xl font-bold mb-4">Device List</h2>
    <table class="min-w-full border border-gray-300">
      <thead>
      <tr class="bg-gray-100">
        <th class="border px-4 py-2">IPv6 Address</th>
        <th class="border px-4 py-2">MAC Address</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="device in devices" :key="device.ipAddress" class="hover:bg-gray-50">
        <td class="border px-4 py-2">{{ device.ipAddress }}</td>
        <td class="border px-4 py-2">{{ device.macAddress }}</td>
        <td class="border px-4 py-2">
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>