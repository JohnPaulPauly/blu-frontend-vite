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
import { Client } from '@stomp/stompjs';

import axios from "axios";

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


  //Get a uuid for a new path session
  var uuid;

  //You will receieve path ID here
  axios.get("http://localhost:8080/paths/new").then((res) => {
    uuid = res.data;
    // console.log(uuid)
    console.log(`/positions/${uuid}`);
  })

  // const stompClient = new StompJs.Client({
  //   brokerURL: 'ws://localhost:8080/livepath'
  // });

  console.log(`/positions/${uuid}`);

  //Recieve PATH data for that path ID
  const client = new Client({
    brokerURL: 'http://localhost:8080/ws/livepath',

    onConnect: () => {
      console.log("It's in. Oh my god it's in!")
      client.subscribe(`/topic/[::1]`, message =>
          //PLOT
          console.log(`Received: ${message.body}`)
      );
    },
  });
  client.activate();


})






</script>