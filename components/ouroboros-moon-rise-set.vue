<template>
  <div class="parent">
    <div>
      <div class="sub">
        <div id="container1">
          <div class="crosshair-x"></div>
          <div class="crosshair-y"></div>
        </div>
      </div>
      <div class="sub">
        <div id="container2">
          <div class="crosshair-x"></div>
          <div class="crosshair-y"></div>
        </div>
      </div>
    </div>
    <div class="d-flex align-center flex-column">


      <v-card width="360">

        <v-form ref="form" @submit.prevent @keyup.enter="refreshData">
          <v-text-field
              v-model="city"
              label="Enter a place name"
              :loading="pending"
          ></v-text-field>
        </v-form>

        <!--        <v-card-item>-->
        <!--          <v-card-title>This is a title</v-card-title>-->

        <!--          <v-card-subtitle>This is a subtitle</v-card-subtitle>-->
        <!--        </v-card-item>-->

        <v-card-title>Location</v-card-title>
        <v-card-text>
          lat:{{ response.location.latitude }} <br>
          lon:{{ response.location.longitude }}<br>
          city:{{ response.location.city }}<br>
          country:{{ response.location.country }} <br>
          state:{{ response.location.state }}<br>
          current_time:{{ response.current_time }}<br>
          date:{{ response.date }}
        </v-card-text>
        <v-card-title>Info</v-card-title>
        <v-card-text>
          moonrise: {{ response.moonrise }} <br>
          moonset: {{ response.moonset }} <br>
          moon_altitude: {{ response.moon_altitude }} <br>
          moon_azimuth: {{ response.moon_azimuth }} <br>
          moon_distance: {{ response.moon_distance }} <br>
          moon_parallactic_angle: {{ response.moon_parallactic_angle }}
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import {useDayOfTheYear} from "@/composables/doy";
import {markHours} from "@/utils/markHours";
import {minutesToHoursMinutes} from "@/utils/MinutesToHoursMinutes";

const city = ref('jangaon');
const {doy, progress} = useDayOfTheYear();
const fieldSize = ref('6px');

const fieldColor = ref('dodgerblue');
const apiKey = '98ba2cc5654d49dfb4aa05c96f4c2fca';

const {
  data: response,
  refresh,
  pending,
  error
} = await useAsyncData('count', () => $fetch(`https://api.ipgeolocation.io/astronomy?apiKey=${apiKey}&location=${city.value}`));


const moonRise = computed(() => {
  let data = response.value.moonrise.split(":");
  return Number(data[0]) * 60 + Number(data[1]);
});

const moonSet = computed(() => {
  let data = response.value.moonset.split(":");
  return Number(data[0]) * 60 + Number(data[1]);
})

const currentTime = computed(() => {
  let data = response.value.current_time.split(":");
  return Number(data[0]) * 60 + Number(data[1]);
})
// console.log('monoRise is', moonRise);
// console.log('moonset is', moonSet);
// console.log('the moonrise in minutes are', moonRiseInMin);
// console.log('the moonset in minutes are', moonSetInMin);
// console.log('the current time is', currentTime);
// console.log('the current time in min is', currentTimeInMin);


function createFields(no, {start, end, label}) {
  const container = document.querySelector(`#container${no}`);
  for (let i = start; i <= end; i++) {
    let field = document.createElement('div');
    field.classList.add(`field${no}`, `el${i}`, `field`, `tooltip`);
    field.addEventListener('mouseenter', () => {
      field.style.zIndex = "999999999999";
    })
    field.setAttribute(
        "data-title",
        `${i},
          ${minutesToHoursMinutes(i)},
     `)

    if (i === currentTime.value) {
      field.classList.add("current-minute");
    }


    markHours(i, field);

    if (label === true) {
      field.textContent = `${i}`
    }
    container.append(field);
  }

}

function distributeFields(no, {radius}) {
  const fields = document.querySelectorAll(`.field${no}`);
  const container = document.querySelector(`#container${no}`);
  const width = container.offsetWidth;
  const height = container.offsetHeight;
  let angle = 0;
  const step = (2 * Math.PI) / fields.length;
  fields.forEach((field) => {
    let x, y;
    if (no === 1) {
      x = Math.round(width / 2 + radius * Math.cos(angle) - field.style.width / 2);
      y = Math.round(height / 2 + radius * Math.sin(angle) - field.style.height / 2);
    }
    if (no === 2) {
      y = Math.round(width / 2 + radius * Math.cos(angle) - field.style.width / 2);
      x = Math.round(height / 2 + radius * Math.sin(angle) - field.style.height / 2);
    }
    field.style.left = `${x}px`

    field.style.top = `${y}px`
    angle += step;
  });

}


