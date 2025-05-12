<!--displays a 20x20 map with a moving point. WIP
  Used in:
    -->
<template>
  <div class="container">
    <button class="button-c" @click="TracePathButton()">{{ traceOn ? 'End Trace' : 'Trace Path' }}</button>
    <button class="button-c" @click="AnnotateButton()">{{ annotateOn ? 'Stop' : 'Annotate' }}</button>
    <div class="chart-div">
      <Scatter :data="data" :options="traceOptions()" />
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
import * as helpers from "chart.js/helpers";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

//create empty data structure
const data = ref<ChartData<'line'>>({
  datasets: []
})

let annotateOn = ref(false)
let color = "#2980b9" //new color to toggle to


let traceOn = false // toggles when pressing New Path button
let isDisabled = false
let outer_sem = 0

let annotateStrings = []

function TracePathButton() {
  //traces a path



  //stop tracing path
  if (traceOn) {

    traceOn = false
    data.value = chartConfig.clearData()
    if (annotateOn.value)
      AnnotateButton()
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
    const dataTimestamps = [0,1000,2000,3000]//change to real data when this gets plugged in
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
        data.value = chartConfig.newData(data.value.datasets, positions[i])
      else
        data.value = chartConfig.addData(data.value.datasets, positions[i])
      data.value.datasets[0].backgroundColor = color
      data.value.datasets[0].borderColor = color
      if (intervals.length > 1)
        setTimeout(run, intervals[i+1] - intervals[i++])
    }

  }
  run();

}

function AnnotateButton(){

  if(traceOn)
    annotateOn.value = !annotateOn.value

}

const traceOptions  = (size=20) => ({
  legend: false,
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1,
  showLine: true,
  animation: false,
  events: ["click"],
  scales: {
    x: {
      position: "top",
      min: -(size / 2),//these values will be set for whatever the device's size is
      max: (size / 2)
    },
    y: {
      position: "right",
      min: -(size / 2),//these values will be set for whatever the device's size is
      max: (size / 2)
    },
  },
  onClick: (event,elements,chart) => {
    if (annotateOn.value && traceOn) {
      const canvasPosition = helpers.getRelativePosition(event, chart);
      const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
      const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
      const message = prompt("annotation message:")
      data.value = chartConfig.addAnnotatePoint(chart.data.datasets, {x: dataX, y: dataY,}, message)
    }
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function(context) {
          const dataset = context.dataset;
          const { x, y } = context.parsed;


          const baseText = dataset.customTooltip || dataset.label || 'Data';

          return `${baseText}: (x=${x}, y=${y})`;
        }
      }
    },
    legend: {
      display: false
    }
  }
})



</script>