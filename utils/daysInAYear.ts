export function daysInAYear(year = new Date().getFullYear()) {
    if (isLeapYear(year)) {
        return 366
    } else {
        return 365
    }
}