let radius;
const label = false;

if (window.innerWidth <= 600) {
  radius = 163
}else {
  radius = 198
}


function generateFields() {
  if (moonSet.value < moonRise.value) {
    createFields(1, {start: moonRise.value, end: 1440, label});
    createFields(1, {start: 0, end: moonSet.value, label});
    createFields(2, {start: moonSet.value + 1, end: moonRise.value - 1, label});
  }
  if (moonSet.value > moonRise.value) {
    createFields(1, {start: moonRise.value, end: moonSet.value, label});
    if (moonSet.value !== 1440) {
      createFields(2, {start: moonSet.value + 1, end: 1440, label});
    }
    createFields(2, {start: 0, end: moonRise.value - 1, label});
  }
  distributeFields(1, {radius});
  distributeFields(2, {radius});
}


function resetFields() {
  const fields = document.querySelectorAll(".field");
  fields.forEach((field) => {
    field.remove();
  })
}

async function refreshData() {
  refresh();
}

onMounted(() => {
  resetFields();
  generateFields();
})

watch(response, () => {
  console.log('response moon is', response.value);
  resetFields();
  generateFields();
})


</script>

<style scoped>

.parent {
  display: grid;
  place-items: center;
  margin-top: 2rem;
  grid-template-columns: 1fr 1fr;

}

@media only screen and (max-width: 600px) {
  .parent {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    align-items:start;
    justify-items: center;
    grid-gap: 2rem;

  }
}

.sub {
  border: 1px solid #000;
}

#container1 {
  width: 400px;
  height: 400px;
  position: relative;
  rotate: 90deg;
  margin-left: 10px;
  margin-bottom: 4px;
}

#container2 {
  width: 400px;
  height: 400px;
  position: relative;
  rotate: 180deg;
  margin-left: 10px;
  margin-top: 4px;
}

@media only screen and (max-width: 600px) {
  #container1, #container2{
    width: 330px;
    height: 330px;
  }
}

.parent :deep(.field) {
  width: v-bind(fieldSize);
  height: v-bind(fieldSize);
  position: absolute;
  background: v-bind(fieldColor);
  border-radius: 50%;
  transform-origin: center;
  font-size: .3rem;
  color: grey;
  cursor: pointer;
  white-space: nowrap;
  word-wrap: break-word;
  transition: all .1s linear;
  z-index: -1;
}

.parent :deep(.field:hover) {
  scale: 3
}

.parent :deep(.field1) {
  rotate: -90deg;
}

.parent :deep(.field2) {
  rotate: -180deg;
}

.crosshair-x {
  width: 400px;
  height: 1px;
  background: #000;
  position: absolute;
  left: 0;
  top: 200px;
}

.crosshair-y {
  width: 1px;
  height: 400px;
  background: #000;
  position: absolute;
  left: 200px;
  top: 0;
}

@media only screen and (max-width: 600px) {
  .crosshair-x{
    width: 330px;
    top: 165px;
  }
  .crosshair-y{
    height: 330px;
    left:165px
  }

}

/*.tooltip{*/
/*  position:relative;*/
/*  display: inline-block;*/
/*}*/


.parent :deep(.tooltip[data-title]:hover:after) {
  content: attr(data-title);
  padding: 4px 8px;
  color: #fff;
  position: absolute;
  left: 5px;
  top: -10px;
  white-space: nowrap;
  border-radius: 2px;
  background: #000;
  z-index: 9999!important;
}

.parent :deep(.hours) {
  scale: 3.5;
  font-size: .20rem;
  color: white;
  background-color: black;
  border: 1px solid black;
  font-weight: bold;
  z-index: 2;
}
.parent :deep(.hours:hover){
  scale: 4.5;
}

.parent :deep(.current-minute) {
  scale: 5;
  z-index: 10 !important;
  /*display: block;*/
  background-color: transparent;
  background-image: url("/moon15.png");
  background-size: cover;
  /*font-size: 0;*/
  border:none
}

.parent :deep(.current-minute:hover) {
  scale: 6;
}

/*.hours:hover{*/
/*  scale: 1.3;*/

/*}*/
</style>