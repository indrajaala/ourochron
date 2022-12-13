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
    <div >
      <v-card width="360">
        <v-card-title>Seasons</v-card-title>
        <v-col
            cols="12"
            class="py-2"
        >
          <v-btn-toggle
              v-model="seasons"
              rounded="0"
              color="deep-purple-accent-3"
              group
          >
            <v-btn value="ritu">
              Ritu
            </v-btn>

            <v-btn value="astronomical">
              Astronomical
            </v-btn>
          </v-btn-toggle>
          <v-btn-toggle
              v-model="seasons"
              rounded="0"
              color="deep-purple-accent-3"
              group
          >
            <v-btn value="meteorological">
              Meteorological
            </v-btn>
            <v-btn value="solar">
              Solar
            </v-btn>

          </v-btn-toggle>


        </v-col>
        <v-card-text v-if="seasons === 'ritu'">
          <div class="seasons vasanta" ></div> Vasanta <br>
          <div class="seasons grishma" ></div> Grishma <br>
          <div class="seasons varsha" ></div> Varsha <br>
          <div class="seasons sharad" ></div> Sharad <br>
          <div class="seasons hemanta" ></div> Hemanta <br>
          <div class="seasons shishira" ></div> Shishira
        </v-card-text>
        <v-card-text v-if="seasons === 'astronomical' || seasons === 'meteorological' || seasons === 'solar'">
          <div class="seasons spring" ></div> Spring <br>
          <div class="seasons summer" ></div> Summer <br>
          <div class="seasons fall" ></div> Fall <br>
          <div class="seasons winter" ></div> Winter <br>
        </v-card-text>



      </v-card>
    </div>
  </div>
</template>

<script setup>
import {useDayOfTheYear} from "@/composables/doy";
import {daysInAYear} from "@/utils/daysInAYear";
import {markRitus} from "@/utils/markRitus";
import {markCardinalPoints} from "@/utils/markCardinalPoints";

const {doy, progress} = useDayOfTheYear();
const fieldSize = ref('8px');
const fieldColor = ref('dodgerblue');
const seasons = ref('ritu');

function createFields(no, {start, end, label}) {
  const container = document.querySelector(`#container${no}`);
  for (let i = start; i <= end; i++) {
    let field = document.createElement('div');
    field.classList.add(`field${no}`, `el${i}`, `field`, `tooltip`);
    field.addEventListener('mouseenter', () => {
      field.style.zIndex = "9999"
    })
    field.setAttribute(
        "data-title",
        `DOY: ${i},\n
          Date: ${new Date(new Date().getFullYear(), 0, i).toLocaleString('en-US', {month: "long"})}
          ${new Date(new Date().getFullYear(), 0, i).getDate()}
      `)


    if (seasons.value === 'ritu') {
      markRitus(i, field);
    }
    if (seasons.value === 'solar') {
      markSolarSeasons(i, field);
    }
    if (seasons.value === 'meteorological') {
      markMeteorologicalSeasons(i, field);
    }
    if (seasons.value === 'astronomical') {
      markAstronomicalSeasons(i, field);
    }
    markMonths(i, field);
    if (i === doy) {
      field.classList.add("current-day");
    }
    if (label === true) {
      field.textContent = `${i}`
    }
    container.append(field)
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
    markCardinalPoints(fields, field)
  });

}

let radius;
const label = false;

if (window.innerWidth <= 600) {
  radius = 163
}else {
  radius = 198
}

function resetFields() {
  const fields = document.querySelectorAll(".field");
  fields.forEach((field) => {
    field.remove();
  })
}

function generateFields() {
  createFields(1, {start: 80, end: 265, label});
  createFields(2, {start: 266, end: daysInAYear(), label});
  createFields(2, {start: 1, end: 79, label});
  distributeFields(1, {radius});
  distributeFields(2, {radius});
}

onMounted(() => {
  resetFields();
  generateFields();
})


watch(seasons, () => {
  resetFields();
  generateFields();
})

</script>

<style scoped>
body{
  color:aqua
}
.parent {
  display: grid;
  place-items: center;
  margin-top: 2rem;
  grid-template-columns: 1fr 1fr;
  /*grid-template-rows: 1fr 1fr;*/

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
  border: 1px solid black;
}

#container1 {
  width: 400px;
  height: 400px;
  position: relative;
  rotate: 90deg;
  margin-left: 10px;
  margin-bottom: 5px;
}

#container2 {
  width: 400px;
  height: 400px;
  position: relative;
  rotate: 180deg;
  margin-left: 10px;
  margin-top: 5px;
}

@media only screen and (max-width: 600px) {
  #container1, #container2{
    width: 330px;
    height: 330px;
  }
}

.parent :deep(.field){
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
}

.parent :deep(.current-day) {
  scale: 4;
  background-color: transparent !important;
  background-image: url("/sun.png");
  background-size: cover;
  z-index: 1;
}

.parent :deep(.current-day:hover) {
  scale: 5;
}

.parent :deep(.months) {
  scale: 2.8;
  font-size: .23rem;
  color: white;
  border: 1px solid black;
  background-color: black !important;
  font-weight: bold;
  z-index: 2;
}
.parent :deep(.months:hover) {
  scale:3.8
}

.seasons{
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: black;
  display: inline-block;
}

.parent :deep(.vasanta), .parent :deep(.spring){
  background-color: seagreen;
}
.parent :deep(.grishma), .parent :deep(.summer){
  background-color: orangered;
}
.parent :deep(.varsha){
  background-color: dodgerblue;
}
.parent :deep(.sharad), .parent :deep(.fall){
  background-color: yellow;
}
.parent :deep(.hemanta){
  background-color: saddlebrown;
}
.parent :deep(.shishira), .parent :deep(.winter){
  background-color: aqua;
}

</style>