export function markRitus(i, el:HTMLElement) {
    if (i >= 49 && i <= 110) {
        el.classList.add('vasanta');
    }

    if (i >= 111 && i <= 172) {
        el.classList.add('grishma');
    }

    if (i >= 173 && i <= 235) {
        el.classList.add('varsha')
    }

    if (i >= 236 && i <= 296) {
        el.classList.add("sharad")
    }

    if (i >= 297 && i <= 356) {
        el.classList.add("hemanta");
    }

    if (i >= 357 && i <= 365) {
        el.classList.add('shishira');
    }

    if (i >= 1 && i <= 48) {
        el.classList.add('shishira');
    }
}