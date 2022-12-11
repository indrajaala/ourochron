export function markSolarSeasons(i, el: HTMLElement) {
    if (i >= 32 && i <= 121) {
        el.style.backgroundColor = "green"
    }
    if(i >= 122 && i<= 213){
        el.style.backgroundColor = "red"
    }
    if(i >= 214 && i<=305){
        el.style.backgroundColor = "yellow"
    }
    if(i >= 306 && i<= 31){
        el.style.backgroundColor = "aqua"
    }
}