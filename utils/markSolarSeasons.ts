export function markSolarSeasons(i, el: HTMLElement) {
    if (i >= 32 && i <= 121) {
        el.classList.add("spring");
    }
    if(i >= 122 && i<= 213){
        el.classList.add("summer")
    }
    if(i >= 214 && i<=305){
        el.classList.add('fall');
    }
    if(i >= 306 && i<= daysInAYear()){
        el.classList.add("winter")
    }
    if(i >= 1 && i<= 31){
        el.classList.add("winter")
    }

}