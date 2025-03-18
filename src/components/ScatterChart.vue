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
let pathOn = false // toggles when pressing New Path button
let pathName;



//when the chart becomes mounted, a point gets placed every second
onMounted(() => {

  const client = new Client({

    brokerURL: 'http://localhost:8080/ws/livepath',

    onConnect: () => {
      console.log("It's in. Oh my god it's in!")
      //Subscribe to /topic/{email} of the user to get data stream of their active device
      client.subscribe(`/topic/ntsimerekis@yahoo.com`, message => {
        //This function runs everytime a message is received in the channel


        //Unlike axios, StompJS does not automatically translate Javascript Objects :(
        var position = JSON.parse(message.body)
        console.log(`Received X: ${position.x}`)
        console.log(`Received Y: ${position.y}`)


        if (pathOn)
        {
          data.value = chartConfig.addData(data.value.datasets, position)
        }
        else
          data.value = chartConfig.newData(position)

        //colors are updated
        data.value.datasets[0].backgroundColor = newColor
        data.value.datasets[0].borderColor = newColor
      });
    },
  });
  client.activate();
})


function newPathButton() {
  //starts a new path


  //end path
  if (pathOn) {

    axios.post(`http://localhost:8080/paths/${pathName}/stop`)
        .then(() => {
          pathOn = false
          console.log(`Path ${pathName} ended.`)
        })
        .catch(error => console.error(error))

  }
  //new path
  else {
    while (!pathOn) {
      pathName = prompt(' Please input Path name:', 'mypath')

      //WIP, need to check filename against the user's already created files,
      // then send the name to the backend where it will store the file
      axios.post(`http://localhost:8080/paths/${pathName}`)
          .then(() => console.log("New path started."))
          .catch(error => console.log(error))
      pathOn = true
    }
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