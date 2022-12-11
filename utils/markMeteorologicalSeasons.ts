export function markMeteorologicalSeasons(i, el:HTMLElement){
        if (i >= 60 && i <= 151) {
            el.style.backgroundColor = "green"
        }
        if(i >= 152 && i<= 243){
            el.style.backgroundColor = "red"
        }
        if(i >= 244 && i<=334){
            el.style.backgroundColor = "yellow"
        }
        if(i >= 335 && i<= 59){
            el.style.backgroundColor = "aqua"
        }

}