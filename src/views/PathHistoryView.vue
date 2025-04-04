<script>
// File Created by Luke Trinh
import axios from 'axios';
import bluLogo from "@/assets/images/BluCombinedLogo.svg";
import SearchBar from "@/components/SearchBar.vue";
export default{
  components: {SearchBar},
  // Default paths and sorting order
  data() {
    return {
      paths: [],
      sortBy: null,
      sortOrder: 1
    };
  },
  // Load all the paths under the user
  async mounted() {
    await this.listHistory();
  },
  methods: {
    // Lists all paths
    async listHistory() {
      // Fetches all paths from backend
      try {
        const response = await axios.get("http://localhost:8080/paths/");
        this.paths = response.data;
      }catch(error) {
        console.error("No Paths under user")
      }
    },
    // Simple delete function
    deletePath(index){
      this.paths.splice(index, 1);
    },
    // Tester to add dummy data
    addTrial() {
      const currentHour = new Date().getHours(); // Get current hour
      const currentMinutes = new Date().getMinutes(); // Get current minutes
      const newPath = {
        pathName: `device${this.paths.length + 1}`,
        ipAddress: "0000:0000:0000:0000:0000:0000:0000:0000",
        time: `${currentHour}:${currentMinutes}` // Displaying current hour
      };
      if (!this.paths) {
        this.paths = [];
      }
      this.paths.push(newPath);
    },
    // Sort path on columns
    sortPaths(column) {
      if (this.sortBy === column) {
        this.sortOrder *= -1; // Toggle sort order if already sorting by the same column
      } else {
        this.sortBy = column;
        this.sortOrder = 1; // Default to ascending when switching columns
      }
      // Sort based on specific criteria
      this.paths.sort((a, b) => {
        if (column === "pathName") {
          return a.pathName.localeCompare(b.pathName) * this.sortOrder;
        } else if (column === "time") {
          const [hourA, minuteA] = a.time.split(":").map(Number);
          const [hourB, minuteB] = b.time.split(":").map(Number);
          if (hourA !== hourB) {
            return (hourA - hourB) * this.sortOrder;
          } else {
            return (minuteA - minuteB) * this.sortOrder;
          }
        }
        return 0;
      });
    }
  }
};
</script>


<template>
  <div class="flex justify-center items-start min-h-screen p-4">
    <div class="w-3/4 max-w-4xl flex flex-col">
      <h2 class="text-xl font-bold mb-4 text-center">Path history</h2>

      <button
          @click="addTrial"
          class="mb-4 bg-blue-500 text-white px-4 py-2 rounded self-center"
      >
        Add Trial
      </button>
      <SearchBar
          placeholder="Search users by name or email"
      />

      <div class="overflow-y-auto max-h-[500px] border border-gray-300">
        <table class="min-w-full text-center">
          <thead class="bg-gray-100 sticky top-0">
          <tr>
            <th class="border px-6 py-2 cursor-pointer" @click="sortPaths('pathName')">
              Name
              <span v-if="sortBy === 'pathName'">{{ sortOrder === 1 ? "▲" : "▼" }}</span>
            </th>
            <th class="border px-6 py-2">IPv6 Address</th>
            <th class="border px-6 py-2 cursor-pointer" @click="sortPaths('time')">
              Time
              <span v-if="sortBy === 'time'">{{ sortOrder === 1 ? "▲" : "▼" }}</span>
            </th>
            <th class="border px-6 py-2">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="(path, index) in paths"
              :key="index"
              class="hover:bg-gray-50"
          >
            <td class="border px-6 py-2">{{ path.pathName }}</td>
            <td class="border px-6 py-2">{{ path.ipAddress }}</td>
            <td class="border px-6 py-2">{{ path.time }}</td>
            <td class="border px-6 py-2">
              <button
                  @click="deletePath(index)"
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
/* Ensure the table header remains fixed */
thead {
  position: sticky;
  top: 0;
  z-index: 10;
}
th {
  cursor: pointer;
  user-select: none;
}
</style>