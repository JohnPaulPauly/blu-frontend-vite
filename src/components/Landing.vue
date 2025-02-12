<template>
  <div class="dashboard-buttons">
    <button class="btn">Join Map Queue</button>
    <button class="btn">Access Previous Paths</button>
    <button class="btn disabled">Pair New Device</button>
  </div>
</template>

<script>
export default {
  name: "DashboardButtons",
};
</script>

<style scoped>
.dashboard-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 50px;
}
.btn {
  background-color: #0033cc;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}
.btn.disabled {
  background-color: #b3c6ff;
  cursor: not-allowed;
}
</style>