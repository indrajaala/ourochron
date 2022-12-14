import {computed, ref} from "vue";

const apiKey = '98ba2cc5654d49dfb4aa05c96f4c2fca';


const getUrl = (city) => {
    return `https://api.ipgeolocation.io/astronomy?apiKey=${apiKey}&location=${city}`;
}

const bColor = ref("black");
const tColor = ref("white")

export {getUrl, bColor, tColor}