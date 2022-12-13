export function markMeteorologicalSeasons(i, el:HTMLElement){
        if (i >= 60 && i <= 151) {
            el.classList.add("spring");
        }
        if(i >= 152 && i<= 243){
            el.classList.add("summer");
        }
        if(i >= 244 && i<=334){
            el.classList.add('fall')
        }
        if(i >= 335 && i<= daysInAYear()){
            el.classList.add("winter")
        }
        if(i>= 1 && i <= 59){
            el.classList.add("winter")

        }

}