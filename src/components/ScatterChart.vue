<!--displays a 20x20 map with a moving point. WIP
  Used in:
    AccessMapView-->
<template>
  <div class="rowize">
    <div class="chart-div">
      <Scatter :data="data" :options="chartConfig.options()" />
    </div>
    <div class="columnize">

      <button :class="pathOn ?  'button-end-path' :'button-new-path'" @click="newPathButton()">{{ pathOn ? 'End Path' : 'New Path'}}</button>
      <button class="button-pause" @click="PausePathButton()">{{pathPaused ? '▶' : '⏸'}}</button>
      <button class="button-new-color" @click="newColorButton()">Random Color</button>
      <button class="button-c" @click="addPointsButton()">{{pointsOn ? 'Remove points' : 'Add points'}}</button>
      <p><span id="stopwatch">0:00</span></p>
    </div>


  </div>
</template>

<style scoped>
.columnize {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rowize {
  display: flex;
  flex-direction: row;
  align-items: center;

}

.button-new-path {
  margin-bottom: 10px;
  padding: 8px 16px;
  font-size: 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.button-end-path {
  margin-bottom: 10px;
  padding: 8px 16px;
  font-size: 16px;
  background-color: #ef1022;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button-new-color {
  margin-bottom: 5px;
  padding: 4px 8px;
  font-size: 14px;
  background-color: #dbe0e0;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button-pause {
  margin-bottom: 10px;
  padding: 8px 16px;
  font-size: 30px;
  background-color: #dbe0e0;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.button-unpause {
  margin-bottom: 10px;
  padding: 8px 16px;
  font-size: 16px;
  background-color: #dbe0e0;
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

let newColor = "#2980b9" //new color to toggle to
let pathOn = false // toggles when pressing New Path button
let pathName: string
let pathPaused = false
let pathTime = 0
let Interval ;
let appendStopwatch;
let tens = 0;
const deviceSize = 20//change to device size get mapping
const pointRadius = .3
let OutofBoundsAlready =  false
let pointsOn = false

//when the chart becomes mounted, a point gets placed every second
onMounted(() => {
   appendStopwatch = document.getElementById("stopwatch")
  const client = new Client({

    brokerURL: 'http://localhost:8080/ws/livepath',

    onConnect: () => {
      console.log("It's in. Oh my god it's in!")
      //Subscribe to /topic/{email} of the user to get data stream of their active device
      client.subscribe(`/topic/ntsimerekis@yahoo.com`, message => {
        //This function runs everytime a message is received in the channel


        //Unlike axios, StompJS does not automatically translate Javascript Objects :(
        var position = JSON.parse(message.body)
        console.log(`Received Position: (${position.x}, ${position.y}), Timestamp: ${position.timestamp}`)

        if (pathOn)
        {
          if (!pathPaused)
          data.value = chartConfig.addData(data.value.datasets, position)
        else
          data.value = chartConfig.newData(data.value.datasets, position)

        //alert if out of bounds, only alert once until returning to the map
        if (Math.abs(position.x) > deviceSize/2 || Math.abs(position.x) > deviceSize/2)
          if (!OutofBoundsAlready) {
            alert("tracker leaving the devices boundaries! this may lead to less accurate tracking.")
            OutofBoundsAlready = true
          }
        else
          OutofBoundsAlready = false

        if (pointsOn) {
          //data.value = chartConfig.addPoint(data.value.datasets, {x: 0, y: 0})
          if (data.value.datasets.length > 1 && pathOn)
            for (let i = 1; i < data.value.datasets.length; i++)
              if  (distToSegment(data.value.datasets[i].data[0], data.value.datasets[0].data[data.value.datasets[0].data.length-2], data.value.datasets[0].data[data.value.datasets[0].data.length-1]) <= pointRadius) {
                console.log("point crossed")
                data.value.datasets[i].backgroundColor = "#ffa0a0"
                data.value.datasets[i].borderColor = "#ffa0a0"
            }
        }
        else if (!pointsOn && data.value.datasets != undefined && data.value.datasets.length > 1){
          data.value = chartConfig.removePoints(data.value.datasets)
        }
        //colors are updated
        if (data.value.datasets != undefined) {
          data.value.datasets[0].backgroundColor = newColor
          data.value.datasets[0].borderColor = newColor
        }
      });
    },
  });
  client.activate();
})






function newPathButton() {
  //starts a new path


  //end path
  if (pathOn) {

    axios.post(`http://localhost:8080/paths/ntsimerekis@yahoo.com/${pathName}/stop`)
        .then((response) => {
          pathOn = false
          console.log(`Path ${pathName} ended.`);
          console.log(response)
          clearInterval(Interval)
          tens = 0
        })
        .catch(error => console.error(error))

  }
  //new path
  else {
    while (!pathOn) {
      pathName = prompt(' Please input Path name:', 'mypath')
      if (pathName != null) {
        //WIP, need to check filename against the user's already created files,
        // then send the name to the backend where it will store the file
        clearInterval(Interval)
        Interval = setInterval(incTimer, 10)
        axios.post(`http://localhost:8080/paths/ntsimerekis@yahoo.com/${pathName}`)
            .then((response) => {console.log("New path started.");
                                 console.log(response);
            })
            .catch(error => console.log(error))
        pathOn = true
      }
      else
        break
    }
  }
}


function newColorButton() {
  //sets the point color to a new color


  function getRandomColor() {
    let letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++)
      color += letters[Math.floor(Math.random() * 16)]

    return color
  }

  newColor = getRandomColor()
}

function PausePathButton() {
  console.log("paused")
  if (!pathOn)
     return
  if (pathPaused){
    axios.post(`http://localhost:8080/paths/ntsimerekis@yahoo.com/${pathName}/resume`)
    pathPaused = false

  }
  else {
      axios.post(`http://localhost:8080/paths/ntsimerekis@yahoo.com/${pathName}/pause`)
      pathPaused = true


  }
}


function addPointsButton(){

  if (pointsOn)
    data.value = chartConfig.removePoints(data.value.datasets)

  pointsOn = !pointsOn
  chartConfig.flipPointsOn()

}

 const options  = (size=20) => ({
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
    if (pointsOn) {
      const canvasPosition = helpers.getRelativePosition(event, chart);
      const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
      const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
      data.value = chartConfig.addPoint(chart.data.datasets, {x: dataX, y: dataY})
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
})

//algorithm for finding a points distance from a line segment

function sqr(x) { return x * x }
function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
function distToSegmentSquared(p, v, w) {
  var l2 = dist2(v, w);
  if (l2 == 0) return dist2(p, v);
  var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return dist2(p, { x: v.x + t * (w.x - v.x),
    y: v.y + t * (w.y - v.y) });
}
function distToSegment(point, prevPosition, currPosition) { return Math.sqrt(distToSegmentSquared(point, prevPosition, currPosition)); }


function incTimer() {
  if (!pathPaused) {
    tens++
    const secondsDisplay = Math.floor(tens / 100)
    const tensDisplay = tens % 100

    if (tensDisplay <= 9)
      appendStopwatch.innerHTML = secondsDisplay + ":0" + tensDisplay
    else
      appendStopwatch.innerHTML = secondsDisplay + ":" + tensDisplay
  }
}


</script>