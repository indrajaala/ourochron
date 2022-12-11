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

            <v-btn value="solar">
              Solar
            </v-btn>
          </v-btn-toggle>
          <v-btn-toggle
              v-model="seasons"
              rounded="0"
              color="deep-purple-accent-3"
              group
          >
            <v-btn value="astronomical">
              Astronomical
            </v-btn>
            <br>
            <v-btn value="meteorological">
              Meteorological
            </v-btn>

          </v-btn-toggle>
        </v-col>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import {useDayOfTheYear} from "@/composables/doy";
import {daysInAYear} from "@/utils/daysInAYear";
import {markRitus} from "@/utils/markRitus";

const {doy, progress} = useDayOfTheYear();
const fieldSize = ref('8px');
const fieldColor = ref('blue');
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
  console.log("the fields are", fields)
  const width = container.offsetWidth;
  const height = container.offsetHeight;
  let angle = 0;
  const step = (2 * Math.PI) / fields.length;
  fields.forEach((field) => {
    console.log(field)
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
  generateFields();
})

onBeforeRouteUpdate(()=>{
  generateFields();
})

watch(seasons, () => {
  resetFields();
  generateFields();
})

</script>

<style>

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
@media (prefers-color-scheme: dark) {
  body{
    background-color: red!important;
  }

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

.field {
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

.field:hover {
  scale: 3
}

.field1 {
  rotate: -90deg;
}

.field2 {
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


.tooltip[data-title]:hover:after {
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

.current-day {
  scale: 4;
  background-color: transparent !important;
  background-image: url("/sun.png");
  background-size: cover;
  z-index: 1;
}

.current-day:hover {
  scale: 5;
}

.months {
  scale: 2.8;
  font-size: .23rem;
  color: white;
  border: 1px solid black;
  background-color: black !important;
  font-weight: bold;
  z-index: 2;
}
.months:hover {
  scale:3.8
}
</style>