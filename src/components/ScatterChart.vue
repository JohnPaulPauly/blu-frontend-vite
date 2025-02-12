<template>
  <Scatter :data="data"
           :options="chartConfig.options"
  />
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


const data = ref<ChartData<'line'>>({
  datasets: []
})

onMounted(() => {
  setInterval(() => {
    data.value = chartConfig.randomData()

  }, 1000)
})





</script>