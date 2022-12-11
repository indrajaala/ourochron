export function markAstronomicalSeasons(i, el:HTMLElement){
    if (i >= 80 && i <= 172) {
        el.style.backgroundColor = "green"
    }
    if(i >= 173 && i<= 265){
        el.style.backgroundColor = "red"
    }
    if(i >= 266 && i<=355){
        el.style.backgroundColor = "yellow"
    }
    if(i >= 356 && i<= 79){
        el.style.backgroundColor = "aqua"
    }

}