import {computed, ref} from "vue";

const city = ref("ujjain");
const apiKey = '98ba2cc5654d49dfb4aa05c96f4c2fca';


const url = computed(() => {
    return `https://api.ipgeolocation.io/astronomy?apiKey=${apiKey}&location=${city.value}`;
})

const bColor = ref("black");
const tColor = ref("white")

export {city,url, response, refresh, pending, moonRise, moonSet, currentTime, sunSet, sunRise, bColor, tColor}
