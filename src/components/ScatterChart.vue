<!--displays a 20x20 map with a moving point. WIP
  Used in:
    AccessMapView-->
<template>
  <div class="w-full h-[calc(100vh-4rem)] flex flex-col items-center justify-start relative">



    <!-- Chart Area-->
    <div class="relative w-full max-w-[900px] h-[350px] px-6 sm:px-8 mx-auto">

      <!-- Overlay -->
      <div
          v-if="showOverlay"
          class="absolute rounded-md inset-0 z-40 bg-gray-500/10 backdrop-blur-sm shadow-md border border-white/20 flex items-center justify-center"
      >
        <button
            @click="showOverlay = false"
            class="px-6 py-3 rounded-lg text-white bg-blu800 hover:bg-blu700 roboto-semibold text-lg shadow-lg border border-white/20 transition inline-flex items-center gap-2"
        >
          <PlayCircleIcon class="w-5 h-5"/>
          Begin Tracking
        </button>
      </div>

      <Scatter :data="data" :options="chartConfig.options" />
    </div>

    <!--Control Buttons-->
    <div class = "mt-4 flex gap-4"   v-if="!showOverlay">

      <!--NewPath/ EndPath Button -->
      <button class="button-c bg-blu800 hover:bg-blu600 inline-flex items-center gap-2 roboto-semibold" @click="newPathButton()">
        <MapPinIcon class="w-5 h-5"/>
        {{ pathOn ? 'End Path' : 'New Path'}}
      </button>

      <!-- Pause/ Resume Button -->
      <!-- In future pause button will only work when a path is being tracked. We have boolean operators to
       decide what color and what icon is showing based on the state of the button-->
      <button @click="togglePause()"
              :class="['button-c inline-flex items-center gap-2 text-white transition ', isPaused
      ? 'bg-emerald-500 hover:bg-emerald-600'
      : 'bg-amber-300 hover:bg-yellow-500']" >
        <component :is="isPaused ? PlayIcon : PauseIcon" class="w-5 h-5" />
        {{ isPaused ? 'Resume' : 'Pause' }}
      </button>

      <!-- Assign Color Button -->
      <button class="button-c bg-blu800 hover:bg-blu600 inline-flex items-center gap-2 roboto-semibold" @click="newColorButton()">
        <PaintBrushIcon class="w-5 h-5"/>
        Random Color
      </button>

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

  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button-c:hover {

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
import {PlayIcon, PauseIcon, PaintBrushIcon, MapPinIcon} from "@heroicons/vue/24/outline";
import {PlayCircleIcon} from "@heroicons/vue/24/solid";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

//create empty data structure
const data = ref<ChartData<'line'>>({
  datasets: []
})

//Path start Stop button variables, color  variables
let newColor = "#2980b9" //new color to toggle to
let pathOn = false // toggles when pressing New Path button
let pathName;

// reactive state variable for pause/resume button
const isPaused = ref(false)

//Toggle logic for pause/resume button
function togglePause(){
  isPaused.value = !isPaused.value;
}

//reactive state variable for overlay and Begin button.
// To be displayed before user chooses to begin tracking (Dashboard view)
const showOverlay = ref(true)





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