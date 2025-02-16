<!--displays a 20x20 map with a moving point. WIP
  Used in:
    AccessMapView-->
<template>
  <div>
  <Scatter :data="data"
           :options="chartConfig.options"
  />
  </div>
</template>

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

//when the chart becomes mounted, a point gets placed every second
onMounted(() => {
  setInterval(() => {
    //set data to random value
    data.value = chartConfig.randomData()

  }, 1000 )//1 second
})





</script>