<script>
import axios from 'axios';
export default {
  name: 'AdminView',
  data() {
    return {
      users: [
        {
          "fullName": "cool guy",
          "email": "coolguy@gmail.com",
          "password": "$2a$10$/8X5IWxM2RDoXuhg3crLiuQPOBahjRf2gEq4XU9NR3CApQ1O/4kUW",
          "emailVerified": false,
          "authorities": [],
          "username": "coolguy@gmail.com",
          "credentialsNonExpired": true,
          "accountNonExpired": true,
          "accountNonLocked": false,
          "enabled": true
        },
        {
          "fullName": "luke trinh",
          "email": "luketrinh101@gmail.com",
          "password": "$2a$10$3rTlg4nABCy4my0ubYTro.eT9.IXCF9HUIvSNcSxPpa8HLu69QIZi",
          "emailVerified": false,
          "authorities": [],
          "username": "luketrinh101@gmail.com",
          "credentialsNonExpired": true,
          "accountNonExpired": true,
          "accountNonLocked": false,
          "enabled": true
        },
        {
          "fullName": "Luke Trinh",
          "email": "luke@gmail.com",
          "password": "$2a$10$QRcb5Dvjc8Hzr7EwaaVd9elsfO9kbhVMhLm7YI3XXGuQ0VedZOMYa",
          "emailVerified": true,
          "authorities": [],
          "username": "luke@gmail.com",
          "credentialsNonExpired": true,
          "accountNonExpired": true,
          "accountNonLocked": true,
          "enabled": true
        }
      ],
    };
  },
  async mounted() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:8080/users/");
        this.users = response.data;
      } catch(error) {
        console.error("Error fetching users:", error);
      }
    },
    async deleteUser(userEmail) {
      if (!confirm("Are you sure you want to delete this user?")) return;

      try {
        const response = await axios.delete("https://localhost:8080/deleteProfile");
        console.log("Response", response);
        this.users = this.users.filter(user => user.email !== userEmail);
      } catch(error) {
        console.error("Error deleting user: ", error);
      }
    }
  }
};

</script>

<template>
  <div class="p-4">
    <h1>Admin Page</h1>
    <h2 class="text-xl font-bold mb-4">User List</h2>
    <table class="min-w-full border border-gray-300">
      <thead>
      <tr class="bg-gray-100">
        <th class="border px-4 py-2">Name</th>
        <th class="border px-4 py-2">Email</th>
        <th class="border px-4 py-2">Verified?</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.email" class="hover:bg-gray-50">
        <td class="border px-4 py-2">{{ user.fullName }}</td>
        <td class="border px-4 py-2">{{ user.email }}</td>
        <td class="border px-4 py-2">{{ user.emailVerified }}</td>
        <td class="border px-4 py-2">
          <button @click="deleteUser(user.email)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
            Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>