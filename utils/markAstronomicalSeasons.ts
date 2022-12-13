import {daysInAYear} from "~/utils/daysInAYear";

export function markAstronomicalSeasons(i, el:HTMLElement){
    if (i >= 80 && i <= 172) {
        el.classList.add("spring");
    }
    if(i >= 173 && i<= 265){
        el.classList.add("summer")
    }
    if(i >= 266 && i<=355){
        el.classList.add("fall")
    }
    if(i >= 356 && i<= daysInAYear()){
        el.classList.add("winter")
    }
    if(i >= 1 && i <= 79){
        el.classList.add("winter");
    }


}