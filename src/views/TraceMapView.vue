<<!--Displays map. WIP-->
<template>
  <div class="content-center">
    <TraceChart/>
  </div>

</template>




<script>
import TraceChart from "@/components/TraceChart.vue";
export default {
  name: "TraceMapView",
  components: {TraceChart},
}
</script>
