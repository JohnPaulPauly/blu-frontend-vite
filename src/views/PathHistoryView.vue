<script>
// File Created by Luke Trinh
import axios from 'axios';
import bluLogo from "@/assets/images/BluCombinedLogo.svg";
import SearchBar from "@/components/SearchBar.vue";
import { ArrowDownOnSquareStackIcon, TrashIcon} from '@heroicons/vue/24/solid';
export default{
  components: {SearchBar, ArrowDownOnSquareStackIcon, TrashIcon},
  // Default paths and sorting order
  data() {
    return {
      paths: [],
      filteredPaths: [], //will hold search results
      sortBy: null,
      sortOrder: 1,
      dropdownOpen: null, // Track which dropdown is open
    };
  },
  // Load all the paths under the user
  async mounted() {
    document.addEventListener("click", this.handleClickOutside);
    await this.listHistory();
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    handleClickOutside(event) {
      const dropdowns = document.querySelectorAll(".dropdown-button, .dropdown-menu");
      let clickedInsideDropdown = false;
      dropdowns.forEach((dropdown) => {
        if (dropdown.contains(event.target)) {
          clickedInsideDropdown = true;
        }
      });

      if (!clickedInsideDropdown) {
        this.dropdownOpen = null;
      }
    },
    toggleDropdown(index) {
      this.dropdownOpen = this.dropdownOpen === index ? null : index;
    },
    // Lists all paths
    async listHistory() {
      // Fetches all paths from backend
      try {
        const response = await axios.get("http://localhost:8080/paths/ntsimerekis@yahoo.com");
        this.paths = response.data;
        console.log("Fetched paths:", this.paths);
      }catch(error) {
        console.error("No Paths under user")
      }
      this.filteredPaths = [...this.paths];
    },
    // Simple delete function
    async deletePath(index){
      const path = this.paths[index];
      try {
        await axios.delete(`http://localhost:8080/paths/ntsimerekis@yahoo.com/${path.name}`);
        this.paths.splice(index, 1);
        this.filteredPaths = [...this.paths];
        this.message = "Path deleted successfully.";
        this.messageType = "success";
      } catch (error) {
        console.error("Error deleting path:", error);
        this.message = "Failed to delete path.";
        this.messageType = "error";
      }
    },

     addTrial() {
       return;
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
      this.filteredPaths.sort((a, b) => {
        if (column === "name") {
          return a.name.localeCompare(b.name) * this.sortOrder;
        } else if (column === "timestamp") {
          const dateA = new Date(a.timestamp);
          const dateB = new Date(b.timestamp);
          return (dateA - dateB) * this.sortOrder;
        }
        return 0;
      });
    },
    async downloadAsJSON(path) {
      try {
        const response = await axios.get(`http://localhost:8080/paths/ntsimerekis@yahoo.com/${path.name}?json=true`, {
          responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${path.name}.json`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading JSON:", error);
      }
    },
    async downloadAsCSV(path) {
      try {
        const response = await axios.get(`http://localhost:8080/paths/ntsimerekis@yahoo.com/${path.name}?json=false`, {
          responseType: 'blob', // Important: Get the response as a file/blob
        });

        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${path.name}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading CSV:", error);
      }
    },
    formatDate(dateString) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      return new Date(dateString).toLocaleString(undefined, options);
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = async (e) => {
        const text = e.target.result;
        const rows = text.trim().split("\n");

        // Assume first row is headers, skip it
        for (let i = 1; i < rows.length; i++) {
          const columns = rows[i].split(",");

          // Assuming CSV columns: name, ip_address, timestamp
          if (columns.length >= 3) {
            const newPath = {
              name: columns[0].trim(),
              ip_address: columns[1].trim(),
              timestamp: columns[2].trim(),
            };
            this.paths.push(newPath);
          }
        }
        this.filteredPaths = [...this.paths];
      };

      reader.readAsText(file);
    },
  },
};
</script>


<template>
  <div class="flex justify-center items-start min-h-screen p-4">
    <div class="w-3/4 max-w-4xl flex flex-col">
      <h2 class="text-xl font-bold mb-4 text-center">Path history</h2>

      <input
          type="file"
          ref="fileInput"
          accept=".csv"
          @change="handleFileUpload"
          class="hidden"
      />

      <button
          @click="triggerFileInput"
          class="mb-4 bg-blue-500 text-white px-4 py-2 rounded self-center"
      >
        Upload CSV
      </button>
      <SearchBar
          :data="paths"
          :searchKeys="['name', 'ip_address', 'timestamp']"
          placeholder="Search by name, IP address, or timestamp"
          @update:results="filteredPaths = $event"
      />

      <div class="border border-gray-300">
        <table class="min-w-full text-center">
          <thead class="bg-gray-100 sticky top-0">
          <tr>
            <th class="border px-6 py-2 cursor-pointer" @click="sortPaths('name')">
              Name
              <span v-if="sortBy === 'name'">{{ sortOrder === 1 ? "▲" : "▼" }}</span>
            </th>
            <th class="border px-6 py-2">IPv6 Address</th>
            <th class="border px-6 py-2 cursor-pointer" @click="sortPaths('timestamp')">
              Time
              <span v-if="sortBy === 'timestamp'">{{ sortOrder === 1 ? "▲" : "▼" }}</span>
            </th>
            <th class="border px-6 py-2">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="(path, index) in filteredPaths"
              :key="index"
              class="hover:bg-gray-50"
          >
            <td class="border px-6 py-2">{{ path.name }}</td>
            <td class="border px-6 py-2">{{ path.ip_address }}</td>
            <td class="border px-6 py-2">{{ formatDate(path.timestamp) }}</td>
            <td class="border px-6 py-2 relative">
              <div class="flex flex-col items-center gap-2">
              <button
                  @click="deletePath(index)"
                  class="bg-red-500 text-white px-3 py-1 rounded"
              >
                <TrashIcon class="w-5 h-5" />
              </button>

              <!-- Download dropdown -->
              <div class=" inline-block text-left">
                <button @click.stop="toggleDropdown(index)"
                class="dropdown-button bg-blu700 hover:bg-blu600 text-white font-bold py-1 px-3 rounded">
                  <ArrowDownOnSquareStackIcon class="w-5 h-5" />
                </button>

                <div v-if="dropdownOpen === index" class="absolute left-full top-0 ml-2 w-32 bg-white border rounded shadow-lg z-50">
                  <button @click="downloadAsJSON(path)" class="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    JSON
                  </button>
                  <button @click="downloadAsCSV(path)" class="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    CSV
                  </button>
                </div>
              </div>
              </div>
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
td {
  position: relative;
  overflow: visible; /* <--- important so dropdown is not clipped */
}

</style>