export function markRitus(i, el:HTMLElement) {
    if (i >= 49 && i <= 110) {
        el.style.backgroundColor = "green"
        // el.classList.add("vasanta-ritu");
    }

    if (i >= 111 && i <= 172) {
        el.style.backgroundColor = "red"
        // el.classList.add("grishma-ritu");
    }

    if (i >= 173 && i <= 235) {
        el.style.backgroundColor = "blue"
        // el.classList.add("varsha-ritu");
    }

    if (i >= 236 && i <= 296) {
        el.style.backgroundColor = "yellow"
        // el.classList.add("sharad-ritu");
    }

    if (i >= 297 && i <= 356) {
        el.style.backgroundColor = "saddlebrown"
        // el.classList.add("hemanta-ritu");
    }

    if (i >= 357 && i <= 365) {
        el.style.backgroundColor = "aqua"
        // el.classList.add("shishira-ritu");
    }

    if (i >= 1 && i <= 48) {
        el.style.backgroundColor = "aqua"
        // el.classList.add("shishira-ritu");
    }
}