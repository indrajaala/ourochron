import {computed, ref} from "vue";

const city = ref("ujjain");
const apiKey = '98ba2cc5654d49dfb4aa05c96f4c2fca';


const url = computed(() => {
    return `https://api.ipgeolocation.io/astronomy?apiKey=${apiKey}&location=${city.value}`;
})

const {
    data: response,
    refresh,
    pending,
    error
} = await useAsyncData('count', () => $fetch(url.value));

const moonRise = computed(() => {
    let data = response.value.moonrise.split(":");
    return Number(data[0]) * 60 + Number(data[1]);
});

const moonSet = computed(() => {
    let data = response.value.moonset.split(":");
    return Number(data[0]) * 60 + Number(data[1]);
})


const sunRise = computed(() => {
    let data = response.value.sunrise.split(":");
    return Number(data[0]) * 60 + Number(data[1]);
})

const sunSet = computed(() => {
    let data = response.value.sunset.split(":");
    return Number(data[0]) * 60 + Number(data[1]);
})

const currentTime = computed(() => {
    let data = response.value.current_time.split(":");
    return Number(data[0]) * 60 + Number(data[1]);
})

const bColor = ref("");
const tColor = ref("")

export {city, response, refresh, pending, moonRise, moonSet, currentTime, sunSet, sunRise, bColor, tColor}
