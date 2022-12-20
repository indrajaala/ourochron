import {computed, ref} from "vue";

const apiKey = '81bcb59bb6cf45739d4c8c81efb1510c';


const getUrl = (city) => {
    return `https://api.ipgeolocation.io/astronomy?apiKey=${apiKey}&location=${city}`;
}

const bColor = ref("black");
const tColor = ref("white")

export {getUrl, bColor, tColor}