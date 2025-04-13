<!--Displays map. WIP-->
<template>
  <div class="content-center">
    <ScatterChart/>
  </div>

</template>




<script>
import ScatterChart from '@/components/ScatterChart.vue'
export default {
  name: "AccessMapView",
  components: {ScatterChart},
  methods: {
    color(){
      console.log("hello")
    }
  }
}
</script>
