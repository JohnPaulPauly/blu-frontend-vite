<!--displays a 20x20 map with a moving point. WIP
  Used in:
    AccessMapView-->
<template>
  <div class="chart-div">
  <Scatter :data="data"
           :options="chartConfig.options"
           ref="scatter"
  />
    <input>
  </div>

</template>

<style scoped>
.chart-div {
  width: 500px;
  height: 500px;
}
</style>

<script lang="ts" setup>

import { ref, onMounted } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  ChartData,
  PointElement
} from 'chart.js'
import { Scatter } from 'vue-chartjs'
import * as chartConfig from '@/ChartConfig'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

//create empty data structure
const data = ref<ChartData<'line'>>({
  datasets: []
})
let newColor = "#00ff00"
let dataHolder;

//when the chart becomes mounted, a point gets placed every second
onMounted(() => {
  data.value = chartConfig.randomData()
  setInterval(() => {


    data.value = chartConfig.randomData(data.value.datasets)
    //data.value = chartConfig.addData(data.value)
    //data.value = chartConfig.moveData(data.value.datasets[0].data[0].x, data.value.datasets[0].data[0].y)

    // data.value.datasets[0].backgroundColor = newColor
    // if (newColor === "#00ff00")
    //   newColor = "#ff0000"
    // else
    //   newColor = "#00ff00"
  }, 1000 )//1 second
})




</script>