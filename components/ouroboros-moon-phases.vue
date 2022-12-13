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


        <v-card-title>Info</v-card-title>
        <v-card-text>
          lunar_Day: {{lunarDay}} <br>
          lunar_Phase: {{lunarPhase}}
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import lunarCalc from "lunarphase-calculator";
import {markCardinalPoints} from "~/utils/markCardinalPoints";

useHead({
  title: 'ourochron - Moon phases',
})


const fieldSize = ref('20px');
const fieldColor = ref('dodgerblue');
const lunarDay = Math.round(lunarCalc.getLunarDay(new Date()));
const lunarPhase = lunarCalc.getLunarPhase(lunarDay);

// console.log('the lunar day is', lunarDay);

function createFields(no, {start, end, label}) {

  const container = document.querySelector(`#container${no}`);
  for (let i = start; i <= end; i++) {

    let field = document.createElement('div');
    field.classList.add(`field${no}`, `el${i}`, `field`, `tooltip`);
    field.addEventListener('mouseenter', () => {
      field.style.zIndex = "99999999";
    })
    field.setAttribute(
        "data-title",
        `Lunar Day: ${i}
     `)
    if (i === lunarDay) {
      field.classList.add("current-phase");
    }
    field.style.backgroundImage = `url("/moon${i}.png")`;
    // markHours(solarAdjustedTime, field);

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
    markCardinalPoints(fields, field);
  });

}

let radius;
const label = false;

if (window.innerWidth <= 600) {
  radius = 163
}else {
  radius = 195
}


function generateFields() {
  createFields(1, {start: 7, end: 21, label})
  createFields(2, {start: 22, end: 30, label})
  createFields(2, {start: 1, end: 6, label})

  distributeFields(1, {radius});
  distributeFields(2, {radius});
}

function resetFields() {
  const fields = document.querySelectorAll(".field");
  fields.forEach((field) => {
    field.remove();
  })
}

onMounted(() => {
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
  margin-left: 20px;
  margin-bottom: 15px;
}

#container2 {
  width: 400px;
  height: 400px;
  position: relative;
  rotate: 180deg;
  margin-left: 20px;
  margin-top: 10px;
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
  font-size: .8rem;
  color: black;
  cursor: pointer;
  white-space: nowrap;
  word-wrap: break-word;
  transition: all .1s linear;
  z-index: -1;
  background-size: cover;

}

.parent :deep(.field:hover) {
  scale: 2
}

.parent :deep(.field1) {
  rotate: -90deg;
}

.parent :deep(.field2) {
  rotate: -180deg;
}

.parent :deep(.current-phase) {
  scale: 2.5;
  z-index: 99;
}

.parent :deep(.current-phase:hover) {
  scale: 3.5;
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
  left: 20px;
  top: -20px;
  white-space: nowrap;
  border-radius: 2px;
  background: #000;
}

/*.hours {*/
/*  scale: 3.5;*/
/*  font-size: .23rem;*/
/*  color: red;*/
/*  font-weight: bold;*/
/*  z-index: 2;*/
/*}*/

/*.hours:hover{*/
/*  scale: 1.3;*/

/*}*/
</style>