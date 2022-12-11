let muhurtaCounter = 0;
let muhurtaLabel = 1;

export function markMuhurtas(el) {
    muhurtaCounter++;
    if (muhurtaCounter === 1) {
        el.textContent = muhurtaLabel;
        el.classList.add('muhurtas');
    }
    if (muhurtaCounter === 48 && muhurtaLabel < 30) {
        muhurtaLabel++
        el.textContent = muhurtaLabel;
        el.classList.add('muhurtas');
        muhurtaCounter = 0;
    }
    if(muhurtaCounter === 49){
        muhurtaCounter = 0;
        muhurtaLabel = 1;
    }
}