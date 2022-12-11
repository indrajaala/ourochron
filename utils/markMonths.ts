export function markMonths(i, el: HTMLElement) {
    const currentYear = new Date().getFullYear();
    const months = [1,
        32,
        !isLeapYear(currentYear) ? 60 : 61,
        !isLeapYear(currentYear) ? 91 : 92,
        !isLeapYear(currentYear) ? 121 : 122,
        !isLeapYear(currentYear) ? 152 : 153,
        !isLeapYear(currentYear) ? 182 : 183,
        !isLeapYear(currentYear) ? 213 : 214,
        !isLeapYear(currentYear) ? 244 : 245,
        !isLeapYear(currentYear) ? 274 : 275,
        !isLeapYear(currentYear) ? 305 : 306,
        !isLeapYear(currentYear) ? 335 : 336,
    ];
    if (i === months[0]) {
        el.textContent = '01';
        el.classList.add('months')
    }
    if (i === months[1]) {
        el.textContent = '02';
        el.classList.add('months')
    }
    if (i === months[2]) {
        el.textContent = '03';
        el.classList.add('months')
    }
    if (i === months[3]) {
        el.textContent = '04';
        el.classList.add('months')
    }
    if (i === months[4]) {
        el.textContent = '05';
        el.classList.add('months')
    }
    if (i === months[5]) {
        el.textContent = '06';
        el.classList.add('months')
    }
    if (i === months[6]) {
        el.textContent = '07';
        el.classList.add('months')
    }
    if (i === months[7]) {
        el.textContent = '08';
        el.classList.add('months')
    }
    if (i === months[8]) {
        el.textContent = '09';
        el.classList.add('months')
    }
    if (i === months[9]) {
        el.textContent = '10';
        el.classList.add('months')
    }
    if (i === months[10]) {
        el.textContent = '11';
        el.classList.add('months')
    }
    if (i === months[11]) {
        el.textContent = '12';
        el.classList.add('months')
    }


}