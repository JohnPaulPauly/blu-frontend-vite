<script>
import axios from 'axios';
import SearchBar from "@/components/SearchBar.vue";
export default {
  // This part is done by Raquel H.
  components: {SearchBar},
  data() {
    return {
      users: [
          // Testing local data
        // {
        //   "fullName": "cool guy",
        //   "email": "coolguy@gmail.com",
        //   "password": "$2a$10$/8X5IWxM2RDoXuhg3crLiuQPOBahjRf2gEq4XU9NR3CApQ1O/4kUW",
        //   "emailVerified": false,
        //   "authorities": [],
        //   "username": "coolguy@gmail.com",
        //   "credentialsNonExpired": true,
        //   "accountNonExpired": true,
        //   "accountNonLocked": false,
        //   "enabled": true
        // },
        // {
        //   "fullName": "luke trinh",
        //   "email": "luketrinh101@gmail.com",
        //   "password": "$2a$10$3rTlg4nABCy4my0ubYTro.eT9.IXCF9HUIvSNcSxPpa8HLu69QIZi",
        //   "emailVerified": false,
        //   "authorities": [],
        //   "username": "luketrinh101@gmail.com",
        //   "credentialsNonExpired": true,
        //   "accountNonExpired": true,
        //   "accountNonLocked": false,
        //   "enabled": true
        // },
        // {
        //   "fullName": "Luke Trinh",
        //   "email": "luke@gmail.com",
        //   "password": "$2a$10$QRcb5Dvjc8Hzr7EwaaVd9elsfO9kbhVMhLm7YI3XXGuQ0VedZOMYa",
        //   "emailVerified": true,
        //   "authorities": [],
        //   "username": "luke@gmail.com",
        //   "credentialsNonExpired": true,
        //   "accountNonExpired": true,
        //   "accountNonLocked": true,
        //   "enabled": true
        // }
      ],
      // This part is done by Raquel H.
      filteredUsers: [] //search results live here
    };
  },
  async mounted() {
    // This part is done by Raquel H.
    this.filteredUsers = [...this.users];
    await this.fetchUsers();
  },
  methods: {
    // This part is done by Luke T.
    async fetchUsers() {
      try {
        // Hits endpoint to fetch all users in the database
        const response = await axios.get("http://localhost:8080/users");
        this.users = response.data;
        this.filteredUsers = [...this.users]; // ← Shallow sync users to the new filtered array
      } catch(error) {
        console.error("Error fetching users:", error);
      }
    },
    // This code is updated by Luke T.
    async deleteUser(userEmail) {
      if (!confirm("Are you sure you want to lock/unlock this user?")) return;

      // Locks user account if user confirms
      const user = this.users.find(u => u.email === userEmail);
      if (user) {
        user.enabled = !user.enabled;
        console.log(`${user.fullName} account locked status is now: ${!user.enabled ? 'Locked' : 'Unlocked'}`);
      }

      // Adjust filter to fit with users
      this.filteredUsers = this.filteredUsers.map(u =>
          u.email === userEmail ? { ...u, enabled: user.enabled } : u
      );
      // try {
      //   const response = await axios.delete("https://localhost:8080/deleteProfile");
      //   console.log("Response", response);
      //   this.users = this.users.filter(user => user.email !== userEmail);
      // } catch(error) {
      //   console.error("Error deleting user: ", error);
      // }
    },
    // This part was created by Luke T.
    promoteUser(userEmail) {
      if (!confirm("Are you sure you want to promote/demote this user?")) return;

      // Changes user role to admin if admin confirms
      const user = this.users.find(u => u.email === userEmail);
      if (user) {
        const isAdmin = user.authorities.includes("ROLE_ADMIN");

        if (isAdmin) {
          user.authorities = user.authorities.filter(role => role !== "ROLE_ADMIN");
          console.log(`${user.fullName} has been demoted from admin.`);
        } else {
          user.authorities.push("ROLE_ADMIN");
          console.log(`${user.fullName} has been promoted to admin.`);
        }
      }

      // Adjusts filter to fit with updated table
      this.filteredUsers = this.filteredUsers.map(u =>
          u.email === userEmail ? { ...u, authorities: user.authorities } : u
      );
    }
  }
};

</script>

<template>
  <div class="p-4">
    <h1>Admin Page</h1>
    <h2 class="text-xl font-bold mb-4">User List</h2>

    <!-- Search Bar -->
    <SearchBar
        :data="users"
        :searchKeys="['fullName', 'email']"
        placeholder="Search by name or email"
        @update:results="filteredUsers = $event"
    />

    <table class="min-w-full border border-gray-300">
      <thead>
      <!-- Adjustments to the columns to display more information -->
      <tr class="bg-gray-100">
        <th class="border px-4 py-2">Name</th>
        <th class="border px-4 py-2">Email</th>
        <th class="border px-4 py-2">Verified?</th>
        <th class="border px-4 py-2">Enabled</th>
        <th class="border px-4 py-2">Admin</th>
        <th class="border px-4 py-2">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in filteredUsers" :key="user.email" class="hover:bg-gray-50">
        <td class="border px-4 py-2">{{ user.fullName }}</td>
        <td class="border px-4 py-2">{{ user.email }}</td>
        <td class="border px-4 py-2">{{ user.emailVerified }}</td>
        <td class="border px-4 py-2">{{ user.enabled }}</td>
        <td class="border px-4 py-2">
          {{ user.authorities.includes('ROLE_ADMIN') ? 'Yes' : 'No' }}
        </td>
        <td class="border px-4 py-2 space-x-2">
          <!-- In case the admin wants to freeze a user's account -->
          <button
              @click="deleteUser(user.email)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            {{ user.enabled ? 'Lock' : 'Unlock' }}
          </button>
          <!-- In case an admin wants to promote a user to admin -->
          <button
              @click="promoteUser(user.email)"
              class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            {{ user.authorities.includes('ROLE_ADMIN') ? 'Demote' : 'Promote' }}
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<style scoped>

</style>