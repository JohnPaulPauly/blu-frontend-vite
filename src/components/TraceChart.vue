<!--displays a 20x20 map with a moving point. WIP
  Used in:
    -->
<template>
  <div class="container">
    <button class="button-c" @click="TracePathButton()">{{ traceOn ? 'End Trace' : 'Trace Path' }}</button>
    <div class="chart-div">
      <Scatter :data="data" :options="chartConfig.options" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-c {
  margin-bottom: 10px;
  padding: 8px 16px;
  font-size: 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button-c:hover {
  background-color: #2980b9;
}

.chart-div {
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>



<script lang="ts" setup>

import axios from 'axios';
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
import {Client} from "@stomp/stompjs";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

//create empty data structure
const data = ref<ChartData<'line'>>({
  datasets: []
})


let newColor = "#2980b9" //new color to toggle to


let traceOn = false // toggles when pressing New Path button
let isDisabled = false
let outer_sem = 0

function TracePathButton() {
  //traces a path



  //stop tracing path
  if (traceOn) {

    traceOn = false
    data.value = chartConfig.clearData()
  }
  //start tracing path
  else {
    isDisabled = true
    setTimeout(() => {
      isDisabled = false;
    }, 1000);
    traceOn = true
    data.value = chartConfig.clearData()
    //refactor csv
    const dataTimestamps = [0,2000,1000,3000]//change to real data when this gets plugged in
    const positions = [{x:1,y:1},{x:2,y:6},{x:3,y:3},{x:4,y:4}]


    let tmp = dataTimestamps;

    for (let i = 0; i < tmp.length; i++)
      tmp[i] -= dataTimestamps[0]

    const intervals = tmp;

    doOnTimeout(intervals,positions)


  }

}

function doOnTimeout(intervals, positions){
  let inner_sem = ++outer_sem
  let i = 0
  function run() {


    if (i < intervals.length && traceOn && outer_sem === inner_sem) {
      console.log("data traced")
      if (i === 0)
        data.value = chartConfig.newData(positions[i])
      else
        data.value = chartConfig.addData(data.value.datasets, positions[i])
      data.value.datasets[0].backgroundColor = newColor
      data.value.datasets[0].borderColor = newColor
      if (intervals.length > 1)
        setTimeout(run, intervals[++i])
    }

  }
  run();

}


</script>