<!--displays a 20x20 map with a moving point. WIP
  Used in:
    AccessMapView-->
<template>
  <div class="container">
    <button class="button-c" @click="newPathButton()">{{ pathOn ? 'End Path' : 'New Path'}}</button>
    <button class="button-c" @click="newColorButton()">Random Color</button>
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

let newColor = "#2980b9" //new color to toggle to
let pathOn = false // toggles when pressing New Path button
let csv = []



//when the chart becomes mounted, a point gets placed every second
onMounted(() => {
  data.value = chartConfig.randomData()
  setInterval(() => {

    if (pathOn)
    {
      data.value = chartConfig.randomAddData(data.value.datasets)
      csv.push({
        timestamp: Date.now(),
        x: data.value.datasets[0].data[data.value.datasets[0].data.length - 1].x,
        y: data.value.datasets[0].data[data.value.datasets[0].data.length - 1].y
      })
    }
    else
      data.value = chartConfig.randomData()

    //colors are updated
    data.value.datasets[0].backgroundColor = newColor
    data.value.datasets[0].borderColor = newColor
  }, 1000 )//1 second
})


function newPathButton() {
  //starts a new path

  if (pathOn) {

    //WIP, need to check filename against the user's already created files,
    // then send the data to the backend where it will create the csv

    pathOn = false;
  }
  else {
    pathOn = true;
    let filename = prompt(' Please input Path name:', 'mypath')
  }

}

function newColorButton() {
  //sets the point color to a new color


  function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++)
      color += letters[Math.floor(Math.random() * 16)]

    return color
  }
  newColor = getRandomColor()
}

</script>