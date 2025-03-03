<!--Displays map. WIP-->
<template>
  <button @click="color()">color</button>
  <div class="content-center">
    <h1>AccessMapView</h1>
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
